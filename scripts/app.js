import fetchLaptopData from "./api/laptops.js"
import { getLoan, payBackLoan } from "./bank/loans.js"
import { buyLaptop, selectLaptop } from "./laptops/laptopStore.js"
import { setCurrentLaptop, setLaptops } from "./laptops/laptopsView.js"
import { transferSalary, work } from "./work/salary.js"

const getLoanElement = document.getElementById("getLoan")
const workElement = document.getElementById("work")
const transferElement = document.getElementById("transfer")
const repayLoanElement = document.getElementById("repayLoan")
const dropdownElement = document.getElementById("dropdown")
const buyButtonElement = document.getElementById("buy")

getLoanElement.addEventListener('click', getLoan)
workElement.addEventListener("click", work)
transferElement.addEventListener("click", transferSalary)
repayLoanElement.addEventListener("click", payBackLoan)
dropdownElement.addEventListener("change", selectLaptop)
buyButtonElement.addEventListener("click", buyLaptop)

// Fetch and set the laptop data
const laptopData = await fetchLaptopData()

setLaptops(laptopData)
setCurrentLaptop(laptopData[0])

updateFeatureList(laptopData[0])
updateDescription(laptopData[0])

// Populate dropdown list for laptops
for (let laptop of laptopData) {
    const optionElement = document.createElement("option")
    optionElement.innerText = laptop.title
    optionElement.value = laptop.id

    dropdownElement.appendChild(optionElement)
}
