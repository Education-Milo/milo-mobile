import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from '../../constants/Colors';
import Layout from '../../components/Layout';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SelectDocumentScreenProps {
  navigation: NavigationProp;
}

const documentTypes = [
  {
    id: 'cours',
    title: 'Cours',
    icon: '📚',
    description: 'Scanner un cours ou des notes',
  },
  {
    id: 'exercice',
    title: 'Exercice',
    icon: '✏️',
    description: 'Scanner un exercice ou un devoir',
  },
  {
    id: 'bulletin',
    title: 'Bulletin',
    icon: '📊',
    description: 'Scanner un bulletin de notes',
  },
  {
    id: 'emploi',
    title: 'Planning',
    icon: '📅',
    description: 'Scanner un emploi du temps',
  },
];

function SelectDocumentScreen({ navigation }: SelectDocumentScreenProps) {
  const handleDocumentSelect = (type: string) => {
    // Ici, vous pouvez ajouter la logique pour ouvrir la caméra
    // Par exemple : navigation.navigate('Camera', { documentType: type });
    //Propose si on veut importer une image ou prendre une photo
    navigation.navigate('CameraOrImport', { documentType: type });
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginBottom: 30 }]}>
          Scanner un document
        </Text>
        <Text style={[styles.subtitle, { marginBottom: 20 }]}>
          Sélectionnez le type de document
        </Text>
        <View style={localStyles.gridContainer}>
          {documentTypes.map(doc => (
            <TouchableOpacity
              key={doc.id}
              style={localStyles.card}
              onPress={() => handleDocumentSelect(doc.id)}
            >
              <Text style={localStyles.icon}>{doc.icon}</Text>
              <Text style={localStyles.cardTitle}>{doc.title}</Text>
              <Text style={localStyles.cardDescription}>{doc.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Layout>
  );
}

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SelectDocumentScreen;
