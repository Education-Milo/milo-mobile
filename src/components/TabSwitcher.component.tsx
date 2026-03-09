import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";

export interface Tab<T extends string = string> {
	id: T;
	label: string;
}

interface TabSwitcherProps<T extends string = string> {
	tabs: Tab<T>[];
	activeTab: T;
	onTabChange: (tabId: T) => void;
}

const TabSwitcher = <T extends string>({
	tabs,
	activeTab,
	onTabChange,
}: TabSwitcherProps<T>) => {
	return (
		<View style={styles.tabsContainer}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab.id}
					style={[styles.tab, activeTab === tab.id && styles.tabActive]}
					onPress={() => onTabChange(tab.id)}
					activeOpacity={0.75}
				>
					<TypographyComponent
						variant="labelSmall"
						style={[
							styles.tabText,
							activeTab === tab.id && styles.tabTextActive,
						]}
					>
						{tab.label}
					</TypographyComponent>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	tabsContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 24,
		marginTop: 16,
		marginBottom: 24,
		backgroundColor: colors.primaryLight,
		borderRadius: 30,
		padding: 4,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 26,
		alignItems: "center",
	},
	tabActive: {
		backgroundColor: colors.primary,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.35,
		shadowRadius: 8,
		elevation: 4,
	},
	tabText: {
		color: colors.text.tertiary,
		fontWeight: "600",
	},
	tabTextActive: {
		color: colors.text.white,
	},
});

export default TabSwitcher;
