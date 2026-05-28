export interface QuestionPayload {
  number: number;
  question: string;
  choices: string[];
  time_limit: number;
}

export interface JoinedPayload {
  room_id: string;
  player_idx: number;
}

export type DuelChallengeStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "expired"
  | "completed";

export interface DuelUserSummary {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  avatarId?: number;
}

export interface DuelChallenge {
  id: number;
  challenger_id?: number;
  target_user_id?: number;
  status: DuelChallengeStatus;
  room_id?: string;
  player_idx?: number;
  challenger?: DuelUserSummary;
  target_user?: DuelUserSummary;
  created_at?: string;
  updated_at?: string;
}

export interface DuelHistoryItem {
  duel_id: number;
  opponent_id: number;
  opponent_username: string;
  my_score: number;
  opponent_score: number;
  outcome: "win" | "loss" | "draw";
  played_at: string;
}

export interface DuelStats {
  total_games?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  winrate?: number;
  avg_score?: number;
  per_opponent?: DuelOpponentStats[];
}

export interface DuelOpponentStats {
  opponent_id: number;
  opponent_username: string;
  wins: number;
  draws: number;
  losses: number;
  winrate: number;
}

export type DuelScreen = "lobby" | "waiting" | "game" | "end";

export interface PendingChallenge {
  challenge_id: number;
  from_username: string;
  from_first_name?: string;
  from_last_name?: string;
  expires_in?: number;
}

export interface DuelLastResult {
  good_answer: number;
  my_answer: number | null;
  opponent_answer: number | null;
  scores: Record<string, number>;
}

export interface DuelEndData {
  scores: Record<string, number>;
  winner: number | null;
}

export interface DuelContextValue {
  screen: DuelScreen;
  pendingChallenge: PendingChallenge | null;
  currentQuestion: QuestionPayload | null;
  myIdx: number | null;
  lastResult: DuelLastResult | null;
  endData: DuelEndData | null;
  lobbyStatus: string;
  waitingMessage: string;
  answered: boolean;
  startMatchmaking: () => void;
  sendChallengeToUserId: (userId: number) => Promise<void>;
  acceptChallenge: (challengeId?: number) => Promise<void>;
  declineChallenge: (challengeId?: number) => Promise<void>;
  sendAnswer: (answerIdx: number) => void;
  goToLobby: () => void;
  setLobbyStatus: (msg: string) => void;
  decliningChallengeId?: number;
  isDecliningChallenge: boolean;
}
