import { useMutation } from "@tanstack/react-query";
import { uploadOdontogram } from "@/api/odontogram";

export function useOdontogramMutation({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) {
  return useMutation({
    mutationFn: uploadOdontogram,
    onSuccess,
    onError,
  });
}
