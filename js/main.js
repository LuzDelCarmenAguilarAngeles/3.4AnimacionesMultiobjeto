const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = "300";
const window_width = "500";

canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#b7f7ed";

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context) {
        this.draw(context);
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

const nCircles = 10;
let circles = [];
for (let i = 0; i < nCircles; i++) {
    let randomRadius = Math.floor(Math.random() * 30 + 20);
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomBackcolor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",0.4)";
    let randomStrokecolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    let randomSpeed = Math.random() * 3 + 1;

    randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
    randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

    let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, (i + 1).toString(), randomBackcolor, randomSpeed);
    circles.push(miCirculo);
}

const updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach((circle, index) => {
        circle.update(ctx);
        let row = document.getElementById(`circle-${index}`);
        if (!row) {
            row = document.createElement('tr');
            row.id = `circle-${index}`;
            row.innerHTML = `<td>${circle.text}</td><td class="x-coord">${Math.round(circle.posX)}</td><td class="y-coord">${Math.round(circle.posY)}</td>`;
            document.getElementById('coordinates-table').appendChild(row);
        } else {
            row.querySelector('.x-coord').textContent = Math.round(circle.posX);
            row.querySelector('.y-coord').textContent = Math.round(circle.posY);
        }
    });
};

updateCircle();
