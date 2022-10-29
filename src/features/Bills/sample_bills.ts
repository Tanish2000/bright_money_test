import { v4 as uuid } from "uuid";

type billType = {
    id : string,
    description : string,
    category : string,
    amount : string,
    date : string,
    isHighlight : boolean
}

export const default_bills : billType[] = [
  {
    id: uuid(),
    description: "Dominos",
    category: "Food & Dining",
    amount: "430",
    date: "01-02-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "Car wash",
    category: "Utility",
    amount: "500",
    date: "01-06-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "Amazon",
    category: "Shopping",
    amount: "2030",
    date: "01-07-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "House rent",
    category: "Food & Dining",
    amount: "15000",
    date: "01-03-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "Tuition",
    category: "Education",
    amount: "4000",
    date: "01-12-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "Laundry",
    category: "Personal Care",
    amount: "320",
    date: "01-10-2022",
    isHighlight : false
  },
  {
    id: uuid(),
    description: "Vacation",
    category: "Travel",
    amount: "3430",
    date: "01-10-2022",
    isHighlight : false
  },
];
