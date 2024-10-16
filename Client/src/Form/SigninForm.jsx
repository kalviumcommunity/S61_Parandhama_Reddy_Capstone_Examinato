/* eslint-disable no-unused-vars */
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
import SignInImg from "../Assets/SignInImg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SigninForm = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://s61-parandhama-reddy-capstone-examinato-1.onrender.com/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error("Error during signup!");
    }
  };

  const handleLogin = () => {
    navigate("/login");
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
            <strong>Create your Account</strong>
          </Text>
          <Box px="5" pt="4">
            <FormLabel>Full Name</FormLabel>
            <Input
              w="100%"
              border="2px solid"
              borderColor="slate.400"
              background="rgba(255, 255, 255, 0.8)"
              borderRadius="8px"
              px="3"
              py="2"
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Box>
          <Box px="5" pt="4">
            <FormLabel>Email</FormLabel>
            <Input
              w="100%"
              border="2px solid"
              borderColor="slate.400"
              background="rgba(255, 255, 255, 0.8)"
              borderRadius="8px"
              px="3"
              py="2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box px="5" pt="4">
            <FormLabel>Password</FormLabel>
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
                placeholder="Password"
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
          <Box px="5" pt="4">
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                w="100%"
                border="2px solid"
                borderColor="slate.400"
                background="rgba(255, 255, 255, 0.8)"
                borderRadius="8px"
                px="3"
                py="2"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleConfirmPasswordVisibility}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box px="5" pt="6" w="100%">
            <Button
              type="submit"
              borderRadius="2xl"
              bg="black"
              color="white"
              px="8"
              py="3"
              w="100%"
            >
              Sign Up
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
            Already have an account?{" "}
            <Text
              as="span"
              color="#F81212"
              cursor="pointer"
              onClick={handleLogin}
              fontWeight="bold"
            >
              Log In
            </Text>
          </Text>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default SigninForm;
