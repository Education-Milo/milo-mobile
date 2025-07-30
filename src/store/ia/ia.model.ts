export interface Question {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface QCM {
    qcm: Question[];
}

export interface IAState {
    currentQCM: QCM | null;
    isLoading: boolean;
    error: string | null;
}

export interface IAActions {
    create_qcm: (theme: string) => Promise<QCM>;
    // setCurrentQCM: (qcm: QCM) => void;
    // setLoading: (loading: boolean) => void;
    // setError: (error: string | null) => void;
}

export type IAStore = IAState & IAActions;