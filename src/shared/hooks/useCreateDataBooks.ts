import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utility/axios";

export const useCreateDataBooks = (accessToken: string | null | undefined) => {
  return useMutation({
    mutationFn: (requestBody: any) =>
      axiosInstance.post("/api/books/add", requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
