import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { colors } from '@theme/colors';

interface QCMErrorModalProps {
  isVisible: boolean;
  correctAnswer: string;
  onClose: () => void;
}

const QCMErrorModal: React.FC<QCMErrorModalProps> = ({ isVisible, correctAnswer, onClose }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const handleClose = () => {
    bottomSheetRef.current?.dismiss();
    onClose();
  };

  return (
    <BottomSheetComponent
      ref={bottomSheetRef}
      snapPoints={['55%']}
      onDismiss={onClose}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, styles.errorCircle]}>
            <Ionicons name="close-circle" size={48} color="#FF6B6B" />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.headerText, styles.errorText]}>Oups !</Text>
          <Text style={styles.subText}>Ce n'est pas la bonne réponse</Text>
          <View style={styles.answerContainer}>
            <Ionicons name="bulb" size={18} color="#4CAF50" />
            <Text style={styles.answerLabel}>La bonne réponse :</Text>
          </View>
          <Text style={styles.answerText}>{correctAnswer}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.errorButton]}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Continuer</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.buttonIcon} />
      </TouchableOpacity>
    </BottomSheetComponent>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 12,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCircle: {
    backgroundColor: '#FFE8E8',
  },
  textContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorText: {
    color: '#FF6B6B',
  },
  subText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerLabel: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 6,
  },
  answerText: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  errorButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default QCMErrorModal;