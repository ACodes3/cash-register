function checkCashRegister(price, cash, cid) {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let change = cash - price;
  let changeArray = [];
  let totalCid = 0;

  // Calculate the total amount in the cash drawer (cid)
  for (let i = 0; i < cid.length; i++) {
    totalCid += cid[i][1];
  }

  totalCid = parseFloat(totalCid.toFixed(2));

  // Handle different cases
  if (change === totalCid) {
    // Closed: exact change is available
    changeArray = [...cid];
    return { status: "CLOSED", change: changeArray };
  } else if (change > totalCid) {
    // Insufficient funds
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else {
    // Open: calculate change
    for (let i = cid.length - 1; i >= 0; i--) {
      const currency = cid[i][0];
      const unitValue = currencyUnit[currency];
      const available = cid[i][1];
      let numUnits = Math.floor(available / unitValue);
      let returned = 0;

      while (numUnits > 0 && change >= unitValue) {
        change = parseFloat(change.toFixed(2));
        change -= unitValue;
        returned += unitValue;
        numUnits--;
      }

      if (returned > 0) {
        changeArray.push([currency, returned]);
      }
    }
  }

  // Check if change is still owed after processing the cash drawer
  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else {
    return { status: "OPEN", change: changeArray };
  }
}

// Test the function
console.log(checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]));
