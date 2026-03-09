import { useState } from 'react';
export interface Player {
  id: string;
  name: string;
  avatar: any;
  score: number;
  rank: number;
  isOnline?: boolean;
}

const RANKING_GLOBAL: Player[] = [
  { id: '1', name: 'Emma W.', avatar: require('@assets/images/student_1.png'), score: 2450, rank: 1 },
  { id: '2', name: 'Lucas P.', avatar: require('@assets/images/student_2.png'), score: 2380, rank: 2 },
  { id: '3', name: 'Vous', avatar: require('@assets/images/mascot.png'), score: 2100, rank: 3 },
  { id: '4', name: 'Sofia M.', avatar: require('@assets/images/student_3.png'), score: 1950, rank: 4 },
  { id: '5', name: 'Thomas R.', avatar: require('@assets/images/student_4.png'), score: 1820, rank: 5 },
];

const RANKING_FRIENDS: Player[] = [
  { id: '3', name: 'Vous', avatar: require('@assets/images/mascot.png'), score: 2100, rank: 1 },
  { id: '6', name: 'Chloé L.', avatar: require('@assets/images/student_5.png'), score: 1600, rank: 2 },
  { id: '7', name: 'Hugo B.', avatar: require('@assets/images/student_6.png'), score: 1450, rank: 3 },
];

const ONLINE_FRIENDS: Player[] = [
  { id: '6', name: 'Chloé L.', avatar: require('@assets/images/student_5.png'), score: 1600, rank: 2, isOnline: true },
  { id: '7', name: 'Hugo B.', avatar: require('@assets/images/student_6.png'), score: 1450, rank: 3, isOnline: true },
  { id: '2', name: 'Lucas P.', avatar: require('@assets/images/student_2.png'), score: 2380, rank: 1, isOnline: true },
];

// --- Hook ---

export const useGameScreen = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [modalVisible, setModalVisible] = useState(false);

  const currentData = activeTab === 'global' ? RANKING_GLOBAL : RANKING_FRIENDS;

  const handleRandomMatch = () => {
    console.log("Recherche d'un adversaire aléatoire...");
    // Logique de matchmaking ici
  };

  const handleChallengeFriend = (friend: Player) => {
    setModalVisible(false);
    console.log(`Défi envoyé à ${friend.name}`);
    // Navigation vers l'écran de jeu ou envoi de notif
  };

  const openChallengeModal = () => setModalVisible(true);
  const closeChallengeModal = () => setModalVisible(false);

  return {
    activeTab,
    setActiveTab,
    modalVisible,
    currentData,
    onlineFriends: ONLINE_FRIENDS,
    handleRandomMatch,
    handleChallengeFriend,
    openChallengeModal,
    closeChallengeModal,
  };
};
