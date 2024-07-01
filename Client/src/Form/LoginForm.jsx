/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Box,
  Text,
  Input,
  Button,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/LoginImg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://s61-parandhama-reddy-capstone-examinato.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.message === "Login successful") {
        Cookies.set("token", data.token);
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
    window.location.href =
      "https://s61-parandhama-reddy-capstone-examinato.onrender.com/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href =
      "https://s61-parandhama-reddy-capstone-examinato.onrender.com/auth/github";
  };

  return (
    <Box
      bgImage={`url(https://i.pinimg.com/474x/0a/55/32/0a5532e8c0010013384ea9b581ecab6d.jpg)`}
      bgSize="cover"
      bgPosition="center"
      h="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="roboto-serif"
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        h={["auto", "85vh"]}
        w={["90%", "70%", "50%", "30%"]}
        borderRadius="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={["4", "8"]}
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.3)"
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Text textAlign="center" fontSize="2xl" p="2">
            <strong>Login to your Account</strong>
          </Text>
          <Box px="5">
            <FormLabel color="#9E9C9C">Email</FormLabel>
            <Input
              w="100%"
              border="2px solid"
              borderColor="slate.400"
              background="rgba(255, 255, 255, 0.8)"
              borderRadius="8px"
              px="3"
              py="2"
              type="email"
              placeholder="Enter your Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box px="5" pt="4">
            <FormLabel color="#9E9C9C">Password</FormLabel>
            <InputGroup>
              <Input
                w="100%"
                border="2px solid"
                borderColor="slate.400"
                background="rgba(255, 255, 255, 0.8)"
                borderRadius="8px"
                px="3"
                py="2"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box px="5" pt="6">
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
      <ToastContainer />
    </Box>
  );
};

export default LoginForm;
