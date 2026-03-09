import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Image,
	TextInput,
} from "react-native";
import {
	Search,
	UserPlus,
	Users,
	Bell,
	Trash2,
	Check,
	X,
} from "lucide-react-native";
import Layout from "@components/Layout";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import {
	useFriendScreen,
	type Friend,
	type FriendRequest,
} from "@hooks/useFriendScreen";
import TabSwitcher from "@components/TabSwitcher.component";

const friendTabs = [
	{ id: "list", label: "Mes Amis" },
	{ id: "requests", label: "Demandes" },
	{ id: "add", label: "Ajouter" },
];

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

	const renderFriendItem = ({ item }: { item: Friend }) => (
		<View style={styles.cardItem}>
			<View style={styles.avatarContainer}>
				<Image source={item.avatar} style={styles.avatar} />
				<View
					style={[
						styles.statusDot,
						{
							backgroundColor: item.isOnline
								? colors.success
								: colors.text.tertiary,
						},
					]}
				/>
			</View>

			<View style={styles.infoContainer}>
				<TypographyComponent variant="h6">{item.name}</TypographyComponent>
				<View style={styles.subInfoRow}>
					<TypographyComponent
						variant="labelSmall"
						color={colors.text.tertiary}
					>
						Lvl {item.level} • {item.isOnline ? "En ligne" : "Hors ligne"}
					</TypographyComponent>
				</View>
			</View>

			<View style={styles.actionsRow}>
				<TouchableOpacity
					style={[styles.actionButtonIcon, { backgroundColor: "#FFF0F0" }]}
					onPress={() => handleDeleteFriend(item.id, item.name)}
				>
					<Trash2 size={20} color={colors.error} />
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderRequestItem = ({ item }: { item: FriendRequest }) => (
		<View style={styles.cardItem}>
			<Image source={item.avatar} style={styles.avatar} />

			<View style={styles.infoContainer}>
				<TypographyComponent variant="h6">{item.name}</TypographyComponent>
				<TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
					Demande reçue {item.date}
				</TypographyComponent>
			</View>

			<View style={styles.actionsRow}>
				<TouchableOpacity
					style={[styles.actionButtonCircle, { backgroundColor: "#E8F5E9" }]}
					onPress={() => handleAcceptRequest(item)}
				>
					<Check size={20} color={colors.success} />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.actionButtonCircle, { backgroundColor: "#FFEBEE" }]}
					onPress={() => handleRejectRequest(item.id)}
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
					<TypographyComponent variant="h3">Social</TypographyComponent>
					<View style={{ width: 24 }} />
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
							keyExtractor={(item) => item.id}
							renderItem={renderFriendItem}
							ListEmptyComponent={
								<View style={styles.emptyState}>
									<Users size={48} color={colors.border.dark} />
									<TypographyComponent
										variant="body"
										color={colors.text.secondary}
										style={{ marginTop: 16 }}
									>
										Tu n'as pas encore d'amis. Ajoutes-en !
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
							keyExtractor={(item) => item.id}
							renderItem={renderRequestItem}
							ListEmptyComponent={
								<View style={styles.emptyState}>
									<Check size={48} color={colors.border.dark} />
									<TypographyComponent
										variant="body"
										color={colors.text.secondary}
										style={{ marginTop: 16 }}
									>
										Aucune demande en attente.
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
									placeholder="Chercher par pseudo, email..."
									placeholderTextColor={colors.text.tertiary}
									value={searchQuery}
									onChangeText={setSearchQuery}
								/>
							</View>

							<View style={styles.addContent}>
								<TypographyComponent variant="h6" style={{ marginBottom: 16 }}>
									Suggestions
								</TypographyComponent>
								<View style={styles.cardItem}>
									<Image
										source={require("@assets/images/student_7.png")}
										style={styles.avatar}
									/>
									<View style={styles.infoContainer}>
										<TypographyComponent variant="h6">
											Léo Dubois
										</TypographyComponent>
										<TypographyComponent
											variant="labelSmall"
											color={colors.text.tertiary}
										>
											Vous avez 3 amis en commun
										</TypographyComponent>
									</View>
									<TouchableOpacity
										style={[
											styles.actionButtonCircle,
											{ backgroundColor: colors.primary },
										]}
									>
										<UserPlus size={20} color={colors.white} />
									</TouchableOpacity>
								</View>
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
		justifyContent: "space-between",
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
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#F0F0F0",
	},
	statusDot: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 14,
		height: 14,
		borderRadius: 7,
		borderWidth: 2,
		borderColor: colors.white,
	},
	infoContainer: {
		flex: 1,
		marginLeft: 12,
	},
	subInfoRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	// Actions
	actionsRow: {
		flexDirection: "row",
		gap: 8,
	},
	actionButtonIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#F5F5F5",
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

	// Search & Add
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
		fontFamily: "Qualy-neue-regular",
	},
	addContent: {
		flex: 1,
	},
});

export default FriendsScreen;
