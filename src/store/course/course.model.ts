export interface Lesson {
    id: string;
    title: string; // ex: "Écrire et lire les entiers"
    status: 'completed' | 'in-progress' | 'locked';

    // --- CHAMPS POUR L'IA (Le "Cerveau") ---
    // Ces champs ne sont pas forcément affichés, mais envoyés au prompt
    learning_objectives: string[]; // Ce que l'élève doit apprendre
    boundaries: string;            // Les limites (ex: "Pas de puissances de 10")
    success_criteria: string[];    // Exemples pour générer les QCM
    content?: string;
  }

  export interface Chapter {
    id: string;
    title: string; // ex: "Les nombres entiers" (L'accordéon)
    context_info?: string; // Contexte global pour l'IA
    lessons: Lesson[];
    order: number;
    isCompleted?: boolean;
  }

  export interface Course {
    id: string;
    title: string; // ex: "Nombres et calculs" (Le grand thème)
    description?: string;
    subjectId: string; // ex: "maths"
    chapters: Chapter[];
    progress: number;
  }

  export interface Subject {
    id: string;
    name: string;
    description: string;
    icon: string;
    borderColor: string;
    iconBackground: string;
  }

  export interface CourseState {
    subjects: Subject[];
    currentCourse: Course | null;
    recentCourses: Course[];
    isLoading: boolean;
    error: string | null;
  }

  export interface CourseActions {
    fetchSubjects: () => Promise<void>;

    fetchCourseBySubject: (subjectName: string) => Promise<void>;

    generateLessonContent: (lessonId: string) => Promise<Lesson>;
    getCourseById: (courseId: string) => Promise<Course>;
    generateCourseFromDocument: (formData: FormData) => Promise<Course>;
  }

export type CourseStore = CourseState & CourseActions;