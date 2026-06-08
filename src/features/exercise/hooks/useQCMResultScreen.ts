import { useUserStore } from "@features/user/store/user.store";
import { useEffect } from "react";


const useResultScreen = (score: number, totalQuestions: number) => {
	const { addXp, updateUser, user } = useUserStore();

	const xpEarned =
		totalQuestions > 0 ? 10 + Math.round((score / totalQuestions) * 10) : 5;

	const updateXP = async () => {
		try {
			addXp(xpEarned);
            console.log(`XP ajouté localement: ${xpEarned}`);
            if (user) {
                console.log(`Mise à jour de l'utilisateur avec XP: ${user.xp + xpEarned}`);
				await updateUser({ ...user, xp: user.xp + xpEarned });
			}
		} catch (error) {
			console.error("Erreur update XP:", error);
		}
	};

	useEffect(() => {
		updateXP();
	}, []);

	return {
		xpEarned,
		user,
	};
};

export default useResultScreen;