/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Flex, Button, Input, Box, Text } from "@chakra-ui/react";

const HomePage = ({ topics, onStartQuiz }) => {
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    navigate("/quizzes");
  };

  return (
    <>
      <Box px={4} py={6} bg="white" shadow="md" className="sticky top-0 z-10">
        <Navbar />
      </Box>

      <Flex
        justify="center"
        align="center"
        gap={8}
        my={10}
        fontFamily="Roboto"
        fontStyle="serif"
      >
        <Link to={"/create-quiz"}>
          <Button
            px={6}
            py={3}
            bg="teal.600"
            color="white"
            rounded="xl"
            _hover={{ bg: "teal.600" }}
            shadow="md"
            fontWeight="bold"
          >
            Create Quiz
          </Button>
        </Link>

        <Button
          onClick={handleJoinQuiz}
          px={6}
          py={3}
          bg="red.500"
          color="white"
          rounded="xl"
          _hover={{ bg: "red.600" }}
          shadow="md"
          fontWeight="bold"
        >
          Join Quiz
        </Button>
      </Flex>

      <Flex justify="center" mb={8} fontFamily="Roboto" fontStyle="serif">
        <Input
          type="text"
          placeholder="Enter type of Quiz"
          borderColor="gray.400"
          focusBorderColor="black"
          w={{ base: "90%", md: "50%" }}
          p={3}
          rounded="xl"
          shadow="sm"
        />
      </Flex>

      <Box
        p={8}
        mx="auto"
        maxW="container.lg"
        bg="white"
        shadow="lg"
        rounded="xl"
        border="1px solid"
        borderColor="gray.300"
      >
        {topics.map((topic, index) => (
          <Box
            key={index}
            borderBottom="1px"
            borderColor="gray.300"
            py={4}
            _last={{ borderBottom: "none" }}
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="bold" textAlign="left">
                {topic.name}
              </Text>
              <Button
                onClick={() => onStartQuiz(topic)}
                px={4}
                py={2}
                bg="blue.500"
                color="white"
                rounded="xl"
                _hover={{ bg: "blue.600" }}
                shadow="md"
              >
                Start Quiz
              </Button>
            </Flex>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default HomePage;
