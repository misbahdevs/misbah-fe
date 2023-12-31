import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utility/axios";
import { User } from "../schema/UserEntity";

export const useGetDataBooks = (user: User) => {
  const { accessToken } = user;
  return useQuery({
    queryKey: ["GET_BOOKS"],
    queryFn: () =>
      axiosInstance.get("/api/books", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
