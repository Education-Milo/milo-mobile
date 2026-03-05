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

export interface CourseState {
	subjects: Subject[];
	courses: Course[];
	chapters: Chapter[];
	lessons: Lesson[];
	isLoading: boolean;
	error: string | null;
}

export interface CourseActions {
	get_subjects: () => Promise<Subject[]>;
	get_courses: (subjectId: number) => Promise<Course[]>;
	get_chapters: (courseId: number) => Promise<Chapter[]>;
	get_lessons: (chapterId: number) => Promise<Lesson[]>;
}

export type CourseStore = CourseState & CourseActions;
