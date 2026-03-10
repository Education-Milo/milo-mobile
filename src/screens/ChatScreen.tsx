import React from "react";
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Image,
	ActivityIndicator,
} from "react-native";
import { ArrowLeft, Send } from "lucide-react-native";

import TypographyComponent from "@components/Typography.component";
import Layout from "@components/Layout";
import { colors } from "@theme/colors";
import useChatScreen, { Message } from "@hooks/useChatScreen";

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
	} = useChatScreen();

	// --- RENDER ITEMS ---

	const renderMessageItem = ({ item }: { item: Message }) => {
		const isMilo = item.sender === "milo";
		return (
			<View
				style={[
					styles.messageContainer,
					isMilo ? styles.miloMessageContainer : styles.userMessageContainer,
				]}
			>
				{isMilo && (
					<View style={styles.avatarSmallContainer}>
						<Image
							source={require("../../assets/images/mascot.png")}
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
					<TypographyComponent
						variant="body"
						color={isMilo ? colors.text.primary : "#FFFFFF"}
					>
						{item.text}
					</TypographyComponent>
				</View>
			</View>
		);
	};

	return (
		<Layout>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				{/* HEADER */}
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<ArrowLeft size={24} color={colors.text.primary} />
					</TouchableOpacity>
					<View style={styles.headerTitleContainer}>
						<TypographyComponent variant="h6">
							{lessonTitle ? `Cours : ${lessonTitle}` : "Discussion avec Milo"}
						</TypographyComponent>
						<TypographyComponent variant="labelSmall" color="green">
							En ligne
						</TypographyComponent>
					</View>
				</View>

				{/* LISTE DES MESSAGES */}
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={renderMessageItem}
					contentContainerStyle={styles.messagesList}
					onContentSizeChange={() =>
						flatListRef.current?.scrollToEnd({ animated: true })
					}
					onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
					ListFooterComponent={
						isTyping ? (
							<View style={{ padding: 10, marginLeft: 40 }}>
								<TypographyComponent
									variant="labelSmall"
									color={colors.text.secondary}
								>
									Milo est en train d'écrire...
								</TypographyComponent>
							</View>
						) : null
					}
				/>

				{/* INPUT BAR */}
				<View style={styles.inputContainer}>
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.textInput}
							placeholder="Pose ta question ou réponds..."
							placeholderTextColor="#9CA3AF"
							value={inputText}
							onChangeText={setInputText}
							multiline
						/>
						<TouchableOpacity
							style={[
								styles.sendButton,
								{
									backgroundColor:
										inputText.length > 0 ? colors.primary : "#E5E7EB",
								},
							]}
							onPress={sendMessage}
							disabled={inputText.length === 0}
						>
							<Send
								size={20}
								color={inputText.length > 0 ? "#FFFFFF" : "#9CA3AF"}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF8F1", // Background clair comme les autres écrans
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
	},
	backButton: {
		marginRight: 16,
	},
	headerTitleContainer: {
		flex: 1,
	},
	messagesList: {
		padding: 16,
		paddingBottom: 20,
	},
	messageContainer: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "flex-end",
		maxWidth: "85%",
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
		padding: 12,
		borderRadius: 20,
	},
	userBubble: {
		backgroundColor: colors.primary, // Orange Milo
		borderBottomRightRadius: 4,
	},
	miloBubble: {
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderBottomLeftRadius: 4,
	},
	inputContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#F3F4F6",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F9FAFB",
		borderRadius: 24,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		maxHeight: 100,
		color: "#1F2937",
		marginRight: 8,
	},
	sendButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChatScreen;
