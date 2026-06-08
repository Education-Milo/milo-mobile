import { useQueries, useQuery } from "@tanstack/react-query";
import APIAxios, { APIRoutes } from "@shared/api/axios.api";
import { User } from "@features/user/store/user.model";

type OnlineStatusResponse =
  | Record<
      string,
      | boolean
      | {
          online?: boolean;
          is_online?: boolean;
          isOnline?: boolean;
          status?: string;
        }
    >
  | Array<{
      id?: number;
      user_id?: number;
      userId?: number;
      online?: boolean;
      is_online?: boolean;
      isOnline?: boolean;
      status?: string;
    }>;

const readOnlineStatus = (
  value:
    | boolean
    | string
    | {
        online?: boolean;
        is_online?: boolean;
        isOnline?: boolean;
        status?: string;
      }
    | null
    | undefined,
) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "online";
  if (!value) return false;

  return Boolean(
    value.is_online ??
      value.online ??
      value.isOnline ??
      (value.status ? value.status.toLowerCase() === "online" : false),
  );
};

const normalizeOnlineStatuses = (
  payload: OnlineStatusResponse,
): Record<number, boolean> => {
  if (Array.isArray(payload)) {
    return payload.reduce<Record<number, boolean>>((acc, item) => {
      const userId = item.user_id ?? item.userId ?? item.id;
      if (userId !== undefined) {
        acc[userId] = readOnlineStatus(item);
      }
      return acc;
    }, {});
  }

  return Object.entries(payload).reduce<Record<number, boolean>>(
    (acc, [userId, value]) => {
      const numericUserId = Number(userId);
      if (!Number.isNaN(numericUserId)) {
        acc[numericUserId] = readOnlineStatus(value);
      }
      return acc;
    },
    {},
  );
};

export const fetchUserByUsername = async (username: string): Promise<User> => {
  const response = await APIAxios.get(APIRoutes.GET_User_By_Username(username));
  return response.data;
};

export const searchUsers = async (query: string): Promise<string[]> => {
  const response = await APIAxios.get(APIRoutes.GET_User_Search, {
    params: { q: query },
  });
  return response.data;
};

export const fetchUserOnlineStatuses = async (
  ids: number[],
): Promise<Record<number, boolean>> => {
  const response = await APIAxios.get<OnlineStatusResponse>(
    APIRoutes.GET_User_Online_Status(ids.join(",")),
  );
  return normalizeOnlineStatuses(response.data);
};

export const useSearchUsers = (query: string) =>
  useQuery({
    queryKey: ["users", "search", query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  });

export const useUsersByUsernames = (usernames: string[]) =>
  useQueries({
    queries: usernames.map((username) => ({
      queryKey: ["users", "username", username],
      queryFn: () => fetchUserByUsername(username),
      enabled: !!username,
    })),
  });

export const useUserOnlineStatuses = (userIds: number[]) => {
  const uniqueUserIds = [...new Set(userIds)].sort((a, b) => a - b);

  return useQuery({
    queryKey: ["users", "online-status", uniqueUserIds.join(",")],
    queryFn: () => fetchUserOnlineStatuses(uniqueUserIds),
    enabled: uniqueUserIds.length > 0,
    refetchInterval: 10000,
  });
};
