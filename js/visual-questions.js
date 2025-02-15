const questionContainer = document.getElementById('question-container');
const questionTitle = document.getElementById('question-title');
const mainImageContainer = document.getElementById('main-image-container');
const mainImage = document.getElementById('main-image');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const options = document.querySelectorAll('.option');

let currentLevel = 0;
let score = 0;
const levels = [
    {
        title: "السؤال 1: اضغط على صوره الحيوان التى ظهرت صورته",
        main: 'images/image1.jpg',
        options: ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg'],
        correct: 0
    },
    {
        title: "السؤال 2: اضغط على الفاكهه التى ظهرت في الصوره؟",
        main: 'images/image5.jpg',
        options: ['images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg'],
        correct: 0
    },
    {
        title: "السؤال 2: اضغط على الفاكهه التى ظهرت في الصوره؟",
        main: 'images/image7.jpg',
        options: ['images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg'],
        correct: 0
    },
    // إضافة المزيد من الأسئلة هنا
];

function loadLevel() {
    if (currentLevel < levels.length) {
        const level = levels[currentLevel];
        questionTitle.textContent = level.title;
        mainImage.src = level.main;
        mainImageContainer.classList.remove('hidden');
        optionsContainer.classList.add('hidden');

        setTimeout(() => {
            mainImageContainer.classList.add('hidden');
            optionsContainer.classList.remove('hidden');
            level.options.forEach((src, index) => {
                options[index].src = src;
            });
        }, 5000);
    } else {
        window.location.href = 'shape-matching.html'; // الانتقال إلى صفحة توصيل الأشكال
    }
}

function checkAnswer(selectedIndex) {
    const level = levels[currentLevel];
    if (selectedIndex === level.correct) {
        score++;
    }

    currentLevel++;
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    nextButton.classList.add('hidden');
    loadLevel();
});

options.forEach((option, index) => {
    option.addEventListener('click', () => checkAnswer(index));
});

// بدء اللعبة
loadLevel();