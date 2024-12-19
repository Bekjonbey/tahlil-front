import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
} from "@chakra-ui/react";
interface Load {
  loadId: number;
  description: string;
  payment: string;
  created_at: string;
  booked: boolean;
}

const LoadForm = () => {
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState(0);
  const [loads, setLoads] = useState<Load[]>([]);
  const [loadsForConfirming, setLoadsForConfirming] = useState<Load[]>([]);

  const toast = useToast();

  const fetchLoads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:8090/api/load/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoads(response.data.data);
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };
  const fetchLoadsForConfirming = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8090/api/load/all-confirm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadsForConfirming(response.data.data);
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  useEffect(() => {
    fetchLoadsForConfirming();
  }, []);

  const handleAddCard = () => {
    setAddCardOpen(true);
  };

  const handleAddLoad = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = { description, payment };

      await axios.post("http://localhost:8090/api/load/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Load Added",
        description: "The load has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form fields
      setDescription("");
      setPayment(0);
    } catch (error) {
      console.error("Error adding load:", error);

      toast({
        title: "Error",
        description: "Failed to add the load. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleConfirmLoad = async (loadId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/api/transaction/get-by-loadId/${loadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      const transactionId = response.data.data;
      await axios.post(
        `http://localhost:8090/api/transaction/confirm/${transactionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error booking load:", error);
    }
  };
  const handleAddCardSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8090/api/card/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset the form
      form.reset();

      // Close the modal
      setAddCardOpen(false);

      // Display success message
      toast({
        title: "Credit Card Added",
        description: "The credit card has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding credit card:", error);

      // Display error message
      toast({
        title: "Error",
        description: "Failed to add the credit card. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Box mt={4}>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="payment" mb={4}>
        <FormLabel>Payment</FormLabel>
        <Input
          type="number"
          value={payment}
          onChange={(e) => setPayment(parseFloat(e.target.value))}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleAddLoad}>
        Add Load
      </Button>
      <Button onClick={handleAddCard} colorScheme="blue" ml={4}>
        Add Credit Card
      </Button>

      <Flex direction="column" align="center">
        <p>All of loads you have added</p>
        <Flex flexWrap="wrap" justifyContent="flex-end">
          {loads.length > 0 ? (
            loads.map((load) => (
              <Card key={load.loadId} maxW="sm" w="full" mb={4} mr={4}>
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold">
                    {load.description}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text>Payment: {load.payment}</Text>
                  <Text>Load ID: {load.loadId}</Text>
                  <Text>Created At: {formatDate(load.created_at)}</Text>
                  <Text>Booked: {load.booked ? "Yes" : "No"}</Text>
                </CardBody>
              </Card>
            ))
          ) : (
            <div>No loads found</div>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" align="center">
        <p>Ready loads to be confirmed</p>
        <Flex flexWrap="wrap" justifyContent="flex-end">
          {loadsForConfirming.length > 0 ? (
            loadsForConfirming.map((load) => (
              <Card key={load.loadId} maxW="sm" w="full" mb={4} mr={4}>
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold">
                    {load.description}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text>Payment: {load.payment}</Text>
                  <Text>Load ID: {load.loadId}</Text>
                  <Text>Created At: {formatDate(load.created_at)}</Text>
                  <Text>Booked: {load.booked ? "Yes" : "No"}</Text>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleConfirmLoad(load.loadId)}
                    isDisabled={load.booked}
                  >
                    {load.booked ? "Confirmed" : "Confirm Load"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div>No loads found</div>
          )}
        </Flex>
      </Flex>

      <Modal isOpen={isAddCardOpen} onClose={() => setAddCardOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Credit Card</ModalHeader>
          <ModalBody>
            <form onSubmit={handleAddCardSubmit}>
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl id="cardNumber" mb={4}>
                <FormLabel>Card Number</FormLabel>
                <Input type="text" name="cardNumber" />
              </FormControl>
              <FormControl id="balance" mb={4}>
                <FormLabel>Card balance</FormLabel>
                <Input type="text" name="balance" />
              </FormControl>
              <Button type="submit" colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={() => setAddCardOpen(false)}>Cancel</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LoadForm;
