/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Assets/backgroundImage.png";
import logo from "../Assets/logo.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      position="relative"
      fontFamily="roboto-serif"
      textOverflow="wrap"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "auto",
      }}
    >
      <Flex justify="space-between" px="14" py="10">
        <Image src={logo} alt="Logo" h="50px" />
        <Flex gap="10" fontSize="20px">
          <Text>About</Text>
          <Text>Contact</Text>
          <Text onClick={handleSignInClick} cursor="pointer">Sign in</Text>
        </Flex>
      </Flex>
      <Box
        bg="red.300"
        position="absolute"
        top="40%"
        left="8.5%"
        transform="translate(-50%, -50%) rotate(90deg)"
        width="30%"
        height="30%"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          boxShadow: "7px 9px 12px -1px rgba(235,202,202,0.59)",
        }}
      />
      <Box
        position="relative"
        top="22"
        left="20"
        textAlign="wrap"
        w="38%"
        fontSize="xl"
      >
        <Heading as="h2">
          <strong>Welcome to Examinato!</strong>
        </Heading>
        <br />
        <Text>
          At Examinato, we're redefining the way you learn, assess, and engage
          with quizzes. Whether you're a student gearing up for exams or an
          educator looking to make assessments more interactive, Examinato is
          your all-in-one platform for seamless learning experiences.
        </Text>
      </Box>
      <Box
        position="absolute"
        left="60%"
        textAlign="wrap"
        w="38%"
        fontSize="xl"
      >
        <Heading as="h2">
          <strong>For Students:</strong>
        </Heading>
        <br />
        <Text>
          Unlock your potential with our extensive collection of quizzes
          spanning various subjects and difficulty levels. From math to
          literature, history to science, our quizzes are designed to challenge
          and inspire, helping you grasp concepts effectively and excel in your
          studies.
        </Text>
      </Box>
      <Box
        position="absolute"
        top="70%"
        left="20"
        textAlign="wrap"
        w="38%"
        fontSize="xl"
      >
        <Heading as="h2">
          <strong>For Educators:</strong>
        </Heading>
        <br />
        <Text>
          Create interactive quizzes tailored to your curriculum and teaching
          style. Engage your students with multimedia-rich questions, instant
          feedback, and customizable settings. With Examinato, assessment
          becomes an opportunity for collaborative learning and meaningful
          feedback.
        </Text>
      </Box>
      <Box
        position="relative"
        top="60%"
        left="18%"
        textAlign="wrap"
        w="22%"
        fontSize="xl"
      >
        <Heading as="h2">
          <strong>Key Features:</strong>
        </Heading>
        <br />
        <Text>
          • Create and Host Quizzes • Play and compete • Real-time Analytics •
          Customization Options • Mobile Friendly
        </Text>
      </Box>
      <Box
        position="fixed"
        left="70%"
        top="75%"
        w="20%"
        shadow="md"
        borderRadius="10px"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="#EF233CBD"
          p="5"
          borderRadius="10px"
          fontSize="20px"
          cursor="pointer"
          onClick={handleGetStartedClick}
        >
          Get Started <FaArrowRightLong />
        </Box>
      </Box>
      <Box
        as="footer"
        position="relative"
        top="75%"
        w="100%"
        bg="red.300"
        p="3"
      >
        <Flex justify="space-evenly">
          <Text>FAQS or Help Center</Text>
          <Text>
            <strong>Privacy Policy</strong> and <strong>Terms of Service</strong>
          </Text>
        </Flex>
        <Text textAlign="center">
          © 2024 Examinato, All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default LandingPage;
