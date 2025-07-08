// Клас для управління голосуванням за смайлики
class EmojiVoting {
    constructor() {
        // Початковий набір смайликів
        this.defaultEmojis = [
            { id: 1, emoji: '🪼', votes: 0 },
            { id: 2, emoji: '🪲', votes: 0 },
            { id: 3, emoji: '⛱️', votes: 0 },
            { id: 4, emoji: '🪩', votes: 0 },
            { id: 5, emoji: '🪅', votes: 0 }
        ];
        
        // Завантажуємо дані з localStorage або використовуємо початкові
        this.emojis = this.loadFromLocalStorage();
        
        // Прив'язуємо методи до контексту класу
        this.init();
    }

    // Ініціалізація компонента
    init() {
        this.renderEmojis();
        this.bindEvents();
    }

    // Завантаження даних з localStorage
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('emojiVotingData');
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Помилка завантаження з localStorage:', error);
        }
        // Повертаємо копію початкових даних
        return JSON.parse(JSON.stringify(this.defaultEmojis));
    }

    // Збереження даних в localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('emojiVotingData', JSON.stringify(this.emojis));
        } catch (error) {
            console.error('Помилка збереження в localStorage:', error);
        }
    }

    // Відображення смайликів на сторінці
    renderEmojis() {
        const container = document.getElementById('emojiContainer');
        container.innerHTML = ''; // Очищаємо контейнер

        this.emojis.forEach(emoji => {
            // Створюємо контейнер для смайлика
            const emojiItem = document.createElement('div');
            emojiItem.className = 'emoji-item';

            // Створюємо кнопку смайлика
            const emojiButton = document.createElement('button');
            emojiButton.className = 'emoji-button';
            emojiButton.textContent = emoji.emoji;
            emojiButton.onclick = () => this.voteForEmoji(emoji.id);

            // Створюємо лічильник голосів
            const voteCount = document.createElement('div');
            voteCount.className = 'vote-count';
            voteCount.textContent = emoji.votes;

            // Додаємо елементи до контейнера
            emojiItem.appendChild(emojiButton);
            emojiItem.appendChild(voteCount);
            container.appendChild(emojiItem);
        });
    }

    // Голосування за смайлик
    voteForEmoji(id) {
        // Знаходимо смайлик за ID та збільшуємо кількість голосів
        this.emojis = this.emojis.map(emoji => 
            emoji.id === id 
                ? { ...emoji, votes: emoji.votes + 1 }
                : emoji
        );

        // Зберігаємо зміни в localStorage
        this.saveToLocalStorage();
        
        // Оновлюємо відображення
        this.renderEmojis();
    }

    // Показ результатів голосування
    showResults() {
        // Знаходимо переможця (смайлик з найбільшою кількістю голосів)
        const winner = this.emojis.reduce((prev, current) => 
            prev.votes > current.votes ? prev : current
        );

        // Отримуємо елементи для відображення результатів
        const resultsContainer = document.getElementById('resultsContainer');
        const winnerEmoji = document.getElementById('winnerEmoji');
        const winnerVotes = document.getElementById('winnerVotes');

        // Заповнюємо дані переможця
        winnerEmoji.textContent = winner.emoji;
        winnerVotes.textContent = `Кількість голосів: ${winner.votes}`;

        // Показуємо контейнер результатів
        resultsContainer.classList.remove('hidden');
    }

    // Очищення результатів голосування
    clearResults() {
        // Скидаємо всі голоси до нуля
        this.emojis = this.emojis.map(emoji => ({ ...emoji, votes: 0 }));

        // Зберігаємо зміни в localStorage
        this.saveToLocalStorage();

        // Оновлюємо відображення
        this.renderEmojis();

        // Ховаємо результати
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.add('hidden');
    }

    // Прив'язка подій до кнопок
    bindEvents() {
        const showResultsBtn = document.getElementById('showResultsBtn');
        const clearResultsBtn = document.getElementById('clearResultsBtn');

        // Прив'язуємо обробники подій
        showResultsBtn.addEventListener('click', () => this.showResults());
        clearResultsBtn.addEventListener('click', () => this.clearResults());
    }
}

// Ініціалізація додатка після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    new EmojiVoting();
});