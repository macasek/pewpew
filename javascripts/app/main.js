var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var FPS = 30;

var canvasElement;
var canvas;

$(document).ready(function(){
  canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' style='border:1px solid black;'></canvas>");
  canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');

  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);
});

function update() {
  if(player.active) {
    if(keydown.space) {
      player.shoot();
    }

    if(keydown.left) {
      player.x -= 5;
    }

    if(keydown.right) {
      player.x += 5;
    }

    player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  }
  
  playerBullets.forEach(function(bullet) {
    bullet.update();
  });
  
  playerBullets = playerBullets.filter(function(bullet) {
    return bullet.active;
  });

  enemies.forEach(function(enemy) {
    enemy.update();
  });

  enemies = enemies.filter(function(enemy) {
    return enemy.active;
  });

  if(Math.random() < 0.1) {
    enemies.push(Enemy());
  }
  
  handleCollisions();
}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.fillStyle = "#000";
  player.draw();
  
  playerBullets.forEach(function(bullet) {
    bullet.draw();
  });
  
  enemies.forEach(function(enemy) {
    enemy.draw();
  });
}

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function handleCollisions() {
  playerBullets.forEach(function(bullet) {
    enemies.forEach(function(enemy) {
      if (collides(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
      }
    });
  });
  
  if(player.active) {
    enemies.forEach(function(enemy) {
      if (collides(enemy, player)) {
        enemy.explode();
        player.explode();
      }
    });
  }
}
