import React, { useState, useEffect } from "react";
import { format } from 'date-fns'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store";
import { addBill, editBill } from '../features/Bills/BillsSlice';

type ModalProps = {
  isOpen: any;
  onClose: any;
  id : string;
  setId : any
};

const ModalComponent = ({ isOpen, onClose, id, setId }: ModalProps) => {
  const { categories, bills } = useAppSelector((state) => state.bills);
  const data = bills.filter((bill) => bill.id === id);
  const dispatch = useAppDispatch();
  const [desc ,setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    if(id)
    {
        dispatch(editBill({ desc, amount, date , category, id }))
    }
    else {
        dispatch(addBill({ desc, amount, date , category }))
    }
    setDesc('');
    setCategory('');
    setAmount('');
    setDate('');
    setId('')
  }

  useEffect(()=> {
    if(data.length && id === data[0].id)
    {
        setDesc(data[0].description);
        setCategory(data[0].category);
        setAmount(data[0].amount);
        setDate(format(new Date(data[0].date), 'yyyy-MM-dd'));
    }
    
    return () => {
        setDesc('');
        setCategory('');
        setAmount('');
        setDate('');
    }
  }, [id])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Bill</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl as="form" onSubmit={handleSubmit}>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={desc} onChange={(e)=> setDesc(e.target.value)} />
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category" variant="outline" value={category} onChange={(e)=> setCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </Select>
            <FormLabel>Amount</FormLabel>
            <Input type="number" value={amount} onChange={(e)=> setAmount(e.target.value)}/>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
            <Button colorScheme="blue" type="submit" onClick={onClose} my={5} ml="auto">
                Submit
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
