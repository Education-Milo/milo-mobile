import { useRef, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFriends } from "@queries/friend.queries";
import { Friend } from "@store/friend/friend.model";
export interface Player {
	id: string;
	name: string;
	avatar?: ImageSourcePropType;
	score?: number;
	rank: number;
	isOnline?: boolean;
}

const RANKING_GLOBAL: Player[] = [
	{
		id: "1",
		name: "Emma W.",
		avatar: require("@assets/images/student_1.png"),
		score: 2450,
		rank: 1,
	},
	{
		id: "2",
		name: "Lucas P.",
		avatar: require("@assets/images/student_2.png"),
		score: 2380,
		rank: 2,
	},
	{
		id: "3",
		name: "Vous",
		avatar: require("@assets/images/mascot.png"),
		score: 2100,
		rank: 3,
	},
	{
		id: "4",
		name: "Sofia M.",
		avatar: require("@assets/images/student_3.png"),
		score: 1950,
		rank: 4,
	},
	{
		id: "5",
		name: "Thomas R.",
		avatar: require("@assets/images/student_4.png"),
		score: 1820,
		rank: 5,
	},
];

const mapFriendToPlayer = (friend: Friend, index: number): Player => ({
	id: String(friend.id),
	name: `${friend.friend_first_name} ${friend.friend_last_name}`.trim(),
	score: 0,
	rank: index + 1,
});

// --- Hook ---

export const useGameScreen = () => {
	const [activeTab, setActiveTab] = useState<"global" | "friends">("global");
	const { data: acceptedFriends = [] } = useFriends("accepted");

	const friendsRanking = acceptedFriends.map(mapFriendToPlayer);
	const currentData = activeTab === "global" ? RANKING_GLOBAL : friendsRanking;

	const handleRandomMatch = () => {
		console.log("Recherche d'un adversaire aléatoire...");
		// Logique de matchmaking ici
	};

	const handleChallengeFriend = (friend: Player) => {
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
