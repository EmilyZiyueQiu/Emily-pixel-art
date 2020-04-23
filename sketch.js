let minDepth = 1;
let maxDepth = 9;

let xSize = 255;
let ySize = 255;





function setup() {
  background(255);
  cnv=createCanvas(xSize, ySize);
  centerCanvas();
  drawArt();
}

function draw(){
  console.log(frameCount);
}

function buildRandomFunction(depth) {
  if (depth>=maxDepth){
    return random([["x"],["y"]]);
  }
  else{
    var a = random(["sin_pi","cos_pi","prod","avg","cubic","abs"]);
    if (a=="sin_pi" || a=="cos_pi"||a=="cubic"||a=="abs"){
      return [a,buildRandomFunction(depth+1)];
    } if (a=="prod"||a=="avg"){
      return [a,buildRandomFunction(depth+1),buildRandomFunction(depth+1)];
    }
    return [random(["sin_pi","cos_pi"]),buildRandomFunction(depth+1)];
  }
}



function evaluateRandomFunction(fn, x, y) {
  // This function should return x if fn is ['x'].
  // It should call itself recursively if fn is, for example, ['avg', …, …]
  if (fn[0] == 'x') return x;
  if (fn[0] == 'y') return y;
  if (fn[0] == 'avg') return 0.5*evaluateRandomFunction(fn[1],x,y)+0.5*evaluateRandomFunction(fn[2],x,y);
  if (fn[0]=='cubic') return Math.pow(evaluateRandomFunction(fn[1],x,y),3);
  if (fn[0]=='prod') return evaluateRandomFunction(fn[1],x,y)*evaluateRandomFunction(fn[2],x,y);
  if (fn[0] == 'sin_pi') return Math.sin(PI*evaluateRandomFunction(fn[1],x,y)); 
  if (fn[0] == 'cos_pi') return Math.cos(PI*evaluateRandomFunction(fn[1],x,y));
  if (fn[0] == 'abs') return Math.abs(evaluateRandomFunction(fn[1],x,y));
  
}

function drawArt() {

let redFunction = buildRandomFunction(1);
let greenFunction = buildRandomFunction(1);
let blueFunction = buildRandomFunction(1);
  let img = createImage(xSize, ySize);  
  img.loadPixels();
  for (let i = 0; i < xSize; i++) {
    for (let j = 0; j < ySize; j++) {
      let x = map(i, 0, xSize, -1, 1);
      let y = map(j, 0, ySize, -1, 1);
      let r = evaluateRandomFunction(redFunction, x, y);
      let g = evaluateRandomFunction(greenFunction,x, y);
      let b = evaluateRandomFunction(blueFunction, x, y);
      img.set(i, j, color(255 * r, 255 * g, 255 * b));
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);
}

// set the canvas at the center of the page
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

//refresh
function refresh(){
  window.location.reload();
}