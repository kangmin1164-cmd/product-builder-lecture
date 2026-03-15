const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeBtn = document.getElementById('theme-btn');

function playSound() {
    // Web Audio API를 사용해서 효과음 생성
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    // 첫 번째 음 (높은음)
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.value = 800;
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc1.start(now);
    osc1.stop(now + 0.1);

    // 두 번째 음 (낮은음)
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.value = 600;
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0.3, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.2);
}

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
    playSound(); // 효과음 재생
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
