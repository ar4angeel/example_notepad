const mainDiv = document.getElementById('DragableButtonMain');
const testElements = document.getElementsByClassName('testElements');
const testPrintBtn = document.getElementById('printGetElement');
const startPointDiv = document.getElementById('startPointDiv');
const containerPointDiv = document.getElementById('containerPointDiv');

startPointDiv.style.height = '100px';
containerPointDiv.style.height = '100px';



function print(text) {
    console.log(text);
}

function printBtn() {
    print('mainDiv' + mainDiv);
    print('testElements' + testElements);
}

testPrintBtn.addEventListener('click', printBtn);