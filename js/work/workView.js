import { formatCurrency } from "../_shared/functions.js"

let salary = 0

// Render intital value for salary
const salaryElement = document.getElementById("salary")
salaryElement.innerText = formatCurrency(salary)

export const getSalary = () => salary

export const setSalary = (newSalary) => {
    salaryElement.innerText = formatCurrency(newSalary) // re-render updated salary
    salary = newSalary
}
