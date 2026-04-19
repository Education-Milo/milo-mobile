import React from "react";
import {
	View,
	TouchableOpacity,
	FlatList,
	Image,
	StyleSheet,
} from "react-native";
import TypographyComponent from "@components/Typography.component";
import BottomSheetComponent from "@components/BottomSheetModal.component";
import { colors } from "@theme/colors";
import { type Player } from "@hooks/useGameScreen";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface GameScreenFooterProps {
	activeTab: "global" | "friends";
	onTabChange: (tab: "global" | "friends") => void;
	currentData: Player[];
	bottomSheetRef: React.RefObject<BottomSheetModal | null>;
	onlineFriends: Player[];
	onCloseModal: () => void;
	onChallengeFriend: (player: Player) => void;
}

const GameScreenFooter = ({
	activeTab,
	onTabChange,
	currentData,
	bottomSheetRef,
	onlineFriends,
	onCloseModal,
	onChallengeFriend,
}: GameScreenFooterProps) => {
	const getInitials = (name: string) =>
		name
			.split(" ")
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join("");

	const renderAvatar = (item: Player, sizeStyle: object) => {
		if (item.avatar) {
			return (
				<Image source={item.avatar} style={sizeStyle} resizeMode="cover" />
			);
		}

		return (
			<View style={[sizeStyle, styles.avatarFallback]}>
				<TypographyComponent variant="label" style={styles.avatarFallbackText}>
					{getInitials(item.name)}
				</TypographyComponent>
			</View>
		);
	};

	const renderRankingItem = ({ item }: { item: Player }) => {
		const isMe = item.name === "Vous";
		return (
			<View style={[styles.rankItem, isMe && styles.rankItemActive]}>
				<View style={styles.rankNumberContainer}>
					{item.rank <= 3 ? (
						<Ionicons
							name={
								item.rank === 1
									? "trophy"
									: item.rank === 2
										? "trophy-outline"
										: "trophy-outline"
							}
							size={20}
							color={
								item.rank === 1
									? "#FFD700"
									: item.rank === 2
										? "#C0C0C0"
										: "#CD7F32"
							}
						/>
					) : (
						<TypographyComponent variant="h6" color={colors.text.secondary}>
							{item.rank}
						</TypographyComponent>
					)}
				</View>
				{renderAvatar(item, styles.avatar)}
				<View style={styles.rankInfo}>
					<TypographyComponent
						variant="h6"
						color={isMe ? colors.primary : colors.text.primary}
					>
						{item.name}
					</TypographyComponent>
					<TypographyComponent
						variant="labelSmall"
						color={colors.text.tertiary}
					>
						{item.score} XP
					</TypographyComponent>
				</View>
			</View>
		);
	};

	const renderFriendItem = ({ item }: { item: Player }) => (
		<View style={styles.friendItem}>
			<View style={styles.friendInfo}>
				<View>
					{renderAvatar(item, styles.avatarSmall)}
					<View style={styles.onlineDot} />
				</View>
				<TypographyComponent variant="body" style={{ marginLeft: 12 }}>
					{item.name}
				</TypographyComponent>
			</View>
			<TouchableOpacity
				style={styles.challengeButton}
				onPress={() => onChallengeFriend(item)}
			>
				<TypographyComponent variant="label" style={{ color: colors.white }}>
					Défier
				</TypographyComponent>
			</TouchableOpacity>
		</View>
	);

	return (
		<>
			{/* Classement */}
			<View style={styles.rankingContainer}>
				<View style={styles.rankingHeader}>
					<TypographyComponent variant="h5">Classement</TypographyComponent>
					<View style={styles.toggleContainer}>
						<TouchableOpacity
							style={[
								styles.toggleButton,
								activeTab === "global" && styles.toggleActive,
							]}
							onPress={() => onTabChange("global")}
						>
							<Ionicons
								name="globe-outline"
								size={14}
								color={
									activeTab === "global" ? colors.white : colors.text.secondary
								}
							/>
							<TypographyComponent
								variant="labelSmall"
								style={[
									styles.toggleText,
									activeTab === "global" && { color: colors.white },
								]}
							>
								Global
							</TypographyComponent>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.toggleButton,
								activeTab === "friends" && styles.toggleActive,
							]}
							onPress={() => onTabChange("friends")}
						>
							<Ionicons
								name="people-outline"
								size={14}
								color={
									activeTab === "friends" ? colors.white : colors.text.secondary
								}
							/>
							<TypographyComponent
								variant="labelSmall"
								style={[
									styles.toggleText,
									activeTab === "friends" && { color: colors.white },
								]}
							>
								Amis
							</TypographyComponent>
						</TouchableOpacity>
					</View>
				</View>

				{currentData.map((item) => (
					<React.Fragment key={item.id}>
						{renderRankingItem({ item })}
					</React.Fragment>
				))}
			</View>

			{/* Modal défier un ami */}
			<BottomSheetComponent ref={bottomSheetRef} snapPoints={["55%"]}>
				<View style={styles.modalHeader}>
					<TypographyComponent variant="h5">Défier un ami</TypographyComponent>
					<TouchableOpacity onPress={onCloseModal}>
						<Ionicons name="close" size={24} color={colors.text.secondary} />
					</TouchableOpacity>
				</View>
				<TypographyComponent
					variant="bodySmall"
					color={colors.text.secondary}
					style={{ marginBottom: 16 }}
				>
					Amis disponibles actuellement
				</TypographyComponent>
				<FlatList
					data={onlineFriends}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderFriendItem}
				/>
			</BottomSheetComponent>
		</>
	);
};

const styles = StyleSheet.create({
	rankingContainer: {
		backgroundColor: colors.white,
		borderRadius: 24,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	rankingHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: colors.primaryLight,
		borderRadius: 20,
		padding: 4,
	},
	toggleButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 16,
		gap: 4,
	},
	toggleActive: {
		backgroundColor: colors.primary,
	},
	toggleText: {
		color: colors.text.secondary,
	},
	rankItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.light,
	},
	rankItemActive: {
		backgroundColor: "#FFF3E0",
		marginHorizontal: -20,
		paddingHorizontal: 20,
	},
	rankNumberContainer: {
		width: 30,
		alignItems: "center",
		marginRight: 12,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		marginRight: 12,
		backgroundColor: "#EEE",
	},
	avatarFallback: {
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarFallbackText: {
		color: colors.white,
	},
	rankInfo: {
		flex: 1,
	},
	friendItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border.light,
	},
	friendInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatarSmall: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#EEE",
	},
	onlineDot: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.success,
		borderWidth: 1.5,
		borderColor: colors.background,
	},
	challengeButton: {
		backgroundColor: colors.secondary,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: colors.background,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		minHeight: "50%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
});

export default GameScreenFooter;
