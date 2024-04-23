let waves = [];
let colors = ['#f0f0f0', '#d9d9d9', '#9ca5b4', '#4a6178', '#1c305c'];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('about-main-background');
    canvas.style('z-index', '0');
    
    let waveHeight = height / colors.length;
    for (let i = 0; i < colors.length; i++) {
        let y = waveHeight * i; // Position each wave evenly spaced vertically
        waves[i] = new Wave(y, colors[i]);
    }
    frameRate(30);
}

function draw() {
    clear();
    for (let wave of waves) {
        wave.move();
        wave.display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (let i = 0; i < waves.length; i++) {
        waves[i].calculateYValues(windowWidth); // Recalculate wave patterns for the new width
    }
}

class Wave {
    constructor(y, color) {
        this.amplitude = 50; // Height of wave
        this.frequency = 0.01; // Frequency of wave
        this.color = color; // Color of the wave
        this.offset = random(TWO_PI); // Random phase offset for each wave
        this.y = y;
        // Adding waveWidth to ensure the wave extends beyond canvas
        this.waveWidth = width + 100; // extra width to extend beyond the canvas
    }

    move() {
        // Move the phase of the wave based on time
        this.offset += this.frequency;
    }

    display() {
        fill(this.color);
        noStroke();
        beginShape();

        // Extend the drawing of the wave beyond the right edge of the canvas
        for (let x = 0; x < this.waveWidth; x++) {
            let y = this.y + sin(this.offset + x * this.frequency) * this.amplitude;
            vertex(x, y);
        }

        // Close the shape by drawing lines to the bottom-right corner and bottom-left corner of the canvas
        vertex(this.waveWidth, height);
        vertex(0, height);
        endShape(CLOSE);
    }

    calculateYValues(newWidth) {
        this.period = newWidth; // Update the period to match the new width
        this.xspacing = this.period / this.yvalues.length;
        this.dx = (TWO_PI / this.period) * this.xspacing;
        this.yvalues = new Array(floor(this.period / this.xspacing));
        this.theta = 0; // Reset theta for a continuous loop
        for (let i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = sin(this.theta + this.dx * i) * this.amplitude;
        }
    }
}
