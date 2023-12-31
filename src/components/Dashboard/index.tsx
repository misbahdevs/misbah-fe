"use client";

import { TableContainer, VStack, Heading, Flex } from "@chakra-ui/react";
import FormBooks from "./FormBooks";
import TableBooks from "./TableBooks";
import { useCustomSession } from "@/shared/context/context";
import { User } from "@/shared/schema/UserEntity";
import { useState } from "react";
import { useGetDataBooks } from "@/shared/hooks/useGetDataBooks";

const DashboardComponent = () => {
  const [idUpdateBooks, setIdUpdateBooks] = useState<null | string>(null);
  const { user } = useCustomSession();
  const { data: dataBooks, refetch } = useGetDataBooks(user as User);
  return (
    <Flex direction="row" gap={5}>
      <VStack bgColor="white" p={5} flex={1} rounded="lg" shadow="lg">
        <Heading fontSize={"2xl"}>
          {!idUpdateBooks ? "Form Add Books" : "Form Update Books"}
        </Heading>
        <FormBooks
          userData={user as User}
          refetch={refetch}
          idUpdateBooks={idUpdateBooks}
          setIdUpdateBooks={setIdUpdateBooks}
        />
      </VStack>
      <TableContainer flex={2} bgColor="white" p={5} rounded="lg" shadow="lg">
        <TableBooks
          dataBooks={dataBooks?.data}
          userData={user as User}
          refetch={refetch}
          setIdUpdateBooks={setIdUpdateBooks}
        />
      </TableContainer>
    </Flex>
  );
};

export default DashboardComponent;
