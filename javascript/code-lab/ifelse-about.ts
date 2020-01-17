const income: number = 2000
let tax: number = 0

if (income <= 2200)
  tax = 0
else if (income <= 2700)
  tax = 0.14 * (income - 2200)
else if (income <= 3200)
  tax = 70 + 0.15 * (income - 2700)
else if (income <= 3700)
  tax = 145 + 0.16 * (income - 3200)
else
  tax = 53090 + 0.7 * (income - 102200)
