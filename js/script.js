const colorpicker = document.getElementById("colorpicker");
const tshirt = document.getElementById("tshirt");
const tshirtText = document.getElementById("text");
const iShirtText = document.getElementById("i_text");
const iTextColor = document.getElementById("i_textColor");
const fontSelection = document.getElementById("fontSize");
const fileInput = document.getElementById("formFile");
const tshirtImage = document.getElementById("tshirtImg");
const imgSize = document.getElementById("imgSize");

const recolorImage = (image, color) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    context.globalCompositeOperation = "source-in";
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-atop";
    context.drawImage(image, 0, 0);
    const dataURL = canvas.toDataURL();
    const newImage = new Image();
    newImage.src = dataURL;
    return newImage;
  };

function changeColorImage() {
    const newImage = recolorImage(tshirt, colorpicker.value);
    tshirt.src = newImage.src;
}

colorpicker.onchange = function() {
    changeColorImage();
}

iShirtText.onkeyup = function() {
    tshirtText.innerHTML = iShirtText.value;
}

iTextColor.onchange = function() {
    tshirtText.style.color = iTextColor.value;
}

text.addEventListener('mousedown', (event) => {
  event.preventDefault();
});

document.body.style.userSelect = 'none';

for(let i = 10; i < 41; i++){
    let option = document.createElement("option");
    option.value = i+"px";
    option.innerHTML = i+"px";
    if(i == 25){
        option.selected = true;
    }
    fontSelection.appendChild(option);
}

for(let i = 10; i < 101; i++){
    let option = document.createElement("option");
    option.value = i+"%";
    option.innerHTML = i+"%";
    if(i == 50){
        option.selected = true;
    }
    imgSize.appendChild(option);
}

fontSelection.onchange = function() {
    tshirtText.style.fontSize = fontSelection.value;
}

imgSize.onchange = function() {
    tshirtImage.style.width = imgSize.value;
}

dragElement(tshirtImage);
dragElement(tshirtText);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        tshirtImage.src = reader.result;
      };
    }
})