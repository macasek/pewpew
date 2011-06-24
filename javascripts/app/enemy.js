var enemies = [];

function Enemy(I) {
  I = I || {};

  I.active = true;
  I.age = Math.floor(Math.random() * 128);

  I.color = "#A2B";

  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
  I.y = 0;
  I.xVelocity = 0
  I.yVelocity = 2;

  I.type = parseInt((Math.random() * 100) % 4)
  
  if(I.type == 0) {
    I.sprite = Sprite("sprites", 0, 0, 80, 64);
    I.width = 80;
    I.height = 64;
  }
  else if(I.type == 1) {
    I.sprite = Sprite("sprites", 80, 0, 80, 64);
    I.width = 80;
    I.height = 64;
  }
  else if(I.type == 2) {
    I.sprite = Sprite("sprites", 0, 70, 80, 54);
    I.width = 80;
    I.height = 54;
  }
  else {
    I.sprite = Sprite("sprites", 80, 70, 80, 54);
    I.width = 80;
    I.height = 54;
  }

  I.inBounds = function() {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function() {
    this.sprite.draw(canvas, this.x, this.y);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

    I.age++;

    I.active = I.active && I.inBounds();
  };

  I.explode = function() {
    Sound.play("explosion");
    
    this.active = false;
    // TODO: Add an explosion graphic
  };

  return I;
};