// Variables globales
let currentDish = null;
let selectedIngredients = [];
let score = 0;
let playedDishes = [];
const TOTAL_DISHES = 5; // Número de platos a jugar en una partida
let timerInterval = null;
let timeLeft = 60; // 1 minuto en segundos

// Elementos del DOM
const scoreElement = document.getElementById('score');
const currentDishElement = document.getElementById('current-dish');
const dishImageElement = document.getElementById('dish-image');
const ingredientsGridElement = document.getElementById('ingredients-grid');
const checkButton = document.getElementById('check-button');
const nextButton = document.getElementById('next-button');
const resultMessageElement = document.getElementById('result-message');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');
const timerContainer = document.querySelector('.timer-container');

// Inicializar el juego
function initGame() {
    score = 0;
    playedDishes = [];
    updateScore();
    resetTimer();
    startTimer();
    loadNextDish();
    
    // Ocultar pantalla de fin de juego si está visible
    gameOverElement.style.display = 'none';
}

// Función para formatear el tiempo en formato MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Iniciar el temporizador
function startTimer() {
    // Limpiar cualquier intervalo existente
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Actualizar el elemento del temporizador
        timerElement.textContent = formatTime(timeLeft);
        
        // Cambiar el estilo según el tiempo restante
        if (timeLeft <= 10) {
            timerContainer.className = 'timer-container danger';
        } else if (timeLeft <= 20) {
            timerContainer.className = 'timer-container warning';
        } else {
            timerContainer.className = 'timer-container';
        }
        
        // Si el tiempo se acaba, terminar el juego
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Reiniciar el temporizador
function resetTimer() {
    timeLeft = 60; // 1 minuto
    timerElement.textContent = formatTime(timeLeft);
    timerContainer.className = 'timer-container';
}

// Cargar el siguiente plato
function loadNextDish() {
    // Reiniciar selección
    selectedIngredients = [];
    
    // Ocultar mensaje de resultado y botón siguiente
    resultMessageElement.className = 'result-message';
    resultMessageElement.style.display = 'none';
    nextButton.style.display = 'none';
    checkButton.style.display = 'inline-block';
    
    // Seleccionar un plato aleatorio que no se haya jugado
    let availableDishes = dishes.filter(dish => !playedDishes.includes(dish.id));
    
    // Si no hay más platos disponibles, terminar el juego
    if (availableDishes.length === 0 || playedDishes.length >= TOTAL_DISHES) {
        endGame();
        return;
    }
    
    // Seleccionar un plato aleatorio
    const randomIndex = Math.floor(Math.random() * availableDishes.length);
    currentDish = availableDishes[randomIndex];
    playedDishes.push(currentDish.id);
    
    // Actualizar la interfaz
    currentDishElement.textContent = currentDish.name;
    
    // Intentar cargar la imagen del plato
    const dishImageContainer = document.getElementById('dish-image-container');
    dishImageContainer.innerHTML = ''; // Limpiar el contenedor
    
    // Crear elemento de imagen
    const img = document.createElement('img');
    img.id = 'dish-image';
    img.src = currentDish.image;
    img.alt = currentDish.name;
    
    // Manejar el caso en que la imagen no existe
    img.onerror = function() {
        // Eliminar la imagen y mostrar solo el nombre del plato centrado
        dishImageContainer.innerHTML = '';
        const nameElement = document.createElement('div');
        nameElement.className = 'dish-name-placeholder';
        nameElement.textContent = currentDish.name;
        dishImageContainer.appendChild(nameElement);
    };
    
    // Añadir la imagen al contenedor
    dishImageContainer.appendChild(img);
    
    // Obtener ingredientes para el juego (correctos + adicionales)
    const gameIngredients = getIngredientsForGame(currentDish.id);
    
    // Renderizar los ingredientes
    renderIngredients(gameIngredients);
}

// Renderizar los ingredientes en la cuadrícula
function renderIngredients(ingredients) {
    ingredientsGridElement.innerHTML = '';
    
    ingredients.forEach(ingredient => {
        const ingredientElement = document.createElement('div');
        ingredientElement.className = 'ingredient-item';
        ingredientElement.dataset.ingredient = ingredient;
        
        // Crear imagen del ingrediente
        const imgElement = document.createElement('img');
        imgElement.className = 'ingredient-image';
        
        // Mapear el nombre del ingrediente al nombre del archivo de imagen
        const imageMap = {
            "ajo": "ajos.jpg",
            "ajos": "ajos.jpg",
            "limón": "limon.jpg",
            "aceitunas": "aceitunas.jpg",
            "aceituna": "aceitunas.jpg",
            "galleta soda": "galletas_de_soda.jpg",
            "aceite": "aceite.jpg",
            "vinagre": "vinagre.jpg",
            "huevo": "huevos.jpg",
            "tomate": "tomate.jpg",
            "culantro": "culantro.jpg",
            "pasas": "pasas.jpg",
            "lechuga": "lechuga.jpg",
            "kion (jengibre)": "jenjibre.jpg",
            "jengibre": "jenjibre.jpg",
            "comino": "comino.jpg",
            "pimienta": "pimienta.jpg",
            "sal": "sal.png",
            "cebolla": "cebolla.jpg",
            "cebolla roja": "cebolla.jpg",
            "cebolla china": "cebolla.jpg",
            "pescado": "pescado.jpg",
            "pescado blanco": "pescado.jpg",
            "carne molida": "carne_molida.jpg",
            "lomo de res": "lomo.jpg",
            "carne de res": "lomo.jpg",
            "ají amarillo": "aji_amarillo.jpg",
            "ají limo": "rocoto.jpg",
            "ají panca": "aji_amarillo.jpg",
            "arroz": "arroz.jpg",
            "perejil": "perejil.jpg"
        };
        
        // Obtener el nombre de archivo de imagen o usar un placeholder
        const imageName = imageMap[ingredient.toLowerCase()] || "download.jpg";
        imgElement.src = `images/${imageName}`;
        imgElement.alt = ingredient;
        
        // Crear nombre del ingrediente
        const nameElement = document.createElement('span');
        nameElement.textContent = ingredient;
        
        // Añadir elementos al contenedor
        ingredientElement.appendChild(imgElement);
        ingredientElement.appendChild(nameElement);
        
        // Añadir evento de clic
        ingredientElement.addEventListener('click', () => toggleIngredient(ingredient, ingredientElement));
        
        // Añadir al grid
        ingredientsGridElement.appendChild(ingredientElement);
    });
}

// Alternar la selección de un ingrediente
function toggleIngredient(ingredient, element) {
    // Si ya está seleccionado, deseleccionarlo
    if (selectedIngredients.includes(ingredient)) {
        selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
        element.classList.remove('selected');
    } else {
        // Si no está seleccionado, seleccionarlo
        selectedIngredients.push(ingredient);
        element.classList.add('selected');
    }
}

// Verificar los ingredientes seleccionados
function checkIngredients() {
    const correctIngredients = currentDish.ingredients;
    let correctCount = 0;
    let incorrectCount = 0;
    
    // Marcar ingredientes correctos e incorrectos
    document.querySelectorAll('.ingredient-item').forEach(element => {
        const ingredient = element.dataset.ingredient;
        element.classList.remove('selected');
        
        if (selectedIngredients.includes(ingredient)) {
            if (correctIngredients.includes(ingredient)) {
                element.classList.add('correct');
                correctCount++;
            } else {
                element.classList.add('incorrect');
                incorrectCount++;
            }
        } else if (correctIngredients.includes(ingredient)) {
            // Marcar los ingredientes correctos que no fueron seleccionados
            element.classList.add('correct');
        }
    });
    
    // Calcular puntuación
    const totalCorrect = correctIngredients.length;
    const pointsPerCorrect = 10;
    const pointsPerIncorrect = -5;
    
    const roundScore = (correctCount * pointsPerCorrect) + (incorrectCount * pointsPerIncorrect);
    score += Math.max(0, roundScore); // No permitir puntuación negativa en una ronda
    
    // Actualizar puntuación
    updateScore();
    
    // Mostrar mensaje de resultado
    let message = '';
    if (correctCount === totalCorrect && incorrectCount === 0) {
        message = '¡Perfecto! Has seleccionado todos los ingredientes correctos.';
        resultMessageElement.className = 'result-message success';
    } else if (correctCount === totalCorrect) {
        message = '¡Casi perfecto! Has seleccionado todos los ingredientes correctos, pero también algunos innecesarios.';
        resultMessageElement.className = 'result-message success';
    } else {
        message = `Has seleccionado ${correctCount} de ${totalCorrect} ingredientes correctos.`;
        resultMessageElement.className = 'result-message error';
    }
    
    resultMessageElement.textContent = message;
    resultMessageElement.style.display = 'block';
    
    // Ocultar botón de verificar y mostrar botón de siguiente
    checkButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
}

// Actualizar la puntuación en la interfaz
function updateScore() {
    scoreElement.textContent = score;
}

// Finalizar el juego
function endGame() {
    // Detener el temporizador
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Mostrar pantalla de fin de juego
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;
    
    // Ocultar contenedor del juego
    document.querySelector('.game-container').style.display = 'none';
}

// Event listeners
checkButton.addEventListener('click', checkIngredients);
nextButton.addEventListener('click', loadNextDish);
restartButton.addEventListener('click', () => {
    document.querySelector('.game-container').style.display = 'block';
    initGame();
});

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initGame); 