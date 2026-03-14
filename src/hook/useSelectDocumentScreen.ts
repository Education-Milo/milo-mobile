import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";

type SelectDocumentScreenNavigationProps =
	NativeStackNavigationProp<AuthStackParamList>;

export type DocumentType = {
	id: string;
	title: string;
	icon: string;
	description: string;
};

const DOCUMENT_TYPES: DocumentType[] = [
	{
		id: "cours",
		title: "Cours",
		icon: "📚",
		description: "Scanner un cours ou des notes",
	},
	{
		id: "exercice",
		title: "Exercice",
		icon: "✏️",
		description: "Scanner un exercice ou un devoir",
	},
	{
		id: "bulletin",
		title: "Bulletin",
		icon: "📊",
		description: "Scanner un bulletin de notes",
	},
];

const useSelectDocumentScreen = () => {
	const navigation = useNavigation<SelectDocumentScreenNavigationProps>();
	const handleDocumentSelect = useCallback(
		(type: string) => {
			navigation.navigate("CameraOrImport", { documentType: type });
		},
		[navigation]
	);

	return {
		documentTypes: DOCUMENT_TYPES,
		handleDocumentSelect,
	};
};

export default useSelectDocumentScreen;

