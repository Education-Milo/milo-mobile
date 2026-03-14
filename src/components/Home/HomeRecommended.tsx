import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import { useTranslation } from "react-i18next";

interface HomeRecommendedProps {
	hasBulletin: boolean;
	onScanPress: () => void;
}

const HomeRecommended = ({
	hasBulletin,
	onScanPress,
}: HomeRecommendedProps) => {
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<TypographyComponent variant="h4" color={colors.primary}>
				{t("home.recommended.title")}
			</TypographyComponent>

			{hasBulletin ? (
				<TypographyComponent variant="body" color={colors.text.secondary}>
					Cours recommandés à venir...
				</TypographyComponent>
			) : (
				<TouchableOpacity
					style={styles.ctaCard}
					onPress={onScanPress}
					activeOpacity={0.8}
				>
					<TypographyComponent variant="h6">
						{t("home.recommended.cta")}
					</TypographyComponent>
					<TypographyComponent variant="body" color={colors.text.secondary}>
						{t("home.recommended.ctaDescription")}
					</TypographyComponent>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 15,
        gap: 12,
    },
    ctaCard: {
        backgroundColor: colors.primaryLight,
        padding: 16,
        borderRadius: 8,
        gap: 8,
    },
});
export default HomeRecommended;
