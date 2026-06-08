import React from "react";
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@shared/theme/colors";
import { fonts } from "@shared/theme/typography";
import { useTranslation } from "react-i18next";

interface ChatInputProps {
	value: string;
	onChangeText: (text: string) => void;
	onSend: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	editable?: boolean;
	placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
	value,
	onChangeText,
	onSend,
	onFocus,
	onBlur,
	editable = true,
	placeholder,
}) => {
	const { t } = useTranslation();

	const handleSend = () => {
		onSend();
		Keyboard.dismiss();
	};

	return (
		<View style={styles.wrapper}>
			<LinearGradient
				colors={["#FFFFFF", "#F9FAFB"]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={[styles.gradient, !editable && styles.gradientDisabled]}
			>
				<TextInput
					style={styles.input}
					placeholder={placeholder ?? t("messages.chatInput.placeholder")}
					placeholderTextColor={colors.placeholder}
					value={value}
					onChangeText={onChangeText}
					onSubmitEditing={handleSend}
					onFocus={onFocus}
					onBlur={onBlur}
					editable={editable}
					returnKeyType="send"
					keyboardAppearance="light"
					multiline
				/>
				<TouchableOpacity
					style={[
						styles.sendButton,
						{
							backgroundColor:
								value.length > 0 && editable ? colors.primary : "#E5E7EB",
						},
					]}
					onPress={handleSend}
					disabled={value.length === 0 || !editable}
				>
					<Ionicons
						name="send"
						size={18}
						color={value.length > 0 && editable ? "#FFFFFF" : "#9CA3AF"}
					/>
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		paddingBottom: 8,
		paddingTop: 8,
		paddingHorizontal: 16,
		backgroundColor: colors.background,
		borderTopWidth: 1,
		borderTopColor: "#F3F4F6",
	},
	gradient: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 9999,
		paddingHorizontal: 16,
		paddingVertical: 8,
		minHeight: 48,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	gradientDisabled: {
		opacity: 0.6,
		backgroundColor: "#F3F4F6",
	},
	input: {
		flex: 1,
		color: colors.text.primary,
		fontFamily: fonts.qualy.regular,
		fontSize: 16,
		maxHeight: 100,
		backgroundColor: "transparent",
		marginRight: 8,
	},
	sendButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChatInput;
