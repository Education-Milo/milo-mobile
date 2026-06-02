import APIAxios, { APIRoutes } from "@api/axios.api";

export interface OcrImagePayload {
  uri: string;
  name?: string;
  type?: string;
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
