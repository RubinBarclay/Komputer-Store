export function formatCurrency(int) {
    if (Number.isNaN(int)) {
        console.error("Currency must be of type integer");
        return;
    }

    // Return int as a properly formatted string 
    return int.toLocaleString("sv-SE", { style:"currency", currency:"SEK" });
}
