import React from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	TextInputFocusEventData,
} from "react-native";
import TypographyComponent from "@components/Typography.component";
import useSelectDocumentScreen from "@hooks/useSelectDocumentScreen";

const SelectDocumentScreen = () => {
	const { documentTypes, handleDocumentSelect } = useSelectDocumentScreen();

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<TypographyComponent
				style={{ marginBottom: 30, textAlign: "center" }}
				variant="h4"
			>
				Scanner un document
			</TypographyComponent>
			<TypographyComponent
				style={{ marginBottom: 20, textAlign: "center" }}
				variant="body"
			>
				Sélectionnez le type de document
			</TypographyComponent>
        <View style={localStyles.gridContainer}>
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[
                localStyles.card]}
              onPress={() => handleDocumentSelect(doc.id)}
            >
						<Text style={localStyles.icon}>{doc.icon}</Text>
						<TypographyComponent variant="h6">{doc.title}</TypographyComponent>
						<TypographyComponent
							variant="bodySmall"
							style={{ textAlign: "center" }}
						>
							{doc.description}
						</TypographyComponent>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    padding: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
	icon: {
		fontSize: 40,
		marginBottom: 10,
	},
});

export default SelectDocumentScreen;
