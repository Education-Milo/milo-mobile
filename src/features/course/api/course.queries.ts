import APIAxios, { APIRoutes } from "@shared/api/axios.api";
import { Subject, Course, Chapter, Lesson, LessonPart } from "@features/course/store/course.model";
import { useQuery } from "@tanstack/react-query";

export const fetchSubjects = async (): Promise<Subject[]> => {
	const response = await APIAxios.get(APIRoutes.GET_Subjects);
	return response.data;
};

export const fetchCourses = async (subjectId: number): Promise<Course[]> => {
	const response = await APIAxios.get(APIRoutes.GET_Courses, {
		params: { subject_id: subjectId },
	});
	return response.data;
};

export const fetchChapters = async (courseId: number): Promise<Chapter[]> => {
    const response = await APIAxios.get(APIRoutes.GET_Chapters, {
        params: { course_id: courseId },
    });
    return response.data;
};

export const fetchLessons = async (chapterId: number): Promise<Lesson[]> => {
    const response = await APIAxios.get(APIRoutes.GET_Lessons, {
        params: { chapter_id: chapterId },
    });
    return response.data;
};

export const useSubjects = () => {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: fetchSubjects,
    });
}

export const useCourses = (subjectId: number | undefined) => {
    return useQuery({
        queryKey: ['courses', subjectId],
        queryFn: () => fetchCourses(subjectId!),
        enabled: !!subjectId,
    });
}

// Other way to write it
// export const useCourses = (subjectId: number) =>
//     useQuery({
//         queryKey: ['courses', subjectId],
//         queryFn: () => fetchCourses(subjectId),
//         enabled: !!subjectId,
//     });

export const fetchLessonParts = async (lessonId: number, context: string = ""): Promise<LessonPart[]> => {
    const response = await APIAxios.post(
        APIRoutes.POST_Chat_Lesson,
        {
            chat_request: "",
            context: context,
            conversation_id: "",
        },
        { params: { lesson_id: lessonId } }
    );
    return response.data.parts;
};


export const sendChatMessage = async (
    partContent: string,
    question: string,
    conversationId?: string
): Promise<string> => {
    const response = await APIAxios.post(APIRoutes.POST_Chat_Lesson, {
        part_content: partContent,
        question: question,
        conversation_id: conversationId,
    });
    return response.data.reply || response.data.content;
};

export const useChapters = (courseId: number) => {
    return useQuery({
        queryKey: ['chapters', courseId],
        queryFn: () => fetchChapters(courseId),
        enabled: !!courseId,
    });
}

export const useLessons = (chapterId: number) => {
    return useQuery({
        queryKey: ['lessons', chapterId],
        queryFn: () => fetchLessons(chapterId),
        enabled: !!chapterId,
    });
}
