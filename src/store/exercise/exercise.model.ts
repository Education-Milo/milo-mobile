export interface QcmQuestion {
	question: string;
	options: string[];
	correct_answer: string;
}

export interface ExerciseState {
	QCM: QcmQuestion[];
	loading: boolean;
	error: string | null;
}

export interface ExerciseAction {
	generate_qcm_lesson: (lessonId: number) => Promise<QcmQuestion[]>;
}

export type ExerciseStore = ExerciseAction & ExerciseState;
