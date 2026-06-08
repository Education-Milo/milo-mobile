import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import Layout from "@shared/components/Layout";
import TypographyComponent from "@shared/components/Typography.component";
import SubjectCard from "@shared/components/SubjectCard.component";
import { colors } from "@shared/theme/colors";
import LessonCard from "@features/course/components/LessonCard.component";
import { useLessonScreen } from "@features/course/hooks/useLessonScreen";
import LoadingScreen from "@shared/components/LoadingScreen";
import Select from "@shared/components/Select.component";
import { useTranslation } from "react-i18next";

const LessonScreen = () => {
	const { t } = useTranslation();
	const {
		user,
		subjects,
		availableClasses,
		isLoading,
		currentClass,
		setCurrentClass,
		handleSubjectPress,
	} = useLessonScreen();

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Layout>
			<Animated.ScrollView
				style={styles.container}
				entering={FadeInDown.duration(600).springify()}
				showsVerticalScrollIndicator={false}
			>
				<LessonCard userName={user?.first_name} />
				<View style={styles.header}>
					<TypographyComponent variant="h4">
						{t("lesson.title")}
					</TypographyComponent>

					<View style={{ width: 120, zIndex: 1000 }}>
						<Select
							options={availableClasses}
							value={currentClass ?? user?.classe ?? "6eme"}
							onChange={setCurrentClass}
						/>
					</View>
				</View>

				{isLoading ? (
					<ActivityIndicator
						size="large"
						color={colors.primary}
						style={{ marginTop: 50 }}
					/>
				) : (
					<View style={styles.subjectsContainer}>
						{subjects.map((matiere) => (
							<SubjectCard
								key={matiere.id}
								id={matiere.id}
								title={matiere.title}
								onPress={() => handleSubjectPress(matiere.id, matiere.title)}
							/>
						))}
					</View>
				)}
			</Animated.ScrollView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF8F1",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 20,
		marginTop: 10,
	},
	subjectsContainer: {
		paddingHorizontal: 16,
		gap: 16,
		paddingBottom: 24,
	},
});

export default LessonScreen;
