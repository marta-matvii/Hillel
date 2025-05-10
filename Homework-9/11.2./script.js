const textBlock = document.getElementById('text-block');
const colorButton = document.getElementById('color-button');

let isColorChanged = false;

colorButton.addEventListener('click', function() {
    if (isColorChanged) {
        textBlock.style.color = '';
        isColorChanged = false;
    } else {
        textBlock.style.color = 'blue';
        isColorChanged = true;
    }
});