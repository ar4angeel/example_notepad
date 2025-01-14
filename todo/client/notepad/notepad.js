const imgElement = document.querySelector('img[alt="me"]');
const addButton = document.querySelector('img[alt="add"]');
// const fileInput = document.querySelector('input[type="file"]');

// fetch('/files')
//     .then(response => response.json())
//     .then(files => {
//         console.log(files); // Выводим список файлов в консоль
//     });

// function myFunction() {
//     console.log('Изображение было кликнуто!');
// };

function addPic() {
    console.log('Добавить раздел')
};

// function uploadFile(file) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/upload', true);
//     xhr.setRequestHeader('Filename', file.name);
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             console.log('File uploaded successfully');
//         } else {
//             console.error('Upload failed');
//         }
//     };
//     xhr.send(file);
// };

imgElement.addEventListener('click', myFunction);
addButton.addEventListener('click', addPic);

// function handleFileChange(event) {
//     const file = event.target.files[0];
//     if (file) {
//         uploadFile(file);
//     }
// }


// fileInput.addEventListener('change', handleFileChange);

