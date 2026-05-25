import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	HomeTabsParamList,
	AuthScreenNames,
} from "@navigation/Auth/authNavigator.model";
import { useUserStore } from "@store/user/user.store";
import HomeScreen from "@screens/HomeScreen";
import LessonScreen from "@screens/courses/LessonScreen";
import DuelScreen from "@screens/duels/DuelScreen";
import BottomNavBar from "@components/BottomNavBar";
import SelectDocumentScreen from "@screens/ocr/SelectDocumentScreen";
import { View } from "react-native";
import MissionsScreen from "@screens/MissionScreen";
import ProfilScreen from "@screens/profile/ProfileScreen";
import FriendsScreen from "@screens/FriendsScreen";

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
