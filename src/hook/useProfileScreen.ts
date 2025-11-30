import { useState, useCallback } from 'react';
import { useUserStore } from '@store/user/user.store';
import { Alert } from 'react-native';

export const useProfileScreen = () => {
  const { user, userStats, updateUser, getFullName, getInitials, loading } = useUserStore();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);

  const handleUpdateProfile = useCallback(async (data: { prenom: string; nom: string }) => {
    setIsSubmitting(true);
    try {
      await updateUser(data);
      setEditModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil.");
    } finally {
      setIsSubmitting(false);
    }
  }, [updateUser]);

  return {
    user,
    userStats,
    loading,
    initials: getInitials(),
    fullName: getFullName(),
    isEditModalVisible,
    isSubmitting,
    toggleEditModal,
    handleUpdateProfile,
  };
};