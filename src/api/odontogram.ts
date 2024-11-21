import axios from "axios";
import { toPng } from "html-to-image";
import { dataURLtoBlob } from "@/lib/utils";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export async function uploadOdontogram({
  ref,
  state,
  rawKey,
  medicalRecord,
}: {
  ref: React.RefObject<HTMLElement>;
  state: object;
  rawKey: string;
  medicalRecord: string;
}) {
  if (ref.current === null) {
    throw new Error("Reference to the DOM element is null.");
  }

  if (!state || Object.keys(state).length === 0) {
    throw new Error("Metadata tidak boleh kosong!");
  }

  try {
    const dataUrl = await toPng(ref.current, { cacheBust: true });
    const blob = dataURLtoBlob(dataUrl);

    if (!blob || blob.size === 0) {
      throw new Error("Gambar tidak valid atau kosong!");
    }

    const formData = new FormData();
    formData.append("encryptedMetadata", JSON.stringify(state));
    formData.append("image", blob, "image.png");

    const response = await axiosInstance.post(
      `/medicalrecord/upload/odontogram/${medicalRecord}`,
      formData,
      {
        params: { node: "dev" },
        headers: { Authorization: `Bearer ${rawKey}` },
      }
    );

    return response.data;
  } catch (error) {
    // Handle specific errors
    if (error instanceof Error) {
      throw new Error(`Failed to upload odontogram: ${error.message}`);
    }
    // Handle unknown errors
    throw new Error("An unknown error occurred while uploading odontogram");
  }
}
