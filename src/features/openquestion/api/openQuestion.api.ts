import APIAxios, { APIRoutes } from "@shared/api/axios.api";

interface OpenQuestionChatPayload {
  chatRequest: string;
  conversationId?: string;
}

const multipartHeaders = {
  "Content-Type": "multipart/form-data",
};

const extractChatText = (data: any) =>
  String(data?.reply ?? data?.content ?? data?.message ?? "").trim();

const extractConversationId = (data: any) =>
  String(data?.conversation_id ?? data?.conversationId ?? "").trim();

export const sendOpenQuestionChatMessage = async ({
  chatRequest,
  conversationId,
}: OpenQuestionChatPayload) => {
  const formData = new FormData();
  formData.append("chat_request", chatRequest);

  if (conversationId) {
    formData.append("conversation_id", conversationId);
  }

  const response = await APIAxios.post(APIRoutes.POST_Free_Chat, formData, {
    headers: multipartHeaders,
  });

  return {
    text: extractChatText(response.data),
    conversationId: extractConversationId(response.data),
  };
};
