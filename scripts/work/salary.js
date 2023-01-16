import { getBalance, getOutstandingLoan, setBalance, setOutstandingLoan } from "../bank/bankView"
import { getSalary, setSalary } from "./workView"


export function work() {
    const salary = getSalary()
    setSalary(salary + 100)
}

export function transferSalary() {
    const balance = getBalance()
    const outstandingLoan = getOutstandingLoan()
    const salary = getSalary()

    if (salary === 0) return

    if (outstandingLoan > 0) {
        const loanPayment = salary * 0.1    // 10% of salary
        const deductedSalary = salary * 0.9 // 90% of salary

        setBalance(balance + deductedSalary)
        setOutstandingLoan(outstandingLoan - loanPayment)
    } 
    
    else {
        setBalance(balance + salary)
    }

    setSalary(0)  // Reset salary
}