let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "inputtest_2.jpg";
let maskFile   = "masktest_2.png";
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
  background(255, 255, 255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

function draw () {
  for(let i=0;i<40000;i++) { //determines how many circles/rects are drawh
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    fill(pix);
    noStroke();
    if(mask[0] > 128) { //halfway pt between 0 and 255 (white to black scale)
      stroke(pix);
      let pointSize = 4;
      ellipse(x, y, pointSize, pointSize);   
    }
    else {
      //for(let i=0; i <20; i++) {
        drawPill(x,y, pix) //https://openprocessing.org/sketch/708075
      //}
      //fill(pix[0]);
      //stroke(pix[0]);
      //let pointSize = 7;
      //rect(x, y, pointSize, pointSize);   


      //strokeWeight(1);
      //ellipse(x, y, pointSize, pointSize); 
      //line(x,y-50, x, y+50);
      
    }
  }
  //edit hue to dark blue, rotoscop windows and make them glow

  function drawPill(x,y, pix) {
    let color = pix;
    let lum = red(color) + green(color) + blue(color);
    let angle = lum /255 * PI + ((x/width)* PI);
    angle /= 2;
    angle += noise(x/100, y/100) * PI;
    fill(color);
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
