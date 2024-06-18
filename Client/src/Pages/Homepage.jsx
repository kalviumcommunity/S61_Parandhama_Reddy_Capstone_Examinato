/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Flex, Button, Input } from "@chakra-ui/react";

const HomePage = ({ topics, onStartQuiz }) => {
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    navigate("/pin-verification");
  };

  return (
    <>
      <div className="px-3 py-5 sticky top-0">
        <Navbar />
      </div>
      <Flex
        justify="center"
        align="center"
        gap={20}
        m={10}
        fontFamily="Roboto"
        fontStyle="serif"
      >
        <Link to={"/create-quiz"}>
          <Button
            px={4}
            py={2}
            bg="black"
            color="white"
            rounded="xl"
            _hover={{ bg: "gray.800" }}
          >
            Create Quiz
          </Button>
        </Link>
        <Button
          onClick={handleJoinQuiz}
          px={4}
          py={2}
          bg="black"
          color="white"
          rounded="xl"
          _hover={{ bg: "gray.800" }}
        >
          Join Quiz
        </Button>
      </Flex>
      <Flex justify="center" fontFamily="Roboto" fontStyle="serif">
        <Input
          type="text"
          placeholder="Enter type of Quiz"
          borderWidth="1px"
          borderColor="black"
          w="50%"
          p={2}
          rounded="xl"
          shadow="inner"
        />
      </Flex>
      <div
        style={{ padding: "20px", borderRadius: "5px" }}
        className="shadow-container"
      >
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {topics.map((topic, index) => (
            <div key={index} className="border-b-[1px] border-b-black px-5">
              <div className="flex justify-between items-center m-5">
                <h3 style={{ textAlign: "center" }}>
                  <strong>{topic.name}</strong>
                </h3>
                <Button
                  onClick={() => onStartQuiz(topic)}
                  w="auto"
                  px={4}
                  py={2}
                  bg="#FF0000"
                  color="#000000"
                  border="none"
                  rounded="xl"
                  cursor="pointer"
                  mt={3}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
