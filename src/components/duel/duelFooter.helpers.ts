import { DuelUserSummary } from "@store/duel/duel.model";

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export const getDuelUserName = (user?: DuelUserSummary) => {
  if (!user) return "Un adversaire";
  return (
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
    user.username ||
    "Un adversaire"
  );
};
