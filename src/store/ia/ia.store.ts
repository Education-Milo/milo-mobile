import { create } from 'zustand';
import { IAStore, QCM } from './ia.model';
import APIAxios, { APIRoutes } from '@api/axios.api';

export const useIAStore = create<IAStore>((set, get) => ({
    // État initial
    currentQCM: null,
    isLoading: false,
    error: null,

    // Actions
    create_qcm: async (theme: string): Promise<QCM> => {
        set({ isLoading: true, error: null });
        try {
            const response = await APIAxios.post(APIRoutes.POST_CREATE_QCM, { chat_request: theme });
            const qcm = response.data;
            set({ currentQCM: qcm, isLoading: false });
            return qcm;
        } catch (error) {
            let errorMessage = 'Error creating QCM';
            if ((error as any).response) {
                const serverError = error as { response: { data?: { message?: string }; status: number } };
                errorMessage = serverError.response.data?.message || `Erreur ${serverError.response.status}`;
            } else if ((error as any).request) {
                errorMessage = 'Erreur de connexion réseau';
            } else {
                errorMessage = (error as Error).message;
            }
            set({ error: errorMessage, isLoading: false });
            console.error('Error creating QCM:', error);
            throw error;
        }
    },
    // setCurrentQCM: (qcm: QCM) => set({ currentQCM: qcm }),
    // setLoading: (loading: boolean) => set({ isLoading: loading }),
    // setError: (error: string | null) => set({ error })
}));