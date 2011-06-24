var player = {
  color: "#00A",
  x: 480,
  y: 580,
  width: 80,
  height: 64,
  active: true,
  sprite: Sprite("sprites", 0, 128, 80, 64),
  draw: function() {
    if(this.active) {
     this.sprite.draw(canvas, this.x, this.y);
    }
  },
  shoot: function() {
    Sound.play("shoot");
    
    var bulletPosition = this.midpoint();

    playerBullets.push(Bullet({
      speed: 5,
      x: bulletPosition.x,
      y: bulletPosition.y
    }));
  },
  midpoint: function() {
    return {
      x: this.x + this.width/2 - 10,
      y: this.y + this.height/2 - 35
    };
  },
  explode: function() {
    this.active = false;
    // TODO: Add an explosion graphic and then end the game
  }
};