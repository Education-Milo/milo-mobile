import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@store/user/user.store';
import { ClassType } from '@store/user/user.model';

export const useEditProfile = () => {
  const navigation = useNavigation();

  const { user, updateUser, loading } = useUserStore();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
  });

  const [interests, setInterests] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassType>('6ème');

  useEffect(() => {
    if (user) {
      setFormData({
        prenom: user.prenom || '',
        nom: user.nom || '',
        email: user.email || '',
      });
      setInterests(user.interests || []);
      setSelectedClass(user.classe || '6ème');
    }
  }, [user]);

  const handleChange = (key: keyof typeof formData, text: string) => {
    setFormData((prev) => ({ ...prev, [key]: text }));
  };

  const handleSave = async () => {
    try {
      await updateUser({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        interests: interests,
        classe: selectedClass,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return {
    formData,
    interests,
    selectedClass,
    loading,
    userAvatar: user?.avatarId,
    handleChange,
    setInterests,
    setSelectedClass,
    handleSave,
    goBack: navigation.goBack,
  };
};