import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utility/axios";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (bodyRequest: any) =>
      axiosInstance.post("/api/register", bodyRequest),
  });
};
