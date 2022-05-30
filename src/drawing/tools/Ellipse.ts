import ShapeTool from './ShapeTool';
import type { ToolData } from '../models/ToolData';

export default class Ellipse extends ShapeTool {
  onMouseMove(data: ToolData) {
    const {
      point: { x, y },
      color,
      width: lineWidth,
    } = data;
    const { x: startX, y: startY } = this.startPoint;

    const centerX = Math.abs(x + startX) / 2;
    const centerY = Math.abs(y + startY) / 2;

    const width = Math.abs(x - startX);
    const height = Math.abs(y - startY);

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}
