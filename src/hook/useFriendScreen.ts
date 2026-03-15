import { useState } from "react";
import { Alert } from "react-native";
import {
	useFriends,
	useDeleteFriend,
	useAcceptFriendRequest,
} from "@queries/friend.queries";
import { Friend } from "@store/friend/friend.model";


export const useFriendScreen = () => {
	const [activeTab, setActiveTab] = useState<"list" | "requests" | "add">(
		"list"
	);
	const [searchQuery, setSearchQuery] = useState("");

	const { data: allFriends = [] } = useFriends(); // sans paramètre

	const acceptedFriends = allFriends.filter(f => f.status === 'accepted');
	const requests = allFriends.filter(f => f.status === 'pending' && f.direction === 'received');

	const deleteFriendMutation = useDeleteFriend();
	const acceptRequestMutation = useAcceptFriendRequest();

	const handleDeleteFriend = (friendId: string, friendName: string) => {
		Alert.alert(
			"Supprimer l'ami",
			`Êtes-vous sûr de vouloir supprimer ${friendName} de votre liste d'amis ?`,
			[
				{ text: "Annuler", style: "cancel" },
				{
					text: "Supprimer",
					style: "destructive",
					onPress: () => deleteFriendMutation.mutate(Number(friendId)),
				},
			]
		);
	};

	const handleAcceptRequest = (friendshipId: number) => {
		acceptRequestMutation.mutate(friendshipId);
	};

	const handleRejectRequest = (friendshipId: number) => {
		deleteFriendMutation.mutate(friendshipId);
	};

	return {
		activeTab,
		setActiveTab,
		friends: acceptedFriends,
		requests,
		searchQuery,
		setSearchQuery,
		handleDeleteFriend,
		handleAcceptRequest,
		handleRejectRequest,
	};
};
