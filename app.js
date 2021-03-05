// Select the elements on the page - canvas, shake button

const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");

const shakeButton = document.querySelector(".shake");
const MOVE_AMOUNT = 27;

// Setup our canvas for drawing

// *This
// const width = canvas.width;
// const height = canvas.height;
//*Becomes this
const {width,height } = canvas; // Destructuring

// create random x and y starting points on the canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Makes a smooth drawing, the default has edges
ctx.lineJoin ="round";
ctx.lineCap = "round";
ctx.lineWidth = 30;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 90%, 50%)`;

ctx.beginPath(); // Start the drawing (put marker on page)
ctx.moveTo(x, y);
ctx.lineTo(x,y);
ctx.stroke();

// Write a draw function

function draw({ key }) {
    // Increment the hue
    hue += 7;
    ctx.strokeStyle = `hsl(${hue}, 90%, 50%)`;

    console.log(key);
    // start the path
    ctx.beginPath();
    ctx.moveTo(x,y);
    // Move our x and y values depending on what the user did
    switch(key) {
        case "ArrowUp" :
            y -= MOVE_AMOUNT;
            break;
        case "ArrowRight" :
            x += MOVE_AMOUNT;
            break;
        case "ArrowDown" :
            y += MOVE_AMOUNT;
            break;
        case "ArrowLeft" : 
            x -= MOVE_AMOUNT;
            break;
        default:
            break;
    }
    
    ctx.lineTo(x,y);
    ctx.stroke();
}

// Write a handler for the keys

function handleKey(e) {
    if(e.key.includes("Arrow")) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// clear / shake function

function clearCanvas() {
    canvas.classList.add("shake");
    canvas.addEventListener("animationend", () => {
        canvas.classList.remove("shake");
    }, { once: true });
    ctx.clearRect(0, 0, width, height);
}


// Listen for arrow keys 
window.addEventListener("keydown", handleKey);
shakeButton.addEventListener("click", clearCanvas)
