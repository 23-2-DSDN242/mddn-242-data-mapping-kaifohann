let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let textureImg = null;

// input/output file info
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_3.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');
  

  imageMode(CENTER);
  noStroke();
  background('#F0EAD6'); //eggshell
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
  
}


function draw () {
  for(let i=0;i<15000;i++) { //determines how many elements are drawn
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    let sizeArray = [0, 1, 2, 3, 4, 5, 6]; //size of rectangles
   
    
    noStroke();
    if(mask[0] > 128) { // pt between 0 and 255 (white to black scale)
      //highlight buildings using random rectangle effect
      colorMode(RGB);
      fill(pix);
      let pointSize = 3;
      rect(x, y, pointSize+random(sizeArray), pointSize+random(sizeArray)); //randomise size of rects (adding random number from sizeArray)
      
    } else {  
      //background paint stroke effect
        
        drawPill(x, y, pix); 
       
    }
  }

  function drawPill(x,y, pix) {
  
    pix[3] =40; //change pix alpha value
    let col = color(pix);

    colorMode(HSB);
      let h = hue(col);
      let s = saturation(col);
      let b = brightness(col);

      let new_sat = map(s, 0 , 100, 0, 30);
      let new_col = color(h, new_sat, b)

    //following code based on effect from https://openprocessing.org/sketch/708075  
    //simplified and adjusted to fit my code, using perlin noise and sin/cos waves 

    let angle = 70;
    angle += noise(x/100, y/100) * PI;
    fill(new_col);
    pill(x,y, random(height/40, width/200), random(height/40, width/200), angle); 
  }

  function pill(x,y, width, height, rotation) {
    let size = width/6;
    let precision = width/600;
    push();
    translate(x,y);
    rotate(rotation);
    beginShape();
    for(let i=0; i< TWO_PI; i+= precision){
      let s = size;
      if(i>PI) s = size*0.7;
      vertex(cos(i+PI)*s, sin(i+PI)*s + (i<PI ? - height/2 : height/2));
       
    }
    endShape(CLOSE);
    pop();
  }


  renderCounter = renderCounter + 1;
  if(renderCounter > 10) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
   // saveArtworkImage(outputFile);
  }
}

//yoohooo

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
