import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	TextInput,
} from "react-native";
import {
	Search,
	Users,
	Bell,
	Trash2,
	Check,
	X,
} from "lucide-react-native";
import Layout from "@components/Layout";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import { useFriendScreen } from "@hooks/useFriendScreen";
import TabSwitcher, { Tab } from "@components/TabSwitcher.component";
import { Friend } from "@store/friend/friend.model";
import { useTranslation } from "react-i18next";

type FriendTab = 'list' | 'requests' | 'add';

const FriendsScreen = () => {
	const {
		activeTab,
		setActiveTab,
		friends,
		requests,
		searchQuery,
		setSearchQuery,
		handleDeleteFriend,
		handleAcceptRequest,
		handleRejectRequest,
	} = useFriendScreen();

	const { t } = useTranslation();

	const friendTabs: Tab<FriendTab>[] = [
		{ id: 'list', label: t("friends.tabs.list") },
		{ id: 'requests', label: t("friends.tabs.requests") },
		{ id: 'add', label: t("friends.tabs.add") },
	];

	const renderFriendItem = ({ item }: { item: Friend }) => (
		<View style={styles.cardItem}>
			<View style={styles.avatarContainer}>
				<View style={styles.avatarPlaceholder}>
					<TypographyComponent variant="h6" color={colors.white}>
						{item.friend_first_name.charAt(0).toUpperCase()}
					</TypographyComponent>
				</View>
			</View>

			<View style={styles.infoContainer}>
				<TypographyComponent variant="h6">
					{item.friend_first_name} {item.friend_last_name}
				</TypographyComponent>
				<TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
					{item.friend_email}
				</TypographyComponent>
			</View>

			<View style={styles.actionsRow}>
				<TouchableOpacity
					style={[styles.actionButtonIcon, { backgroundColor: "#FFF0F0" }]}
					onPress={() =>
						handleDeleteFriend(
							String(item.user_id),
							`${item.friend_first_name} ${item.friend_last_name}`
						)
					}
				>
					<Trash2 size={20} color={colors.error} />
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderRequestItem = ({ item }: { item: Friend }) => (
		<View style={styles.cardItem}>
			<View style={styles.avatarPlaceholder}>
				<TypographyComponent variant="h6" color={colors.white}>
					{item.friend_first_name.charAt(0).toUpperCase()}
				</TypographyComponent>
			</View>

			<View style={styles.infoContainer}>
				<TypographyComponent variant="h6">
					{item.friend_first_name} {item.friend_last_name}
				</TypographyComponent>
				<TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
					{t("friends.requests.receivedAt", { date: new Date(item.createdAt).toLocaleDateString() })}
				</TypographyComponent>
			</View>

			<View style={styles.actionsRow}>
				<TouchableOpacity
					style={[styles.actionButtonCircle, { backgroundColor: "#E8F5E9" }]}
					onPress={() => handleAcceptRequest(item.id)}
				>
					<Check size={20} color={colors.success} />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.actionButtonCircle, { backgroundColor: "#FFEBEE" }]}
					onPress={() => handleRejectRequest(item.user_id)}
				>
					<X size={20} color={colors.error} />
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<Layout>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<TypographyComponent variant="h3">{t("friends.title")}</TypographyComponent>
				</View>

				{/* Tabs */}
				<TabSwitcher
					tabs={friendTabs}
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>

				{/* Content */}
				<View style={styles.contentContainer}>
					{/* 1. LISTE D'AMIS */}
					{activeTab === "list" && (
						<FlatList
							data={friends}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderFriendItem}
							ListEmptyComponent={
								<View style={styles.emptyState}>
									<Users size={48} color={colors.border.dark} />
									<TypographyComponent
										variant="body"
										color={colors.text.secondary}
										style={{ marginTop: 16 }}
									>
										{t("friends.list.empty")}
									</TypographyComponent>
								</View>
							}
							contentContainerStyle={{ paddingBottom: 20 }}
						/>
					)}

					{/* 2. DEMANDES D'AMIS */}
					{activeTab === "requests" && (
						<FlatList
							data={requests}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderRequestItem}
							ListEmptyComponent={
								<View style={styles.emptyState}>
									<Bell size={48} color={colors.border.dark} />
									<TypographyComponent
										variant="body"
										color={colors.text.secondary}
										style={{ marginTop: 16 }}
									>
										{t("friends.requests.empty")}
									</TypographyComponent>
								</View>
							}
							contentContainerStyle={{ paddingBottom: 20 }}
						/>
					)}

					{/* 3. AJOUTER UN AMI */}
					{activeTab === "add" && (
						<View style={{ flex: 1 }}>
							<View style={styles.searchContainer}>
								<Search
									size={20}
									color={colors.text.tertiary}
									style={{ marginRight: 8 }}
								/>
								<TextInput
									style={styles.searchInput}
									placeholder={t("friends.add.placeholder")}
									placeholderTextColor={colors.text.tertiary}
									value={searchQuery}
									onChangeText={setSearchQuery}
								/>
							</View>
						</View>
					)}
				</View>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	header: {
		alignItems: "center",
		paddingVertical: 20,
	},
	contentContainer: {
		flex: 1,
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 60,
	},
	cardItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		padding: 12,
		borderRadius: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: colors.border.light,
	},
	avatarContainer: {
		position: "relative",
	},
	avatarPlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},
	infoContainer: {
		flex: 1,
		marginLeft: 12,
	},
	actionsRow: {
		flexDirection: "row",
		gap: 8,
	},
	actionButtonIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
	},
	actionButtonCircle: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.border.light,
		marginBottom: 20,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: colors.text.primary,
	},
});

export default FriendsScreen;