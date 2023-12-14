var canvas = document.getElementById("canvas_game");
var context = canvas.getContext("2d");

const player1 = {
    x: 15,
    y: canvas.height - 25 - 10,
    width: 25,
    height: 25,
    vy: 0,
    color: "#3999F9",
    draw: function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        this.update();
    },
    update: function() {
        this.y += this.vy;
    }
};

const projectiles = [];
let canShoot = true;

function shoot() {
    if (canShoot) {
        const projectile = {
            x: player1.x + player1.width,
            y: player1.y + player1.height / 2 - 5,
            width: 10,
            height: 10,
            vx: 9,
            color: "#212121",
            draw: function() {
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.width, this.height);
            },
            update: function() {
                this.x += this.vx;
            }
        };
        projectiles.push(projectile);
        canShoot = false; // Set cooldown
        setTimeout(() => {
            canShoot = true;
        }, 100); // Cooldown duration in milliseconds
    }
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player1.draw();

    for (let i = 0; i < projectiles.length; i++) {
        const projectile = projectiles[i];
        projectile.update();
        projectile.draw();

        //remove offscreen projectiles CLEANUP
        if (projectile.x > canvas.width) {
            projectiles.splice(i, 1);
            i--;
        }
        //CLEANUP END
    }

    requestAnimationFrame(gameLoop);
}
window.addEventListener("load", function() {
    requestAnimationFrame(gameLoop);

    window.addEventListener("keydown", function(event) {
        if (event.keyCode === 32 && projectiles.length < 3) {
            shoot();
        }
    });
});