/**
 * Converts an integer to a swedish currency format
 * @param {int} int A number to be formatted to SEK
 * @returns A number in SEK format
 */
export function formatCurrency(int) {
    if (Number.isNaN(int)) {
        console.error("Currency must be of type integer")
        return
    }

    // Return int as a properly formatted string 
    return int.toLocaleString("sv-SE", { style:"currency", currency:"SEK" })
}
