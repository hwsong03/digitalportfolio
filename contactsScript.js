let colors = ['#f0f0f0', '#d9d9d9', '#9ca5b4', '#4a6178', '#1c305c'];
let rectWidth;
let speed = 2; // Speed of the movement

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('contacts-main-background');
  rectWidth = width / colors.length; // Calculate the width of each color strip
  noStroke();
}

function draw() {
  background(0); // Start with a black background

  // Move and loop each strip
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    let x1 = (i * rectWidth) - (frameCount * speed % (rectWidth * colors.length));
    rect(x1, 0, rectWidth, height);
    let x2 = x1 + rectWidth * colors.length;
    rect(x2, 0, rectWidth, height);

    // Draw an additional strip when the original one moves off screen
    if (x1 < -rectWidth) {
      let x3 = x2 + rectWidth * colors.length;
      rect(x3, 0, rectWidth, height);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rectWidth = width / colors.length; // Recalculate the width of each strip on window resize
}
