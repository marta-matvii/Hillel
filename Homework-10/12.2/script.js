const parentContainer = document.getElementById('parent-container');
const messageContainer = document.getElementById('message');

parentContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn')) {
        const buttonText = event.target.textContent;
        
        messageContainer.textContent = `Клікнуто на кнопці: ${buttonText}`;
        messageContainer.style.display = 'block';
    }
});