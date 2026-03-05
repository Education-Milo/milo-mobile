import { create } from "zustand";
import {
	CourseStore,
	Subject,
	Course,
	Chapter,
	Lesson,
} from "@store/course/course.model";
import APIAxios, { APIRoutes } from "@api/axios.api";

export const useCourseStore = create<CourseStore>((set, get) => ({
	subjects: [],
	courses: [],
	chapters: [],
	lessons: [],
	isLoading: false,
	error: null,

	get_subjects: async (): Promise<Subject[]> => {
		try {
			set({ isLoading: true, error: null });
			const response = await APIAxios.get(APIRoutes.GET_Subjects);
			set({
				subjects: response.data,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({ error: "Failed to fetch subjects", isLoading: false });
			return [];
		}
	},

	get_courses: async (subjectId: number): Promise<Course[]> => {
		try {
			set({ isLoading: true, error: null });
			const response = await APIAxios.get(APIRoutes.GET_Courses, {
				params: { subject_id: subjectId },
			});
			set({
				courses: response.data,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({ error: "Failed to fetch courses", isLoading: false });
			return [];
		}
	},

	get_chapters: async (courseId: number): Promise<Chapter[]> => {
		try {
			set({ isLoading: true, error: null });
			const response = await APIAxios.get(APIRoutes.GET_Chapters, {
				params: { course_id: courseId },
			});
			set({
				chapters: response.data,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({ error: "Failed to fetch chapters", isLoading: false });
			return [];
		}
	},

	get_lessons: async (chapterId: number): Promise<Lesson[]> => {
		try {
			set({ isLoading: true, error: null });
			const response = await APIAxios.get(APIRoutes.GET_Lessons, {
				params: { chapter_id: chapterId },
			});
			set({
				lessons: response.data,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({ error: "Failed to fetch lessons", isLoading: false });
			throw error;
		}
	},
}));
