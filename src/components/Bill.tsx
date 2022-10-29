import React from "react";
import { Text, Heading, Badge, Flex , Button } from "@chakra-ui/react";
import { deleteBill } from '../features/Bills/BillsSlice';
import { useAppDispatch } from "../store";

type BillProps = {
  id: string;
  description: string;
  category: string;
  amount: string;
  date: string;
  isHighlight : boolean,
  onOpen : () => void,
  setId : (state: string) => void
};

const Bill = ({ id, description, category, amount, date, isHighlight, onOpen, setId }: BillProps) => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      p={3}
      shadow="md"
      borderWidth="3px"
      borderRadius="10px"
      justifyContent="space-between"
      backgroundColor={isHighlight ? 'facebook.100': ''}
    >
      <Flex flexDirection='column' alignItems='flex-start' gap={3}>
        <Flex>
          <Heading fontSize="md">{description}</Heading>
          <Badge
            ml="3"
            colorScheme="green"
            borderRadius="10px"
            my="auto"
            px={2}
            py={1}
            fontSize="0.6em"
          >
            {category}
          </Badge>
          <Badge
            ml="3"
            colorScheme="telegram"
            borderRadius="10px"
            my="auto"
            px={2}
            py={1}
            fontSize="0.6em"
          >
            {date}
          </Badge>
        </Flex>
        <Flex gap={2}>
            <Button ml="auto" colorScheme='teal' size='xs' onClick={()=> {
              setId(id);
              onOpen();
            }}>
                Edit
            </Button>
            <Button ml="auto" colorScheme='teal' size='xs' onClick={()=> dispatch(deleteBill(id))}>
                Delete
            </Button>
        </Flex>
      </Flex>
      <Flex>
        <Text fontSize="lg" letterSpacing={2} fontWeight="500">
          {amount}
        </Text>
        {"₹"}
      </Flex>
    </Flex>
  );
};

export default Bill;
