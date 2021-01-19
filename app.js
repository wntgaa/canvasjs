const canvas=document.getElementById("jsCanvas")
const ctx =canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const browseBtn = document.querySelector('.browse-btn');
const realInput = document.querySelector('#real-input');
const uploadBtn = document.querySelector("jsUpload");

const INITIAL_COLOR = "#2c2c2c"

const CANVAS_SIZE = 500;

canvas.width =CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2,5;


let painting = false;
let filling = false;
let formData = new FormData();
function stopPainting() {
    painting =false;
}
function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event){
    const size = (event.target.value);
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "채우기";
    }else {
        filling = true;
        mode.innerText = "그리기";
 
    }
}

function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }
    
}

function handleCM(event){
    event.preventDefault()
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download ="내가 그린 그림![🖌️]";
    link.click();
}

function clearPainting(e){
        ctx.fillStyle="white";
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
}
function readInputFile(e) {
    var file = e.target.files;
  
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file[0]);
}

if(canvas){
    canvas.addEventListener("mousemove" ,onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
    realInput.addEventListener("change", readInputFile);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}

if (clear){
    clear.addEventListener("click", clearPainting)
}

if (uploadBtn){
    uploadBtn.addEventListener("click", readInputFile)
}