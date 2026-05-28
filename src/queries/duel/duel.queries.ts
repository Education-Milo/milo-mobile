import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIAxios, { APIRoutes } from "@api/axios.api";
import {
	DuelChallenge,
	DuelHistoryItem,
	DuelStats,
	JoinedPayload,
} from "@store/duel/duel.model";

export const duelQueryKeys = {
	all: ["duels"] as const,
	pending: () => [...duelQueryKeys.all, "pending"] as const,
	history: () => [...duelQueryKeys.all, "history"] as const,
	stats: () => [...duelQueryKeys.all, "stats"] as const,
};

export const requestDuel = async (
	targetUserId: number
): Promise<DuelChallenge> => {
	const response = await APIAxios.post(
		APIRoutes.POST_DUEL_Request(targetUserId),
		{}
	);
	return response.data;
};

export const acceptDuel = async (
	challengeId: number
): Promise<DuelChallenge | JoinedPayload> => {
	const response = await APIAxios.post(
		APIRoutes.POST_DUEL_Accept(challengeId),
		{}
	);
	return response.data;
};

export const declineDuel = async (
	challengeId: number
): Promise<DuelChallenge> => {
	const response = await APIAxios.post(
		APIRoutes.POST_DUEL_Decline(challengeId),
		{}
	);
	return response.data;
};

export const fetchPendingDuels = async (): Promise<DuelChallenge[]> => {
	const response = await APIAxios.get(APIRoutes.GET_DUEL_Pending);
	return response.data;
};

export const fetchDuelHistory = async (): Promise<DuelHistoryItem[]> => {
	const response = await APIAxios.get(APIRoutes.GET_DUEL_History);
	return response.data;
};

export const fetchDuelStats = async (): Promise<DuelStats> => {
	const response = await APIAxios.get(APIRoutes.GET_DUEL_Stats);
	return response.data;
};

export const usePendingDuels = () => {
	return useQuery({
		queryKey: duelQueryKeys.pending(),
		queryFn: fetchPendingDuels,
		refetchInterval: 10000,
	});
};

export const useDuelHistory = () => {
	return useQuery({
		queryKey: duelQueryKeys.history(),
		queryFn: fetchDuelHistory,
	});
};

export const useDuelStats = () => {
	return useQuery({
		queryKey: duelQueryKeys.stats(),
		queryFn: fetchDuelStats,
	});
};

export const useRequestDuel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: requestDuel,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: duelQueryKeys.pending() });
		},
	});
};

export const useAcceptDuel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: acceptDuel,
		onMutate: async (challengeId) => {
			await queryClient.cancelQueries({ queryKey: duelQueryKeys.pending() });
			const previousPending =
				queryClient.getQueryData<DuelChallenge[]>(duelQueryKeys.pending());

			queryClient.setQueryData<DuelChallenge[]>(
				duelQueryKeys.pending(),
				(old = []) => old.filter((duel) => duel.id !== challengeId)
			);

			return { previousPending };
		},
		onError: (_error, _challengeId, context) => {
			if (context?.previousPending) {
				queryClient.setQueryData(
					duelQueryKeys.pending(),
					context.previousPending
				);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: duelQueryKeys.pending() });
			queryClient.invalidateQueries({ queryKey: duelQueryKeys.history() });
			queryClient.invalidateQueries({ queryKey: duelQueryKeys.stats() });
		},
	});
};

export const useDeclineDuel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: declineDuel,
		onMutate: async (challengeId) => {
			await queryClient.cancelQueries({ queryKey: duelQueryKeys.pending() });
			const previousPending =
				queryClient.getQueryData<DuelChallenge[]>(duelQueryKeys.pending());

			queryClient.setQueryData<DuelChallenge[]>(
				duelQueryKeys.pending(),
				(old = []) => old.filter((duel) => duel.id !== challengeId)
			);

			return { previousPending };
		},
		onError: (_error, _challengeId, context) => {
			if (context?.previousPending) {
				queryClient.setQueryData(
					duelQueryKeys.pending(),
					context.previousPending
				);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: duelQueryKeys.pending() });
		},
	});
};
