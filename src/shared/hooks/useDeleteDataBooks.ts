import { useMutation } from "@tanstack/react-query";
import { User } from "../schema/UserEntity";
import axiosInstance from "../utility/axios";

export const useDeleteDataBooks = (user: User) => {
  const { accessToken } = user;
  return useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
