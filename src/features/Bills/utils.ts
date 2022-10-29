export const getHighlightedData = (arrGiven: any, budgetGiven: string) => {
  const temp_arr = [...arrGiven];
  const arr = temp_arr.sort((a,b) => a.amount - b.amount)
  const budget = Number(budgetGiven || 0);
  const newArray = [];
  let i = 0;
  let j = arr.length - 1;
  let ans = 0;
  while (i <= j) {
    if (ans + Number(arr[j].amount) > budget) j--;
    else {
      newArray.push(arr[j].id);
      ans += Number(arr[j--].amount);
    }
    if (i < j) {
      if (i !== j && ans + Number(arr[i].amount) > budget) i++;
      else {
        newArray.push(arr[i].id);
        ans += Number(arr[i++].amount);
      }
    }
  }

  return newArray;
};
