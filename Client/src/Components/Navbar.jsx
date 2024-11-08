import { useNavigate } from "react-router-dom";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
        <Link to="/about">
          <Text cursor="pointer">About</Text>
        </Link>
        <Link to="/contact">
          <Text cursor="pointer">Contact</Text>
        </Link>
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
