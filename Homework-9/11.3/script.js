const randomImage = document.getElementById('random-image');
const newImageButton = document.getElementById('new-image-button');

function getRandomImageNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

function showRandomImage() {
  const randomNumber = getRandomImageNumber();
  randomImage.src = `img/spongebob${randomNumber}.webp`;
}

showRandomImage();

newImageButton.addEventListener('click', showRandomImage);