/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { validationSchemeRegister } from "@/shared/schema/FormSchema";
import Link from "next/link";
import { useCreateUser } from "@/shared/hooks/useCreateUser";

const RegisterComponent = () => {
  const router = useRouter();
  const toast = useToast();
  const mutationRegister = useCreateUser();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemeRegister),
  });

  const handleFormSubmit = useCallback(
    async (formData: any) => {
      try {
        const res = await mutationRegister.mutateAsync({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmation_password,
        });

        if (res.status !== 200) {
          return;
        }

        toast({
          title: "User created",
          status: "success",
          isClosable: true,
        });
        reset();
      } catch (err) {
        console.error(err);
        toast({
          title: "User failed created",
          status: "error",
          isClosable: true,
        });
      }
    },
    [mutationRegister, reset, toast]
  );

  return (
    <Flex direction="column" gap={3}>
      <Stack
        bgColor="white"
        w={[300, 400, 500]}
        p={5}
        rounded="lg"
        boxShadow="md"
      >
        <Stack>
          <Heading fontSize="xl" mb={4}>
            Form Register
          </Heading>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack gap={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  type="name"
                  placeholder="Input your name..."
                  {...register("name")}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Input your email..."
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Input your password..."
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Confirmation Password</FormLabel>
                <Input
                  id="confirmation_password"
                  type="password"
                  placeholder="Input your password confirmation..."
                  {...register("confirmation_password")}
                />
                <FormErrorMessage>
                  {errors.confirmation_password?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={mutationRegister.isPending}
              >
                Register
              </Button>
            </VStack>
          </form>
        </Stack>
      </Stack>
      <Text>
        Do you already have an account?{" "}
        <Link href={"/login"} color="blue">
          Login page
        </Link>
      </Text>
    </Flex>
  );
};

export default RegisterComponent;
