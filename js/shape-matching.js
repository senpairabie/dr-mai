const shapesContainer = document.getElementById('shapes-container');
const colorsContainer = document.getElementById('colors-container');
const restartButton = document.getElementById('restart-button');
const levelTitle = document.getElementById('level-title');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const nextLevelButton = document.getElementById('next-level-button');

const levels = [
    {
        shapes: ['square.png', 'circle.png', 'triangle.png'],
        colors: ['أحمر', 'أزرق', 'أخضر'],
        matches: { 'square.png': 'أحمر', 'circle.png': 'أزرق', 'triangle.png': 'أخضر' }
    },
    {
        shapes: ['star.png', 'heart.png', 'hexagon.png'],
        colors: ['أصفر', 'برتقالي', 'بنفسجي'],
        matches: { 'star.png': 'أصفر', 'heart.png': 'برتقالي', 'hexagon.png': 'بنفسجي' }
    },
    // إضافة المزيد من المستويات هنا
];

let currentLevel = 0;
let score = 0;

function getRandomElements(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function setupGame() {
    const level = levels[currentLevel];
    levelTitle.textContent = `المستوى ${currentLevel + 1}`;

    shapesContainer.innerHTML = '';
    colorsContainer.innerHTML = '';

    level.shapes.forEach(shape => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'shape';
        shapeDiv.draggable = true;
        shapeDiv.dataset.shape = shape;
        shapeDiv.innerHTML = `<img src="${shape}" alt="${shape}">`;
        shapesContainer.appendChild(shapeDiv);
    });

    level.colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.textContent = color;
        colorDiv.dataset.color = color;
        colorDiv.draggable = true;
        colorsContainer.appendChild(colorDiv);
    });

    setupDragAndDrop();
}

function setupDragAndDrop() {
    const shapes = document.querySelectorAll('.shape');
    const colors = document.querySelectorAll('.color');

    shapes.forEach(shape => {
        shape.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('shape', e.target.dataset.shape);
        });
    });

    colors.forEach(color => {
        color.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('color', e.target.dataset.color);
        });
    });

    shapes.forEach(shape => {
        shape.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        shape.addEventListener('drop', (e) => {
            const color = e.dataTransfer.getData('color');
            const level = levels[currentLevel];
            if (level.matches[shape.dataset.shape] === color) {
                shape.style.backgroundColor = 'lightgreen';
                shape.textContent = '✔️';
                score++;
            } else {
                shape.style.backgroundColor = 'lightcoral';
                shape.textContent = '❌';
            }
            checkLevelCompletion();
        });
    });

    colors.forEach(color => {
        color.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        color.addEventListener('drop', (e) => {
            const shape = e.dataTransfer.getData('shape');
            const level = levels[currentLevel];
            if (level.matches[shape] === color.dataset.color) {
                color.style.backgroundColor = 'lightgreen';
                color.textContent = '✔️';
                score++;
            } else {
                color.style.backgroundColor = 'lightcoral';
                color.textContent = '❌';
            }
            checkLevelCompletion();
        });
    });
}

function checkLevelCompletion() {
    const level = levels[currentLevel];
    if (score === level.shapes.length) {
        resultText.textContent = `تهانينا! لقد أكملت المستوى ${currentLevel + 1}`;
        resultContainer.classList.remove('hidden');
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        score = 0;
        setupGame();
        resultContainer.classList.add('hidden');
    } else {
        resultText.textContent = 'لقد أكملت جميع المستويات!';
        nextLevelButton.classList.add('hidden');
    }
}

restartButton.addEventListener('click', () => {
    currentLevel = 0;
    score = 0;
    setupGame();
    resultContainer.classList.add('hidden');
});

nextLevelButton.addEventListener('click', nextLevel);

// بدء اللعبة
setupGame();