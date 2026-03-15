import { useState } from "react";
import { Alert } from "react-native";
import {
	useFriends,
	useDeleteFriend,
	useAcceptFriendRequest,
} from "@queries/friend.queries";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import i18n from "@i18n/index";

export const useFriendScreen = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<"list" | "requests" | "add">(
		"list"
	);
	const [searchQuery, setSearchQuery] = useState("");

	const { data: allFriends = [] } = useFriends();

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
