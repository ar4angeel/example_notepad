// Функция для установки активного класса на ссылку
function setActiveLink() {
    // Получаем все ссылки
    const links = document.querySelectorAll('nav a');

    // Убираем класс active у всех ссылок
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Получаем текущий якорь
    const currentHash = window.location.hash;

    // Если есть текущий якорь, добавляем класс active к соответствующей ссылке
    if (currentHash) {
        const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function deset(){

    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.classList.remove('active');
    });
}

// Устанавливаем активную ссылку при загрузке страницы
// window.addEventListener('load', setActiveLink);

// Устанавливаем активную ссылку при изменении хеша (переход по якорям)
window.addEventListener('hashchange', setActiveLink);

window.addEventListener('beforeunload', deset);

// window.addEventListener('beforeunload', function (event) {
//     // Устанавливаем текст предупреждения
//     const confirmationMessage = 'Вы уверены, что хотите покинуть страницу?';
    
//     // В некоторых браузерах необходимо установить свойство returnValue
//     event.returnValue = confirmationMessage; // Для большинства браузеров
//     return confirmationMessage; // Для некоторых старых браузеров
// });