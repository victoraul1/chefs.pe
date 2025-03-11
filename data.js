const dishes = [
    {
        id: 1,
        name: "Ají de gallina",
        image: "images/aji-de-gallina.jpg",
        ingredients: [
            "pollo", "ají amarillo", "cebolla", "ajo", "pan", "leche", 
            "queso parmesano", "nueces", "aceitunas", "huevo", "papa", 
            "arroz", "aceite", "sal", "pimienta"
        ]
    },
    {
        id: 2,
        name: "Ceviche de pescado",
        image: "images/ceviche.jpg",
        ingredients: [
            "pescado blanco", "limón", "cebolla roja", "ají limo", "culantro", 
            "camote", "choclo", "cancha serrana", "lechuga", "sal", "pimienta", 
            "ajo"
        ]
    },
    {
        id: 3,
        name: "Arroz chaufa",
        image: "images/arroz-chaufa.jpg",
        ingredients: [
            "arroz", "pollo", "huevo", "cebolla china", "kion (jengibre)", 
            "ajo", "salsa de soya", "aceite de ajonjolí", "aceite", "sal", 
            "pimienta"
        ]
    },
    {
        id: 4,
        name: "Arroz con pollo",
        image: "images/arroz-con-pollo.jpg",
        ingredients: [
            "pollo", "arroz", "culantro", "cerveza", "ají amarillo", 
            "cebolla", "ajo", "pimiento", "arvejas", "zanahoria", "aceite", 
            "sal", "pimienta", "comino"
        ]
    },
    {
        id: 5,
        name: "Escabeche de pollo",
        image: "images/escabeche-de-pollo.jpg",
        ingredients: [
            "pollo", "cebolla", "zanahoria", "ají amarillo", "vinagre", 
            "laurel", "orégano", "ajo", "camote", "lechuga", "aceite", 
            "sal", "pimienta"
        ]
    },
    {
        id: 6,
        name: "Caigua rellena",
        image: "images/caigua-rellena.jpg",
        ingredients: [
            "caigua", "carne molida", "cebolla", "tomate", "ajo", "pasas", 
            "aceituna", "huevo", "pan rallado", "aceite", "sal", "pimienta", 
            "comino"
        ]
    },
    {
        id: 7,
        name: "Papa rellena",
        image: "images/papa-rellena.jpg",
        ingredients: [
            "papa", "carne molida", "cebolla", "tomate", "ajo", "pasas", 
            "aceituna", "huevo", "harina", "aceite", "sal", "pimienta", 
            "comino", "orégano"
        ]
    },
    {
        id: 8,
        name: "Seco de carne",
        image: "images/seco-de-carne.jpg",
        ingredients: [
            "carne de res", "culantro", "cerveza", "ají amarillo", "cebolla", 
            "ajo", "arvejas", "zanahoria", "papa", "arroz", "aceite", "sal", 
            "pimienta", "comino"
        ]
    },
    {
        id: 9,
        name: "Lomo saltado",
        image: "images/lomo-saltado.jpg",
        ingredients: [
            "lomo de res", "cebolla", "tomate", "ají amarillo", "sillao (salsa de soya)", 
            "vinagre", "papa", "arroz", "ajo", "aceite", "sal", "pimienta", 
            "culantro"
        ]
    },
    {
        id: 10,
        name: "Tallarines verdes",
        image: "images/tallarines-verdes.jpg",
        ingredients: [
            "fideos", "espinaca", "albahaca", "leche", "queso fresco", 
            "queso parmesano", "ajo", "cebolla", "aceite", "sal", "pimienta", 
            "nueces"
        ]
    },
    {
        id: 11,
        name: "Papa a la huancaína",
        image: "images/papa-a-la-huancaina.jpg",
        ingredients: [
            "papa", "ají amarillo", "queso fresco", "leche", "galleta soda", 
            "ajo", "cebolla", "aceituna", "huevo", "lechuga", "aceite", "sal"
        ]
    },
    {
        id: 12,
        name: "Seco de carne con frejoles",
        image: "images/seco-con-frejoles.jpg",
        ingredients: [
            "carne de res", "frejol canario", "culantro", "cerveza", "ají amarillo", 
            "cebolla", "ajo", "arroz", "aceite", "sal", "pimienta", "comino"
        ]
    },
    {
        id: 13,
        name: "Sudado de pescado",
        image: "images/sudado-de-pescado.jpg",
        ingredients: [
            "pescado", "tomate", "cebolla", "ají amarillo", "ají panca", 
            "culantro", "ajo", "chicha de jora", "yuca", "limón", "aceite", 
            "sal", "pimienta", "comino"
        ]
    }
];

// Lista completa de todos los ingredientes
const allIngredients = [
    // Proteínas
    "pollo", "pescado", "pescado blanco", "carne de res", "lomo de res", "carne molida",
    
    // Verduras y tubérculos
    "papa", "cebolla", "cebolla roja", "cebolla china", "tomate", "ají amarillo", 
    "ají limo", "ají panca", "pimiento", "zanahoria", "caigua", "espinaca", 
    "albahaca", "culantro", "lechuga", "yuca", "camote", "choclo", "arvejas",
    
    // Frutas y cítricos
    "limón", "pasas", "aceitunas", "aceituna",
    
    // Lácteos y huevos
    "leche", "queso fresco", "queso parmesano", "huevo",
    
    // Granos y féculas
    "arroz", "fideos", "pan", "pan rallado", "harina", "frejol canario", "cancha serrana",
    
    // Condimentos y especias
    "ajo", "sal", "pimienta", "comino", "orégano", "laurel", "kion (jengibre)",
    
    // Líquidos y salsas
    "aceite", "aceite de ajonjolí", "vinagre", "cerveza", "chicha de jora", 
    "sillao (salsa de soya)", "salsa de soya",
    
    // Otros
    "nueces", "galleta soda"
];

// Función para obtener ingredientes aleatorios adicionales que no están en el plato actual
function getRandomAdditionalIngredients(currentDishIngredients, count) {
    // Filtrar ingredientes que no están en el plato actual
    const availableIngredients = allIngredients.filter(
        ingredient => !currentDishIngredients.includes(ingredient)
    );
    
    // Mezclar y seleccionar aleatoriamente
    const shuffled = availableIngredients.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para obtener todos los ingredientes para un plato (correctos + adicionales)
function getIngredientsForGame(dishId, totalIngredients = 15) {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return [];
    
    const correctIngredients = dish.ingredients;
    const additionalCount = Math.max(0, totalIngredients - correctIngredients.length);
    const additionalIngredients = getRandomAdditionalIngredients(correctIngredients, additionalCount);
    
    // Combinar y mezclar todos los ingredientes
    return [...correctIngredients, ...additionalIngredients].sort(() => 0.5 - Math.random());
} 