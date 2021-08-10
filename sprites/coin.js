class Coin{
    constructor(x, y) {
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        
      }
      show(){
        push();
        imageMode(CENTER);
        image(this.anima ,this.x, this.y, this.width, this.height);
        pop();
      }
}