import { useState, useMemo } from "react";
import { useUserStore } from "@store/user/user.store";

export interface DailyMission {
	id: string;
	icon: string;
	title: string;
	progressCurrent: number;
	progressTotal: number;
	rewardPoints: number;
}

export type MissionsTabId = "daily" | "weekly" | "monthly";

export type MissionsTab = {
	id: MissionsTabId;
	label: string;
};

export interface Mission {
	id: string;
	icon: string;
	title: string;
	progressCurrent: number;
	progressTotal: number;
	rewardXP: number;
	completed?: boolean;
}

export interface MonthlyBadge {
	id: string;
	month: string;
	status: "earned" | "missed" | "locked";
	imageUrl?: string;
}

export interface MonthlyChallenge {
	title: string;
	questsCurrent: number;
	questsTotal: number;
	daysLeft: number;
}

const TABS: MissionsTab[] = [
	{ id: "daily", label: "Quotidiennes" },
	{ id: "weekly", label: "Hebdomadaires" },
	{ id: "monthly", label: "Mensuelles" },
];

const MISSIONS_BY_TAB: Record<MissionsTabId, Mission[]> = {
	daily: [
		{
			id: "1",
			icon: "🕐",
			title: "Terminer 10 QCM",
			progressCurrent: 2,
			progressTotal: 10,
			rewardXP: 50,
		},
		{
			id: "2",
			icon: "📘",
			title: "Résoudre 5 problèmes",
			progressCurrent: 4,
			progressTotal: 5,
			rewardXP: 30,
			completed: true,
		},
		{
			id: "3",
			icon: "➕",
			title: "Faire 5 Duels",
			progressCurrent: 6,
			progressTotal: 10,
			rewardXP: 40,
		},
		{
			id: "4",
			icon: "📖",
			title: "Faire 10 leçons",
			progressCurrent: 5,
			progressTotal: 10,
			rewardXP: 60,
		},
	],
	weekly: [
		{
			id: "5",
			icon: "🏆",
			title: "Compléter 10 leçons",
			progressCurrent: 6,
			progressTotal: 10,
			rewardXP: 150,
		},
		{
			id: "6",
			icon: "🎯",
			title: "Obtenir 5 étoiles",
			progressCurrent: 3,
			progressTotal: 5,
			rewardXP: 100,
		},
		{
			id: "7",
			icon: "🔥",
			title: "Série de 7 jours",
			progressCurrent: 4,
			progressTotal: 7,
			rewardXP: 200,
		},
	],
	monthly: [
		{
			id: "8",
			icon: "🌟",
			title: "Maîtriser un chapitre",
			progressCurrent: 1,
			progressTotal: 3,
			rewardXP: 500,
		},
		{
			id: "9",
			icon: "📚",
			title: "Lire 20 leçons",
			progressCurrent: 12,
			progressTotal: 20,
			rewardXP: 300,
		},
	],
};

export const useMissionsScreen = () => {
	const user = useUserStore((state) => state.user);

	const [activeTab, setActiveTab] = useState<MissionsTabId>("daily");

	// Mock data - À remplacer par vos vraies données API
	const [dailyMissions] = useState<DailyMission[]>([
		{
			id: "1",
			icon: "📖",
			title: "Terminer 3 leçons",
			progressCurrent: 2,
			progressTotal: 3,
			rewardPoints: 50,
		},
		{
			id: "2",
			icon: "🎯",
			title: "Obtenir 90% de précision",
			progressCurrent: 0,
			progressTotal: 1,
			rewardPoints: 30,
		},
		{
			id: "3",
			icon: "⚡",
			title: "Série de 5 jours",
			progressCurrent: 3,
			progressTotal: 5,
			rewardPoints: 100,
		},
	]);

	const [monthlyChallenge] = useState<MonthlyChallenge>({
		title: "Défi Mensuel",
		questsCurrent: 12,
		questsTotal: 20,
		daysLeft: 15,
	});

	const [badgesByYear] = useState<Record<number, MonthlyBadge[]>>({
		2025: [
			{ id: "1", month: "Jan", status: "earned" },
			{ id: "2", month: "Fév", status: "earned" },
			{ id: "3", month: "Mar", status: "missed" },
			{ id: "4", month: "Avr", status: "locked" },
			{ id: "5", month: "Mai", status: "locked" },
			{ id: "6", month: "Juin", status: "locked" },
			{ id: "7", month: "Juil", status: "locked" },
			{ id: "8", month: "Août", status: "locked" },
			{ id: "9", month: "Sep", status: "locked" },
			{ id: "10", month: "Oct", status: "locked" },
			{ id: "11", month: "Nov", status: "locked" },
			{ id: "12", month: "Déc", status: "locked" },
		],
	});

	const sortedYears = useMemo(
		() =>
			Object.keys(badgesByYear)
				.map(Number)
				.sort((a, b) => b - a),
		[badgesByYear]
	);

	const missions = useMemo(() => MISSIONS_BY_TAB[activeTab], [activeTab]);

	return {
		user,
		tabs: TABS,
		activeTab,
		setActiveTab,
		missions,
		dailyMissions,
		monthlyChallenge,
		badgesByYear,
		sortedYears,
	};
};
