import { getBalance, setBalance } from "../bank/bankView"
import { getCurrentLaptop, setCurrentLaptop } from "./laptopsView"

const laptopFeaturesElement = document.getElementById("featureList")
const imageWrapperElement = document.getElementById("imageWrapper")
const laptopTitleElement = document.getElementById("laptopTitle")
const laptopDescriptionElement = document.getElementById("laptopDescription")
const laptopPriceElement = document.getElementById("laptopPrice")

/**
 * A onChange handler that updates the selected laptop
 * @param {Event} event A javascript event object
 */
export function selectLaptop(event) {
    const id = event.target.value
    const laptop = getLaptopById(id)

    setCurrentLaptop(laptop)

    updateLaptopDescription(laptop)
}

/**
 * Renders the laptop description to match the selected laptop
 * @param {Object} laptop A laptop object fetched from the laptop API
 */
export function updateLaptopDescription(laptop) {
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

    // Update the list of features
    const listElements = laptop.specs.map(feature => {
        const listElement = document.createElement("li")
        listElement.innerText = " - " + feature
        return listElement
    })

    laptopFeaturesElement.replaceChildren(...listElements)
}

/**
 * Use your bank funds to purchase a new laptop 
 */
export function buyLaptop() {
    const balance = getBalance()
    const currentLaptop = getCurrentLaptop()

    if (balance < currentLaptop.price) {
        window.alert("Insufficient balance to buy this laptop :(")
        return
    }

    setBalance(balance - currentLaptop.price)

    window.alert("You purchased " + currentLaptop.title)
}