import { Graphics, Point } from "pixi.js";

export default function(width, height, color) {
  const clr = color || "0xffffff";
  const segmentWidth = width;
  const segmentHeight = height;
  const vx = 0;
  const vy = 0;
  const segment = new Graphics();
  segment.lineStyle(1);
  segment.beginFill(clr);
  segment.drawRoundedRect(
    -segmentHeight / 2,
    -segmentHeight / 2,
    segmentWidth + segmentHeight,
    segmentHeight,
    segmentHeight,
    segmentHeight
  );
  segment.endFill();
  // 绘制两个“枢轴”
  segment.drawCircle(0, 0, 2);
  segment.drawCircle(segmentWidth, 0, 2);
  segment.getPin = function() {
    let angle = (segment.angle * Math.PI) / 180;
    let xPos = segment.x + Math.cos(angle) * segmentWidth;
    let yPos = segment.y + Math.sin(angle) * segmentWidth;
    return new Point(xPos, yPos);
  };
  return segment;
}

function getPin() {
  let angle = (rotation * Math.PI) / 180;
  let xPos = x + Math.cos(angle) * segmentWidth;
  let yPos = y + Math.sin(angle) * segmentWidth;
  return new Point(xPos, yPos);
}
