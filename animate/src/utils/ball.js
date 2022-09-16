import { Graphics } from "pixi.js";

export default function(radius,color) {
  const clr = color || '0xff0000'
  const Ball = new Graphics();
  Ball.beginFill(clr);
  Ball.drawCircle(0,0,radius);
  Ball.endFill();
  return Ball;
}