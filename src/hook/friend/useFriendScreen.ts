import { useState } from "react";
import { Alert } from "react-native";
import {
	useFriends,
	useDeleteFriend,
	useAcceptFriendRequest,
	useSendFriendRequest,
} from "@queries/friend.queries";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import { useSearchUsers, useUsersByUsernames } from "@queries/user.queries";
import { User } from "@store/user/user.model";

export const useFriendScreen = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<"list" | "requests" | "add">(
		"list"
	);

	const [searchQuery, setSearchQuery] = useState("");
	const { data: usernames = [], isLoading: isSearching } = useSearchUsers(searchQuery);
	const userQueries = useUsersByUsernames(usernames);
	const searchResults = userQueries.map(q => q.data).filter(Boolean) as User[];

	const { data: allFriends = [] } = useFriends();
	const sendFriendRequestMutation = useSendFriendRequest();

	const acceptedFriends = allFriends.filter((f) => f.status === "accepted");
	const requests = allFriends.filter(
		(f) => f.status === "pending" && f.direction === "received"
	);

	const deleteFriendMutation = useDeleteFriend();
	const acceptRequestMutation = useAcceptFriendRequest();

	const handleDeleteFriend = (friendId: string, friendName: string) => {
		Alert.alert(
			t("friends.actions.deleteTitle"),
			t("friends.actions.deleteMessage", { name: friendName }),
			[
				{ text: t("friends.actions.cancel"), style: "cancel" },
				{
					text: t("friends.actions.confirm"),
					style: "destructive",
					onPress: () =>
						deleteFriendMutation.mutate(Number(friendId), {
							onSuccess: () =>
								showMessage({
									message: t("friends.toast.deleted"),
									type: "success",
									style: {
										paddingVertical: 10,
										paddingHorizontal: 16,
										borderRadius: 12,
										marginHorizontal: 20,
										marginTop: 8,
										alignSelf: "center",
										justifyContent: "center",
									},
									titleStyle: {
										fontSize: 14,
										fontWeight: "600",
									},
									floating: true,
								}),
						}),
				},
			]
		);
	};

	const handleAcceptRequest = (friendshipId: number) => {
		acceptRequestMutation.mutate(friendshipId, {
			onSuccess: () =>
				showMessage({
					message: t("friends.toast.accepted"),
					type: "success",
					style: {
						paddingVertical: 10,
						paddingHorizontal: 16,
						borderRadius: 12,
						marginHorizontal: 20,
						marginTop: 8,
						alignSelf: "center",
						justifyContent: "center",
					},
					titleStyle: {
						fontSize: 14,
						fontWeight: "600",
					},
					floating: true,
				}),
		});
	};

	const handleRejectRequest = (friendId: number) => {
		deleteFriendMutation.mutate(friendId, {
			onSuccess: () =>
				showMessage({
					message: t("friends.toast.rejected"),
					type: "warning",
					style: {
						paddingVertical: 10,
						paddingHorizontal: 16,
						borderRadius: 12,
						marginHorizontal: 20,
						marginTop: 8,
						alignSelf: "center",
						justifyContent: "center",
					},
					titleStyle: {
						fontSize: 14,
						fontWeight: "600",
					},
					floating: true,
				}),
		});
	};

	const handleSendFriendRequest = (userId: number) => {
	sendFriendRequestMutation.mutate(userId, {
		onSuccess: () =>
		showMessage({
			message: t('friends.toast.requestSent'),
			type: 'success',
			floating: true,
		}),
		onError: (error: any) => {
			showMessage({
			message: t('friends.toast.requestAlreadySent'),
			type: 'warning',
			floating: true,
		});
		},
	});
};

	return {
		activeTab,
		setActiveTab,
		friends: acceptedFriends,
		requests,
		searchQuery,
		handleSendFriendRequest,
		searchResults,
		isSearching,
		setSearchQuery,
		handleDeleteFriend,
		handleAcceptRequest,
		handleRejectRequest,
	};
};
