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
  Grid,
  GridItem,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionGridItem = motion(GridItem);

const Quizzes = () => {
  const [quizData, setQuizData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

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
        setQuizData(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load quiz data.");
        toast({
          title: "Error",
          description: "Failed to fetch quiz data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const decodedToken = JSON.parse(jsonPayload);

          if (decodedToken.user && decodedToken.user.name) {
            setAuthors([
              { id: "All", fullName: "All" },
              { id: decodedToken.user.id, fullName: decodedToken.user.name },
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
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
  };

  const handleAuthorToggle = () => {
    setSelectedAuthor((prev) => (prev === "All" ? authors[1].id : "All"));
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );

  const filteredData =
    selectedAuthor === "All"
      ? quizData
      : quizData.filter((item) => item.author === selectedAuthor);

  const uniqueTypes = Array.from(
    new Set(filteredData.map((item) => item.type.trim().toUpperCase()))
  );

  return (
    <Box p={8} minH="100vh" bgGradient="linear(to-br, gray.50, teal.100)">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        {authors.length > 1 && (
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="author-switch" mb="0" fontSize="lg">
              {selectedAuthor === "All" ? "All Quizzes" : authors[1].fullName}
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
          onClick={() => navigate("/home")}
          _hover={{ transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
        >
          Leave Quiz
        </Button>
      </Box>

      {/* Title */}
      <Heading
        as="h1"
        fontSize="4xl"
        textAlign="center"
        fontWeight="bold"
        color="teal.700"
        mb={4}
      >
        Available Quizzes
      </Heading>
      <Text fontSize="lg" textAlign="center" color="gray.600" mb={6}>
        Select a topic to start the quiz!
      </Text>

      {/* Quizzes */}
      {uniqueTypes.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No quizzes available.
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          mt={8}
          mx="auto"
          maxW="6xl"
        >
          {uniqueTypes.map((type, index) => (
            <MotionGridItem
              key={index}
              p={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgGradient="linear(to-r, teal.500, teal.400)"
              color="white"
              fontSize="xl"
              fontWeight="bold"
              borderRadius="lg"
              shadow="lg"
              cursor="pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition="0.3s ease-in-out"
              onClick={() => navigate(`/quiz/${type}?author=${selectedAuthor}`)}
              _before={{
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                borderRadius: "lg",
                transition: "all 0.3s ease-in-out",
                zIndex: "-1",
              }}
              _hover={{
                _before: {
                  transform: "scale(1.05)",
                },
              }}
            >
              {type}
            </MotionGridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Quizzes;
