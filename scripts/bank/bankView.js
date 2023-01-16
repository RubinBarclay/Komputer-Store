import { formatCurrency } from "../_shared/functions.js"

let balance = 0
let outstandingLoan = 0

// Render initial value for balance
const balanceElement = document.getElementById("balance")
balanceElement.innerText = formatCurrency(balance)

// Render initial value for outstanding loan
const outstandingLoanElement = document.getElementById("outstandingLoan")
outstandingLoanElement.innerText = formatCurrency(outstandingLoan)

export const getBalance = () => balance

export const getOutstandingLoan = () => outstandingLoan

export const setBalance = (newBalance) => {
    balanceElement.innerText = formatCurrency(newBalance)                   // re-render updated balance value
    balance = newBalance 
}

export const setOutstandingLoan = (newOutstandingLoan) => {
    outstandingLoanElement.innerText = formatCurrency(newOutstandingLoan)   // re-render updated loan value
    outstandingLoan = newOutstandingLoan
}