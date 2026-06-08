import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabsNavigator from "@app/navigation/Auth/HomeTabsNavigator";
import {
  AuthScreenNames,
  AuthStackParamList,
} from "@app/navigation/Auth/authNavigator.model";
import ExercicesScreen from "@features/exercise/screens/ExercicesScreen";
import GeneratedExerciseScreen from "@features/exercise/screens/GeneratedExerciseScreen";
import GeneratedQCMScreen from "@features/exercise/screens/GeneratedQCMScreen";
import LessonScreen from "@features/course/screens/LessonScreen";
import SelectDocumentScreen from "@features/ocr/screens/SelectDocumentScreen";
import CameraOrImportScreen from "@features/ocr/screens/CameraOrImportScreen";
import LessonChapterScreen from "@features/course/screens/LessonChapterScreen";
import MissionsScreen from "@features/mission/screens/MissionScreen";
import ChatScreen from "@features/chat/screens/ChatScreen";
import EditProfileScreen from "@features/profile/screens/EditProfileScreen";
import SettingsScreen from "@features/settings/screens/SettingsScreen";
import FriendsScreen from "@features/friend/screens/FriendsScreen";
import { DuelProvider } from "@features/duel/hooks/DuelContext";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <DuelProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={AuthScreenNames.HomeTabs}
          component={HomeTabsNavigator}
        />
        <Stack.Screen name={AuthScreenNames.Lesson} component={LessonScreen} />
        <Stack.Screen
          name={AuthScreenNames.Scan}
          component={SelectDocumentScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.CameraOrImport}
          component={CameraOrImportScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.LessonChapter}
          component={LessonChapterScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.ExercicesScreen}
          component={ExercicesScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.GeneratedExerciseScreen}
          component={GeneratedExerciseScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.GeneratedQCMScreen}
          component={GeneratedQCMScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.MissionScreen}
          component={MissionsScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.ChatScreen}
          component={ChatScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.FriendsScreen}
          component={FriendsScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.EditProfileScreen}
          component={EditProfileScreen}
        />
        <Stack.Screen
          name={AuthScreenNames.Settings}
          component={SettingsScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </DuelProvider>
  );
};

export default AuthNavigator;
