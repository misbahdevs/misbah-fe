"use client";
import type { Session } from "next-auth";
import { createContext, useContext } from "react";

export const CustomSessionContext = createContext<Session | undefined>(undefined);
export const useCustomSession = () => {
  const context = useContext(CustomSessionContext);

  if (!context) {
    throw new Error("Called useCustomSession before setting CustomSessionContext context");
  }
  return context;
};
