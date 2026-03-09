import { useState } from "react";
import { Alert, LayoutAnimation } from "react-native";

// --- Types ---

export interface Friend {
	id: string;
	name: string;
	avatar: any;
	username: string;
	isOnline: boolean;
	level: number;
}

export interface FriendRequest {
	id: string;
	name: string;
	avatar: any;
	date: string;
}

// --- Mock Data ---

const INITIAL_FRIENDS: Friend[] = [
	{
		id: "1",
		name: "Emma Watson",
		username: "@emma_w",
		avatar: require("@assets/images/student_1.png"),
		isOnline: true,
		level: 12,
	},
	{
		id: "2",
		name: "Lucas Pierre",
		username: "@lucas_p",
		avatar: require("@assets/images/student_2.png"),
		isOnline: true,
		level: 8,
	},
	{
		id: "3",
		name: "Sofia Martin",
		username: "@sofia_m",
		avatar: require("@assets/images/student_3.png"),
		isOnline: false,
		level: 15,
	},
	{
		id: "4",
		name: "Thomas Roux",
		username: "@tom_rx",
		avatar: require("@assets/images/student_4.png"),
		isOnline: false,
		level: 5,
	},
];

const REQUESTS: FriendRequest[] = [
	{
		id: "5",
		name: "Chloé Leroy",
		avatar: require("@assets/images/student_5.png"),
		date: "Il y a 2h",
	},
	{
		id: "6",
		name: "Hugo Bernard",
		avatar: require("@assets/images/student_6.png"),
		date: "Hier",
	},
];

// --- Hook ---

export const useFriendScreen = () => {
	const [activeTab, setActiveTab] = useState<"list" | "requests" | "add">(
		"list"
	);
	const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
	const [requests, setRequests] = useState<FriendRequest[]>(REQUESTS);
	const [searchQuery, setSearchQuery] = useState("");

	const sortedFriends = [...friends].sort((a, b) =>
		a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1
	);

	const handleDeleteFriend = (friendId: string, friendName: string) => {
		Alert.alert(
			"Supprimer un ami",
			`Veux-tu vraiment retirer ${friendName} de ta liste d'amis ?`,
			[
				{ text: "Annuler", style: "cancel" },
				{
					text: "Supprimer",
					style: "destructive",
					onPress: () => {
						LayoutAnimation.configureNext(
							LayoutAnimation.Presets.easeInEaseOut
						);
						setFriends((prev) => prev.filter((f) => f.id !== friendId));
					},
				},
			]
		);
	};

	const handleAcceptRequest = (request: FriendRequest) => {
		const newFriend: Friend = {
			id: request.id,
			name: request.name,
			username: `@${request.name.toLowerCase().replace(" ", "_")}`,
			avatar: request.avatar,
			isOnline: true,
			level: 1,
		};

		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setFriends((prev) => [newFriend, ...prev]);
		setRequests((prev) => prev.filter((r) => r.id !== request.id));
	};

	const handleRejectRequest = (id: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setRequests((prev) => prev.filter((r) => r.id !== id));
	};

	return {
		activeTab,
		setActiveTab,
		friends: sortedFriends,
		requests,
		searchQuery,
		setSearchQuery,
		handleDeleteFriend,
		handleAcceptRequest,
		handleRejectRequest,
	};
};
