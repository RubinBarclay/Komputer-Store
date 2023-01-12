// Variables & manual .innerHTML updates can be replaced with a proxy object
// https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript

// Variables
let balance = 0;
let outstandingLoan = 0;
let pay = 0;

// Elements
const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstandingLoan");
const getLoanElement = document.getElementById("getLoan");
const payElement = document.getElementById("pay");
const workElement = document.getElementById("work");
const transferElement = document.getElementById("transfer");
const repayLoanWrapperElement = document.getElementById("repayLoanWrapper");
const repayLoanElement = document.getElementById("repayLoan");

// SECTION 1: BANK

balanceElement.innerHTML = formatCurrency(balance);
outstandingLoanElement.innerHTML = formatCurrency(outstandingLoan);

getLoanElement.addEventListener('click', getLoan);

function formatCurrency(int) {
    if (Number.isNaN(int)) {
        console.error("Currency must be of type integer");
        return;
    }

    // Return int as a properly formatted string 
    return int.toLocaleString("sv-SE", { style:"currency", currency:"SEK" });
}

function getLoan() {
    if (outstandingLoan > 0) {
        window.alert("You have to pay back your previous loan before getting a new one!");
        return;
    }

    const maxLoan = formatCurrency(balance * 2);
    const newLoan = Number(window.prompt(`New loan amount (max ${maxLoan}):`, ""));

    if (newLoan > balance * 2) {
        window.alert("You can not take a loan more than double your bank balance!");
        getLoan();
    }

    // Update balance and loan values
    balance += newLoan;
    outstandingLoan = newLoan;

    // Update the UI to show new balance, loan and pay back loan button
    balanceElement.innerHTML = formatCurrency(balance);
    outstandingLoanElement.innerHTML = formatCurrency(outstandingLoan);
    repayLoanWrapperElement.classList.remove("invisible");
}

// SECTION 2: WORK
payElement.innerText = formatCurrency(pay);

workElement.addEventListener("click", getPaid);
transferElement.addEventListener("click", transferSalary);
repayLoanElement.addEventListener("click", payBackLoan);

function getPaid() {
    pay += 100;
    payElement.innerText = formatCurrency(pay);
}

function transferSalary() {
    if (pay === 0) return;

    let loanPayment = 0;

    if (outstandingLoan > 0) {
        loanPayment = pay * 0.1;    // 10% of pay
        pay = pay * 0.9;            // 90% of pay
    }

    balance += pay;
    outstandingLoan -= loanPayment;
    pay = 0;

    balanceElement.innerHTML = formatCurrency(balance);
    outstandingLoanElement.innerHTML = formatCurrency(outstandingLoan);
    payElement.innerHTML = formatCurrency(pay);
}

function payBackLoan() {
    if (outstandingLoan <= 0 || pay <= 0) return;

    if (outstandingLoan < pay) {
        pay -= outstandingLoan;
        outstandingLoan = 0;
    }

    else {
        outstandingLoan -= pay;
        pay = 0;
    }

    outstandingLoanElement.innerHTML = formatCurrency(outstandingLoan);
    payElement.innerHTML = formatCurrency(pay);
}