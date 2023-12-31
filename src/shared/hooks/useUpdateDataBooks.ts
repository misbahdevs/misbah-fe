import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utility/axios";

export const useUpdateDataBooks = (accessToken: string | null | undefined) => {
  return useMutation({
    mutationFn: ({ id, ...requestBody }: { id: string; [key: string]: any }) =>
      axiosInstance.put(`/api/books/${id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
