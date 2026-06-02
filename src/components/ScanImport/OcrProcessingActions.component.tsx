import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import { generateExercise, generateQCM } from "@api/ocr.api";
import { colors } from "@theme/colors";

interface OcrProcessingActionsProps {
  imageUri: string;
  fileName?: string;
  mimeType?: string;
  documentType: "cours" | "exercice";
}

const OcrProcessingActions = ({
  imageUri,
  fileName,
  mimeType,
  documentType,
}: OcrProcessingActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const imagePayload = {
    uri: imageUri,
    name: fileName,
    type: mimeType,
  };

  const handleGenerateQCM = async () => {
    setIsLoading(true);
    try {
      const data = await generateQCM(imagePayload);
      console.log("QCM généré:", data);
    } catch (error) {
      console.error("Erreur génération QCM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateExercise = async () => {
    setIsLoading(true);
    try {
      const data = await generateExercise(imagePayload);
      console.log("Exercice généré:", data);
    } catch (error) {
      console.error("Erreur génération exercice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {documentType === "cours" ? (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleGenerateQCM}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={colors.white}
              />
              <TypographyComponent variant="button" color={colors.white}>
                Générer un QCM
              </TypographyComponent>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleGenerateExercise}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Ionicons name="repeat-outline" size={22} color={colors.white} />
              <TypographyComponent variant="button" color={colors.white}>
                Générer un exercice similaire
              </TypographyComponent>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
});

export default OcrProcessingActions;
