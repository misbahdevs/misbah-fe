"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import QueryProvider from "./QueryProvider";
import { SessionProvider } from "next-auth/react";

type ApplicationProviderProps = {
  children: React.ReactNode;
};

const ApplicationProvider: FC<ApplicationProviderProps> = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default ApplicationProvider;
