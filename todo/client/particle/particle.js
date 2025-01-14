const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        this.life = 20000; // продолжительность жизни частицы
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle(x, y) {
        this.particles.push(new Particle(x, y));
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.update();
            // Изменяем размер и цвет по мере старения
            particle.size = Math.max(0, particle.size - 0.01);
            const randomInt = Math.floor(Math.random()*101)
            const randomInt2 = Math.floor(Math.random(0, particle.life/150)*121)
            particle.color = 'hsl(' + Math.random()*5 + ', '+ randomInt +'%, ' + randomInt2  + '%)'; // (particle.life / 100 * 100) Math.max(0, (particle.life/50))
            console.log(particle.color)


            if (particle.life <= 1) {
                this.particles.splice(index, 1); // удаляем старые частицы
            }
        });
    }

    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        });
    }
}

const particleSystem = new ParticleSystem();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleSystem.update();
    particleSystem.draw();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    for (let i = 0; i < 100; i++) {
        particleSystem.addParticle(x, y);
    }
});

animate();

// class particleSystem
// this.particles.forEach((particle, index) => {
//     particle.update();
//     if (particle.life <= 0) {
//         this.particles.splice(index, 1); // удаляем старые частицы
//     }
// });