import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const CalculatePage: React.FC = () => {
  const [data, setData] = useState({
    productionVolume: 0,
    fixedCosts: 0,
    variableCosts: 0,
    totalProductionCosts: 0,
    variableCostPerUnit: 0,
    fixedCostPerUnit: 0,
    totalCostPerUnit: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Box p={5}>
      <Table variant="simple">
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
          <Tr>
            <Td>Ishlab chiqarish hajmi</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "productionVolume")}
                value={data.productionVolume}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "productionVolume")}
                value={data.productionVolume}
              />
            </Td>
            <Td>
              {(data.productionVolume - data.productionVolume).toFixed(2)}
            </Td>
          </Tr>
          <Tr>
            <Td>Doimiy harajatlat</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "fixedCosts")}
                value={data.fixedCosts}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "fixedCosts")}
                value={data.fixedCosts}
              />
            </Td>
            <Td>{(data.fixedCosts - data.fixedCosts).toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>O'zgaruvchan harajatlar</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "variableCosts")}
                value={data.variableCosts}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "variableCosts")}
                value={data.variableCosts}
              />
            </Td>
            <Td>{(data.variableCosts - data.variableCosts).toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Jami Ishlab chiqarish harajatlari</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "totalProductionCosts")}
                value={data.totalProductionCosts}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "totalProductionCosts")}
                value={data.totalProductionCosts}
              />
            </Td>
            <Td>
              {(data.totalProductionCosts - data.totalProductionCosts).toFixed(
                2
              )}
            </Td>
          </Tr>
          <Tr>
            <Td>Mahsulot birligiga o'zgaruvchan harajatlar</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "variableCostPerUnit")}
                value={data.variableCostPerUnit}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "variableCostPerUnit")}
                value={data.variableCostPerUnit}
              />
            </Td>
            <Td>
              {(data.variableCostPerUnit - data.variableCostPerUnit).toFixed(2)}
            </Td>
          </Tr>
          <Tr>
            <Td>Mahsulot birligiga doimiy harajatlar</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "fixedCostPerUnit")}
                value={data.fixedCostPerUnit}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "fixedCostPerUnit")}
                value={data.fixedCostPerUnit}
              />
            </Td>
            <Td>
              {(data.fixedCostPerUnit - data.fixedCostPerUnit).toFixed(2)}
            </Td>
          </Tr>
          <Tr>
            <Td>Mahsulot birligini jami tannarxi</Td>
            <Td>unit</Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "totalCostPerUnit")}
                value={data.totalCostPerUnit}
              />
            </Td>
            <Td>
              <Input
                type="number"
                onChange={(e) => handleInputChange(e, "totalCostPerUnit")}
                value={data.totalCostPerUnit}
              />
            </Td>
            <Td>
              {(data.totalCostPerUnit - data.totalCostPerUnit).toFixed(2)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button mt={4} colorScheme="blue">
        Submit
      </Button>
    </Box>
  );
};

export default CalculatePage;
