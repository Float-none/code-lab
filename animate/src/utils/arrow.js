import { Graphics } from "pixi.js";

export default function() {
  const arrow = new Graphics();
  const X = 0;
  const Y = 0;
  // -50,-25
  const arrowPoint = [
    [X + 50, Y],
    [X + 50, Y - 25],
    [X + 100, Y + 25],
    [X + 50, Y + 75],
    [X + 50, Y + 50],
    [X, Y + 50],
    [X, Y]
  ];
  arrow.beginFill("0xffffff");
  arrow.moveTo(X, Y);
  arrowPoint.forEach(item => {
    arrow.lineTo(item[0], item[1]);
  });
  // arrow.fillStyle = "";
  arrow.endFill();
  // arrow.x = 550;
  // arrow.y = 210;
  // arrow.pivot.x = 0;
  // arrow.pivot.y = 25;
  // arrow.scale.x = 2;
  // arrow.scale.y = 2;

  return arrow;
}
