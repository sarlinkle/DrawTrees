const golden_ratio = 0.618033988749;
const golden_ratio_exp3 = golden_ratio * golden_ratio * golden_ratio;
const golden_ratio_exp4 = golden_ratio_exp3 * golden_ratio;
let trees = [];

function setup() {
  colorMode(HSB);
  createCanvas(300, 400);
}

function draw() {
  background(200, 40, 100);
  
  fill(100, 40, 50);
  noStroke();
  rect(0, height * golden_ratio, width, height - height * golden_ratio)
  
  
  let branch_size = height * golden_ratio_exp3;
  
  let stroke_weight = golden_ratio_exp4 * branch_size;
  
  strokeWeight(stroke_weight);
  
  //for(let i = 0; i < trees.length; i++)
    //let pos = trees[i];
    //circle(pos.x, pos.y, 20);
    for(const pos of trees){
      
    let distance = pos.y / height;
      distance = distance * distance;
    
    fill(100, 170 * distance, 70);
  
    stroke(40, 100 * distance, 50);
    
    push();
    translate(pos.x, pos.y);
    branch(branch_size * distance, pos.phase);
    pop();
  }
}

function branch(branch_size, phase){
  if (branch_size > 3){
    let stroke_weight = golden_ratio_exp4 * branch_size;
    strokeWeight(stroke_weight);
    
    line(0, 0, 0, -branch_size);
    
    translate(0, -branch_size);
    
    const angle = frameCount * 0.01 + phase;
    const wind = 0.1;

    push();
    rotate(QUARTER_PI + sin(angle) * wind);
    branch(branch_size * golden_ratio, phase);
    pop();
    push();
    rotate(-QUARTER_PI + cos(angle) * wind * 0.5);
    branch(branch_size * golden_ratio, phase);
    pop();
  }
  else{
    noStroke();
    circle(0, 0, 4);
  }
}

function mousePressed(){
  let pos = {x: mouseX, y: mouseY, phase: random(-PI, PI)};
  trees.push(pos);
}