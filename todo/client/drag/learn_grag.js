const obj = document.getElementById('obj');
const btn2unHide = document.getElementById('btn2unHide');
const btn2cBtn = document.getElementById('btn2cBtn');
const btn2delBtn = document.getElementById('btn2delBtn');
const hideID = document.getElementById('hideID');
const btn2hide = document.getElementById('btn2hide');
const div2re = document.querySelector('.hideClass');
let buttons = {};
var count = 0

let clientX, clientY, offsetX, offsetY;

function print(content) {
    console.log(content);
}

function createBtn(div, name4create) {
    count = count + 1;
    let button = document.createElement("button");
    button.type = "button";
    // button.value = `${name4create}`;
    button.id = `btn${count}`;
    button.style.width = '150px';
    button.style.height = '100%';
    button.innerHTML = `${name4create}`;
    div.appendChild(button);
    buttons[`btn${count}`] = button;
    console.log(count);
    console.log(buttons);
    button.onclick = HideDiv
}

function deleteBtn(div) {
    div.removeChild(buttons[`btn${count}`]);
    count = count -1;
    console.log(count);
}

function unHideDiv() {
    div2re.style.display = 'block';
    div2re.style.backgroundColor = 'aquamarine';
    div2re.style.border = '3px solid black';
    div2re.style.height = '50px';
    div2re.style.width = '100%';
}

function HideDiv() {
    div2re.style.display = 'none';
}

function funcMouseDown(event) {
    clientX = event.clientX
    clientY = event.clientY
}

function funcMouseMove(event) {

}

function funcMouseUp(event) {

}

function update() {

}


btn2delBtn.addEventListener('click', deleteBtn.bind(null, hideID))
// const size = Object.keys(buttons).length;
// print(size);
// for (let index = 1; index < size; index++) {
//     print(buttons[`btn${index.toString()}`]);
//     buttons[`btn${index.toString()}`].addEventListener('click', HideDiv);
// }
btn2cBtn.addEventListener('click', createBtn.bind(null, hideID, "hide div"))
btn2unHide.addEventListener('click', unHideDiv)
obj.addEventListener('mousedown', funcMouseDown)
obj.addEventListener('mousemove', funcMouseMove)
obj.addEventListener('mousup', funcMouseUp)



// btn2cBtn.addEventListener('click', function() {
//     createBtn(hideID, "hide div");
//     const newButton = buttons[`btn${count}`];
//     newButton.addEventListener('click', HideDiv);
// });
