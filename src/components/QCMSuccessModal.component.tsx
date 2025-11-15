import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { colors } from '@theme/colors';

interface QCMSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  streak?: number;
}

const QCMSuccessModal: React.FC<QCMSuccessModalProps> = ({ isVisible, onClose, streak = 0 }) => {
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

  // Messages d'encouragement aléatoires
  const encouragements = [
    "Super !",
    "Excellent !",
    "Bien joué !",
    "Parfait !",
    "Bravo !",
    "Génial !",
  ];
  
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <BottomSheetComponent
      ref={bottomSheetRef}
      snapPoints={['35%']}
      onDismiss={onClose}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, styles.successCircle]}>
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.headerText, styles.successText]}>{randomEncouragement}</Text>
          <Text style={styles.subText}>C'est la bonne réponse !</Text>
          
          {streak > 2 && (
            <View style={styles.streakContainer}>
              <Ionicons name="flame" size={20} color="#FF6B6B" />
              <Text style={styles.streakText}>{streak} bonnes réponses d'affilée !</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.successButton]} 
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    backgroundColor: '#E8F5E9',
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  successText: {
    color: '#4CAF50',
  },
  subText: {
    fontSize: 16,
    color: '#666666',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  successButton: {
    backgroundColor: '#4CAF50',
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

export default QCMSuccessModal;