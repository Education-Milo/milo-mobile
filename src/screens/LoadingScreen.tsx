import TypographyComponent from "@components/Typography.component";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";

const spriteImage = require("@assets/images/Loading_screen_animation.png");

const LoadingScreen: React.FC = () => {
	const { t } = useTranslation();
	const totalFrames = 8;
	const frameWidth = 237;
	const frameHeight = 144;
	// const frameWidth = 8;
	// const frameHeight = 72;

	const [currentFrame, setCurrentFrame] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.spriteWindow,
					{ width: frameWidth, height: frameHeight },
				]}
			>
				<Image
					source={spriteImage}
					style={{
						width: frameWidth * totalFrames,
						height: frameHeight,
						transform: [{ translateX: -currentFrame * frameWidth }],
					}}
				/>
			</View>

			<TypographyComponent>{t("general.loading")}</TypographyComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF8F1",
		gap: 20,
	},
	spriteWindow: {
		overflow: "hidden",
	},
});

export default LoadingScreen;
