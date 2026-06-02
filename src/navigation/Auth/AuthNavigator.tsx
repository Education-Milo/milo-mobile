import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabsNavigator from "@navigation/Auth/HomeTabsNavigator";
import {
  AuthScreenNames,
  AuthStackParamList,
} from "@navigation/Auth/authNavigator.model";
import ExercicesScreen from "@screens/exercises/ExercicesScreen";
import GeneratedExerciseScreen from "@screens/exercises/GeneratedExerciseScreen";
import LessonScreen from "@screens/courses/LessonScreen";
import SelectDocumentScreen from "@screens/ocr/SelectDocumentScreen";
import CameraOrImportScreen from "@screens/ocr/CameraOrImportScreen";
import LessonChapterScreen from "@screens/courses/LessonChapterScreen";
import MissionsScreen from "@screens/MissionScreen";
import ChatScreen from "@screens/ChatScreen";
import EditProfileScreen from "@screens/profile/EditProfileScreen";
import SettingsScreen from "@screens/SettingsScreen";
import FriendsScreen from "@screens/FriendsScreen";
import { DuelProvider } from "@hooks/duel/DuelContext";

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
