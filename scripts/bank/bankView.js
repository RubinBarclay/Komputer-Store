import { formatCurrency } from "../_shared/functions.js"

let balance = 0
let outstandingLoan = 0

const balanceElement = document.getElementById("balance")
const outstandingLoanElement = document.getElementById("outstandingLoan")

balanceElement.innerText = formatCurrency(balance)
outstandingLoanElement.innerText = formatCurrency(outstandingLoan)

export const getBalance = () => balance

export const getOutstandingLoan = () => outstandingLoan

export const setBalance = (newBalance) => {
    balanceElement.innerText = formatCurrency(newBalance)
    balance = newBalance 
}

export const setOutstandingLoan = (newOutstandingLoan) => {
    outstandingLoanElement.innerText = formatCurrency(newOutstandingLoan)
    outstandingLoan = newOutstandingLoan
}