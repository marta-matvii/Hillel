const sliderConfig = {
    currentSlide: 0,
    totalSlides: 10
};

const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevDot = document.getElementById('prevDot');
const currentDot = document.getElementById('currentDot');
const nextDot = document.getElementById('nextDot');

function updateSlider() {
    const translateX = -sliderConfig.currentSlide * 100;
    sliderTrack.style.transform = 'translateX(' + translateX + '%)';
    updateButtons();
    updateDots();
}

function updateButtons() {
    if (sliderConfig.currentSlide === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    if (sliderConfig.currentSlide === sliderConfig.totalSlides - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function updateDots() {
    currentDot.classList.add('slider-dot--active');
    
    if (sliderConfig.currentSlide === 0) {
        prevDot.disabled = true;
    } else {
        prevDot.disabled = false;
    }
    
    if (sliderConfig.currentSlide === sliderConfig.totalSlides - 1) {
        nextDot.disabled = true;
    } else {
        nextDot.disabled = false;
    }
}

function nextSlide() {
    if (sliderConfig.currentSlide < sliderConfig.totalSlides - 1) {
        sliderConfig.currentSlide++;
        updateSlider();
    }
}

function prevSlide() {
    if (sliderConfig.currentSlide > 0) {
        sliderConfig.currentSlide--;
        updateSlider();
    }
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
prevDot.addEventListener('click', prevSlide);
nextDot.addEventListener('click', nextSlide);

updateSlider();