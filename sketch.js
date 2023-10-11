let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_2.jpg";
let maskFile   = "mask_2.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');
  

  imageMode(CENTER);
  noStroke();
  background('#F0EAD6');
  sourceImg.loadPixels();
  maskImg.loadPixels();
  //fill('#ADD8E6');
  //rect(0,0, 1920, 500);
}

function draw () {

  

  for(let i=0;i<11000;i++) { //determines how many elements are drawn
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    let sizeArray = [0, 1, 2, 3, 4, 5, 6];
    let rotateArray = [0,20,40, 90, 180, 270, 200, 125];
    
    noStroke();
    if(mask[0] > 128) { //halfway pt between 0 and 255 (white to black scale)
      
      pix[3] = 200;
      fill(pix);
      let pointSize = 3;
      
      rect(x, y, pointSize+random(sizeArray), pointSize+random(sizeArray)); //randomise size of rects (adding random number from sizeArray)
      
    } else {  
        drawPill(x, y, pix); //https://openprocessing.org/sketch/708075  
    }
  }
  //edit hue to dark blue, rotoscop windows and make them glow

  function drawPill(x,y, pix) {
    
    pix[3] =50; //change pix alpha value
    let col = color(pix);
    //let color = pix;
    let angle = 70;
    angle += noise(x/100, y/100) * PI;
    fill(col);
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
    //saveArtworkImage(outputFile);
  }
}

//yoohooo

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
