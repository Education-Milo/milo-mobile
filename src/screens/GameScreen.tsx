import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
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
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default GameScreen;