let shapes = [];

function setup() {
    let canvas = createCanvas(windowWidth, introHeight());
    canvas.parent('intro-background');
    canvas.style('z-index', '1');
    for (let i = 0; i < 120; i++) {
        shapes.push(new MovingShape());
    }
    frameRate(30); 
}

function draw() {
    clear(); 

    for (let shape of shapes) {
        shape.update();
        shape.display();
    }
}

function introHeight() {
    return document.querySelector('.intro').offsetHeight; 
}

function windowResized() {
    resizeCanvas(windowWidth, introHeight());
}

class MovingShape {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(100, 300);
        this.color = random(['#1c305c', '#2a4162', '#4a6178', '#9ca5b4', '#d9d9d9']); 
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-2, 2);
    }

   update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > width + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = width + this.size;

        if (this.y > height + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = height + this.size;
    }

    display() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.size);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // Handle clicks on project titles to toggle visibility of content
    const titles = document.querySelectorAll('.project-card .project-title');
    titles.forEach(title => {
        title.addEventListener('click', function(event) {
            event.stopPropagation();
            const card = this.closest('.project-card');
            toggleCard(card);
        });
    });

    // Handle category filtering
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                if (card.getAttribute('data-category') === filter || filter === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            closeAllCards();
        });
    });

    // Handle image cycling and hover effects
    const projectImages = document.querySelectorAll('.project-card .project-image');
    projectImages.forEach(image => {
        // Cycling images on click
        image.addEventListener('click', function() {
            let images = this.dataset.images.split(',');
            let currentSrc = this.src.split('/').pop();
            let currentIndex = images.indexOf(currentSrc);
            let nextIndex = (currentIndex + 1) % images.length;
            this.src = images[nextIndex];
        });

        // Scale up on hover
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease-in-out';
        });

        // Reset scale when not hovering
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Toggle card visibility
function toggleCard(clickedCard) {
    const isActive = clickedCard.classList.contains('active');
    closeAllCards();
    if (!isActive) {
        clickedCard.classList.add('active');
        const content = clickedCard.querySelector('.project-content');
        content.style.display = 'flex';
    }
}

// Close all cards
function closeAllCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            const content = card.querySelector('.project-content');
            content.style.display = 'none';
        }
    });
}
