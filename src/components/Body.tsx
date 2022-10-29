import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  Select,
  useDisclosure,
  Heading,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store";
import Modal from "./Modal";
import Bill from "./Bill";
import Chart from "./Chart";
import { setBudget } from "../features/Bills/BillsSlice";

const Body = () => {
  const { bills, categories } = useAppSelector((state) => state.bills);
  const dispatch = useAppDispatch();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [budget, setBudgetState] = useState(" ");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  return (
    <Flex width="100%" alignItems="center">
      <Modal isOpen={isOpen} onClose={onClose} id={id} setId={setId} />
      <Box width="40%">
        <Flex p={3}>
          <Flex gap={4}>
            <Box as={Flex} gap={2}>
              <Select
                placeholder="Select category"
                size="sm"
                variant="outline"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                size="sm"
                p={3}
                onClick={() => {
                  setId("");
                  onOpen();
                }}
              >
                + New Bill
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gap={3}
          overflowY="scroll"
          height="80vh"
          p={2}
          __css={{
            "&::-webkit-scrollbar": {
              w: "5px",
            },
            "&::-webkit-scrollbar-track": {
              w: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "50px",
              bg: `gray.300`,
            },
          }}
        >
          {categoryFilter
            ? bills
                .filter((bill) => {
                  return (
                    bill.category.toLowerCase() === categoryFilter.toLowerCase()
                  );
                })
                .map((bill, index) => {
                  return (
                    <Bill {...bill} key={index} onOpen={onOpen} setId={setId} />
                  );
                })
            : bills.map((bill, index) => {
                return (
                  <Bill {...bill} key={index} onOpen={onOpen} setId={setId} />
                );
              })}
        </Flex>
      </Box>
      {/* <Divider orientation='vertical' colorScheme='red' /> */}
      <Flex width="55%" m={5} flexDirection="column">
        <Chart />
        <Flex alignItems={"center"} justifyContent={"space-between"} mx={10}>
          <Flex alignItems={"center"} width="200px" borderColor={"teal.600"}>
            <FormControl>
              <FormLabel>Monthly Budget</FormLabel>
              <Input
                type="number"
                value={budget}
                onChange={(e) => {
                  setBudgetState(e.target.value);
                  dispatch(setBudget(e.target.value));
                }}
              />
              <FormHelperText fontSize="xs">Enter budget to highlight bills that should be paid.</FormHelperText>
            </FormControl>
          </Flex>
          <Flex alignSelf={"flex-end"} gap={5} p={10} alignItems={"flex-end"} >
            <Text color="teal">Total</Text>
            <Heading color="teal" letterSpacing={1}>
              {bills.reduce((total, bill) => {
                return total + +bill.amount;
              }, 0)}
              {" ₹"}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Body;
