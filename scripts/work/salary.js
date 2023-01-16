import { getBalance, getOutstandingLoan, setBalance, setOutstandingLoan } from "../bank/bankView"
import { getSalary, setSalary } from "./workView"


/**
 * Earn 100 kr everytime you work
 */
export function work() {
    const salary = getSalary()
    setSalary(salary + 100)
}

/**
 * Transfer your salary to your bank account
 * 
 * If you have an outstanding loan, 10% is taken out of your transfer and used to pay your loan.
 */
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