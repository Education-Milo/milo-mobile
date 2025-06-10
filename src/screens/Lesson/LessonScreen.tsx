import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { View, Text } from 'react-native';
import styles from '@constants/Colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonScreenProps {
  navigation: NavigationProp;
}

function LessonScreen({ navigation }: LessonScreenProps) {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Lesson Screen</Text>
        <Text style={styles.subtitle}>This is the lesson screen content.</Text>
      </View>
    </Layout>
  );
}
export default LessonScreen;
