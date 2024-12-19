import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Checkbox,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the payload object
    const payload = {
      phone,
      password,
    };

    try {
      // Send the POST request to the backend API for sign in
      const response = await axios.post(
        "http://localhost:8090/api/auth/sign-in",
        payload
      );
      console.log("User signed in successfully!");

      // Retrieve the access token from the response
      const { accessToken } = response.data.data;
      console.log("Access Token:", accessToken);
      //getting role
      const { message } = response.data;
      console.log("Access role:", message);

      //store it in local storage
      localStorage.setItem("token", accessToken);

      // Navigate to the RoomForm component
      if (message === "COMPANY") navigate("/loads");
      else if (message == "USER") navigate("/user-loads");
      else navigate("/loads");
    } catch (error) {
      // Display the error message to the user
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      {...(error && (
        <Alert status="error" marginBottom="1rem">
          <AlertIcon />
          {error}
        </Alert>
      ))}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="phone">
              <FormLabel>Phone number</FormLabel>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignInForm;
