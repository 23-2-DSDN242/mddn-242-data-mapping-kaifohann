let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let textureImg = null;

// input/output file info
let sourceFile = "input_new3.jpg";
let maskFile   = "mask_new3.png";
let outputFile = "output_6.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup() {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background('#F0EAD6'); //eggshell
  sourceImg.loadPixels();
  maskImg.loadPixels(); 
}

function draw() {

  for(let i=0;i<15000;i++) { //determines how many elements are drawn
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    let sizeArray = [0, 1, 2, 3, 4, 5, 6]; //size of rectangles
   
    
    noStroke();
    if(mask[0] > 128) { // pt between 0 and 255 (white to black scale)
      //highlight buildings using random sized rectangle effect
      fill(pix);
      let rectSize = 3; //initial size of 
      rect(x, y, rectSize+random(sizeArray), rectSize+random(sizeArray)); //randomise size of rects (adding random number from sizeArray)
    } else {  
      //background paint stroke effect
        drawPill(x, y, pix); 
    }
  }


  function drawPill(x,y, pix) {
  
    pix[3] = 25; //change pix alpha value
    let col = color(pix);

    //following code based on effect from https://openprocessing.org/sketch/708075  
    //simplified and adjusted to fit my code, using perlin noise and sin/cos waves 

    let angle = 70; //sets initial angle
    angle += noise(x/100, y/100) * PI; //add random variation to angle
    fill(col); //fill with new alpha 
    pill(x, y, random(height/40, width/200), random(height/40, width/200), angle); 
  }


  function pill(x,y, width, height, rotation) {
    let size = width/6; //setting size to 1/6th of given width
    let precision = width/600; //controls smoothness of pill shape
    push();
    translate(x,y); //moves drawing origin to x,y
    rotate(rotation); //rotates pill drawing by specified angle
    beginShape();
    //
    for(let i=0; i< TWO_PI; i+= precision){ //loop goes through angles from 0 to full circle (two-pi) with tiny increments (precision)
      //loop calculates X and Y coordinates of points on the pill using trig. Adjusts size based on angle. (if angle > pi, reduce size to create slight tapered end to pill)
      let s = size;
      if(i>PI) { 
        s = size*0.7;
        vertex(cos(i+PI)*s, sin(i+PI)*s + height/2);
      } else {
        vertex(cos(i+PI)*s, sin(i+PI)*s - height/2);
      }
       
    }
    endShape(CLOSE);
    pop();
  }


  renderCounter = renderCounter + 1;
  if(renderCounter > 10) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
   saveArtworkImage(outputFile);
  }
}

//yoohooo

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
