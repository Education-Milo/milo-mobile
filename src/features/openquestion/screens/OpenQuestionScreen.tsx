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
import ChatInput from "@features/chat/components/chat/ChatInput.component";
import {
	OpenQuestionMessage,
	useOpenQuestionScreen,
} from "@features/openquestion/hooks/useOpenQuestionScreen";

// ─── Component ───────────────────────────────────────────────────────────────

const OpenQuestionScreen: React.FC = () => {
	const {
		navigation,
		lessonTitle,
		isFieldFocused,
		handleFocus,
		handleBlur,
		flatListRef,
		messages,
		inputText,
		setInputText,
		inputMode,
		setInputMode,
		phase,
		questionCount,
		generateQuestion,
		submitInput,
		isInputEnabled,
	} = useOpenQuestionScreen();

	// ── Rendu message ────────────────────────────────────────────────────────

	const renderMessage = ({ item }: { item: OpenQuestionMessage }) => {
		const isUser = item.type === "user_answer" || item.type === "help_request";
		const isQuestion = item.type === "question";
		const isFeedback = item.type === "feedback";
		const isHelp = item.type === "help";

		return (
			<Animated.View
				entering={FadeInDown.delay(50).duration(300).springify()}
				style={[
					styles.messageRow,
					isUser ? styles.messageRowUser : styles.messageRowMilo,
				]}
			>
				{!isUser && (
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
						styles.bubble,
						isUser
							? styles.bubbleUser
							: isQuestion
								? styles.bubbleQuestion
								: styles.bubbleFeedback,
					]}
				>
					{isQuestion && (
						<View style={styles.questionBadge}>
							<Ionicons name="help-circle" size={14} color={colors.primary} />
							<TypographyComponent
								variant="labelSmall"
								color={colors.primary}
								style={styles.questionBadgeText}
							>
								Question {questionCount + 1}
							</TypographyComponent>
						</View>
					)}
					{isFeedback && (
						<View style={styles.feedbackBadge}>
							<Ionicons name="sparkles" size={14} color="#F59E0B" />
							<TypographyComponent
								variant="labelSmall"
								color="#B45309"
								style={styles.feedbackBadgeText}
							>
								Correction de Milo
							</TypographyComponent>
						</View>
					)}
					{isHelp && (
						<View style={styles.feedbackBadge}>
							<Ionicons name="bulb-outline" size={14} color="#0EA5E9" />
							<TypographyComponent
								variant="labelSmall"
								color="#0369A1"
								style={styles.feedbackBadgeText}
							>
								Aide de Milo
							</TypographyComponent>
						</View>
					)}
					<TypographyComponent
						variant="body"
						color={isUser ? "#FFFFFF" : colors.text.primary}
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
					<View style={styles.headerCenter}>
						<TypographyComponent variant="h6" numberOfLines={1} style={styles.headerTitle}>
							{lessonTitle || "Questions ouvertes"}
						</TypographyComponent>
						<View style={styles.headerBadge}>
							<Ionicons name="chatbubble-ellipses-outline" size={12} color={colors.primary} />
							<TypographyComponent
								variant="labelSmall"
								color={colors.primary}
								style={{ marginLeft: 4 }}
							>
								Questions ouvertes
							</TypographyComponent>
						</View>
					</View>
				</View>
			)}

			{/* MESSAGES */}
			<FlatList
				ref={flatListRef}
				data={messages}
				style={{ flex: 1 }}
				keyExtractor={(item) => item.id}
				renderItem={renderMessage}
				contentContainerStyle={styles.messagesList}
				onContentSizeChange={() =>
					flatListRef.current?.scrollToEnd({ animated: true })
				}
				onLayout={() =>
					flatListRef.current?.scrollToEnd({ animated: true })
				}
				ListFooterComponent={
					<>
						{/* Loading */}
						{(phase === "loading" || phase === "submitted" || phase === "helping") && (
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
										{phase === "submitted"
											? "Milo corrige ta réponse..."
											: phase === "helping"
												? "Milo prépare une aide..."
											: "Milo prépare une question..."}
									</TypographyComponent>
								</View>
							</View>
						)}

						{/* Actions après feedback */}
						{phase === "feedback" && (
							<Animated.View
								entering={FadeInUp.delay(300).duration(400).springify()}
								style={styles.feedbackActions}
							>
								<TouchableOpacity
									style={styles.nextQuestionButton}
									onPress={generateQuestion}
									activeOpacity={0.85}
								>
									<Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
									<TypographyComponent variant="button" color="#FFFFFF">
										Nouvelle question
									</TypographyComponent>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.backButton2}
									onPress={() => navigation.goBack()}
									activeOpacity={0.85}
								>
									<TypographyComponent variant="button" color={colors.text.secondary}>
										Retour au cours
									</TypographyComponent>
								</TouchableOpacity>
							</Animated.View>
						)}
					</>
				}
			/>

			{isInputEnabled && (
				<View style={styles.modeSelector}>
					<TouchableOpacity
						style={[
							styles.modeButton,
							inputMode === "answer" && styles.modeButtonActive,
						]}
						onPress={() => setInputMode("answer")}
						activeOpacity={0.85}
					>
						<Ionicons
							name="create-outline"
							size={16}
							color={inputMode === "answer" ? colors.white : colors.text.secondary}
						/>
						<TypographyComponent
							variant="labelSmall"
							color={inputMode === "answer" ? colors.white : colors.text.secondary}
						>
							Répondre
						</TypographyComponent>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.modeButton,
							inputMode === "help" && styles.modeButtonActive,
						]}
						onPress={() => setInputMode("help")}
						activeOpacity={0.85}
					>
						<Ionicons
							name="bulb-outline"
							size={16}
							color={inputMode === "help" ? colors.white : colors.text.secondary}
						/>
						<TypographyComponent
							variant="labelSmall"
							color={inputMode === "help" ? colors.white : colors.text.secondary}
						>
							Demander de l'aide
						</TypographyComponent>
					</TouchableOpacity>
				</View>
			)}

			{/* INPUT BAR */}
			<ChatInput
				value={inputText}
				onChangeText={setInputText}
				onSend={submitInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				editable={isInputEnabled}
				placeholder={
					isInputEnabled
						? inputMode === "help"
							? "Demande un indice ou une précision..."
							: "Écris ta réponse..."
						: phase === "feedback"
						? "Demande une nouvelle question ou reviens au cours"
						: "Milo prépare..."
				}
			/>
		</View>
	);
};

// ─── Styles ───────────────────────────────────────────────────────────────────

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
	headerCenter: {
		flex: 1,
		gap: 2,
	},
	headerTitle: {
		flex: 0,
	},
	headerBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primaryLight ?? "#EEF2FF",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 20,
		alignSelf: "flex-start",
	},

	// Messages
	messagesList: {
		padding: 16,
		paddingBottom: 24,
	},
	messageRow: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "flex-end",
		maxWidth: "88%",
	},
	messageRowUser: {
		alignSelf: "flex-end",
		justifyContent: "flex-end",
	},
	messageRowMilo: {
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
	bubble: {
		padding: 14,
		borderRadius: 20,
		maxWidth: "100%",
	},
	bubbleUser: {
		backgroundColor: colors.primary,
		borderBottomRightRadius: 4,
	},
	bubbleQuestion: {
		backgroundColor: "#FFFFFF",
		borderBottomLeftRadius: 4,
		borderLeftWidth: 3,
		borderLeftColor: colors.primary,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	bubbleFeedback: {
		backgroundColor: "#FFFBEB",
		borderBottomLeftRadius: 4,
		borderLeftWidth: 3,
		borderLeftColor: "#F59E0B",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	questionBadge: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	questionBadgeText: {
		marginLeft: 4,
		fontWeight: "600",
	},
	feedbackBadge: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	feedbackBadgeText: {
		marginLeft: 4,
		fontWeight: "600",
	},

	modeSelector: {
		flexDirection: "row",
		gap: 8,
		paddingHorizontal: 16,
		paddingTop: 8,
		backgroundColor: colors.background,
	},
	modeButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		paddingVertical: 10,
		borderRadius: 18,
		backgroundColor: "#F3F4F6",
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	modeButtonActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
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

	// Actions feedback
	feedbackActions: {
		marginTop: 8,
		gap: 10,
		alignItems: "center",
	},
	nextQuestionButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primary,
		paddingVertical: 14,
		paddingHorizontal: 28,
		borderRadius: 30,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	backButton2: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});

export default OpenQuestionScreen;
