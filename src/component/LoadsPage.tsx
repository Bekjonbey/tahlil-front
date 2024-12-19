import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CalculatePage: React.FC = () => {
  const [data, setData] = useState({
    productionVolume: { plan: "", actual: "" },
    fixedCosts: { plan: "", actual: "" },
    variableCosts: { plan: "", actual: "" },
    totalProductionCosts: { plan: "", actual: "" },
    variableCostPerUnit: { plan: "", actual: "" },
    fixedCostPerUnit: { plan: "", actual: "" },
    totalCostPerUnit: { plan: "", actual: "" },
  });

  const [responseResult, setResponseResult] = useState<any>(null);
  const toast = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    type: "plan" | "actual"
  ) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [type]: value,
      },
    }));
  };

  // Recalculate dependent fields whenever inputs change
  useEffect(() => {
    const productionVolumePlan = parseFloat(data.productionVolume.plan) || 0;
    const productionVolumeActual =
      parseFloat(data.productionVolume.actual) || 0;
    const fixedCostsPlan = parseFloat(data.fixedCosts.plan) || 0;
    const fixedCostsActual = parseFloat(data.fixedCosts.actual) || 0;
    const variableCostsPlan = parseFloat(data.variableCosts.plan) || 0;
    const variableCostsActual = parseFloat(data.variableCosts.actual) || 0;

    // Calculate total production costs
    const totalProductionCostsPlan = fixedCostsPlan + variableCostsPlan;
    const totalProductionCostsActual = fixedCostsActual + variableCostsActual;

    // Calculate variable cost per unit
    const variableCostPerUnitPlan = variableCostsPlan / productionVolumePlan;
    const variableCostPerUnitActual =
      variableCostsActual / productionVolumeActual;

    // Calculate fixed cost per unit
    const fixedCostPerUnitPlan = fixedCostsPlan / productionVolumePlan;
    const fixedCostPerUnitActual = fixedCostsActual / productionVolumeActual;

    // Calculate total cost per unit
    const totalCostPerUnitPlan = variableCostPerUnitPlan + fixedCostPerUnitPlan;
    const totalCostPerUnitActual =
      variableCostPerUnitActual + fixedCostPerUnitActual;

    setData((prevData) => ({
      ...prevData,
      totalProductionCosts: {
        plan: totalProductionCostsPlan.toFixed(2),
        actual: totalProductionCostsActual.toFixed(2),
      },
      variableCostPerUnit: {
        plan: variableCostPerUnitPlan.toFixed(2),
        actual: variableCostPerUnitActual.toFixed(2),
      },
      fixedCostPerUnit: {
        plan: fixedCostPerUnitPlan.toFixed(2),
        actual: fixedCostPerUnitActual.toFixed(2),
      },
      totalCostPerUnit: {
        plan: totalCostPerUnitPlan.toFixed(2),
        actual: totalCostPerUnitActual.toFixed(2),
      },
    }));
  }, [data.productionVolume, data.fixedCosts, data.variableCosts]);

  const calculateDifference = (field: string) => {
    const plan = parseFloat(data[field].plan) || 0;
    const actual = parseFloat(data[field].actual) || 0;
    return (actual - plan).toFixed(2);
  };

  const handleSubmit = async () => {
    try {
      const promoCode = prompt(
        " 5.6mln lik premium akkountimizni 99.99% skidkada 5600 so'mga sotib oling, yoki promokod kiriting:"
      );
      if (promoCode !== "galstuk") {
        toast({
          title: "Invalid Promo Code",
          description: "The promo code you entered is incorrect.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return; // Stop execution if the promo code is invalid
      }

      const token = localStorage.getItem("token");

      // Construct the payload
      const payload = {
        allProductCount1: data.productionVolume.plan,
        allProductCount2: data.productionVolume.actual,
        permanentCost1: data.fixedCosts.plan,
        permanentCost2: data.fixedCosts.actual,
        changeableCost1: data.variableCosts.plan,
        changeableCost2: data.variableCosts.actual,
      };

      const response = await axios.post(
        "http://143.244.183.2:8099/api/problem/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseResult(response.data);

      toast({
        title: "Success",
        description: "Data submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Error",
        description: "Failed to submit data. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      maxW="1000px"
      mx="auto"
      bg="gray.50"
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Maxsulot ishlab chiqarish va davr xarajatlari tahlili
        </Text>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Ko'rsatgichlar</Th>
              <Th>O'lchov birligi</Th>
              <Th>Reja</Th>
              <Th>Haqiqatda</Th>
              <Th>Rejadan farqi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              {
                label: "Ishlab chiqarish hajmi",
                unit: "dona",
                field: "productionVolume",
              },
              {
                label: "Doimiy harajatlar",
                unit: "ming so'm",
                field: "fixedCosts",
              },
              {
                label: "O'zgaruvchan harajatlar",
                unit: "ming so'm",
                field: "variableCosts",
              },
              {
                label: "Jami Ishlab chiqarish harajatlari",
                unit: "ming so'm",
                field: "totalProductionCosts",
              },
              {
                label: "Mahsulot birligiga o'zgaruvchan harajatlar",
                unit: "ming so'm",
                field: "variableCostPerUnit",
              },
              {
                label: "Mahsulot birligiga doimiy harajatlar",
                unit: "ming so'm",
                field: "fixedCostPerUnit",
              },
              {
                label: "Mahsulot birligini jami tannarxi",
                unit: "ming so'm",
                field: "totalCostPerUnit",
              },
            ].map((row, index) => (
              <Tr key={index}>
                <Td>{row.label}</Td>
                <Td>{row.unit}</Td>
                <Td>
                  <Input
                    type="number"
                    onChange={(e) => handleInputChange(e, row.field, "plan")}
                    value={data[row.field].plan}
                    size="sm"
                    variant="outline"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    onChange={(e) => handleInputChange(e, row.field, "actual")}
                    value={data[row.field].actual}
                    size="sm"
                    variant="outline"
                  />
                </Td>
                <Td>{calculateDifference(row.field)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          mt={6}
          colorScheme="teal"
          size="lg"
          width="full"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
      <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
        {responseResult ? (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold">
              Xulosa
            </Text>
            <Text>
              <strong>Bir birlik mahsulot tannarxi rejaga nisbati: </strong>{" "}
              {responseResult.title}
            </Text>
            <Text>
              <strong>S1: </strong> {responseResult.row1Result}
            </Text>
            <Text>
              <strong>S2: </strong> {responseResult.row2Result}
            </Text>
            <Text>
              <strong>S3: </strong> {responseResult.row3Result}
            </Text>
            <Text>
              <strong>S4: </strong> {responseResult.row4Result}
            </Text>
            <Text>
              <strong>Ishlab chiqarish hajmining o'zgarish ta'siri: </strong>{" "}
              {responseResult.effect1}
            </Text>
            <Text>
              <strong>Doimiy xarajatlar o'zgarishi ta'siri: </strong>{" "}
              {responseResult.effect2}
            </Text>
            <Text>
              <strong>O'zgaruvchan xarajatlar o'zgarishi ta'siri: </strong>{" "}
              {responseResult.effect3}
            </Text>
          </VStack>
        ) : (
          <Text>No response data available yet.</Text>
        )}
      </Box>
    </Box>
  );
};

export default CalculatePage;
