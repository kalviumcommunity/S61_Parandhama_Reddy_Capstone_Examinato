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
          "https://s61-parandhama-reddy-capstone-examinato.onrender.com/api/getquiz",
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        console.log("Fetched quiz data:", response.data); // Added logging
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
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

          console.log("Decoded Token:", decodedToken);

          if (decodedToken.user && decodedToken.user.name) {
            const userName = decodedToken.user.name;
            setAuthors([
              { id: "All", fullName: "All" },
              { id: decodedToken.user.id, fullName: userName },
            ]);
          } else {
            console.error("Decoded token does not contain a valid user name.");
            setError("Failed to load authors.");
          }
        }
      } catch (error) {
        console.error("Error decoding token or fetching author:", error);
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

  const uniqueTypes = [...new Set(filteredData.map((item) => item.type))];

  return (
    <Box className="p-10 bg-yellow-200 w-full h-auto font-roboto-serif">
      <Box className="flex justify-end mb-4">
        {authors.length > 1 && (
          <FormControl className="flex justify-end items-center">
            <FormLabel htmlFor="author-switch" mb="0">
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
      </Box>
      <Button colorScheme="red" onClick={() => navigate("/home")}>
        Leave Quiz
      </Button>
      <Heading
        as="h1"
        className="text-2xl text-center text-slate-600 font-bold my-4"
      >
        Available Quizzes
      </Heading>
      <Text className="text-center text-slate-700">
        To start with topic{" "}
        <Text as="span" className="text-red-600">
          Please click on the respective topic to start the Quiz
        </Text>
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={6}
      >
        {uniqueTypes.map((type, index) => (
          <Box
            key={index}
            className="h-40 text-center bg-teal-500 text-white flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
            onClick={() => navigate(`/quiz/${type}`)} // Ensure correct URL format
          >
            <Text className="text-xl font-bold">{type}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Quizzes;
