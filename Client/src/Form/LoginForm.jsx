/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, FormLabel } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/LoginImg.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message === "Login successful") {
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during login!");
    }
  };

  const handleSignupClick = () => {
    navigate("/signin");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/auth/github";
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
        position="relative"
      >
        <Box
          bg="#FEE440"
          h="85vh"
          w="30%"
          m="0"
          position="absolute"
          right="0"
          borderRadius="20px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <form className="flex-col" onSubmit={handleSubmit}>
            <Text m="5" textAlign="center" fontSize="2xl" p="2">
              <strong>Login to your Account</strong>
            </Text>
            <Box px="5" w="100%">
              <FormLabel color="#9E9C9C">Email</FormLabel>
              <Input
                w="100%"
                border="2px solid"
                borderColor="slate.400"
                background="white"
                borderRadius="8px"
                px="3"
                py="2"
                type="email"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box px="5" w="100%" pt="4">
              <FormLabel color="#9E9C9C">Password</FormLabel>
              <Input
                w="100%"
                border="2px solid"
                borderColor="slate.400"
                background="white"
                borderRadius="8px"
                px="3"
                py="2"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box w="100%" px="5" pt="6">
              <Button
                type="submit"
                borderRadius="2xl"
                bg="black"
                color="white"
                px="8"
                py="3"
                w="100%"
              >
                Login
              </Button>
            </Box>
            <Box
              w="100%"
              px="5"
              pt="4"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button bg="transparent" onClick={handleGoogleLogin}>
                <FcGoogle className="m-5 h-10 w-10" />
              </Button>
              <Button bg="transparent" onClick={handleGithubLogin}>
                <FaGithub className="m-5 h-10 w-10" />
              </Button>
            </Box>
            <Text textAlign="center" pt="4">
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
      <ToastContainer />
    </Box>
  );
};

export default LoginForm;
