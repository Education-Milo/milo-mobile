import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TypographyComponent from "@components/Typography.component";
import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";
import { colors } from "@theme/colors";

type GeneratedExerciseRouteProp = RouteProp<
  AuthStackParamList,
  "GeneratedExerciseScreen"
>;

const splitStatement = (statement: string) =>
  statement
    .split(/\n{2,}|\r\n{2,}|\n(?=\d+\s*(?:°\)|º|°|[.)-]))/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const renderParagraph = (paragraph: string, index: number) => {
  const questionMatch = paragraph.match(/^(\d+\s*(?:°\)|\)°|º|[°.)-]))/);

  if (!questionMatch) {
    return (
      <Text key={`${paragraph}-${index}`} style={styles.paragraph}>
        {paragraph}
      </Text>
    );
  }

  const questionNumber = questionMatch[0];
  const rest = paragraph.slice(questionNumber.length);

  return (
    <Text key={`${paragraph}-${index}`} style={styles.paragraph}>
      <Text style={styles.questionNumber}>{questionNumber}</Text>
      {rest}
    </Text>
  );
};

const GeneratedExerciseScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<GeneratedExerciseRouteProp>();
  const { statement, correction } = route.params;
  const [userAnswer, setUserAnswer] = useState("");
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const paragraphs = useMemo(() => splitStatement(statement), [statement]);

  const handleSubmitAnswer = () => {
    setHasSubmittedAnswer(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <TypographyComponent variant="h5" color={colors.text.primary}>
          Exercice généré
        </TypographyComponent>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.statementCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="create-outline" size={22} color={colors.primary} />
            <TypographyComponent variant="h6" color={colors.text.primary}>
              Nouvel énoncé
            </TypographyComponent>
          </View>
          <View style={styles.statementBody}>
            {paragraphs.map(renderParagraph)}
          </View>
        </View>

        <View style={styles.answerCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="pencil-outline" size={22} color={colors.primary} />
            <TypographyComponent variant="h6" color={colors.text.primary}>
              Ta réponse
            </TypographyComponent>
          </View>

          {!hasSubmittedAnswer ? (
            <>
              <TextInput
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="Saisis ta proposition de réponse ici..."
                placeholderTextColor={colors.text.tertiary}
                style={styles.answerInput}
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  userAnswer.trim().length === 0 && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitAnswer}
                disabled={userAnswer.trim().length === 0}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color={colors.white}
                />
                <TypographyComponent variant="button" color={colors.white}>
                  Vérifier ma réponse
                </TypographyComponent>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.submittedAnswer}>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.secondary}
              >
                Réponse proposée
              </TypographyComponent>
              <TypographyComponent variant="body" color={colors.text.primary}>
                {userAnswer}
              </TypographyComponent>
            </View>
          )}
        </View>

        {hasSubmittedAnswer && (
          <View style={styles.correctionCard}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="bulb-outline"
                size={22}
                color={colors.secondary}
              />
              <TypographyComponent variant="h6" color={colors.text.primary}>
                Correction détaillée
              </TypographyComponent>
            </View>
            <View style={styles.correctionBody}>
              {splitStatement(
                correction?.trim()
                  ? correction
                  : "La correction détaillée n'est pas encore disponible pour cet exercice.",
              ).map(renderParagraph)}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  statementCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statementBody: {
    gap: 10,
  },
  paragraph: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 6,
  },
  questionNumber: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: 16,
    lineHeight: 25,
  },
  answerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  answerInput: {
    minHeight: 130,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.medium,
    backgroundColor: "#FFFDF9",
    padding: 14,
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButtonDisabled: {
    opacity: 0.55,
  },
  submittedAnswer: {
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    padding: 14,
    gap: 6,
  },
  correctionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FDE68A",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  correctionBody: {
    gap: 8,
  },
});

export default GeneratedExerciseScreen;
