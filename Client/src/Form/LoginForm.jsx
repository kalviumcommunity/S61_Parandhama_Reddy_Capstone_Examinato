/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/LoginImg.jpg";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  const handleSignupClick = () => {
    navigate("/signin");
  };

  return (
    <Box
      bg="#FFD60A"
      h="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="roboto-serif"
    >
      <Box
        bgImage={`url(${loginImg})`}
        bgSize="cover"
        bgPosition="center"
        h="85%"
        w="90%"
        borderRadius="20px"
        shadow="xl"
        position="absolute"
      >
        <Box
          bg="#FEE440"
          h="85vh"
          w="30%"
          m="0"
          className="absolute right-0 rounded-2xl"
        >
          <form className="flex-col" onSubmit={handleLogin}>
            <Text m="5" textAlign="center" fontSize="2xl" p="2">
              <strong>Login to your Account</strong>
            </Text>
            <Box px="5">
              <FormLabel color="#9E9C9C">Email</FormLabel>
            </Box>
            <Box px="5" py="2" fontSize="sm">
              <Input
                w="75%"
                border="2px solid"
                borderColor="slate.400"
                background="white"
                borderRadius="8px"
                px="3"
                py="2"
                type="email"
                placeholder="Enter your Email here"
              />
            </Box>
            <Box px="5">
              <FormLabel color="#9E9C9C">Password</FormLabel>
            </Box>
            <Box px="5" py="2" fontSize="sm">
              <Input
                w="75%"
                border="2px solid"
                borderColor="slate.400"
                background="white"
                borderRadius="8px"
                px="3"
                py="2"
                type="password"
                placeholder="Enter your Password"
              />
            </Box>
            <Box position="relative" left="24" top="5" pb="10">
              <Button
                onClick={handleLogin}
                borderRadius="2xl"
                bg="black"
                color="white"
                px="8"
                py="3"
              >
                Login
              </Button>
            </Box>
            <br />
            <Box
              position="absolute"
              left="5%"
              borderBottom="1px solid black"
              w="90%"
            />
            <Flex justifyContent="center" alignItems="center" pb="5">
              <Flex p="5">
                <FcGoogle className="m-5 h-10 w-10" />

                <FaGithub className="m-5 h-10 w-10" />
              </Flex>
            </Flex>
            <Text textAlign="center">
              Don't Have an Account?{" "}
              <Text
                as="span"
                color="#F81212"
                cursor="pointer"
                onClick={handleSignupClick}
                fontWeight="bold"
              >
                Sign Up
              </Text>
            </Text>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
