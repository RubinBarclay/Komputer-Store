import fetchLaptopData from "./api/laptops.js"
import { getBalance, getOutstandingLoan, setBalance, setOutstandingLoan } from "./bank/bankView.js"
import { getLaptopById, getLaptops, setCurrentLaptop, setLaptops } from "./laptops/laptopsView.js"
import { getSalary, setSalary } from "./work/workView.js"
import { formatCurrency } from "./_shared/functions.js"

// Elements
const getLoanElement = document.getElementById("getLoan")
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

function getPaid() {
    const salary = getSalary()
    setSalary(salary + 100)
}

function transferSalary() {
    const balance = getBalance()
    const outstandingLoan = getOutstandingLoan()
    const salary = getSalary()

    if (salary === 0) return

    if (outstandingLoan > 0) {
        const loanPayment = salary * 0.1    // 10% of salary
        const deductedSalary = salary * 0.9 // 90% of salary

        setBalance(balance + deductedSalary)
        setOutstandingLoan(outstandingLoan - loanPayment)
    } else {
        setBalance(balance + salary)
    }

    setSalary(0)  // Reset salary
}

function payBackLoan() {
    const outstandingLoan = getOutstandingLoan()
    const salary = getSalary()

    if (outstandingLoan <= 0 || salary <= 0) {
        return
    }

    if (outstandingLoan < salary) {
        setSalary(salary - outstandingLoan)
        setOutstandingLoan(0)
    }

    else {
        setOutstandingLoan(outstandingLoan -= salary)
        setSalary(0)
    }

    // Hide repay loan button once loan is paid back in full
    if (getOutstandingLoan() <= 0) {
        repayLoanElement.classList.add("invisible")
    }
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
    // Update image
    const imageURL = `https://hickory-quilled-actress.glitch.me/${laptop.image}`
    const imageElement = document.createElement("img")
    imageElement.setAttribute("src", imageURL)
    imageElement.classList.add("w-full")
    imageWrapperElement.replaceChildren(imageElement)

    // Update description text
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