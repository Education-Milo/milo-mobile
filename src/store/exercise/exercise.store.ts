import APIAxios, { APIRoutes } from "@api/axios.api";
import { ExerciseStore, QcmQuestion } from "@store/exercise/exercise.model";
import { create } from "zustand";

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
	loading: false,
	QCM: [],
	error: null,

	generate_qcm_lesson: async (lessonId: number): Promise<QcmQuestion[]> => {
		try {
			set({ loading: true, error: null });
			const response = await APIAxios.post(APIRoutes.POST_QCM_Lesson, null, {
				params: { lesson_id: lessonId },
			});
            const questions: QcmQuestion[] = response.data.qcm;
            console.log(questions)
			set({
				loading: false,
			});
			return questions;
		} catch (error) {
			set({ error: "Failed to POST QCM", loading: false });
			throw error;
		}
	},
}));
