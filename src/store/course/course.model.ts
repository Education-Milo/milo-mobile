import type { ClassType } from "@store/user/user.model";

export interface Subject {
	id: number;
	title: string;
	level: ClassType;
	cycle: string;
}

export interface Chapter {
	id: number;
	course_id: number;
	title: string;
	context_info: string;
}

export interface Lesson {
	id: number;
	chapter_id: number;
	title: string;
	learning_objectives: string;
	boundaries: string;
	success_criteria: string;
}

export interface Course {
	id: number;
	title: string;
	description: string;
	subject_id: number;
}


