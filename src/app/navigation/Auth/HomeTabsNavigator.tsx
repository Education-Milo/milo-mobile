import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	HomeTabsParamList,
	AuthScreenNames,
} from "@app/navigation/Auth/authNavigator.model";
import { useUserStore } from "@features/user/store/user.store";
import HomeScreen from "@features/home/screens/HomeScreen";
import LessonScreen from "@features/course/screens/LessonScreen";
import DuelScreen from "@features/duel/screens/DuelScreen";
import BottomNavBar from "@shared/components/BottomNavBar";
import SelectDocumentScreen from "@features/ocr/screens/SelectDocumentScreen";
import { View } from "react-native";
import MissionsScreen from "@features/mission/screens/MissionScreen";
import ProfilScreen from "@features/profile/screens/ProfileScreen";
import FriendsScreen from "@features/friend/screens/FriendsScreen";

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabsNavigator = () => {
	const { getMe } = useUserStore();

	useEffect(() => {
		getMe();
	}, []);

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: { display: "none" },
			}}
			tabBar={(props) => <BottomNavBar {...props} />}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ animation: "shift" }}
			/>
			<Tab.Screen name="Lessons" component={LessonScreen} />
			<Tab.Screen name="Scan" component={SelectDocumentScreen} />
			<Tab.Screen name="Duel" component={DuelScreen} />
			<Tab.Screen name="Profile" component={ProfilScreen} />
			<Tab.Screen name="Friends" component={FriendsScreen} />
			<Tab.Screen name="MissionScreen" component={MissionsScreen} />
			<Tab.Screen name="More" component={View} />
		</Tab.Navigator>
	);
};

export default HomeTabsNavigator;
