//===================================================
//                   VARIABLES
//===================================================
const colorpicker = document.getElementById("colorpicker");
const tshirt = document.getElementById("tshirt");
const tshirtText = document.getElementById("text");
const iShirtText = document.getElementById("i_text");
const iTextColor = document.getElementById("i_textColor");
const fontSize = document.getElementById("fontSize");
const fileInput = document.getElementById("formFile");
const tshirtImage = document.getElementById("tshirtImg");
const imgSize = document.getElementById("imgSize");
const fontSelection = document.getElementById("fontSelection");
const savePositions = document.getElementById("savePositions");

const slots = 4;

const fonts = {
  "Arial": "Arial, Helvetica, sans-serif",
  "Arial Black": "'Arial Black', Gadget, sans-serif",
  "Comic Sans MS": "'Comic Sans MS', cursive, sans-serif",
  "Courier New": "'Courier New', Courier, monospace",
  "Georgia": "Georgia, serif",
  "Impact": "Impact, Charcoal, sans-serif",
  "Lucida Console": "'Lucida Console', Monaco, monospace",
  "Lucida Sans Unicode": "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
  "Palatino Linotype": "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  "Tahoma": "Tahoma, Geneva, sans-serif",
  "Times New Roman": "'Times New Roman', Times, serif",
  "Trebuchet MS": "'Trebuchet MS', Helvetica, sans-serif",
}

//===================================================
//              SAVING & LOADING DATA
//===================================================
let save = {
  "tshirtColor": "",
  "text": "",
  "textColor": "",
  "fontSize": "",
  "image": "",
  "imageSize": "",
  "font": "",
  "top": "",
  "left": "",
  "topImg": "",
  "leftImg": ""
};

for(let i = 0; i < slots; i++){
    //Construct row, cols and buttons
    let row = document.createElement("div");
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    row.classList.add("row", "mb-3");
    div.classList.add("col-6");
    div2.classList.add("col-5");
    div3.classList.add("col-1");

    //Save button
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "w-100");
    button.type = "button";
    button.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Uložit ' + (i+1);

    //Load button
    let button2 = document.createElement("button");
    button2.classList.add("btn", "btn-secondary", "w-100");
    button2.type = "button";
    button2.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Načíst ' + (i+1);

    //Delete button
    let button3 = document.createElement("button");
    button3.classList.add("btn", "btn-danger");
    button3.type = "button";
    button3.innerHTML = '<i class="fa-solid fa-trash"></i> ';

    //Save data listener
    button.addEventListener("click", function() {
        saveData(i);
    });

    //Load data listener
    button2.addEventListener("click", function() {
        loadData(i);
    });

    //Delete data listener
    button3.addEventListener("click", function() {
        localStorage.removeItem(i);
        alert("Data " + (i+1) + " byla smazána");
    });

    //Append elements
    div.appendChild(button);
    div2.appendChild(button2);
    div3.appendChild(button3);
    row.appendChild(div);
    row.appendChild(div2);
    row.appendChild(div3);
    savePositions.appendChild(row);
}

function saveData(slot) {
    save.tshirtColor = colorpicker.value;
    save.text = iShirtText.value;
    save.textColor = iTextColor.value;
    save.fontSize = fontSize.value;
    save.image = tshirtImage.src;
    save.imageSize = imgSize.value;
    save.font = fontSelection.value;
    save.top = tshirtText.style.top;
    save.left = tshirtText.style.left;
    save.topImg = tshirtImage.style.top;
    save.leftImg = tshirtImage.style.left;
    localStorage.setItem(slot, JSON.stringify(save));
    console.log("Data " + slot + " saved");
}

function loadData(slot) {
    if(localStorage.getItem(slot) != null){
        save = JSON.parse(localStorage.getItem(slot));
        iShirtText.value = save.text;
        iTextColor.value = save.textColor;
        fontSize.value = save.fontSize;
        if(save.image != ""){
            tshirtImage.src = save.image;
        }
        imgSize.value = save.imageSize;
        fontSelection.value = save.font;
        colorpicker.value = save.tshirtColor;
        changeColorImage();
        tshirtText.innerHTML = save.text;
        tshirtText.style.color = save.textColor;
        tshirtText.style.fontSize = save.fontSize;
        tshirtText.style.fontFamily = save.font;
        tshirtImage.style.width = save.imageSize;
        tshirtText.style.top = save.top;
        tshirtText.style.left = save.left;
        tshirtImage.style.top = save.topImg;
        tshirtImage.style.left = save.leftImg;
        console.log("Data " + slot + " loaded");
    }else{
        alert("Na slotu " + (slot+1) + " nejsou uložena žádná data");
    }
}

//===================================================
//                   RECOLOR IMAGE
//===================================================
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

colorpicker.addEventListener("input", function() {
    changeColorImage();
});

changeColorImage();

//===================================================
//                CHANGE SHIRT TEXT
//===================================================
iShirtText.onkeyup = function() {
    tshirtText.innerHTML = iShirtText.value;
}

//===================================================
//             CHANGE SHIRT TEXT COLOR
//===================================================

iTextColor.addEventListener("input", function() {
    tshirtText.style.color = iTextColor.value;
});

//===================================================
//                 PREVENT DRAGGING
//===================================================
text.addEventListener('mousedown', (event) => {
  event.preventDefault();
});

document.body.style.userSelect = 'none';

//===================================================
//                   FONT SIZE
//===================================================
for(let i = 10; i < 51; i++){
    let option = document.createElement("option");
    option.value = i+"px";
    option.innerHTML = i+"px";
    if(i == 25){
        option.selected = true;
    }
    fontSize.appendChild(option);
}

fontSize.onchange = function() {
  tshirtText.style.fontSize = fontSize.value;
}

//===================================================
//                   IMAGE SIZE
//===================================================
for(let i = 10; i < 101; i++){
    let option = document.createElement("option");
    option.value = i+"%";
    option.innerHTML = i+"%";
    if(i == 50){
        option.selected = true;
    }
    imgSize.appendChild(option);
}

imgSize.onchange = function() {
  tshirtImage.style.width = imgSize.value;
}

//===================================================
//                   FONT SELECTION
//===================================================
for(let font in fonts){
    let option = document.createElement("option");
    option.value = fonts[font];
    option.innerHTML = font;
    if(font == "Arial"){
        option.selected = true;
    }
    fontSelection.appendChild(option);
}

fontSelection.onchange = function() {
    tshirtText.style.fontFamily = fontSelection.value;
}

//===================================================
//                   DRAG ELEMENT
//===================================================

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

//===================================================
//                   SHIRT IMAGE
//===================================================
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      tshirtImage.src = reader.result;
    };
});