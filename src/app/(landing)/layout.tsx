import { Flex, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bgColor="#f1f5f9"
    >
      <Stack px={20}>{children}</Stack>
    </Flex>
  );
};

export default LandingLayout;
