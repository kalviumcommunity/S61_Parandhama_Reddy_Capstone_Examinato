/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  HStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import walkingLeft from "../Assets/walking_Left.png";
import walkingRight from "../Assets/walking_Right.png";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = location.state;
  const totalQuestions = questions.length;
  const correctAnswers = questions.filter(
    (question) => answers[question.id] === question.correctAnswer
  ).length;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  const message =
    scorePercentage > 50
      ? "Congratulations! You passed the quiz."
      : "Unfortunately, you didn't pass. Try again!";

  return (
    <Flex h={"100vh"} alignItems={"center"} border={"1px solid red"}>
      <Box w={"100%"}>
        <Flex gap={"20px"} alignItems={"center"}>
          <Box>
            <Image
              src={walkingLeft}
              alt="Left Illustration"
              boxSize="500px"
              objectFit="cover"
            />
          </Box>

          <Spacer />

          <Box textAlign="center">
            <VStack align="center" flex="1">
              <Text fontSize="4xl" fontWeight="bold" mb={10}>
                Quiz Results
              </Text>
              <Text fontSize="xl" mb={10}>
                {message}
              </Text>
            </VStack>
            <Text fontSize="2xl" fontWeight="semibold" mb={8}>
              Your Answers
            </Text>
            <Text fontSize="2xl" fontWeight="semibold" mb={10}>
              {correctAnswers}/{totalQuestions}
            </Text>
            <Flex className="flex-col justify-center items-center gap-10">
              <Button
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={() => navigate("/home")}
              >
                Back to Home
              </Button>
              <Button
                className="py-2 px-4 bg-green-500 text-white rounded-md"
                onClick={() => navigate(-1)}
              >
                Try Again
              </Button>
            </Flex>
            <Box textAlign="center" mt={20}>
              <Text fontSize="xl" mb={4}>
                Rate the Quiz:
              </Text>
              <HStack spacing={4} justify="center">
                <Button
                  leftIcon={<FaFrown />}
                  colorScheme="red"
                  variant="outline"
                ></Button>
                <Button
                  leftIcon={<FaMeh />}
                  colorScheme="yellow"
                  variant="outline"
                ></Button>
                <Button
                  leftIcon={<FaSmile />}
                  colorScheme="green"
                  variant="outline"
                ></Button>
              </HStack>
            </Box>
          </Box>

          <Spacer />

          <Box>
            <Image
              src={walkingRight}
              alt="Right Illustration"
              boxSize="500px"
              objectFit="cover"
            />
          </Box>
        </Flex>
      </Box>

      {/* <Flex className="justify-center gap-8"> */}

      {/* </Flex> */}
    </Flex>
  );
};

export default ResultPage;
