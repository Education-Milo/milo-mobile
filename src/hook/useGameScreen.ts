import { useRef, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFriends } from "@queries/friend.queries";
import { Friend } from "@store/friend/friend.model";

interface BasePlayer {
	id: string;
	name: string;
	avatar?: ImageSourcePropType;
	rank: number;
	isOnline?: boolean;
}

export interface GlobalPlayer extends BasePlayer {
	kind: "global";
	score: number;
}

export interface FriendPlayer extends BasePlayer {
	kind: "friend";
	score?: number;
	isOnline?: boolean;
}

export type RankingPlayer = GlobalPlayer | FriendPlayer;

const RANKING_GLOBAL: GlobalPlayer[] = [
	{
		kind: "global",
		id: "1",
		name: "Emma W.",
		avatar: require("@assets/images/student_1.png"),
		score: 2450,
		rank: 1,
	},
	{
		kind: "global",
		id: "2",
		name: "Lucas P.",
		avatar: require("@assets/images/student_2.png"),
		score: 2380,
		rank: 2,
	},
	{
		kind: "global",
		id: "3",
		name: "Vous",
		avatar: require("@assets/images/mascot.png"),
		score: 2100,
		rank: 3,
	},
	{
		kind: "global",
		id: "4",
		name: "Sofia M.",
		avatar: require("@assets/images/student_3.png"),
		score: 1950,
		rank: 4,
	},
	{
		kind: "global",
		id: "5",
		name: "Thomas R.",
		avatar: require("@assets/images/student_4.png"),
		score: 1820,
		rank: 5,
	},
];

const mapFriendToPlayer = (friend: Friend, index: number): FriendPlayer => ({
	kind: "friend",
	id: String(friend.id),
	name: `${friend.friend_first_name} ${friend.friend_last_name}`.trim(),
	rank: index + 1,
	isOnline: true,
});

// --- Hook ---

export const useGameScreen = () => {
	const [activeTab, setActiveTab] = useState<"global" | "friends">("global");
	const { data: allFriends = [] } = useFriends();
	const acceptedFriends = allFriends.filter((f) => f.status === "accepted");

	const friendsRanking = acceptedFriends.map(mapFriendToPlayer);
	const currentData: RankingPlayer[] =
		activeTab === "global" ? RANKING_GLOBAL : friendsRanking;

	const handleRandomMatch = () => {
		console.log("Recherche d'un adversaire aléatoire...");
		// Logique de matchmaking ici
	};

	const handleChallengeFriend = (friend: FriendPlayer) => {
		console.log(`Défi envoyé à ${friend.name}`);
		// Navigation vers l'écran de jeu ou envoi de notif
	};

	const bottomSheetRef = useRef<BottomSheetModal>(null);

	const openChallengeModal = () => bottomSheetRef.current?.present();
	const closeChallengeModal = () => bottomSheetRef.current?.dismiss();

	return {
		activeTab,
		setActiveTab,
		bottomSheetRef,
		currentData,
		onlineFriends: friendsRanking,
		handleRandomMatch,
		handleChallengeFriend,
		openChallengeModal,
		closeChallengeModal,
	};
};
