const goldenRatio = 0.618033988749;
const goldenRatioExp3 = goldenRatio * goldenRatio * goldenRatio;
const goldenRatioExp4 = goldenRatioExp3 * goldenRatio;
let trees = [];
let backgroundColor;

function setup() {
  createCanvas(500, 500);
  generateBackgroundColor(); // Initialize background color using a function
}

function draw() {
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);

  fill(backgroundColor[2], backgroundColor[0], backgroundColor[1]);
  noStroke();
  rect(0, height * goldenRatio, width, height - height * goldenRatio);

  let branchSize = height * goldenRatioExp3;
  let strokeWeightValue = goldenRatioExp4 * branchSize;
  strokeWeight(strokeWeightValue);

   // Sort trees by y-position (higher y = closer, should be drawn last)
   trees.sort((a, b) => a.y - b.y);

  for (const treeInfo of trees) {
    let distance = treeInfo.y / height;
    distance = distance * distance;

    fill(100, 170 * distance, 70);
    const color = treeInfo.color;

    stroke(color[1], color[0], color[2]);

    push();
    translate(treeInfo.x, treeInfo.y);
    branch(branchSize * distance, treeInfo.phase, treeInfo.leafColor);
    pop();
  }
}

function branch(branchSize, phase, leafColor) {
  if (branchSize > 3) {
    let strokeWeightValue = goldenRatioExp4 * branchSize;
    strokeWeight(strokeWeightValue);

    line(0, 0, 0, -branchSize);
    translate(0, -branchSize);

    const angle = frameCount * 0.01 + phase;
    const wind = 0.1;

    push();
    rotate(QUARTER_PI + sin(angle) * wind);
    branch(branchSize * goldenRatio, phase, leafColor);
    pop();
    
    push();
    rotate(-QUARTER_PI + cos(angle) * wind * 0.5);
    branch(branchSize * goldenRatio, phase, leafColor);
    pop();
  } 
  else {
    noStroke();
    fill(leafColor[0], leafColor[1], leafColor[2]);
    circle(0, 0, 4);
  }
}

function mousePressed() {
  generateBackgroundColor(); // Update background color when clicking
  const color = [random(0, 255), random(0, 255), random(0, 255)];
  const leafColor = [random(50, 200), random(100, 255), random(50, 200)];
  
  let treeInfo = { 
    x: mouseX, 
    y: mouseY, 
    phase: random(-PI, PI), 
    color: color, 
    leafColor: leafColor 
  };
  
  trees.push(treeInfo);
}

function generateBackgroundColor() {
  backgroundColor = [random(0, 255), random(0, 255), random(0, 255)];
}
