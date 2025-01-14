const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Определяем фигуры
const rect1 = { x: 50, y: 50, width: 100, height: 100 };
const rect2 = { x: 120, y: 120, width: 100, height: 100 };

let isDragging = false;
let isCollision = false;

function myCheckCollision(rectA, rectB) {
    isCollision = rectA.x + rectA.width > rectB.x && 
                  rectB.x + rectB.width > rectA.x && 
                  rectA.y > rectB.y + rectB.height && 
                  rectB.y > rectA.y + rectA.height

    return !isCollision;
}

function drawRect(rect, color) {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

// function checkCollision(rectA, rectB) {
//     return rectA.x < rectB.x + rectB.width &&
//             rectA.x + rectA.width > rectB.x &&
//             rectA.y < rectB.y + rectB.height &&
//             rectA.y + rectA.height > rectB.y;
// }

// Обработчики событий мыши

function onMouseDown(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    if (!(mouseX > rect1.x + rect1.width && mouseX < rect1.x && mouseY < rect1.y && mouseY > rect1.y + rect1.height)) {
        isDragging = true;
        offsetX = mouseX - rect1.x
        offsetY = mouseY - rect1.y
    }

    // Проверяем, попал ли курсор в прямоугольник
    // if (mouseX >= rect1.x && mouseX <= rect1.x + rect1.width && mouseY >= rect1.y && mouseY <= rect1.y + rect1.height) {
    //     isDragging = true;
    //     offsetX = mouseX - rect1.x;
    //     offsetY = mouseY - rect1.y;
    // }
}

function isMouseMove(event) {
    if (isDragging) {
        rect1.x = event.offsetX - offsetX;
        rect1.y = event.offsetY - offsetY;
        update();
        if (myCheckCollision(rect1, rect2)) {
            console.log('Фигуры пересекаются!');
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(rect1, 'blue');
    drawRect(rect2, 'red');
}

canvas.addEventListener('mousemove', isMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});


// Инициализация
update();