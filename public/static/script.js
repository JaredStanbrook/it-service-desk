class GradientAnimation {
    constructor() {
        this.cnv = document.querySelector(`canvas`);
        this.ctx = this.cnv.getContext(`2d`);

        this.circlesNum = 30;
        this.minRadius = 400;
        this.maxRadius = 600;
        this.speed = 0.01;

        (window.onresize = () => {
            this.setCanvasSize();
            this.createCircles();
        })();
        this.drawAnimation();
    }
    setCanvasSize() {
        this.w = this.cnv.width = innerWidth * devicePixelRatio;
        this.h = this.cnv.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
            this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
        }
    }
    drawCircles() {
        this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
    }
}

class Circle {
    constructor(w, h, minR, maxR) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * (maxR - minR) + minR;
        this.firstColor = `hsla(${Math.random() * 360}, 95%, 80%, 1)`;
        this.secondColor = `hsla(${Math.random() * 360}, 95%, 80%, 0)`;
    }
    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `overlay`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.onload = () => {
    new GradientAnimation();
};
/*
let lastScrollTop = 0;
const nav = document.querySelector("nav"); // Target the <nav> element

document.addEventListener("scroll", (event) => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // User is scrolling down, hide <nav>
        nav.classList.add("navbar-hidden");
    } else {
        // User is scrolling up, show <nav>
        nav.classList.remove("navbar-hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
});
*/