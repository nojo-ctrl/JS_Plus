const nameInput = document.getElementById('nameInput');
const saveNameButton = document.getElementById('saveNameButton');
const greeting = document.getElementById('greeting');


function displaySavedName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        greeting.textContent = `Привет, ${savedName}!`;
    }
}


saveNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        greeting.textContent = `Привет, ${name}!`;
        nameInput.value = ''; // Очищаем поле ввода
    }
});

displaySavedName();