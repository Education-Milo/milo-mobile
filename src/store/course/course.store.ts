import { create } from 'zustand';
import { CourseStore, Subject } from './course.model';
import APIAxios, { APIRoutes } from '@api/axios.api';
import { FAKE_MATHS_PROGRAM } from '@api/fake-program';

const DEFAULT_SUBJECTS: Subject[] = [
    { id: 'maths', name: 'Mathématiques', description: 'Nombres et géométrie', icon: '🧮', borderColor: '#3B82F6', iconBackground: '#DBEAFE' },
    { id: 'fr', name: 'Français', description: 'Lecture et écriture', icon: '🇫🇷', borderColor: '#EF4444', iconBackground: '#FEE2E2' },
    { id: 'hist', name: 'Histoire-Géographie', description: 'Le monde et le temps', icon: '🌍', borderColor: '#F59E0B', iconBackground: '#FEF3C7' },
    // ... tu peux ajouter les autres
];

export const useCourseStore = create<CourseStore>((set, get) => ({
  subjects: DEFAULT_SUBJECTS,
  currentCourse: null,
  recentCourses: [],
  isLoading: false,
  error: null,

  fetchSubjects: async () => {
    // Si tu as une route API pour les matières, décommente :
    // try {
    //   const res = await APIAxios.get(APIRoutes.GET_Subjects);
    //   set({ subjects: res.data });
    // } catch (e) { ... }
    set({ subjects: DEFAULT_SUBJECTS });
  },

  fetchCourseBySubject: async (subjectName: string) => {
    set({ isLoading: true, error: null });
    try {
      // 1. On appelle le Back pour avoir le programme de cette matière
      // Route supposée: GET /courses/program?subject=Mathématiques
      const response = await APIAxios.get(`${APIRoutes.GET_Course}/program`, {
        params: { subject: subjectName }
      });
      const programData = response.data;

      // 2. On le met dans le store
      set({
        currentCourse: programData,
        isLoading: false
      });

    } catch (error) {
      console.error("Erreur fetch programme", error);
      set({
        isLoading: false,
        error: "Impossible de charger le programme."
      });
      // (Optionnel) Pour tester sans back, tu peux décommenter ça :
      set({ currentCourse: FAKE_MATHS_PROGRAM, isLoading: false });
    }
  },

  getCourseById: async (courseId: string) => {
    set({ isLoading: true });
    try {
      const response = await APIAxios.get(`${APIRoutes.GET_Course}/${courseId}`);
      set({ currentCourse: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchRecentCourses: async () => {
    try {
        const response = await APIAxios.get(APIRoutes.GET_RecentCourses);
        set({ recentCourses: response.data });
      } catch (error) {
        console.log('Erreur fetch recent courses', error);
      }
    },

  generateCourseFromDocument: async (formData: FormData) => {
      // ... (code précédent)
      return {} as any;
  },

  generateLessonContent: async (lessonId: string) => {
    set({ isLoading: true, error: null });
    try {
      // On envoie l'ID au back, et le back utilise le "Golden JSON" pour générer le cours
      const response = await APIAxios.post(`${APIRoutes.GET_Course}/generate`, {
        lessonId: lessonId
      });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Erreur génération leçon", error);
      set({ isLoading: false, error: "Impossible de générer le cours" });
      throw error;
    }
  },

}));