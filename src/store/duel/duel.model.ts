// Structure d'une question reçue du serveur
export interface QuestionPayload {
    number: number;
    question: string;
    choices: string[];
    time_limit: number;
  }

  // Structure des résultats intermédiaires
  export interface RoundResultPayload {
    good_answer: number; // L'index de la bonne réponse
    responses: (number | null)[]; // Les réponses des deux joueurs [joueur0, joueur1]
    scores: Record<string, number>; // Les scores { "0": 1, "1": 0 }
  }

  // Structure de fin de partie
  export interface DuelEndPayload {
    scores: Record<string, number>;
    winner: number | null; // null si égalité, sinon index du gagnant (0 ou 1)
  }

  // Structure de connexion réussie
export interface JoinedPayload {
    room_id: string;
    player_idx: number; // 0 ou 1 (mon identifiant pour cette partie)
  }

  export type DuelChallengeStatus =
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'expired'
    | 'completed';

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
    id: number;
    challenger_id?: number;
    target_user_id?: number;
    winner_id?: number | null;
    scores?: Record<string, number>;
    status?: DuelChallengeStatus;
    room_id?: string;
    created_at?: string;
    ended_at?: string;
  }

  export interface DuelStats {
    total_duels?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    score?: number;
    rank?: number;
  }

  // Les différents états possibles de l'interface utilisateur
  export type DuelStatus =
    | 'idle'                // Rien ne se passe
    | 'searching'           // En attente d'un adversaire (WebSocket connecté)
    | 'playing_question'    // Une question est affichée, le joueur doit répondre
    | 'playing_waiting'     // Le joueur a répondu, il attend la fin du timer ou l'autre joueur
    | 'round_result'        // Affiche si on a gagné/perdu le point
    | 'finished';           // Partie terminée, affiche le vainqueur

  // Union de tous les messages possibles reçus via WebSocket
  export type WebSocketMessage =
    | { type: 'joined'; room_id: string; player_idx: number }
    | { type: 'question'; number: number; question: string; choices: string[]; time_limit: number }
    | { type: 'result'; good_answer: number; responses: (number | null)[]; scores: Record<string, number> }
    | { type: 'end'; scores: Record<string, number>; winner: number | null };
