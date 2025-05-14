let saveUrl = '';

const enterLinkButton = document.getElementById('enterButton');
const goByLink = document.getElementById('goButton');
const statusElement = document.getElementById('status');

goByLink.disabled = true;

enterLinkButton.addEventListener('click', function() {
    const url = prompt('Enter URL (starting with https://):');
    
    if (!url) {
        statusElement.textContent = 'No link entered';
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        statusElement.textContent = 'Error! URL must start with http:// or https://';
        return;
    }
    
    savedUrl = url;
    statusElement.textContent = `Link saved: ${savedUrl}`;
    goByLink.disabled = false;
});

goByLink.addEventListener('click', function() {
    if (!savedUrl) {
        statusElement.textContent = 'No saved link';
        return;
    }
    
    window.location.href = savedUrl;
});