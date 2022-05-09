import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cursorRadius, eraserAtom, pencilAtom, toolTypeAtom } from '../../recoil/canvasAtom';

import Canvas from '../../game/Canvas';
import { WIDTH, HEIGHT } from '../../game/utils';
import Pencil from '../../game/tools/Pencil';
import Eraser from '../../game/tools/Eraser';
import { Tools } from '../../game/models/Tools';
import Tool from '../../game/models/Tool';

interface DrawingCanvasProps {
  isDrawing: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ isDrawing }) => {
  const tool = useRecoilValue(toolTypeAtom);
  const pencil = new Pencil();
  const eraser = new Eraser();

  const pencilData = useRecoilValue(pencilAtom);
  const eraserData = useRecoilValue(eraserAtom);

  const usingTool = useRef<Tool>(pencil);
  const toolData = useRef<typeof pencilData | typeof eraserData>(pencilData);

  useEffect(() => {
    if (tool === 'pencil') {
      usingTool.current = pencil;
      toolData.current = pencilData;
    } else {
      usingTool.current = eraser;
      toolData.current = eraserData;
    }
  }, [tool]);

  useEffect(() => {
    const canvas = new Canvas();
    const ctx = canvas.ctx;

    canvas.element.addEventListener('mousedown', (e) => {
      const { x, y } = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      usingTool.current.onMouseDown({ x, y });
      isDrawing = true;
    });
    canvas.element.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const { x, y } = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      usingTool.current.onMouseMove(ctx, { ...toolData.current, point: { x, y } });
    });
    canvas.element.addEventListener('mouseup', () => {
      canvas.storeImage();
      isDrawing = false;
    });
    canvas.element.addEventListener('mouseout', () => {
      isDrawing = false;
    });
  }, []);

  const radius = useRecoilValue(cursorRadius);

  return (
    <canvas
      style={{
        cursor: `
          url("data:image/svg+xml,%3Csvg width='${radius}' height='${radius}' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")
            ${radius / 2} ${radius / 2}, pointer
          `,
      }}
      id="canvas"
      width={WIDTH}
      height={HEIGHT}
    ></canvas>
  );
};

export default DrawingCanvas;
