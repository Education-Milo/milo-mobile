import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme/colors';

type Props = {
  disabled?: boolean;
  onBack: () => void;
};

const ScanOrImportHeader = ({ disabled, onBack }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        disabled={disabled}
      >
        <Ionicons name='arrow-back' size={24} color={colors.placeholder} />
      </TouchableOpacity>
      <Image
        source={require('@assets/images/logo_sans_fond.png')}
        style={styles.smallLogo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.background,
    position: 'relative',
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  smallLogo: {
    width: 70,
    height: 35,
  },
});

export default ScanOrImportHeader;
