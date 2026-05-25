import { useRef, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFriends } from "@queries/friend.queries";
import { Friend } from "@store/friend/friend.model";
import { usePendingDuels } from "@queries/duel/duel.queries";
import { DuelChallenge, DuelUserSummary } from "@store/duel/duel.model";
import { useDuel } from "@hooks/duel/DuelContext";

// ── Types ─────────────────────────────────────────────────────────────────────

interface BasePlayer {
	id: string;
	name: string;
	avatar?: ImageSourcePropType;
	rank: number;
	isOnline?: boolean;
}

export interface FriendPlayer extends BasePlayer {
	kind: "friend";
	userId: number;
	score?: number;
}

export type RankingPlayer = FriendPlayer;

// ── Helpers ───────────────────────────────────────────────────────────────────

const getDuelUserName = (user?: DuelUserSummary) => {
	if (!user) return "un adversaire";
	return (
		`${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
		user.username ||
		"un adversaire"
	);
};

const mapFriendToPlayer = (friend: Friend, index: number): FriendPlayer => ({
    kind: "friend",
    id: String(friend.id),
    userId: friend.direction === "received" ? friend.user_id : friend.friend_id,
    name: `${friend.friend_first_name} ${friend.friend_last_name}`.trim(),
    rank: index + 1,
    isOnline: true,
});

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useDuelScreen = () => {
	// Tout ce qui touche aux WS et à l'état du duel vient du contexte
	const {
		startMatchmaking,
		sendChallengeToUserId,
		acceptChallenge,
		declineChallenge,
		decliningChallengeId,
		isDecliningChallenge,
	} = useDuel();

	const { data: pendingDuels = [] } = usePendingDuels();
	const [activeTab, setActiveTab] = useState<"global" | "friends">("global");
	const { data: allFriends = [] } = useFriends();

	const acceptedFriends = allFriends.filter((f) => f.status === "accepted");
	const friendsRanking = acceptedFriends.map(mapFriendToPlayer);
	const currentData: RankingPlayer[] =
		activeTab === "global" ? [] : friendsRanking;

	// ── Actions — délèguent toutes au DuelContext ─────────────────────────────

	// Matchmaking aléatoire : ouvre le WS find_duel sans room_id (comme le web)
	const handleRandomMatch = () => {
		startMatchmaking();
	};

	// Challenge un ami : envoie la requête HTTP, le WS notifs du contexte
	// recevra "challenge_accepted" et basculera automatiquement en "waiting"
	const handleChallengeFriend = async (friend: FriendPlayer) => {
		try {
			console.log("Envoi du duel à userId", friend.id, friend.userId);
			await sendChallengeToUserId(friend.userId);
			closeChallengeModal();
		} catch (error) {
			console.error("Erreur lors de l'envoi du duel :", error);
		}
	};

	// Invitation reçue visible dans pendingDuels (polling) :
	// Le toast PendingChallengeToast dans DuelScreen gère accept/decline
	// via le contexte directement. Cette fonction reste pour la liste.
	const handleAcceptPendingDuel = async (duel: DuelChallenge) => {
		try {
			await acceptChallenge(duel.id);
		} catch (error) {
			console.error("Erreur lors de l'acceptation du duel :", error);
		}
	};

	const handleDeclinePendingDuel = async (duel: DuelChallenge) => {
		try {
			await declineChallenge(duel.id);
		} catch (error) {
			console.error("Erreur lors du refus du duel :", error);
		}
	};

	// ── Bottom sheet (modal de sélection d'ami) ───────────────────────────────

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const openChallengeModal = () => bottomSheetRef.current?.present();
	const closeChallengeModal = () => bottomSheetRef.current?.dismiss();

	return {
		activeTab,
		setActiveTab,
		bottomSheetRef,
		currentData,
		onlineFriends: friendsRanking,
		pendingDuels,
		handleRandomMatch,
		handleChallengeFriend,
		handleAcceptPendingDuel,
		handleDeclinePendingDuel,
		isDecliningDuel: isDecliningChallenge,
		decliningDuelId: decliningChallengeId,
		openChallengeModal,
		closeChallengeModal,
	};
};
