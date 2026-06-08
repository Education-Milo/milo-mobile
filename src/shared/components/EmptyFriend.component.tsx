import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TypographyComponent from "@shared/components/Typography.component";
import { colors } from "@shared/theme/colors";

interface EmptyFriendsStateProps {
	onAddFriends: () => void;
	message?: string;
	buttonText?: string;
}

const EmptyFriendComponent = ({
	onAddFriends,
	message,
	buttonText,
}: EmptyFriendsStateProps) => {
	return (
		<View style={styles.emptyFriendsContainer}>
			<TypographyComponent variant="body" color={colors.text.secondary}>
				{message || "Pas encore d'amis ?"}
			</TypographyComponent>
			<TouchableOpacity style={styles.addFriendsButton} onPress={onAddFriends}>
				<TypographyComponent
					variant="label"
					style={styles.addFriendsButtonText}
				>
					{buttonText || "Ajoutes-en"}
				</TypographyComponent>
			</TouchableOpacity>
		</View>
	);
};

export default EmptyFriendComponent;

const styles = StyleSheet.create({
	emptyFriendsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 40,
	},
	emptyFriendsText: {
		marginTop: 16,
		color: colors.text.secondary,
	},
	addFriendsButton: {
		marginTop: 16,
		backgroundColor: colors.primary,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 24,
	},
	addFriendsButtonText: {
		color: colors.white,
	},
});
