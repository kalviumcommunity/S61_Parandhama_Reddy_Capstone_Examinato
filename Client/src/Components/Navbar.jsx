import { useNavigate } from "react-router-dom";
import {
  Flex,
  Image,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
  Heading,
} from "@chakra-ui/react";
import logo from "../Assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <Flex
      className="sticky justify-between items-center"
      border="2px"
      borderColor="black"
      borderRadius="2xl"
      bg="white"
      p="3"
      margin="2"
      direction={{ base: "row", md: "row" }}
    >
      <Image
        src={logo}
        alt="Logo"
        h={{ base: "20px", md: "50px" }}
        w="auto"
        cursor="pointer"
        onClick={handleHomeClick}
      />

      <Flex
        className="justify-center items-center gap-6"
        mt={{ base: 4, md: 0 }}
      >
        <Popover trigger="hover" placement="bottom-start">
          <PopoverTrigger>
            <Text cursor="pointer" _hover={{ color: "blue.500" }}>About</Text>
          </PopoverTrigger>
          <PopoverContent p="4" maxW="300px" boxShadow="lg">
            <PopoverArrow />
            <PopoverBody>
              <Heading as="h3" size="md" mb="2" color="teal.600">
                About Examinato
              </Heading>
              <Text fontSize="sm">
                Examinato is your platform for creating, managing, and
                participating in quizzes! Whether you're an educator, student,
                or knowledge seeker, Examinato allows easy quiz creation and
                sharing, tailored to your needs.
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover trigger="hover" placement="bottom-start">
          <PopoverTrigger>
            <Text cursor="pointer" _hover={{ color: "blue.500" }}>
              Contact
            </Text>
          </PopoverTrigger>
          <PopoverContent p="4" maxW="300px" boxShadow="lg">
            <PopoverArrow />
            <PopoverBody>
              <Heading as="h3" size="md" mb="2" color="teal.600">
                Contact Us
              </Heading>
              <Text fontSize="sm">
                Have questions or feedback? Reach us at{" "}
                <strong>contact@examinato.com</strong>.
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Button
          bg="black"
          color="white"
          w={{ base: "100%", md: "75%" }}
          px="5"
          py="2"
          borderRadius="2xl"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
