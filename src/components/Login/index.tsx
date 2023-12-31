/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { validationSchemeLogin } from "@/shared/schema/FormSchema";
import Link from "next/link";

const LoginComponent = () => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemeLogin),
  });

  const handleFormSubmit = useCallback(
    async (formData: any) => {
      try {
        setIsLoginLoading(true);
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (!res?.ok) {
          setIsLoginLoading(false);
          toast({
            title: "Username or password is wrong",
            status: "error",
            isClosable: true,
          });
          return;
        }

        setIsLoginLoading(false);
        router.push(searchParams.get("callbackUrl") || "/");
      } catch (err) {
        console.error(err);
      }
    },
    [router, searchParams, toast]
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
            Form Login
          </Heading>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack gap={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Input your email"
                  {...register("email")}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Input your password"
                  {...register("password")}
                />
                {errors.password && (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoginLoading}
              >
                Login
              </Button>
            </VStack>
          </form>
        </Stack>
      </Stack>
      <Text>
        Don`t have an account yet? <Link href={"/register"}>Register page</Link>
      </Text>
    </Flex>
  );
};

export default LoginComponent;
