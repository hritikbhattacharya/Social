import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { DASHBOARD, LOGIN } from "lib/routes";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidator, passwordValidator, usernameValidator } from "utils/form-validation";

const Register = () => {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    //  console.log(data);
    const succeeded = await signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });

    if (succeeded) reset();
  };

  return (
    <Center w="100" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading nb="4" size="lg" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>

            <Input placeholder="username" {...register("username",usernameValidator)} />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>

            <Input
              type="email"
              placeholder="user@gmail.com"
              {...register("email", emailValidator)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>

            <Input
              type="password"
              placeholder="password"
              {...register("password", passwordValidator)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            size="md"
            w="full"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Signing up..."
          >
            Register
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Already have an account{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="teal.800"
            fontWeight="medium"
            textDecoration="underline"
            _hover={{ background: "teal.100" }}
          >
            Login
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Register;
