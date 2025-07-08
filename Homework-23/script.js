class EmojiVoting {
    constructor() {
        this.defaultEmojis = [
            { id: 1, emoji: '🪼', votes: 0 },
            { id: 2, emoji: '🪲', votes: 0 },
            { id: 3, emoji: '⛱️', votes: 0 },
            { id: 4, emoji: '🪩', votes: 0 },
            { id: 5, emoji: '🪅', votes: 0 }
        ];
        
        this.emojis = this.loadFromLocalStorage();
        
        this.init();
    }

    init() {
        this.renderEmojis();
        this.bindEvents();
    }

    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('emojiVotingData');
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Помилка завантаження з localStorage:', error);
        }
        return JSON.parse(JSON.stringify(this.defaultEmojis));
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('emojiVotingData', JSON.stringify(this.emojis));
        } catch (error) {
            console.error('Помилка збереження в localStorage:', error);
        }
    }

    renderEmojis() {
        const container = document.getElementById('emojiContainer');
        container.innerHTML = ''; 

        this.emojis.forEach(emoji => {
            const emojiItem = document.createElement('div');
            emojiItem.className = 'emoji-item';

            const emojiButton = document.createElement('button');
            emojiButton.className = 'emoji-button';
            emojiButton.textContent = emoji.emoji;
            emojiButton.onclick = () => this.voteForEmoji(emoji.id);

            const voteCount = document.createElement('div');
            voteCount.className = 'vote-count';
            voteCount.textContent = emoji.votes;

            emojiItem.appendChild(emojiButton);
            emojiItem.appendChild(voteCount);
            container.appendChild(emojiItem);
        });
    }

    voteForEmoji(id) {
        this.emojis = this.emojis.map(emoji => 
            emoji.id === id 
                ? { ...emoji, votes: emoji.votes + 1 }
                : emoji
        );

        this.saveToLocalStorage();
        
        this.renderEmojis();
    }

    showResults() {
        const winner = this.emojis.reduce((prev, current) => 
            prev.votes > current.votes ? prev : current
        );

        const resultsContainer = document.getElementById('resultsContainer');
        const winnerEmoji = document.getElementById('winnerEmoji');
        const winnerVotes = document.getElementById('winnerVotes');

        winnerEmoji.textContent = winner.emoji;
        winnerVotes.textContent = `Кількість голосів: ${winner.votes}`;

        resultsContainer.classList.remove('hidden');
    }

    clearResults() {
        this.emojis = this.emojis.map(emoji => ({ ...emoji, votes: 0 }));

        this.saveToLocalStorage();

        this.renderEmojis();

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.add('hidden');
    }

    bindEvents() {
        const showResultsBtn = document.getElementById('showResultsBtn');
        const clearResultsBtn = document.getElementById('clearResultsBtn');

        showResultsBtn.addEventListener('click', () => this.showResults());
        clearResultsBtn.addEventListener('click', () => this.clearResults());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EmojiVoting();
});