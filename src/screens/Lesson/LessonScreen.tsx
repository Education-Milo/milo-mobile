import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { View, ScrollView, StyleSheet } from 'react-native';
import Card from '@components/Card.component';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonScreenProps {
  navigation: NavigationProp;
}

function LessonScreen({ navigation }: LessonScreenProps) {
  const matieres = [
    { nom: 'Mathématiques' },
    { nom: 'Français' },
    { nom: 'SVT' },
    { nom: 'Histoire-Géographie' },
    { nom: 'Physique-Chimie' },
    { nom: 'Anglais' },
    { nom: 'Enseignement moral et civique'},
    { nom: 'Éducation musicale'},
    { nom: 'Arts plastiques' },
    { nom: 'Technologie' },
  ];

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <TypographyComponent variant="h4" style={{ marginBottom: 20 }} color={colors.text.title}>
          Sélectionnez une matière
        </TypographyComponent>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {matieres.map((matiere, idx) => (
            <Card
              key={matiere.nom}
              onPress={() => navigation.navigate('LessonChapter', { matiere: matiere.nom })}
              style={{ marginBottom: 12 }}
            >
              <TypographyComponent variant="body">{matiere.nom}</TypographyComponent>
            </Card>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
export default LessonScreen;
