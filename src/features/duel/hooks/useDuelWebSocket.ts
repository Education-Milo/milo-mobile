import { useCallback, useEffect, useRef } from "react";
import { API_URL } from "@env";
import { useAuthStore } from "@features/auth/store/auth/auth.store";

const WS_BASE_URL = (API_URL ?? "")
	.replace(/^https/, "wss")
	.replace(/^http/, "ws")
	.replace(/\/$/, "");

interface UseDuelWebSocketOptions {
	/** Called with the parsed JSON message object */
	onMessage: (msg: Record<string, unknown>) => void;
	/** Called when the socket closes unexpectedly (not by us) */
	onUnexpectedClose?: (code: number) => void;
	/** Auto-reconnect delay in ms (default: 3000). Set to 0 to disable. */
	reconnectDelay?: number;
}

interface UseDuelWebSocketReturn {
	/** Open the WebSocket at the given path, e.g. "/ws/find_duel/" */
	connect: (path: string, params?: Record<string, string>) => void;
	/** Gracefully close the WebSocket (no reconnect) */
	disconnect: () => void;
	/** Send a JSON-serialisable payload */
	send: (payload: Record<string, unknown>) => void;
	/** Whether the socket is currently open */
	isConnected: () => boolean;
}

/**
 * Low-level WebSocket hook for the duel feature.
 * Handles token injection, JSON framing, and optional auto-reconnect.
 *
 * Usage:
 *   const ws = useDuelWebSocket({ onMessage: handleMsg });
 *   ws.connect("/ws/find_duel/");
 *   ws.send({ type: "answer", answer: 2 });
 *   ws.disconnect();
 */
export const useDuelWebSocket = ({
	onMessage,
	onUnexpectedClose,
	reconnectDelay = 3000,
}: UseDuelWebSocketOptions): UseDuelWebSocketReturn => {
	const wsRef = useRef<WebSocket | null>(null);
	// Store the latest callbacks in refs so reconnect closures are never stale
	const onMessageRef = useRef(onMessage);
	const onUnexpectedCloseRef = useRef(onUnexpectedClose);
	const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	// The last URL used — needed to reconnect
	const lastUrlRef = useRef<string | null>(null);
	// True when we explicitly called disconnect() — suppresses auto-reconnect
	const intentionalCloseRef = useRef(false);

	useEffect(() => {
		onMessageRef.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		onUnexpectedCloseRef.current = onUnexpectedClose;
	}, [onUnexpectedClose]);

	const clearReconnectTimer = () => {
		if (reconnectTimerRef.current) {
			clearTimeout(reconnectTimerRef.current);
			reconnectTimerRef.current = null;
		}
	};

	const openSocket = useCallback(
		(url: string) => {
			// Close any existing socket first
			if (wsRef.current) {
				intentionalCloseRef.current = true;
				wsRef.current.close();
				wsRef.current = null;
			}

			intentionalCloseRef.current = false;
			lastUrlRef.current = url;

			const ws = new WebSocket(url);
			wsRef.current = ws;

			ws.onmessage = (event) => {
				try {
					const msg = JSON.parse(event.data as string) as Record<
						string,
						unknown
					>;
					onMessageRef.current(msg);
				} catch {
					console.warn("[DuelWS] Failed to parse message:", event.data);
				}
			};

			ws.onclose = (event) => {
				if (intentionalCloseRef.current) return;

				// 4001 = token expired / auth failure — do not reconnect
				if (event.code === 4001) {
					onUnexpectedCloseRef.current?.(event.code);
					return;
				}

				onUnexpectedCloseRef.current?.(event.code);

				if (reconnectDelay > 0 && lastUrlRef.current) {
					clearReconnectTimer();
					reconnectTimerRef.current = setTimeout(() => {
						// Re-fetch token in case it was refreshed
						const token = useAuthStore.getState().accessToken;
						if (!token || !lastUrlRef.current) return;
						// Swap the token param in the URL
						const freshUrl = lastUrlRef.current.replace(
							/token=[^&]*/,
							`token=${token}`,
						);
						openSocket(freshUrl);
					}, reconnectDelay);
				}
			};

			ws.onerror = (error) => {
				console.error("[DuelWS] WebSocket error:", error);
			};
		},
		[reconnectDelay],
	);

	const connect = useCallback(
		(path: string, params: Record<string, string> = {}) => {
			const token = useAuthStore.getState().accessToken;
			if (!token) {
				console.warn("[DuelWS] No access token — cannot connect");
				return;
			}

			const query = new URLSearchParams({ token, ...params }).toString();
			const url = `${WS_BASE_URL}${path}?${query}`;
			openSocket(url);
		},
		[openSocket],
	);

	const disconnect = useCallback(() => {
		clearReconnectTimer();
		intentionalCloseRef.current = true;
		lastUrlRef.current = null;
		if (wsRef.current) {
			wsRef.current.close();
			wsRef.current = null;
		}
	}, []);

	const send = useCallback((payload: Record<string, unknown>) => {
		const ws = wsRef.current;
		if (!ws || ws.readyState !== WebSocket.OPEN) {
			console.warn("[DuelWS] Cannot send — socket not open");
			return;
		}
		ws.send(JSON.stringify(payload));
	}, []);

	const isConnected = useCallback(
		() => wsRef.current?.readyState === WebSocket.OPEN,
		[],
	);

	// Clean up on unmount
	useEffect(() => {
		return () => {
			clearReconnectTimer();
			intentionalCloseRef.current = true;
			wsRef.current?.close();
			wsRef.current = null;
		};
	}, []);

	return { connect, disconnect, send, isConnected };
};
