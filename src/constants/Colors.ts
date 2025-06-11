/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // Styles pour la page de connexion
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // minHeight: '100%',
  },
  logo: {
    width: 100,
    height: 140,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF8C00',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#11181C',
    height: 40,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPassword: {
    color: '#FF8C00',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
    marginRight: 5,
  },
  signupLink: {
    color: '#FF8C00',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },

  // Styles pour la page de réinitialisation du mot de passe
  resetPasswordContainer: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resetPasswordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF8C00',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  successIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },

  // Styles pour la page Register
  registerContainer: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  registerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#11181C',
    fontSize: 16,
  },
  registerHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  headerPlaceholder: {
    width: 34,
  },
  registerScrollView: {
    flex: 1,
  },
  registerScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  registerInputContainer: {
    marginBottom: 15,
  },
  logoRegisterHeader: {
    width: 100,
    height: 60,
  },

  roleLabel: {
    marginBottom: 10,
    fontWeight: '500',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  roleButtonText: {
    color: '#11181C',
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  termsLink: {
    color: '#FF8C00',
    textDecorationLine: 'underline',
  },
  registerButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#FFF8F1',
  },
  registerButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles pour la NavBar - À ajouter dans Colors.ts

  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemCenter: {
    flex: 0,
    marginHorizontal: 10,
  },
  navItemActive: {},
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  navItemText: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 4,
    fontWeight: '500',
  },
  navItemTextActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },

  // Styles pour la page d'accueil
  homeContainer: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 35,
    backgroundColor: '#FFF8F1',
  },
  smallLogo: {
    width: 70,
    height: 35,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  pointsText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  notificationBadge: {
    backgroundColor: '#FF4500',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#DDD',
  },
  scrollView: {
    flex: 1,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#FF8C00',
  },
  streakIconContainer: {
    marginRight: 15,
  },
  fireIcon: {
    fontSize: 24,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  streakDays: {
    fontSize: 14,
    color: '#FF8C00',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
  },
  activeTab: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FF8C00',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  courseSection: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  importButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  importButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFECE0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  suggestionContent: {
    flex: 3,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  revisionButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  revisionButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  foxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foxEmoji: {
    fontSize: 40,
  },
  mascotteImage: {
    width: 80,
    height: 80,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  courseCards: {
    flexDirection: 'column',
    gap: 15,
  },
  courseCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  courseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseIcon: {
    fontSize: 20,
  },
  courseSubject: {
    fontSize: 12,
    color: '#FF8C00',
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  importSection: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  importSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  largeImportButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  largeImportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  importDescription: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },

  // Styles pour la caméra
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraControls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    padding: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  captureButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    height: 70,
    width: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 50,
  },

  // Styles pour la page de profil
  profilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
  },

  leagueBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  leagueItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  leagueItemActive: {
    borderWidth: 5,
    borderColor: '#FF8C00',
  },
  leagueItemContent: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 100,
    resizeMode: 'contain',
  },
  leagueIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  leagueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    paddingTop: 5,
  },
});

const leaderboardStyles = {
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  leaderboardLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  leaderboardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardNotificationBadge: {
    backgroundColor: '#FF6B00',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leaderboardScrollView: {
    flex: 1,
  },
  leaderboardCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leagueBannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  leagueIcon: {
    width: 60,
    height: 70,
  },
  leagueBannerTextContainer: {
    flex: 1,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  leaderboardSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  timeRemaining: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  timeRemainingText: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: '600',
  },
  leaderboardTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  leaderboardTab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  leaderboardTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  leaderboardTabText: {
    fontSize: 16,
    color: '#666666',
  },
  leaderboardTabTextActive: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  leaderboardList: {
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leaderboardItemUser: {
    backgroundColor: '#FFF9F5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  leaderboardRank: {
    width: 30,
    alignItems: 'center',
  },
  leaderboardRankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  leaderboardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  leaderboardNameUser: {
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  leaderboardPoints: {
    fontSize: 14,
    color: '#666666',
  },
  topThreeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  topThreeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leagueProgressContainer: {
    marginBottom: 16,
  },
  leagueProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  leagueProgressBar: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  leagueProgressItem: {
    flex: 1,
    height: '100%',
    opacity: 0.3,
  },
  leagueProgressItemActive: {
    opacity: 1,
  },
  leagueProgressItemCurrent: {
    height: 20,
    marginTop: -4,
    borderRadius: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueProgressIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  leagueLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leagueLabelStart: {
    fontSize: 12,
    color: '#666666',
  },
  leagueLabelEnd: {
    fontSize: 12,
    color: '#666666',
  },
  leagueRules: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  leagueRulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  leagueRulesText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
    marginHorizontal: 15,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
};

export default {
  ...styles,
  ...leaderboardStyles,
};
