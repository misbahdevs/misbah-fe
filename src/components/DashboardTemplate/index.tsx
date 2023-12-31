"use client";

import { VStack, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

const DashboardTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <VStack w="full">
      <Header />
      <Stack px={20} py={10} w="full" bgColor="#f8fafc">
        {children}
      </Stack>
      <Footer />
    </VStack>
  );
};

export default DashboardTemplate;
