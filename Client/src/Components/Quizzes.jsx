import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const Quizzes = () => {
  const [quizData, setQuizData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          "https://s61-parandhama-reddy-capstone-examinato-1.onrender.com/api/getquiz",
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setQuizData(response.data);
      } catch (error) {
        setError("Failed to load quiz data.");
      }
    };

    const fetchAuthorFromToken = async () => {
      try {
        const token = getCookie("token");
        if (token) {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          const decodedToken = JSON.parse(jsonPayload);

          if (decodedToken.user && decodedToken.user.name) {
            const userName = decodedToken.user.name;
            setAuthors([
              { id: "All", fullName: "All" },
              { id: decodedToken.user.id, fullName: userName },
            ]);
          } else {
            setError("Failed to load authors.");
          }
        }
      } catch (error) {
        setError("Failed to load authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
    fetchAuthorFromToken();
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleAuthorToggle = () => {
    setSelectedAuthor((prev) => (prev === "All" ? authors[1].id : "All"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredData =
    selectedAuthor === "All"
      ? quizData
      : quizData.filter((item) => item.author === selectedAuthor);

  // Create unique types from the filtered data, normalizing to lowercase
  const uniqueTypes = Array.from(
    new Set(filteredData.map((item) => item.type.trim().toUpperCase()))
  );

  return (
    <Box className="p-8 bg-yellow-200 min-h-screen">
      <Box className="flex justify-between items-center mb-6">
        {authors.length > 1 && (
          <FormControl className="flex items-center">
            <FormLabel htmlFor="author-switch" mb="0" className="text-gray-600">
              {selectedAuthor === "All" ? "All" : authors[1].fullName}
            </FormLabel>
            <Switch
              id="author-switch"
              isChecked={selectedAuthor !== "All"}
              onChange={handleAuthorToggle}
              colorScheme="teal"
            />
          </FormControl>
        )}
        <Button
          colorScheme="red"
          size="md"
          className="transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/home")}
        >
          Leave Quiz
        </Button>
      </Box>
      <Heading
        as="h1"
        className="text-3xl font-bold text-center text-gray-700 mb-6"
      >
        Available Quizzes
      </Heading>
      <Text className="text-lg text-center text-gray-500 mb-4">
        To start a quiz,{" "}
        <Text as="span" className="text-teal-500 font-semibold">
          select a topic below
        </Text>
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={8}
        mt={8}
        className="mx-auto max-w-5xl"
      >
        {uniqueTypes.map((type, index) => (
          <Box
            key={index}
            className="h-48 flex items-center justify-center bg-teal-500 text-white rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate(`/quiz/${type}`)}
          >
            <Text className="text-2xl font-bold">{type}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Quizzes;
