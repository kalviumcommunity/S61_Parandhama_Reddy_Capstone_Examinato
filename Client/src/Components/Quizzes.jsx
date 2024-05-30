/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Text, Heading } from "@chakra-ui/react";

const Quizzes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypesFromDb = async () => {
      try {
        const response = await axios.get("https://s61-parandhama-reddy-capstone-examinato.onrender.com/api/getquiz");
        const quizTypes = response.data.map((item) => item.type.toUpperCase());
        setTypes(quizTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
        setError("Failed to load types.");
      } finally {
        setLoading(false);
      }
    };

    fetchTypesFromDb();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const uniqueTypes = new Set(types);

  return (
    <Box className="p-10 bg-yellow-200 w-full h-auto font-roboto-serif">
      <Heading as="h1" className="text-2xl text-center text-slate-600 font-bold mb-4">
        Available Quizzes
      </Heading>
      <Text className="text-center text-slate-700">
        To Start with topic{' '}
        <Text as="span" className="text-red-600">
          Please click on the respective topic to start the Quiz
        </Text>
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        gap={7}
        p={2}
      >
        {Array.from(uniqueTypes).map((type) => (
          <Link to={`/quiz/${type}`} key={type}>
            <Box className="bg-green-300 shadow-lg rounded-md p-12 text-center cursor-pointer">
              <Text as="h2" className="text-sm text-white font-semibold mb-2">
                {type}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Quizzes;
