import React, { useRef } from "react";
import {
	View,
	TextInput,
	Animated,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import Typography from "@components/Typography.component";
import TextFieldComponent from "@components/TextField.component";
import MainButtonComponent from "@components/MainButton.component";
import { colors } from "@theme/colors";
import type { RegisterFormData } from "@validations/register.validation.yup";
import { Ionicons } from "@expo/vector-icons";

interface FormErrors {
	email?: string;
	nom?: string;
	prenom?: string;
	username?: string;
	password?: string;
	role?: string;
	confirmPassword?: string;
}
const roles = [
	{ key: "Enfant", label: "Élève" },
	{ key: "Parent", label: "Parent" },
	{ key: "Professeur", label: "Professeur" },
];

const classes = [
	{ key: "6eme", label: "6ème" },
	{ key: "5eme", label: "5ème" },
	{ key: "4eme", label: "4ème" },
	{ key: "3eme", label: "3ème" },
];
interface RegisterFormProps {
	formData: RegisterFormData;
	errors: FormErrors;
	loading: boolean;
	isFieldFocused: boolean;
	onEmailChange: (text: string) => void;
	onPasswordChange: (text: string) => void;
	onNomChange: (text: string) => void;
	onPrenomChange: (text: string) => void;
	onConfirmPasswordChange: (text: string) => void;
	onUsernameChange: (text: string) => void;
	onRoleChange: (role: RegisterFormData["role"]) => void;
	onClasseChange: (classe: RegisterFormData["classe"]) => void;
	onSubmit: () => void;
	onFocus: () => void;
	onBlur: () => void;
	animations: {
		titleOpacity: Animated.Value;
		titleTranslateY: Animated.Value;
		emailOpacity: Animated.Value;
		emailTranslateY: Animated.Value;
		passwordOpacity: Animated.Value;
		passwordTranslateY: Animated.Value;
		confirmPasswordOpacity: Animated.Value;
		confirmPasswordTranslateY: Animated.Value;
		buttonOpacity: Animated.Value;
		buttonTranslateY: Animated.Value;
		buttonScale: Animated.Value;
		animateButtonPress: () => void;
	};
}

const RegisterForm: React.FC<RegisterFormProps> = ({
	formData,
	errors,
	loading,
	isFieldFocused,
	onEmailChange,
	onPasswordChange,
	onNomChange,
	onPrenomChange,
	onUsernameChange,
	onRoleChange,
	onClasseChange,
	onConfirmPasswordChange,
	onSubmit,
	onFocus,
	onBlur,
	animations,
}) => {
	const { t } = useTranslation();
	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);

	const handleButtonPress = () => {
		animations.animateButtonPress();
		onSubmit();
	};

	return (
		<View style={styles.container}>
			<Animated.View
				style={{
					opacity: animations.titleOpacity,
					transform: [{ translateY: animations.titleTranslateY }],
				}}
			>
				<Typography variant="h2" color={colors.text.title}>
					{t("register.title")}
				</Typography>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.emailOpacity,
					transform: [{ translateY: animations.emailTranslateY }],
				}}
			>
				<TextFieldComponent
					placeholder={t("register.LastName")}
					icon={
						<Ionicons
							name="person-outline"
							size={20}
							color={colors.IconColor}
						/>
					}
					type="text"
					returnKeyType="next"
					onSubmitEditing={() => passwordRef.current?.focus()}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="name"
					autoCapitalize="words"
					autoComplete="off"
					value={formData.last_name}
					onChangeText={onNomChange}
					error={errors.nom}
				/>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.emailOpacity,
					transform: [{ translateY: animations.emailTranslateY }],
				}}
			>
				<TextFieldComponent
					placeholder={t("register.FirstName")}
					icon={
						<Ionicons
							name="person-outline"
							size={20}
							color={colors.IconColor}
						/>
					}
					type="text"
					returnKeyType="next"
					onSubmitEditing={() => passwordRef.current?.focus()}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="name"
					autoCapitalize="words"
					autoComplete="off"
					value={formData.first_name}
					onChangeText={onPrenomChange}
					error={errors.prenom}
				/>
			</Animated.View>


						<Animated.View
				style={{
					opacity: animations.emailOpacity,
					transform: [{ translateY: animations.emailTranslateY }],
				}}
			>
				<TextFieldComponent
					placeholder={t("register.username")}
					icon={
						<Ionicons
							name="person-outline"
							size={20}
							color={colors.IconColor}
						/>
					}
					type="text"
					returnKeyType="next"
					onSubmitEditing={() => passwordRef.current?.focus()}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="name"
					autoCapitalize="words"
					autoComplete="off"
					value={formData.username}
					onChangeText={onUsernameChange}
					error={errors.username}
				/>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.emailOpacity,
					transform: [{ translateY: animations.emailTranslateY }],
				}}
			>
				<TextFieldComponent
					placeholder={t("register.email")}
					icon={
						<Ionicons name="mail-outline" size={20} color={colors.IconColor} />
					}
					type="email"
					returnKeyType="next"
					onSubmitEditing={() => passwordRef.current?.focus()}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="emailAddress"
					autoCapitalize="none"
					autoComplete="off"
					value={formData.email}
					onChangeText={onEmailChange}
					error={errors.email}
				/>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.passwordOpacity,
					transform: [{ translateY: animations.passwordTranslateY }],
				}}
			>
				<TextFieldComponent
					ref={passwordRef}
					placeholder={t("register.password")}
					icon={
						<Ionicons
							name="lock-closed-outline"
							size={20}
							color={colors.IconColor}
						/>
					}
					type="password"
					returnKeyType="next"
					onSubmitEditing={() => confirmPasswordRef.current?.focus()}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="oneTimeCode"
					autoComplete="off"
					autoCapitalize="none"
					value={formData.password}
					onChangeText={onPasswordChange}
					error={errors.password}
				/>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.confirmPasswordOpacity,
					transform: [{ translateY: animations.confirmPasswordTranslateY }],
				}}
			>
				<TextFieldComponent
					ref={confirmPasswordRef}
					placeholder={t("register.confirmPassword")}
					icon={
						<Ionicons
							name="lock-closed-outline"
							size={20}
							color={colors.IconColor}
						/>
					}
					type="password"
					returnKeyType="done"
					onSubmitEditing={handleButtonPress}
					onFocus={onFocus}
					onBlur={onBlur}
					importantForAutofill="no"
					textContentType="oneTimeCode"
					autoComplete="off"
					autoCapitalize="none"
					value={formData.confirmPassword}
					onChangeText={onConfirmPasswordChange}
					error={errors.confirmPassword}
				/>
			</Animated.View>

			<Animated.View
				style={{
					opacity: animations.emailOpacity,
					transform: [{ translateY: animations.emailTranslateY }],
				}}
			>
				<Typography
					variant="labelLarge"
					style={styles.roleTitle}
					color={colors.IconColor}
				>
					{t("register.selectRole")}
				</Typography>
				<View style={styles.roleContainer}>
					{roles.map((roleOption) => {
						const isBlocked = roleOption.key !== "Enfant";
						return (
							<TouchableOpacity
								key={roleOption.key}
								disabled={isBlocked || loading}
								style={[
									styles.roleButton,
									formData.role === roleOption.key && styles.roleButtonActive,
									isBlocked && { opacity: 0.4, backgroundColor: "#f0f0f0" },
								]}
								onPress={() => onRoleChange(roleOption.key as any)}
							>
								<Typography
									style={[
										styles.roleButtonText,
										formData.role === roleOption.key &&
											styles.roleButtonTextActive,
									]}
								>
									{roleOption.label}
									{isBlocked}
								</Typography>
							</TouchableOpacity>
						);
					})}
				</View>
				{errors.role && (
					<Typography variant="bodySmall" style={styles.errorText}>
						{errors.role}
					</Typography>
				)}
			</Animated.View>
			{formData.role === "Enfant" && (
				<Animated.View style={{ opacity: animations.emailOpacity }}>
					<Typography
						variant="labelLarge"
						style={styles.roleTitle}
						color={colors.IconColor}
					>
						{t("register.selectClasse")}
					</Typography>
					<View style={styles.roleContainer}>
						{classes.map((classeOption) => (
							<TouchableOpacity
								key={classeOption.key}
								style={[
									styles.roleButton,
									formData.classe === classeOption.key &&
										styles.roleButtonActive,
								]}
								onPress={() => onClasseChange(classeOption.key as any)}
							>
								<Typography
									style={[
										styles.roleButtonText,
										formData.classe === classeOption.key &&
											styles.roleButtonTextActive,
									]}
								>
									{classeOption.label}
								</Typography>
							</TouchableOpacity>
						))}
					</View>
				</Animated.View>
			)}

			{isFieldFocused && (
				<Animated.View
					style={[
						styles.buttonContainer,
						{
							opacity: animations.buttonOpacity,
							transform: [
								{ translateY: animations.buttonTranslateY },
								{ scale: animations.buttonScale },
							],
						},
					]}
				>
					<MainButtonComponent
						title={t("register.button")}
						onPress={handleButtonPress}
						loading={loading}
					/>
				</Animated.View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	buttonContainer: {
		marginTop: 20,
	},
	roleTitle: {
		marginBottom: 10,
		color: colors.text.title,
	},
	roleContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
	},
	roleButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 10,
		backgroundColor: "#FFF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#DDD",
		alignItems: "center",
	},
	roleButtonActive: {
		backgroundColor: "#FF8C00",
		borderColor: "#FF8C00",
	},
	roleButtonText: {
		color: "#11181C",
		fontSize: 14,
		fontWeight: "500",
	},
	roleButtonTextActive: {
		color: "#FFF",
		fontWeight: "bold",
	},
	errorText: {
		color: colors.error,
		marginTop: 5,
	},
});

export default RegisterForm;
