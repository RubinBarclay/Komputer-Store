let allLaptops = []
let currentLaptop = {}

export const getLaptops = () => [...allLaptops]

export const getLaptopById = (id) => allLaptops.find(laptop => Number(laptop.id) === Number(id))

export const setLaptops = (laptops) => allLaptops = [...laptops]

export const setCurrentLaptop = (laptop) => currentLaptop = { ...laptop }