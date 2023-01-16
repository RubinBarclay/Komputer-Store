import { formatCurrency } from "../_shared/functions.js";

let salary = 0

const salaryElement = document.getElementById("salary")

salaryElement.innerText = formatCurrency(salary)

export const getSalary = () => salary

export const setSalary = (newSalary) => {
    salaryElement.innerText = formatCurrency(newSalary)
    salary = newSalary
}
