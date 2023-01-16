import { getSalary, setSalary } from "../work/workView"
import { getBalance, getOutstandingLoan, setBalance, setOutstandingLoan } from "./bankView"

/**
 * Apply and recieve a loan if you are eligible
 */
export function getLoan() {
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

    // Update the UI to show "pay back loan" button
    repayLoanElement.classList.remove("invisible")
}

/**
 * Pay back your outstanding loan with your salary
 */
export function payBackLoan() {
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