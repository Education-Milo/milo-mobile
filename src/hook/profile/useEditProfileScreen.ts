import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@store/user/user.store';
import { ClassType } from '@store/user/user.model';
import { showMessage } from 'react-native-flash-message';
import i18n from '@i18n/index';

export const useEditProfile = () => {
  const navigation = useNavigation();

  const { user, updateUser, getMe, loading, addUserInterest, deleteUserInterest } = useUserStore();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    classe: '' as ClassType,
  });

  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        classe: user.classe || user.class_,
      });
      setInterests(user.Interests?.map(i => i.name) || []);
    }
  }, [user]);

  const handleChange = (key: keyof typeof formData, text: string) => {
    setFormData((prev) => ({ ...prev, [key]: text }));
  };

  const handleSave = async () => {
    try {
      await updateUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        classe: formData.classe,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
    try {
      const currentInterestNames = user?.Interests?.map(i => i.name) || [];
      const toAdd = interests.filter(name => !currentInterestNames.includes(name));
      const interestsToRemove = user?.Interests?.filter(i => !interests.includes(i.name)) || [];
      await Promise.all([
        ...toAdd.map(name => addUserInterest(name)),
        ...interestsToRemove.map(i => deleteUserInterest(i.id)),
      ]);
    } catch (error) {
      console.error("Erreur update interests:", error);
    } finally {
      await getMe(true);
      showMessage({
        message: i18n.t("success.editProfile.title"),
        description: i18n.t("success.editProfile.description"),
        type: "success",
      });
      navigation.goBack();
    }
  };

  return {
    formData,
    interests,
    loading,
    userAvatar: user?.avatarId,
    handleChange,
    setInterests,
    handleSave,
    goBack: navigation.goBack,
  };
};