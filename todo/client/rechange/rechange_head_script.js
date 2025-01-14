function loadStylesheet() {
    var width = window.innerWidth; // Получаем ширину экрана
    var link = document.createElement('link'); // Создаем элемент link для подключения CSS

    if (width <= 768) { // Если ширина экрана меньше или равна 768px
        link.href = 'rechange_f.css'; // Указываем путь к стилям для n
    } else { // Если ширина экрана больше 768px
        link.href = 'rechange_s.css'; // Указываем путь к стилям для m
    }

    link.rel = 'stylesheet'; // Устанавливаем атрибут rel
    document.head.appendChild(link); // Добавляем элемент link в head
}

window.onload = loadStylesheet; // Загружаем стили при загрузке страницы
window.onresize = loadStylesheet; // Перезагружаем стили при изменении размера окна