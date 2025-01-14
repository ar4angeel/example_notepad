const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Функция для загрузки файла
function uploadFile(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.setRequestHeader('Filename', file.name);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Файл успешно загружен');
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send(file);
}

// Функция для обработки изменения в input
function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
}

// Привязываем обработчик события к элементу input
fileInput.addEventListener('change', handleFileChange);

// Функция для получения списка файлов
function listFiles() {
    fetch('/files')
        .then(response => {
            console.log(response)
            console.log(typeof(response))
            return response.json();
        })
        .then(files => {
            fileList.innerHTML = ''; // Очищаем список перед добавлением новых элементов
            files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file;
                fileList.appendChild(li);
            });
        })
        .catch(error => console.error('Ошибка при получении списка файлов:', error));
}

// Привязываем обработчик события к кнопке
document.getElementById('listFilesButton').addEventListener('click', listFiles);