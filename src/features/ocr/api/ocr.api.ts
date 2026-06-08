import APIAxios, { APIRoutes } from "@shared/api/axios.api";

export interface OcrImagePayload {
  uri: string;
  name?: string;
  type?: string;
}

export interface ChatWithDocumentPayload extends OcrImagePayload {
  chatRequest: string;
  context?: string;
  conversationId?: string;
}

const buildOcrFormData = ({ uri, name, type }: OcrImagePayload) => {
  const formData = new FormData();

  formData.append("uploaded_file", {
    uri,
    name: name ?? "ocr_image.jpg",
    type: type ?? "image/jpeg",
  } as any);

  return formData;
};

const multipartHeaders = {
  "Content-Type": "multipart/form-data",
};

export const generateQCM = async (image: OcrImagePayload) => {
  const response = await APIAxios.post(
    APIRoutes.POST_OCR_Course_qcm,
    buildOcrFormData(image),
    {
      headers: multipartHeaders,
    },
  );

  return response.data;
};

export const generateExercise = async (image: OcrImagePayload) => {
  const response = await APIAxios.post(
    APIRoutes.POST_OCR_Exercise_generation,
    buildOcrFormData(image),
    {
      headers: multipartHeaders,
    },
  );

  return response.data;
};

export const startDocumentChat = async ({
  uri,
  name,
  type,
  chatRequest,
  context,
  conversationId,
}: ChatWithDocumentPayload) => {
  const formData = buildOcrFormData({ uri, name, type });
  formData.append("chat_request", chatRequest);

  if (context) {
    formData.append("context", context);
  }

  if (conversationId) {
    formData.append("conversation_id", conversationId);
  }

  const response = await APIAxios.post(APIRoutes.POST_Free_Chat, formData, {
    headers: multipartHeaders,
  });

  return response.data;
};

export const sendDocumentChatMessage = async ({
  chatRequest,
  context,
  conversationId,
}: {
  chatRequest: string;
  context?: string;
  conversationId?: string;
}) => {
  const formData = new FormData();
  formData.append("chat_request", chatRequest);

  if (context) {
    formData.append("context", context);
  }

  if (conversationId) {
    formData.append("conversation_id", conversationId);
  }

  const response = await APIAxios.post(APIRoutes.POST_Free_Chat, formData, {
    headers: multipartHeaders,
  });

  return response.data;
};
