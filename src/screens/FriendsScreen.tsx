import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  TextInput,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  ArrowLeft, 
  Search, 
  UserPlus, 
  Users, 
  Bell, 
  Trash2, 
  Check, 
  X, 
  MessageCircle 
} from 'lucide-react-native';

// Imports internes
import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

// Activer LayoutAnimation pour Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Types & Mock Data ---

interface Friend {
  id: string;
  name: string;
  avatar: any;
  username: string;
  isOnline: boolean;
  level: number;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: any;
  date: string;
}

const INITIAL_FRIENDS: Friend[] = [
  { id: '1', name: 'Emma Watson', username: '@emma_w', avatar: require('@assets/images/student_1.png'), isOnline: true, level: 12 },
  { id: '2', name: 'Lucas Pierre', username: '@lucas_p', avatar: require('@assets/images/student_2.png'), isOnline: true, level: 8 },
  { id: '3', name: 'Sofia Martin', username: '@sofia_m', avatar: require('@assets/images/student_3.png'), isOnline: false, level: 15 },
  { id: '4', name: 'Thomas Roux', username: '@tom_rx', avatar: require('@assets/images/student_4.png'), isOnline: false, level: 5 },
];

const REQUESTS: FriendRequest[] = [
  { id: '5', name: 'Chloé Leroy', avatar: require('@assets/images/student_5.png'), date: 'Il y a 2h' },
  { id: '6', name: 'Hugo Bernard', avatar: require('@assets/images/student_6.png'), date: 'Hier' },
];

// --- Composant Principal ---

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'list' | 'requests' | 'add'>('list');
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [requests, setRequests] = useState<FriendRequest[]>(REQUESTS);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Gestionnaires d'actions ---

  const handleDeleteFriend = (friendId: string, friendName: string) => {
    Alert.alert(
      "Supprimer un ami",
      `Veux-tu vraiment retirer ${friendName} de ta liste d'amis ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setFriends(prev => prev.filter(f => f.id !== friendId));
          }
        }
      ]
    );
  };

  const handleAcceptRequest = (request: FriendRequest) => {
    // Ajouter à la liste d'amis et retirer des demandes
    const newFriend: Friend = {
      id: request.id,
      name: request.name,
      username: `@${request.name.toLowerCase().replace(' ', '_')}`,
      avatar: request.avatar,
      isOnline: true, // On suppose qu'il est en ligne juste après l'acceptation
      level: 1
    };
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFriends([newFriend, ...friends]);
    setRequests(prev => prev.filter(r => r.id !== request.id));
  };

  const handleRejectRequest = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  // --- Composants de rendu (Sub-renderers) ---

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <View style={styles.cardItem}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={[styles.statusDot, { backgroundColor: item.isOnline ? colors.success : colors.text.tertiary }]} />
      </View>
      
      <View style={styles.infoContainer}>
        <TypographyComponent variant="h6">{item.name}</TypographyComponent>
        <View style={styles.subInfoRow}>
          <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
            Lvl {item.level} • {item.isOnline ? 'En ligne' : 'Hors ligne'}
          </TypographyComponent>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={[styles.actionButtonIcon, { backgroundColor: '#FFF0F0' }]}
          onPress={() => handleDeleteFriend(item.id, item.name)}
        >
          <Trash2 size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRequestItem = ({ item }: { item: FriendRequest }) => (
    <View style={styles.cardItem}>
      <Image source={item.avatar} style={styles.avatar} />
      
      <View style={styles.infoContainer}>
        <TypographyComponent variant="h6">{item.name}</TypographyComponent>
        <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
          Demande reçue {item.date}
        </TypographyComponent>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={[styles.actionButtonCircle, { backgroundColor: '#E8F5E9' }]}
          onPress={() => handleAcceptRequest(item)}
        >
          <Check size={20} color={colors.success} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButtonCircle, { backgroundColor: '#FFEBEE' }]}
          onPress={() => handleRejectRequest(item.id)}
        >
          <X size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity> */}
          <TypographyComponent variant="h3">Social</TypographyComponent>
          <View style={{ width: 24 }} /> 
        </View>

        {/* Tabs Navigation */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'list' && styles.activeTab]} 
            onPress={() => setActiveTab('list')}
          >
            <Users size={18} color={activeTab === 'list' ? colors.white : colors.text.secondary} />
            <TypographyComponent 
              variant="label" 
              style={{ color: activeTab === 'list' ? colors.white : colors.text.secondary, marginLeft: 8 }}
            >
              Mes Amis
            </TypographyComponent>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'requests' && styles.activeTab]} 
            onPress={() => setActiveTab('requests')}
          >
            <View>
              <Bell size={18} color={activeTab === 'requests' ? colors.white : colors.text.secondary} />
              {requests.length > 0 && <View style={styles.badge} />}
            </View>
            <TypographyComponent 
              variant="label" 
              style={{ color: activeTab === 'requests' ? colors.white : colors.text.secondary, marginLeft: 8 }}
            >
              Demandes
            </TypographyComponent>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'add' && styles.activeTab]} 
            onPress={() => setActiveTab('add')}
          >
            <UserPlus size={18} color={activeTab === 'add' ? colors.white : colors.text.secondary} />
            <TypographyComponent 
              variant="label" 
              style={{ color: activeTab === 'add' ? colors.white : colors.text.secondary, marginLeft: 8 }}
            >
              Ajouter
            </TypographyComponent>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          
          {/* 1. LISTE D'AMIS */}
          {activeTab === 'list' && (
            <FlatList
              data={friends.sort((a, b) => (a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1))}
              keyExtractor={(item) => item.id}
              renderItem={renderFriendItem}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Users size={48} color={colors.border.dark} />
                  <TypographyComponent variant="body" color={colors.text.secondary} style={{marginTop: 16}}>
                    Tu n'as pas encore d'amis. Ajoutes-en !
                  </TypographyComponent>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          {/* 2. DEMANDES D'AMIS */}
          {activeTab === 'requests' && (
            <FlatList
              data={requests}
              keyExtractor={(item) => item.id}
              renderItem={renderRequestItem}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Check size={48} color={colors.border.dark} />
                  <TypographyComponent variant="body" color={colors.text.secondary} style={{marginTop: 16}}>
                    Aucune demande en attente.
                  </TypographyComponent>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          {/* 3. AJOUTER UN AMI */}
          {activeTab === 'add' && (
            <View style={{ flex: 1 }}>
              <View style={styles.searchContainer}>
                <Search size={20} color={colors.text.tertiary} style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Chercher par pseudo, email..."
                  placeholderTextColor={colors.text.tertiary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <View style={styles.addContent}>
                 <TypographyComponent variant="h6" style={{ marginBottom: 16 }}>Suggestions</TypographyComponent>
                 {/* Mock suggestions - réutilisation de la vue request pour l'exemple */}
                 <View style={styles.cardItem}>
                    <Image source={require('@assets/images/student_7.png')} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                      <TypographyComponent variant="h6">Léo Dubois</TypographyComponent>
                      <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>Vous avez 3 amis en commun</TypographyComponent>
                    </View>
                    <TouchableOpacity style={[styles.actionButtonCircle, { backgroundColor: colors.primary }]}>
                      <UserPlus size={20} color={colors.white} />
                    </TouchableOpacity>
                 </View>
              </View>
            </View>
          )}

        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    // flexDirection: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    // Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  // Content
  contentContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  // Cards (Friends & Requests)
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.white,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  subInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Actions
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search & Add
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'Qualy-neue-regular',
  },
  addContent: {
    flex: 1,
  },
});

export default FriendsScreen;