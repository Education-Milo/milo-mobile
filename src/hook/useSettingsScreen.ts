import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "@store/auth/auth.store";
import { useUserStore } from "@store/user/user.store";
import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";

type SettingsNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const TERMS_URL = "https://www.milo-education.fr/";

export const useSettingsScreen = () => {
	const navigation = useNavigation<SettingsNavigationProp>();
	const { logout } = useAuthStore();
	const user = useUserStore((state) => state.user);

	const handleDone = () => {
		navigation.goBack();
	};

	const handleLogout = async () => {
		await logout();
	};

	const handleTermsPress = () => {
		Linking.openURL(TERMS_URL);
	};

	return {
		user,
		handleDone,
		handleLogout,
		handleTermsPress,
	};
};
