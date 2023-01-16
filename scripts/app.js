import fetchLaptopData from "./api/laptops.js"
import { getBalance, getOutstandingLoan, setBalance, setOutstandingLoan } from "./bank/bankView.js"
import { getLaptopById, getLaptops, setCurrentLaptop, setLaptops } from "./laptops/laptopsView.js"
import { formatCurrency } from "./_shared/functions.js"

// Variables & manual .innerHTML updates can be replaced with a proxy object
// https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript

// Variables
let salary = 0

// Elements
const getLoanElement = document.getElementById("getLoan")
const salaryElement = document.getElementById("salary")
const workElement = document.getElementById("work")
const transferElement = document.getElementById("transfer")
const repayLoanElement = document.getElementById("repayLoan")
const dropdownElement = document.getElementById("dropdown")
const buyButtonElement = document.getElementById("buy")
const featureListElement = document.getElementById("featureList")
const imageWrapperElement = document.getElementById("imageWrapper")
const laptopTitleElement = document.getElementById("laptopTitle")
const laptopDescriptionElement = document.getElementById("laptopDescription")
const laptopPriceElement = document.getElementById("laptopPrice")

// SECTION 1: BANK

getLoanElement.addEventListener('click', getLoan)
workElement.addEventListener("click", getPaid)
transferElement.addEventListener("click", transferSalary)
repayLoanElement.addEventListener("click", payBackLoan)
dropdownElement.addEventListener("change", selectLaptop)
buyButtonElement.addEventListener("click", buyLaptop)


function getLoan() {
    const balance = getBalance()
    const outstandingLoan = getOutstandingLoan()

    if (balance <= 0) {
        window.alert("You are not eligible for a loan. Balance is too low...")
        return
    }

    if (outstandingLoan > 0) {
        window.alert("You have to pay back your previous loan before getting a new one!")
        return
    }

    const maxLoan = formatCurrency(balance * 2)
    const newLoan = Number(window.prompt(`New loan amount (max ${maxLoan}):`, ""))

    if (newLoan > balance * 2) {
        window.alert("You can not take a loan more than double your bank balance!")
        getLoan()
    }

    // Update balance and loan values
    setBalance(balance + newLoan)
    setOutstandingLoan(newLoan)

    // Update the UI to show new balance, loan and pay back loan button
    repayLoanElement.classList.remove("invisible")
}

// SECTION 2: WORK
salaryElement.innerText = formatCurrency(salary)

function getPaid() {
    salary += 100
    salaryElement.innerText = formatCurrency(salary)
}

function transferSalary() {
    const balance = getBalance()
    const outstandingLoan = getOutstandingLoan()

    if (salary === 0) return

    let loanPayment = 0

    if (outstandingLoan > 0) {
        loanPayment = salary * 0.1 // 10% of salary
        salary = salary * 0.9      // 90% of salary
    }

    setBalance(balance + salary)
    setOutstandingLoan(outstandingLoan - loanPayment)
    salary = 0

    salaryElement.innerHTML = formatCurrency(salary)
}

function payBackLoan() {
    const outstandingLoan = getOutstandingLoan()

    if (outstandingLoan <= 0 || salary <= 0) {
        return
    }

    if (outstandingLoan < salary) {
        salary -= outstandingLoan
        outstandingLoan = 0
    }

    else {
        outstandingLoan -= salary
        salary = 0
    }

    // Hide repay loan button once loan is paid back in full
    if (outstandingLoan <= 0) {
        repayLoanElement.classList.add("invisible")
    }

    setOutstandingLoan(outstandingLoan - loanPayment)
    salaryElement.innerHTML = formatCurrency(salary)
}

// SECTION 3: LAPTOP SELECTION

const laptopData = await fetchLaptopData()

setLaptops(laptopData)
setCurrentLaptop(laptopData[0])

const laptops = getLaptops()
let currentLaptop = laptopData[0]

updateFeatureList(currentLaptop)
updateDescription(currentLaptop)

// Populate dropdown list for laptops
for (let laptop of laptops) {
    const optionElement = document.createElement("option")
    optionElement.innerText = laptop.title
    optionElement.value = laptop.id

    dropdownElement.appendChild(optionElement)
}

function updateFeatureList(laptop) {
    featureListElement.replaceChildren()

    const listElements = laptop.specs.map(feature => {
        const listElement = document.createElement("li")
        listElement.innerText = " - " + feature
        return listElement
    })

    featureListElement.replaceChildren(...listElements)
}

function updateDescription(laptop) {

    const imageURL = `https://hickory-quilled-actress.glitch.me/${laptop.image}`
    const imageElement = document.createElement("img")
    imageElement.setAttribute("src", imageURL)
    imageElement.classList.add("w-full")
    imageWrapperElement.replaceChildren(imageElement)

    laptopTitleElement.innerText = laptop.title
    laptopDescriptionElement.innerText = laptop.description
    laptopPriceElement.innerText = formatCurrency(laptop.price)
}

function selectLaptop(event) {

    const id = event.target.value
    const laptop = getLaptopById(id)

    setCurrentLaptop(laptop)

    updateFeatureList(laptop)
    updateDescription(laptop)
}

function buyLaptop() {
    const balance = getBalance()

    if (balance < currentLaptop.price) {
        window.alert("Insufficient balance to buy this laptop :(")
        return
    }

    setBalance(balance - currentLaptop.price)

    window.alert("You purchased " + currentLaptop.title)
}