/**
 * Fetches listings for laptops
 * @returns A array of laptop objects
 */
async function fetchLaptopData() {
    try {
        const response = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const data = await response.json();

        return data;
    } 
    
    catch (error) {
        console.error(error);
    }
}

export default fetchLaptopData;