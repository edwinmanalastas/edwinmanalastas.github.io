let angle = 0;
let time = 0;  // Variable to track time for sine wave oscillation

function setup() {
    const canvas = createCanvas(260, 260); // Create canvas
    canvas.parent(document.querySelector('.image')); // Attach the canvas to the '.image' div
}

function draw() {
    background("#010f19");

    // Use a sine wave to oscillate the angle smoothly over time
    angle = map(sin(time), -1, 1, PI/2, PI/20);  // Angle oscillates between PI/2 and PI/20

    // Increment time to animate the angle
    time += 0.01;  // Adjust this value to control the speed of the animation

    stroke("#ced7f5");
    translate(130, height); 
    branch(65);
}

function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 2) {
        push();
        rotate(angle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len * 0.67);
        pop();
    } else {
        // add circles at the end of the branches
        fill("#2690df")
        noStroke();
        ellipse(0,0,1,1)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // magnetic button
    const magnet = document.querySelector(".magnet");
    const magnetoText = document.querySelector(".magnet .text"); 

    // mouse move
    const activateMagnet = (event) => {
        const boundBox = magnet.getBoundingClientRect();
        const newX = (event.clientX - boundBox.left) / magnet.offsetWidth - 0.5;
        const newY = (event.clientY - boundBox.top) / magnet.offsetHeight - 0.5;
        const magnetoStrength = 50;
        const magnetoTextStrength = 50;

        // Move btn to new position
        gsap.to(magnet, {
            duration: 1,
            x: newX * magnetoStrength,
            y: newY * magnetoStrength,
            ease: "power4.out",
        });

        // Move text to its new position
        gsap.to(magnetoText, {
            duration: 1,
            x: newX * magnetoTextStrength,
            y: newY * magnetoTextStrength,
            ease: "power4.out",
        });
    };

    // Mouse leave
    const resetMagnet = (event) => {
        // Move btn to its default position
        gsap.to(magnet, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out",
        });

        // Move text to default position
        gsap.to(magnetoText, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out",
        });
    };
    magnet.addEventListener("mousemove", activateMagnet);
    magnet.addEventListener("mouseleave", resetMagnet);
});