import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Layout from '@components/Layout';
import { useGameScreen } from '@hooks/useGameScreen';
import GameScreenHeader from '@components/game/gameScreenHeader.component';
import GameScreenFooter from '@components/game/gameScreenFooter.component';

const GameScreen = () => {
  const {
    activeTab,
    setActiveTab,
    modalVisible,
    currentData,
    onlineFriends,
    handleRandomMatch,
    handleChallengeFriend,
    openChallengeModal,
    closeChallengeModal,
  } = useGameScreen();

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <GameScreenHeader
            onRandomMatch={handleRandomMatch}
            onChallengeModal={openChallengeModal}
          />
          <GameScreenFooter
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentData={currentData}
            modalVisible={modalVisible}
            onlineFriends={onlineFriends}
            onCloseModal={closeChallengeModal}
            onChallengeFriend={handleChallengeFriend}
          />
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 32,
  },
});

export default GameScreen;