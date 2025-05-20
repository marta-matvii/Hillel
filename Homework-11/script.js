const form = document.querySelector('form');

function clearError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.classList.remove('error');
}

function showError(input, message) {
    clearError(input);
    
    if (message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        
        input.classList.add('error');
        
        return false;
    }
    return true;
}

function validateEmail(email) {
    if (!email) {
        return "Email є обов'язковим";
    }
    
    if (email.indexOf('@') === -1) {
        return "Email повинен містити символ @";
    }
    
    if (email.indexOf('.') === -1) {
        return "Email повинен містити крапку";
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return "Будь ласка, введіть коректний email";
    }
    
    return '';
}

function validatePhone(phone) {
    if (!phone) {
        return "Номер телефону є обов'язковим";
    }
    
    if (!phone.startsWith('+380')) {
        return "Номер телефону повинен починатися з +380";
    }
    
    const phonePattern = /^\+380\d{9,}$/;
    if (!phonePattern.test(phone)) {
        return "Номер телефону має бути в форматі +380XXXXXXXXX, де X - цифри";
    }
    
    return '';
}

const nameInput = document.getElementById('exampleFormControlInput1');
const messageInput = document.getElementById('exampleFormControlTextarea1');
const phoneInput = document.getElementById('exampleFormControlInput2');
const emailInput = document.getElementById('exampleFormControlInput3');

nameInput.addEventListener('input', () => clearError(nameInput));
messageInput.addEventListener('input', () => clearError(messageInput));
phoneInput.addEventListener('input', () => clearError(phoneInput));
emailInput.addEventListener('input', () => clearError(emailInput));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nameError = nameInput.value ? '' : "Ім'я є обов'язковим";
    const messageError = messageInput.value.length >= 5 ? '' : "Повідомлення повинно містити не менше 5 символів";
    const phoneError = validatePhone(phoneInput.value);
    const emailError = validateEmail(emailInput.value);
    
    const isNameValid = showError(nameInput, nameError);
    const isMessageValid = showError(messageInput, messageError);
    const isPhoneValid = showError(phoneInput, phoneError);
    const isEmailValid = showError(emailInput, emailError);
    
    console.log("Валідація полів:");
    console.log(`Ім'я (${nameInput.value}): ${isNameValid ? 'валідне' : 'невалідне'}`);
    console.log(`Повідомлення (${messageInput.value}): ${isMessageValid ? 'валідне' : 'невалідне'}`);
    console.log(`Телефон (${phoneInput.value}): ${isPhoneValid ? 'валідний' : 'невалідний'}`);
    console.log(`Email (${emailInput.value}): ${isEmailValid ? 'валідний' : 'невалідний'}`);
    
    if (isNameValid && isMessageValid && isPhoneValid && isEmailValid) {
        const formData = new FormData(event.target);
        const formObj = {};
        
        formData.forEach((value, key) => formObj[key] = value);
        
        console.log("Форма пройшла валідацію!");
        console.log(formObj);
    } else {
        console.log("Форма містить помилки!");
    }
});