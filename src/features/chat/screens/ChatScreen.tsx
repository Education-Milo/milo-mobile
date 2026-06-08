import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Image,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import TypographyComponent from "@shared/components/Typography.component";
import { colors } from "@shared/theme/colors";
import useChatScreen, { Message } from "@features/chat/hooks/useChatScreen";
import { useKeyboardState } from "@shared/hooks/useKeyboardState";
import ChatInput from "@features/chat/components/chat/ChatInput.component";

const END_ACTIONS = [
	{
		key: "qcm",
		icon: "checkmark-circle-outline" as const,
		label: "S'exercer sur des QCM",
		description: "Teste tes connaissances avec des questions à choix multiple",
		color: "#6366F1",
		bgColor: "#EEF2FF",
	},
	{
		key: "open",
		icon: "chatbubble-ellipses-outline" as const,
		label: "Questions ouvertes",
		description: "Réponds à des questions de réflexion pour approfondir",
		color: "#0EA5E9",
		bgColor: "#E0F2FE",
	},
	{
		key: "back",
		icon: "library-outline" as const,
		label: "Choisir une autre notion",
		description: "Retourner au menu des chapitres",
		color: "#10B981",
		bgColor: "#ECFDF5",
	},
] as const;

const ChatScreen = () => {
	const {
		navigation,
		lessonTitle,
		messages,
		isTyping,
		inputText,
		setInputText,
		sendMessage,
		flatListRef,
		parts,
		currentPartIndex,
		phase,
		goToNextPart,
		handleGoToQCM,
		handleGoToOpenQuestion,
		handleGoBackToChapters,
	} = useChatScreen();
	const { isFieldFocused, handleFocus, handleBlur } = useKeyboardState();

	const currentPart = parts[currentPartIndex];
	const isLastPart = currentPartIndex === parts.length - 1;
	const isInputEnabled = phase === "waiting_question" || phase === "answering";

	const handleEndAction = (key: string) => {
		if (key === "qcm") handleGoToQCM();
		else if (key === "open") handleGoToOpenQuestion();
		else if (key === "back") handleGoBackToChapters();
	};

	const renderMessageItem = ({
		item,
	}: {
		item: Message;
		index: number;
	}) => {
		const isMilo = item.sender === "milo";
		return (
			<Animated.View
				entering={FadeInDown.delay(50).duration(300).springify()}
				style={[
					styles.messageContainer,
					isMilo ? styles.miloMessageContainer : styles.userMessageContainer,
				]}
			>
				{isMilo && (
					<View style={styles.avatarSmallContainer}>
						<Image
							source={require("../../../../assets/images/mascot.png")}
							style={styles.avatarSmall}
							resizeMode="contain"
						/>
					</View>
				)}
				<View
					style={[
						styles.messageBubble,
						isMilo ? styles.miloBubble : styles.userBubble,
					]}
				>
					{isMilo && (
						<TypographyComponent
							variant="labelSmall"
							color={colors.primary}
							style={styles.miloLabel}
						>
							Milo explique :
						</TypographyComponent>
					)}
					<TypographyComponent
						variant="body"
						color={isMilo ? colors.text.primary : "#FFFFFF"}
					>
						{item.text}
					</TypographyComponent>
				</View>
			</Animated.View>
		);
	};

	return (
		<View style={styles.root}>
			{/* HEADER */}
			{!isFieldFocused && (
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<Ionicons name="arrow-back" size={24} color={colors.text.primary} />
					</TouchableOpacity>
					<TypographyComponent
						variant="h6"
						style={styles.headerTitle}
						numberOfLines={1}
					>
						{lessonTitle || "Discussion avec Milo"}
					</TypographyComponent>
				</View>
			)}

			{/* BANDEAU PARTIE */}
			{!isFieldFocused && parts.length > 0 && currentPart && (
				<Animated.View
					entering={FadeInDown.duration(400)}
					style={styles.partBanner}
				>
					<View style={styles.partBannerContent}>
						<View style={styles.partInfo}>
							<TypographyComponent
								variant="labelSmall"
								color={colors.text.tertiary}
							>
								Partie {currentPartIndex + 1} sur {parts.length}
							</TypographyComponent>
							<TypographyComponent
								variant="h6"
								color={colors.text.primary}
								numberOfLines={1}
							>
								{currentPart.title}
							</TypographyComponent>
						</View>
						<View style={styles.progressBar}>
							<View
								style={[
									styles.progressFill,
									{
										width: `${((currentPartIndex + 1) / parts.length) * 100}%`,
									},
								]}
							/>
						</View>
					</View>
				</Animated.View>
			)}

			{/* MESSAGES */}
			<FlatList
				ref={flatListRef}
				data={messages}
				style={{ flex: 1 }}
				keyExtractor={(item) => item.id}
				renderItem={renderMessageItem}
				contentContainerStyle={styles.messagesList}
				onContentSizeChange={() =>
					flatListRef.current?.scrollToEnd({ animated: true })
				}
				onLayout={() =>
					flatListRef.current?.scrollToEnd({ animated: true })
				}
				ListFooterComponent={
					<>
						{/* Typing indicator */}
						{isTyping && (
							<View style={styles.typingContainer}>
								<Image
									source={require("../../../../assets/images/mascot.png")}
									style={styles.avatarSmall}
									resizeMode="contain"
								/>
								<View style={styles.typingBubble}>
									<ActivityIndicator size="small" color={colors.primary} />
									<TypographyComponent
										variant="labelSmall"
										color={colors.text.secondary}
										style={{ marginLeft: 8 }}
									>
										Milo est en train d'écrire...
									</TypographyComponent>
								</View>
							</View>
						)}

						{/* Bouton passer à la suite (pas la dernière partie) */}
						{phase === "waiting_question" &&
							!isTyping &&
							parts.length > 0 &&
							!isLastPart && (
								<Animated.View
									entering={FadeInUp.duration(400)}
									style={styles.nextPartContainer}
								>
									<TouchableOpacity
										style={styles.nextPartButton}
										onPress={goToNextPart}
										activeOpacity={0.8}
									>
										<TypographyComponent variant="button" color={colors.white}>
											Partie suivante →
										</TypographyComponent>
									</TouchableOpacity>
								</Animated.View>
							)}

						{/* Bouton terminer la dernière partie */}
						{phase === "waiting_question" &&
							!isTyping &&
							parts.length > 0 &&
							isLastPart && (
								<Animated.View
									entering={FadeInUp.duration(400)}
									style={styles.nextPartContainer}
								>
									<TouchableOpacity
										style={styles.nextPartButton}
										onPress={goToNextPart}
										activeOpacity={0.8}
									>
										<TypographyComponent variant="button" color={colors.white}>
											Terminer la leçon 🎉
										</TypographyComponent>
									</TouchableOpacity>
								</Animated.View>
							)}

						{/* Cartes de fin de leçon */}
						{phase === "lesson_complete" && !isTyping && (
							<Animated.View
								entering={FadeInUp.delay(200).duration(500).springify()}
								style={styles.endActionsContainer}
							>
								<TypographyComponent
									variant="labelSmall"
									color={colors.text.tertiary}
									style={styles.endActionsTitle}
								>
									QUE VEUX-TU FAIRE ENSUITE ?
								</TypographyComponent>

								{END_ACTIONS.map((action, index) => (
									<Animated.View
										key={action.key}
										entering={FadeInUp.delay(300 + index * 100).duration(400).springify()}
									>
										<TouchableOpacity
											style={styles.actionCard}
											onPress={() => handleEndAction(action.key)}
											activeOpacity={0.85}
										>
											<View
												style={[
													styles.actionIconContainer,
													{ backgroundColor: action.bgColor },
												]}
											>
												<Ionicons
													name={action.icon}
													size={22}
													color={action.color}
												/>
											</View>
											<View style={styles.actionTextContainer}>
												<TypographyComponent
													variant="h6"
													color={colors.text.primary}
													style={styles.actionLabel}
												>
													{action.label}
												</TypographyComponent>
												<TypographyComponent
													variant="labelSmall"
													color={colors.text.secondary}
												>
													{action.description}
												</TypographyComponent>
											</View>
											<Ionicons
												name="chevron-forward"
												size={18}
												color={colors.text.tertiary}
											/>
										</TouchableOpacity>
									</Animated.View>
								))}
							</Animated.View>
						)}
					</>
				}
			/>

			{/* INPUT BAR */}
			<ChatInput
				value={inputText}
				onChangeText={setInputText}
				onSend={sendMessage}
				onFocus={handleFocus}
				onBlur={handleBlur}
				editable={isInputEnabled}
				placeholder={
					isInputEnabled
						? "Pose ta question à Milo..."
						: phase === "lesson_complete"
						? "Leçon terminée ! Choisis une option ci-dessus."
						: "Milo prépare la suite..."
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F0F4FF",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: colors.background,
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
	},
	backButton: {
		marginRight: 12,
		padding: 4,
	},
	headerTitle: {
		flex: 1,
	},

	// Bandeau partie
	partBanner: {
		backgroundColor: colors.background,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
	},
	partBannerContent: {
		gap: 8,
	},
	partInfo: {
		alignItems: "center",
	},
	progressBar: {
		height: 4,
		backgroundColor: colors.primaryLight,
		borderRadius: 2,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors.primary,
		borderRadius: 2,
	},

	// Messages
	messagesList: {
		padding: 16,
		paddingBottom: 24,
	},
	messageContainer: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "flex-end",
		maxWidth: "88%",
	},
	userMessageContainer: {
		alignSelf: "flex-end",
		justifyContent: "flex-end",
	},
	miloMessageContainer: {
		alignSelf: "flex-start",
	},
	avatarSmallContainer: {
		marginRight: 8,
		marginBottom: 4,
	},
	avatarSmall: {
		width: 32,
		height: 32,
	},
	messageBubble: {
		padding: 14,
		borderRadius: 20,
		maxWidth: "100%",
	},
	userBubble: {
		backgroundColor: colors.primary,
		borderBottomRightRadius: 4,
	},
	miloBubble: {
		backgroundColor: "#FFFFFF",
		borderBottomLeftRadius: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	miloLabel: {
		fontWeight: "700",
		marginBottom: 4,
	},

	// Typing
	typingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	typingBubble: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 20,
		borderBottomLeftRadius: 4,
		marginLeft: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},

	// Bouton partie suivante
	nextPartContainer: {
		alignItems: "center",
		marginTop: 8,
		marginBottom: 8,
	},
	nextPartButton: {
		backgroundColor: colors.primary,
		paddingVertical: 14,
		paddingHorizontal: 32,
		borderRadius: 30,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},

	// Fin de leçon
	endActionsContainer: {
		marginTop: 8,
		marginBottom: 16,
		gap: 10,
	},
	endActionsTitle: {
		textAlign: "center",
		letterSpacing: 1,
		marginBottom: 4,
	},
	actionCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		paddingVertical: 14,
		paddingHorizontal: 16,
		gap: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.07,
		shadowRadius: 6,
		elevation: 2,
	},
	actionIconContainer: {
		width: 44,
		height: 44,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	actionTextContainer: {
		flex: 1,
		gap: 2,
	},
	actionLabel: {
		fontWeight: "600",
	},
});

export default ChatScreen;