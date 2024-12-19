import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Spinner,
  SimpleGrid,
  Center,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

const BookRoomPage = () => {
  const { roomName } = useParams();
  const [freeTimes, setFreeTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchFreeTimes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/api/rooms/${roomName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFreeTimes(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching free times:", error);
      setIsLoading(false);
    }
  };

  const handleBookRoom = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8090/api/rooms/${roomName}/book`,
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Room booked successfully!");
      setError(null);
      console.log("Room booked successfully:", response.data);
      // You can add any additional logic or UI updates here upon successful booking
    } catch (error) {
      console.error("Error booking room:", error);
      setError("An error occurred while booking the room. Please try again.");
      setSuccessMessage(null);
      // You can handle and display any error messages here
    }
  };

  useEffect(() => {
    fetchFreeTimes();
  }, [roomName]);

  return (
    <Box>
      {isLoading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          <VStack spacing={4} alignItems="flex-end" marginBottom={4}>
            <Input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <Input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <Button onClick={handleBookRoom}>Book this room</Button>
          </VStack>

          <br />

          <p>This is bookable time of this room for all time</p>
          <br />
          {freeTimes.length > 0 ? (
            <SimpleGrid columns={3} spacing={4}>
              {freeTimes.map((time, index) => (
                <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                  <Text>Start Date: {time.startDate}</Text>
                  <Text>End Date: {time.endDate}</Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No free times available for this room.</Text>
          )}

          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setError(null)}
              />
            </Alert>
          )}

          {successMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertTitle>{successMessage}</AlertTitle>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setSuccessMessage(null)}
              />
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default BookRoomPage;
