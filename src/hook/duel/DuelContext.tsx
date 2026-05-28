import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useAuthStore } from "@store/auth/auth.store";
import type {
	DuelChallenge,
	DuelContextValue,
	DuelEndData,
	DuelLastResult,
	DuelScreen,
	JoinedPayload,
	PendingChallenge,
	QuestionPayload,
} from "@store/duel/duel.model";
import {
	useAcceptDuel,
	useDeclineDuel,
	usePendingDuels,
	useRequestDuel,
} from "@queries/duel/duel.queries";
import { useDuelWebSocket } from "@hooks/duel/useDuelWebSocket";

// ── Context ───────────────────────────────────────────────────────────────────

const DuelContext = createContext<DuelContextValue | null>(null);

export const useDuel = () => {
	const ctx = useContext(DuelContext);
	if (!ctx) throw new Error("useDuel must be used within DuelProvider");
	return ctx;
};

// ── Provider ──────────────────────────────────────────────────────────────────

export const DuelProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const requestDuelMutation = useRequestDuel();
	const acceptDuelMutation = useAcceptDuel();
	const declineDuelMutation = useDeclineDuel();
	const { data: pendingDuels = [] } = usePendingDuels();

	const [screen, setScreen] = useState<DuelScreen>("lobby");
	const [pendingChallenge, setPendingChallenge] =
		useState<PendingChallenge | null>(null);
	const [currentQuestion, setCurrentQuestion] =
		useState<QuestionPayload | null>(null);
	const [myIdx, setMyIdx] = useState<number | null>(null);
	const [lastResult, setLastResult] = useState<DuelLastResult | null>(null);
	const [endData, setEndData] = useState<DuelEndData | null>(null);
	const [lobbyStatus, setLobbyStatus] = useState("");
	const [waitingMessage, setWaitingMessage] = useState(
		"En attente d'un adversaire...",
	);
	const [answered, setAnswered] = useState(false);

	const myAnswerRef = useRef<number | null>(null);
	const myIdxRef = useRef<number | null>(null);
	const currentQuestionRef = useRef<QuestionPayload | null>(null);
	const answeredRef = useRef(false);
	const disconnectDuelRef = useRef<() => void>(() => {});
	const handledChallengeIdsRef = useRef<Set<number>>(new Set());
	const lobbyStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);

	const clearLobbyStatusTimer = useCallback(() => {
		if (lobbyStatusTimeoutRef.current) {
			clearTimeout(lobbyStatusTimeoutRef.current);
			lobbyStatusTimeoutRef.current = null;
		}
	}, []);

	const showTemporaryLobbyStatus = useCallback(
		(message: string, duration = 2000) => {
			clearLobbyStatusTimer();
			setLobbyStatus(message);
			lobbyStatusTimeoutRef.current = setTimeout(() => {
				setLobbyStatus("");
				lobbyStatusTimeoutRef.current = null;
			}, duration);
		},
		[clearLobbyStatusTimer],
	);

	const mapChallengeToPendingChallenge = useCallback(
		(challenge: DuelChallenge): PendingChallenge => ({
			challenge_id: challenge.id,
			from_username: challenge.challenger?.username ?? "un adversaire",
			from_first_name: challenge.challenger?.first_name,
			from_last_name: challenge.challenger?.last_name,
			expires_in: 60,
		}),
		[],
	);

	const getRoomIdFromAcceptPayload = (
		payload: DuelChallenge | JoinedPayload,
	) => {
		if ("room_id" in payload) return payload.room_id;
		return undefined;
	};

	// ── Duel WS ───────────────────────────────────────────────────────────────

	const handleDuelMessage = useCallback((msg: Record<string, any>) => {
		if (msg.type === "joined") {
			myIdxRef.current = msg.player_idx;
			setMyIdx(msg.player_idx);
		} else if (msg.type === "error") {
			setScreen("lobby");
			setLobbyStatus("Erreur : " + msg.message);
		} else if (msg.type === "question") {
			myAnswerRef.current = null;
			answeredRef.current = false;
			setAnswered(false);
			setLastResult(null);
			const q: QuestionPayload = {
				number: msg.number,
				question: msg.question,
				choices: msg.choices,
				time_limit: msg.time_limit,
			};
			currentQuestionRef.current = q;
			setCurrentQuestion(q);
			setScreen("game");
		} else if (msg.type === "result") {
			const idx = myIdxRef.current;
			setLastResult({
				good_answer: msg.good_answer,
				my_answer: myAnswerRef.current,
				opponent_answer: msg.responses
					? (msg.responses[idx === 0 ? 1 : 0] ?? null)
					: null,
				scores: msg.scores,
			});
		} else if (msg.type === "end") {
			setEndData({ scores: msg.scores, winner: msg.winner });
			setScreen("end");
			disconnectDuelRef.current();
		} else if (msg.type === "opponent_disconnected") {
			setScreen("lobby");
			showTemporaryLobbyStatus("⚠️ Ton adversaire s'est déconnecté.");
			disconnectDuelRef.current();
		}
	}, [showTemporaryLobbyStatus]);

	const {
		connect: connectDuelSocket,
		disconnect: disconnectDuelSocket,
		send: sendDuelMessage,
	} = useDuelWebSocket({
		onMessage: handleDuelMessage,
		onUnexpectedClose: (code) => {
			if (code === 4001) {
				setScreen("lobby");
				setLobbyStatus("Session expirée, reconnecte-toi.");
			}
		},
		reconnectDelay: 0,
	});

	useEffect(() => {
		disconnectDuelRef.current = disconnectDuelSocket;
	}, [disconnectDuelSocket]);

	const connectToDuelRoom = useCallback(
		(roomId?: string | null) => {
			if (roomId) {
				connectDuelSocket("/ws/find_duel/", { room_id: roomId });
			} else {
				connectDuelSocket("/ws/find_duel/");
			}
		},
		[connectDuelSocket],
	);

	// ── Notification WS ───────────────────────────────────────────────────────

	const handleNotifMessage = useCallback(
		(msg: Record<string, any>) => {
			if (msg.type === "challenge_received") {
				setPendingChallenge({
					challenge_id: msg.challenge_id,
					from_username: msg.from_username,
					from_first_name: msg.from_first_name,
					from_last_name: msg.from_last_name,
					expires_in: msg.expires_in,
				});
			} else if (msg.type === "challenge_accepted") {
				if (!msg.room_id) {
					setLobbyStatus("Impossible de rejoindre le duel.");
					return;
				}

				setPendingChallenge(null);
				setLobbyStatus("");
				connectToDuelRoom(msg.room_id);
				setWaitingMessage("Défi accepté, démarrage...");
				setScreen("waiting");
			} else if (msg.type === "challenge_declined") {
				setPendingChallenge(null);
				setLobbyStatus(`❌ ${msg.by_username} a refusé ton défi.`);
			} else if (msg.type === "challenge_expired") {
				setPendingChallenge(null);
				setLobbyStatus("⏰ Le défi a expiré.");
			}
		},
		[connectToDuelRoom],
	);

	const { connect: connectNotifSocket, disconnect: disconnectNotifSocket } =
		useDuelWebSocket({
			onMessage: handleNotifMessage,
			onUnexpectedClose: (code) => {
				if (code === 4001) {
					setLobbyStatus("Session expirée, reconnecte-toi.");
				}
			},
			reconnectDelay: 3000,
		});

	useEffect(() => {
		if (accessToken) {
			connectNotifSocket("/ws/notifications/");
		} else {
			disconnectNotifSocket();
			disconnectDuelSocket();
		}
		return () => {
			disconnectNotifSocket();
			disconnectDuelSocket();
			clearLobbyStatusTimer();
		};
	}, [
		accessToken,
		clearLobbyStatusTimer,
		connectNotifSocket,
		disconnectNotifSocket,
		disconnectDuelSocket,
	]);

	useEffect(() => {
		if (pendingChallenge || pendingDuels.length === 0) return;
		const nextPendingDuel = pendingDuels
			.filter(
				(duel) =>
					duel.status === "pending" &&
					!handledChallengeIdsRef.current.has(duel.id),
			)
			.at(-1);
		if (!nextPendingDuel) return;

		setPendingChallenge(
			mapChallengeToPendingChallenge(nextPendingDuel),
		);
	}, [mapChallengeToPendingChallenge, pendingChallenge, pendingDuels]);

	// ── Actions ───────────────────────────────────────────────────────────────

	const startMatchmaking = useCallback(() => {
    setLobbyStatus("");
    setWaitingMessage("En attente d'un adversaire...");
    setScreen("waiting");
    connectToDuelRoom(null);
	}, [connectToDuelRoom]);

	const sendChallengeToUserId = useCallback(
		async (userId: number) => {
			await requestDuelMutation.mutateAsync(userId);
			setLobbyStatus("⏳ Défi envoyé, en attente de réponse...");
		},
		[requestDuelMutation],
	);

	const acceptChallenge = useCallback(
		async (challengeId?: number) => {
			const cid = challengeId ?? pendingChallenge?.challenge_id;
			if (!cid) return;

			handledChallengeIdsRef.current.add(cid);
			setPendingChallenge(null);
			const payload = await acceptDuelMutation.mutateAsync(cid);
			const roomId = getRoomIdFromAcceptPayload(payload);

			if (!roomId) {
				setScreen("lobby");
				setLobbyStatus("Impossible de rejoindre le duel.");
				return;
			}

			connectToDuelRoom(roomId);
			setWaitingMessage("Défi accepté, connexion...");
			setScreen("waiting");
		},
		[acceptDuelMutation, connectToDuelRoom, pendingChallenge],
	);

	const declineChallenge = useCallback(
		async (challengeId?: number) => {
			const cid = challengeId ?? pendingChallenge?.challenge_id;
			if (!cid) return;

			handledChallengeIdsRef.current.add(cid);
			setPendingChallenge(null);
			await declineDuelMutation.mutateAsync(cid);
		},
		[declineDuelMutation, pendingChallenge],
	);

	const sendAnswer = useCallback(
		(answerIdx: number) => {
			if (answeredRef.current || !currentQuestionRef.current) return;

			answeredRef.current = true;
			myAnswerRef.current = answerIdx;
			setAnswered(true);
			sendDuelMessage({
				type: "answer",
				number: currentQuestionRef.current.number,
				answer: answerIdx,
			});
		},
		[sendDuelMessage],
	);

	const goToLobby = useCallback(() => {
		disconnectDuelSocket();
		setScreen("lobby");
		setCurrentQuestion(null);
		currentQuestionRef.current = null;
		setEndData(null);
		setLastResult(null);
		setMyIdx(null);
		myIdxRef.current = null;
		setAnswered(false);
		answeredRef.current = false;
		myAnswerRef.current = null;
    setLobbyStatus("");
	}, [disconnectDuelSocket]);

	return (
		<DuelContext.Provider
			value={{
				screen,
				pendingChallenge,
				currentQuestion,
				myIdx,
				lastResult,
				endData,
				lobbyStatus,
				waitingMessage,
				answered,
				startMatchmaking,
				sendChallengeToUserId,
				acceptChallenge,
				declineChallenge,
				sendAnswer,
				goToLobby,
				setLobbyStatus,
				decliningChallengeId: declineDuelMutation.variables,
				isDecliningChallenge: declineDuelMutation.isPending,
			}}
		>
			{children}
		</DuelContext.Provider>
	);
};
