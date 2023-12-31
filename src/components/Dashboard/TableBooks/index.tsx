import {
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { useDeleteDataBooks } from "@/shared/hooks/useDeleteDataBooks";
import { User } from "@/shared/schema/UserEntity";
import type { AxiosResponse } from "axios";
import { useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  dataBooks: any;
  userData: User;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  setIdUpdateBooks: (arg: string | null) => void;
}

const TableBooks = (props: Props) => {
  const { dataBooks, userData, refetch, setIdUpdateBooks } = props;
  const toast = useToast();
  const { mutateAsync: deleteBooks } = useDeleteDataBooks(userData);
  const deleteDataBooks = useCallback(
    async (id: string) => {
      try {
        const res = await deleteBooks(id);
        if (res.status !== 200) {
          return;
        }
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
        });
        refetch();
      } catch (err) {
        console.error(err);
        toast({
          title: "Books failed deleted.",
          status: "error",
          isClosable: true,
        });
      }
    },
    [deleteBooks, refetch, toast]
  );

  if (!dataBooks) {
    return (
      <Grid w="full" h="full" alignItems="center" justifyItems="center">
        <Spinner />
      </Grid>
    );
  }

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>NO</Th>
          <Th>ISBN</Th>
          <Th>TITLE</Th>
          <Th>SUBTITLE</Th>
          <Th>AUTHOR</Th>
          <Th>PUBLISHED</Th>
          <Th>PUBLISHER</Th>
          <Th>PAGES</Th>
          <Th>DESCRIPTION</Th>
          <Th>WEBSITE</Th>
          <Th>ACTION</Th>
        </Tr>
      </Thead>
      {dataBooks.data.length === 0 && (
        <TableCaption>Data books not found.</TableCaption>
      )}
      <Tbody>
        {dataBooks.data.map((item: any, idx: number) => (
          <Tr key={idx}>
            <Td>{idx + 1}</Td>
            <Td>{item.isbn}</Td>
            <Td>{item.title}</Td>
            <Td>{item.subtitle}</Td>
            <Td>{item.author}</Td>
            <Td>{item.published}</Td>
            <Td>{item.publisher}</Td>
            <Td>{item.pages}</Td>
            <Td>{item.description}</Td>
            <Td>{item.website}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoMdArrowDropdown />}
                  colorScheme="teal"
                >
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setIdUpdateBooks(item.id)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => deleteDataBooks(item.id)}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableBooks;
