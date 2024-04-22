let shapes = [];

function setup() {
    let canvas = createCanvas(windowWidth, introHeight());
    canvas.parent('intro-background');
    canvas.style('z-index', '-1'); // Ensure the canvas is behind the text

    // Create shapes with colors from the uploaded image
    for (let i = 0; i < 50; i++) {
        shapes.push(new MovingShape());
    }
}

function draw() {
    clear(); // Transparent background to see the text on top

    for (let shape of shapes) {
        shape.update();
        shape.display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, $('.intro').height());
}

class MovingShape {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(20, 100);
        this.color = random(['#1c305c', '#2a4162', '#4a6178', '#9ca5b4', '#d9d9d9']); // Using the color palette from the image
    }

    update() {
        // Simple movement for each shape
        this.x += random(-1, 1);
        this.y += random(-1, 1);
        // Wrap around the edges
        if (this.x > width) this.x = 0;
        if (this.y > height) this.y = 0;
        if (this.x < 0) this.x = width;
        if (this.y < 0) this.y = height;
    }

    display() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.size);
    }
}

function introHeight() {
    return document.querySelector('.intro').offsetHeight; // This replaces the jQuery function
}

function windowResized() {
    resizeCanvas(windowWidth, introHeight()); // Use the new function
}