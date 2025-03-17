/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  Flex,
  Button,
  Input,
  Box,
  Text,
  Container,
  Heading,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Badge,
  Image,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Icon,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tag,
  TagLabel,
  Avatar,
  SimpleGrid,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaPlus,
  FaUsers,
  FaPlay,
  FaArrowRight,
  FaLightbulb,
  FaFireAlt,
  FaHistory,
  FaTrophy,
  FaFilter,
  FaInfoCircle,
} from "react-icons/fa";

const HomePage = ({ topics, onStartQuiz }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [featuredTopic, setFeaturedTopic] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set a featured topic if topics exist
      if (topics.length > 0) {
        setFeaturedTopic(topics.find((topic) => topic.new) || topics[0]);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [topics]);

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinQuiz = () => {
    navigate("/quizzes");
  };

  const handleInfoClick = (topic) => {
    setFeaturedTopic(topic);
    onOpen();
  };

  // Theme colors
  const bgGradient = "linear(to-br, blue.50, purple.50)";
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const accentColor = "indigo.500";
  const accentHoverColor = "indigo.600";
  const secondaryColor = "teal.500";
  const secondaryHoverColor = "teal.600";
  const badgeBg = useColorModeValue("indigo.50", "indigo.900");
  const badgeColor = useColorModeValue("indigo.700", "indigo.200");

  // Stats data
  const statsData = [
    {
      label: "Quizzes",
      value: topics.length,
      icon: FaLightbulb,
      color: "purple",
    },
    { label: "Players", value: "1.2k+", icon: FaUsers, color: "blue" },
    { label: "Completed", value: "24k+", icon: FaHistory, color: "green" },
  ];

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Navbar */}
      <Box
        px={4}
        py={3}
        bg={cardBg}
        shadow="md"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Navbar />
      </Box>

      {/* Hero Section */}
      <Container maxW="container.xl" py={8}>
        <Box
          bg={cardBg}
          rounded="xl"
          shadow="xl"
          overflow="hidden"
          mb={8}
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            width="300px"
            height="300px"
            bgGradient="radial(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)"
            zIndex="0"
          />
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            position="relative"
            zIndex="1"
          >
            <Box p={{ base: 6, md: 10 }} flex="1">
              <Badge
                colorScheme="indigo"
                fontSize="sm"
                borderRadius="full"
                px={3}
                py={1}
                mb={4}
                bg={badgeBg}
                color={badgeColor}
              >
                Interactive Learning
              </Badge>
              <Heading size="xl" mb={4} color="gray.800" fontWeight="extrabold">
                Create and Share{" "}
                <Text as="span" color={accentColor}>
                  Interactive Quizzes
                </Text>
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={6} maxW="md">
                Engage your audience with custom quizzes on any topic. Easy to
                create, fun to take, and perfect for learning!
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Link to={"/create-quiz"}>
                  <Button
                    size="lg"
                    bg={accentColor}
                    color="green"
                    rounded="lg"
                    _hover={{
                      bg: accentHoverColor,
                      transform: "translateY(-2px)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    shadow="md"
                    fontWeight="semibold"
                    leftIcon={<FaPlus />}
                    transition="all 0.2s"
                  >
                    Create Quiz
                  </Button>
                </Link>

                <Button
                  onClick={handleJoinQuiz}
                  size="lg"
                  bg={secondaryColor}
                  color="white"
                  rounded="lg"
                  _hover={{
                    bg: secondaryHoverColor,
                    transform: "translateY(-2px)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  shadow="md"
                  fontWeight="semibold"
                  leftIcon={<FaUsers />}
                  transition="all 0.2s"
                >
                  Join Quiz
                </Button>
              </HStack>
            </Box>
            <Box flex="1" p={6} display={{ base: "none", md: "block" }}>
              <Image
                src="data:image/jpeg;base64,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"
                alt="Quiz illustration"
                borderRadius="lg"
                shadow="lg"
                transform="perspective(1000px) rotateY(-5deg)"
                transition="all 0.3s"
                _hover={{ transform: "perspective(1000px) rotateY(-2deg)" }}
              />
            </Box>
          </Flex>
        </Box>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={8}>
          {statsData.map((stat, index) => (
            <Box
              key={index}
              bg={cardBg}
              p={5}
              rounded="lg"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
            >
              <Stat>
                <Flex align="center" mb={2}>
                  <Icon
                    as={stat.icon}
                    color={`${stat.color}.500`}
                    boxSize={5}
                    mr={2}
                  />
                  <StatLabel fontSize="md" fontWeight="medium" color="gray.600">
                    {stat.label}
                  </StatLabel>
                </Flex>
                <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                  {stat.value}
                </StatNumber>
                <StatHelpText fontSize="sm" color="gray.500">
                  {stat.label === "Quizzes" ? "Available now" : "Total"}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        {/* Featured Topic */}
        {featuredTopic && (
          <Box
            mb={8}
            bg={cardBg}
            rounded="xl"
            shadow="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Flex
              p={6}
              bg="indigo.50"
              borderBottom="1px"
              borderColor={borderColor}
              justify="space-between"
              align="center"
            >
              <Heading size="md" color="gray.800">
                Featured Quiz
              </Heading>
              <Badge
                colorScheme="red"
                variant="solid"
                borderRadius="full"
                px={3}
                py={1}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaFireAlt} mr={1} />
                Popular
              </Badge>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }} p={6}>
              <Box flex="1" mr={{ base: 0, md: 6 }} mb={{ base: 4, md: 0 }}>
                <HStack spacing={2} align="center" mb={2}>
                  <Avatar
                    size="sm"
                    bg="indigo.500"
                    icon={<FaLightbulb color="white" size="14px" />}
                  />
                  <Text fontSize="xl" fontWeight="bold" color="gray.800">
                    {featuredTopic.name}
                  </Text>
                  {featuredTopic.new && (
                    <Badge
                      colorScheme="green"
                      variant="solid"
                      borderRadius="full"
                    >
                      New
                    </Badge>
                  )}
                </HStack>
                <Text fontSize="md" color="gray.600" mb={4}>
                  {featuredTopic.description ||
                    "Test your knowledge on this exciting topic!"}
                </Text>
                <HStack spacing={3}>
                  <Button
                    onClick={() => onStartQuiz(featuredTopic)}
                    bg={accentColor}
                    color="blue"
                    rounded="lg"
                    _hover={{ bg: accentHoverColor }}
                    shadow="md"
                    rightIcon={<FaPlay />}
                    size="md"
                  >
                    Start Quiz
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    borderColor="indigo.400"
                    color="indigo.600"
                    _hover={{ bg: "indigo.50" }}
                    onClick={() => handleInfoClick(featuredTopic)}
                  >
                    More Info
                  </Button>
                </HStack>
              </Box>
              <Box flex="1" display={{ base: "none", md: "block" }}>
                <Image
                  src="data:image/png;base64,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"
                  alt={`${featuredTopic.name} illustration`}
                  borderRadius="md"
                  shadow="sm"
                />
              </Box>
            </Flex>
          </Box>
        )}

        {/* Search Section */}
        <Box mb={8}>
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <InputGroup size="lg" flex="1">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search quizzes by topic..."
                borderColor={borderColor}
                focusBorderColor="indigo.400"
                bg={cardBg}
                rounded="lg"
                shadow="sm"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                _placeholder={{ color: "gray.400" }}
              />
            </InputGroup>
            <Button
              leftIcon={<FaFilter />}
              bg="gray.100"
              color="gray.700"
              _hover={{ bg: "gray.200" }}
              display={{ base: "none", md: "flex" }}
            >
              Filters
            </Button>
          </Flex>
        </Box>

        {/* Topics Section */}
        <Box
          p={0}
          bg={cardBg}
          shadow="lg"
          rounded="xl"
          borderWidth="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          <Box
            p={6}
            bg="indigo.50"
            borderBottom="1px"
            borderColor={borderColor}
          >
            <Flex justify="space-between" align="center">
              <Heading size="md" color="gray.800">
                Available Quiz Topics
              </Heading>
              <Badge
                colorScheme="indigo"
                fontSize="sm"
                borderRadius="full"
                px={3}
                py={1}
              >
                {filteredTopics.length} topics
              </Badge>
            </Flex>
          </Box>

          <VStack spacing={0} align="stretch" divider={<Divider />}>
            {isLoading ? (
              // Skeleton loading state
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Box key={index} p={4}>
                    <Flex justify="space-between" align="center">
                      <Box flex="1">
                        <Skeleton height="24px" width="60%" mb={2} />
                        <Skeleton height="16px" width="80%" />
                      </Box>
                      <Skeleton height="36px" width="100px" />
                    </Flex>
                  </Box>
                ))
            ) : filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => (
                <Box
                  key={index}
                  p={5}
                  _hover={{ bg: "gray.50" }}
                  transition="background 0.2s"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    wrap={{ base: "wrap", md: "nowrap" }}
                    gap={4}
                  >
                    <Box flex="1">
                      <HStack spacing={2} align="center" mb={2}>
                        <Avatar
                          size="sm"
                          bg="indigo.500"
                          icon={<FaLightbulb color="white" size="14px" />}
                        />
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="gray.800"
                        >
                          {topic.name}
                        </Text>
                        {topic.new && (
                          <Badge
                            colorScheme="green"
                            variant="solid"
                            borderRadius="full"
                            fontSize="xs"
                          >
                            New
                          </Badge>
                        )}
                      </HStack>
                      {topic.description && (
                        <Text fontSize="sm" color="gray.600" ml={10}>
                          {topic.description}
                        </Text>
                      )}
                      <HStack spacing={2} mt={2} ml={10}>
                        <Tag size="sm" colorScheme="blue" borderRadius="full">
                          <TagLabel>10 questions</TagLabel>
                        </Tag>
                        <Tag size="sm" colorScheme="purple" borderRadius="full">
                          <TagLabel>5 min</TagLabel>
                        </Tag>
                        <Tag size="sm" colorScheme="orange" borderRadius="full">
                          <TagLabel>
                            {Math.floor(Math.random() * 500) + 100} plays
                          </TagLabel>
                        </Tag>
                      </HStack>
                    </Box>
                    <HStack spacing={2}>
                      <Tooltip label="View details" placement="top">
                        <Button
                          onClick={() => handleInfoClick(topic)}
                          variant="ghost"
                          color="gray.600"
                          _hover={{ bg: "gray.100" }}
                          size="sm"
                          borderRadius="full"
                          p={0}
                          minW="36px"
                          h="36px"
                        >
                          <Icon as={FaInfoCircle} />
                        </Button>
                      </Tooltip>
                      <Button
                        onClick={() => onStartQuiz(topic)}
                        bg={accentColor}
                        color="white"
                        rounded="lg"
                        _hover={{ bg: accentHoverColor }}
                        shadow="sm"
                        rightIcon={<FaPlay />}
                        size="sm"
                      >
                        Start Quiz
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              ))
            ) : (
              <Box p={8} textAlign="center">
                <Text color="gray.500" fontSize="lg">
                  No topics match your search
                </Text>
                <Button
                  mt={4}
                  onClick={() => setSearchTerm("")}
                  colorScheme="indigo"
                  variant="outline"
                  size="sm"
                >
                  Clear Search
                </Button>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Quick Actions */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          mt={8}
        >
          <GridItem>
            <Box
              p={6}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              _hover={{ shadow: "lg", transform: "translateY(-3px)" }}
              cursor="pointer"
              onClick={() => navigate("/history")}
            >
              <Flex align="center">
                <Icon as={FaHistory} color="indigo.500" boxSize={6} mr={4} />
                <Box>
                  <Heading size="md" mb={1}>
                    Quiz History
                  </Heading>
                  <Text color="gray.600">
                    View your recent quizzes and results
                  </Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" color="gray.400" />
              </Flex>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              p={6}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              _hover={{ shadow: "lg", transform: "translateY(-3px)" }}
              cursor="pointer"
              onClick={() => navigate("/leaderboard")}
            >
              <Flex align="center">
                <Icon as={FaTrophy} color="yellow.500" boxSize={6} mr={4} />
                <Box>
                  <Heading size="md" mb={1}>
                    Leaderboard
                  </Heading>
                  <Text color="gray.600">
                    Check the top performers and rankings
                  </Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" color="gray.400" />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* Topic Info Modal */}
      {featuredTopic && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay backdropFilter="blur(4px)" />
          <ModalContent borderRadius="xl" overflow="hidden">
            <ModalHeader
              bg="indigo.50"
              borderBottom="1px"
              borderColor="gray.200"
              px={6}
              py={4}
            >
              <Flex align="center">
                <Avatar
                  size="sm"
                  bg="indigo.500"
                  icon={<FaLightbulb color="white" size="14px" />}
                  mr={2}
                />
                {featuredTopic.name}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p={6}>
              <Image
                src="/api/placeholder/700/200"
                alt={`${featuredTopic.name} cover`}
                borderRadius="md"
                mb={4}
              />
              <Text fontSize="md" color="gray.700" mb={4}>
                {featuredTopic.description ||
                  "This quiz tests your knowledge on various aspects of this topic with carefully crafted questions to challenge your understanding."}
              </Text>

              <SimpleGrid columns={2} spacing={4} mb={4}>
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold" fontSize="sm" color="gray.600">
                    Questions
                  </Text>
                  <Text fontSize="lg">10</Text>
                </Box>
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold" fontSize="sm" color="gray.600">
                    Estimated Time
                  </Text>
                  <Text fontSize="lg">5 minutes</Text>
                </Box>
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold" fontSize="sm" color="gray.600">
                    Difficulty
                  </Text>
                  <Text fontSize="lg">Intermediate</Text>
                </Box>
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold" fontSize="sm" color="gray.600">
                    Created
                  </Text>
                  <Text fontSize="lg">2 days ago</Text>
                </Box>
              </SimpleGrid>

              <Button
                onClick={() => {
                  onStartQuiz(featuredTopic);
                  onClose();
                }}
                width="full"
                bg={accentColor}
                color="white"
                rounded="lg"
                _hover={{ bg: accentHoverColor }}
                shadow="md"
                rightIcon={<FaPlay />}
                size="lg"
                mt={2}
              >
                Start Quiz
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default HomePage;
