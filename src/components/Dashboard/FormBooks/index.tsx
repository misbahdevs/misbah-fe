/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaFormBooks } from "@/shared/schema/FormSchema";
import { User } from "@/shared/schema/UserEntity";
import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Book } from "@/shared/schema/BookEntity";
import { useCreateDataBooks } from "@/shared/hooks/useCreateDataBooks";
import { useGetDataBooksById } from "@/shared/hooks/useGetDataBooksById";
import { useUpdateDataBooks } from "@/shared/hooks/useUpdateDataBooks";

interface Props {
  userData: User;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  idUpdateBooks: string | null;
  setIdUpdateBooks: (arg: string | null) => void;
}

const FormBooks = (props: Props) => {
  const [dataBookUpdate, setDataBookUpdate] = useState<Book | null>(null);
  const [isFormProcess, setFormProcess] = useState(false);
  const { userData, refetch, idUpdateBooks, setIdUpdateBooks } = props;
  const toast = useToast();
  const { mutateAsync: createBooks } = useCreateDataBooks(userData.accessToken);
  const fetchData = async () => {
    try {
      if (idUpdateBooks) {
        const res = await useGetDataBooksById(
          idUpdateBooks,
          userData.accessToken
        );
        setDataBookUpdate(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { mutateAsync: updateBooks } = useUpdateDataBooks(userData.accessToken);
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaFormBooks),
    defaultValues: { pages: 0 },
  });

  const handleFormSubmit = useCallback(
    async (formData: any) => {
      try {
        setFormProcess(true);

        if (!idUpdateBooks) {
          const res = await createBooks(formData);

          if (res.status !== 200) {
            return;
          }
          toast({
            title: res.data.message,
            status: "success",
            isClosable: true,
          });
        } else {
          const res = await updateBooks({ id: idUpdateBooks, ...formData });

          if (res.status !== 200) {
            return;
          }
          toast({
            title: res.data.message,
            status: "success",
            isClosable: true,
          });

          setIdUpdateBooks(null);
        }

        reset();
        refetch();
      } catch (err) {
        console.error(err);
        toast({
          title: idUpdateBooks ? "Books not updated" : "Books not created",
          status: "error",
          isClosable: true,
        });
      } finally {
        setFormProcess(false);
      }
    },
    [
      createBooks,
      updateBooks,
      refetch,
      reset,
      toast,
      idUpdateBooks,
      setIdUpdateBooks,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, idUpdateBooks]);

  useEffect(() => {
    if (dataBookUpdate) {
      setValue("isbn", dataBookUpdate.isbn);
      setValue("title", dataBookUpdate.title);
      setValue("subtitle", dataBookUpdate.subtitle);
      setValue("author", dataBookUpdate.author);
      setValue("published", dataBookUpdate.published);
      setValue("publisher", dataBookUpdate.publisher);
      setValue("pages", dataBookUpdate.pages);
      setValue("description", dataBookUpdate.description);
      setValue("website", dataBookUpdate.website);
    }
  }, [setValue, dataBookUpdate]);

  console.log(!!errors.isbn);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: "100%" }}>
      <VStack gap={4}>
        <FormControl isInvalid={!!errors.isbn}>
          <FormLabel>ISBN</FormLabel>
          <Input
            type="string"
            id="isbn"
            placeholder="Input isbn"
            {...register("isbn")}
          />
          {errors.isbn && (
            <FormErrorMessage>{errors.isbn?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            id="title"
            placeholder="Input title"
            {...register("title")}
          />
          {errors.title && (
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.subtitle}>
          <FormLabel>Subtitle</FormLabel>
          <Input
            type="text"
            id="subtitle"
            placeholder="Input subtitle"
            {...register("subtitle")}
          />
          {errors.subtitle && (
            <FormErrorMessage>{errors.subtitle?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.author}>
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            id="author"
            placeholder="Input author"
            {...register("author")}
          />
          {errors.author && (
            <FormErrorMessage>{errors.author?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.published}>
          <FormLabel>Published</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            id="published"
            {...register("published")}
          />
          {errors.published && (
            <FormErrorMessage>{errors.published?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.publisher}>
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            id="publisher"
            placeholder="Input publisher"
            {...register("publisher")}
          />
          {errors.publisher && (
            <FormErrorMessage>{errors.publisher?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.pages}>
          <FormLabel>Pages</FormLabel>
          <Input
            type="number"
            id="pages"
            placeholder="Input pages"
            {...register("pages")}
          />
          {errors.pages && (
            <FormErrorMessage>{errors.pages?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            placeholder="Here is a sample placeholder"
            {...register("description")}
          />
          {errors.description && (
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.website}>
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            id="website"
            placeholder="Input website"
            {...register("website")}
          />
          {errors.website && (
            <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
          )}
        </FormControl>
        {!idUpdateBooks ? (
          <Flex alignItems={"flex-start"} w="full">
            <Button type="submit" isLoading={isFormProcess} colorScheme="teal">
              Add Book
            </Button>
          </Flex>
        ) : (
          <Flex direction="row" gap={5} alignItems={"flex-start"} w="full">
            <Button type="submit" isLoading={isFormProcess} colorScheme="teal">
              Update Book
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset();
                setIdUpdateBooks(null);
              }}
              colorScheme="yellow"
            >
              Cancel
            </Button>
          </Flex>
        )}
      </VStack>
    </form>
  );
};

export default FormBooks;
