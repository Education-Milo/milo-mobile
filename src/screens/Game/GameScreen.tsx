import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '../../components/Layout';
import { RootStackParamList } from '../../navigation/types';
import { View, Text } from 'react-native';
import styles from '../../constants/Colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface GameScreenProps {
  navigation: NavigationProp;
}

function GameScreen({ navigation }: GameScreenProps) {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Screen</Text>
        <Text style={styles.subtitle}>This is the game screen content.</Text>
      </View>
    </Layout>
  );
}

export default GameScreen;
