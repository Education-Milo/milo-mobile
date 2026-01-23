import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@store/user/user.store';
import { ClassType } from '@store/user/user.model';

export const useEditProfile = () => {
  const navigation = useNavigation();

  const { user, updateUser, loading } = useUserStore();

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
      setInterests(user.interests || []);
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
        interests: interests,
        classe: formData.classe,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
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