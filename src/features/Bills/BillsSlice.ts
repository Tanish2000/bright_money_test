import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { default_bills } from "./sample_bills";
import { v4 as uuid } from "uuid";
import { getHighlightedData } from "./utils";

type addBillActionPayload = {
  id ?: string;
  desc: string;
  date: string;
  amount: string;
  category: string;
};

const billSlice = createSlice({
  name: "Bills",
  initialState: {
    bills: default_bills,
    categories: [
      "Food & Dining",
      "Utility",
      "Shopping",
      "Education",
      "Personal Care",
      "Travel",
    ],
  },
  reducers: {
    addBill: (state, action: PayloadAction<addBillActionPayload>) => {
      state.bills.push({
        id: uuid(),
        description: action.payload.desc,
        date: action.payload.date,
        amount: action.payload.amount,
        category: action.payload.category,
        isHighlight: false,
      });
    },
    editBill: (state, action: PayloadAction<addBillActionPayload>) => {
      const { id, desc, amount, category, date } = action.payload;
      state.bills.forEach((bill)=> {
        if(id === bill.id)
        {
          bill.description = desc;
          bill.amount = amount;
          bill.category = category;
          bill.date = date;
        }
      })
    },
    deleteBill: (state, action: PayloadAction<string>) => {
      const newBills = state.bills.filter((bill) => bill.id !== action.payload);
      state.bills = [...newBills];
    },
    setBudget: (state, action: PayloadAction<string>) => {
      const newArray = getHighlightedData([...state.bills], action.payload);

      state.bills.forEach((bill) => {
        bill.isHighlight = false;
      });

      newArray.forEach((item) => {
        state.bills.forEach((bill) => {
          if (bill.id === item) {
            bill.isHighlight = true;
          }
        });
      });
    },
  },
});

export const { addBill, editBill, deleteBill, setBudget } = billSlice.actions;
export default billSlice.reducer;
