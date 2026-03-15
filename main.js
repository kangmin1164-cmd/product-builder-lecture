const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeBtn = document.getElementById('theme-btn');

function getNumberColor(number) {
    if (number >= 1 && number <= 10) {
        return 'lotto-yellow';
    } else if (number >= 11 && number <= 20) {
        return 'lotto-blue';
    } else if (number >= 21 && number <= 30) {
        return 'lotto-red';
    } else if (number >= 31 && number <= 45) {
        return 'lotto-gray';
    }
}

function generateNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    for (const number of sortedNumbers) {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        const colorClass = getNumberColor(number);
        numberElement.classList.add(colorClass);
        numberElement.textContent = number;
        lottoNumbersContainer.appendChild(numberElement);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// Initial theme setup
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

generateBtn.addEventListener('click', generateNumbers);
themeBtn.addEventListener('click', toggleTheme);

// Initial generation
generateNumbers();
