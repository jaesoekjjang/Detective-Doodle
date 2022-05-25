import React, { forwardRef, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  colorAtom,
  cursorRadius,
  eraserWidthAtom,
  pencilWidthAtom,
  toolTypeAtom,
} from '../../recoil/canvasAtom';

import type Canvas from '../../game/Canvas';

interface DrawingCanvasProps {
  canvas: Canvas | null;
}

const DrawingCanvas = forwardRef<HTMLDivElement, DrawingCanvasProps>(({ canvas }, containerRef) => {
  const isDrawing = useRef(false);

  const tool = useRecoilValue(toolTypeAtom);

  const pencilWidth = useRecoilValue(pencilWidthAtom);
  const eraserWidth = useRecoilValue(eraserWidthAtom);
  const color = useRecoilValue(colorAtom);

  const toolData = useRef({ width: pencilWidth, color });
  useEffect(() => {
    if (!canvas) return;
    canvas.tool = tool;
  }, [tool]);

  useEffect(() => {
    if (tool === 'pencil') {
      toolData.current = { width: pencilWidth, color };
    }
    if (tool === 'eraser') {
      toolData.current = { width: eraserWidth, color: '#ffffff' };
    }
    if (tool === 'bucket') {
      toolData.current = { ...toolData.current, color };
    }
  }, [pencilWidth, eraserWidth, color]);

  useEffect(() => {
    if (!canvas) return;
    canvas.element.addEventListener('mousedown', (e) => {
      const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      canvas.onMouseDown({ point, ...toolData.current });
      isDrawing.current = true;
    });

    canvas.element.addEventListener('mousemove', (e) => {
      if (!isDrawing.current) return;
      const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      canvas.onMouseMove({ point, ...toolData.current });
    });

    canvas.element.addEventListener('mouseup', () => {
      canvas.storeImage();
      isDrawing.current = false;
    });

    canvas.element.addEventListener('mouseout', () => {
      isDrawing.current = false;
    });
  }, [canvas]);

  const radius = useRecoilValue(cursorRadius);

  return (
    <div>
      <div
        className="canvas"
        ref={containerRef}
        style={{
          cursor: `
            url("data:image/svg+xml,%3Csvg width='${radius}' height='${radius}' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")
              ${radius / 2 - 1} ${radius / 2 - 1}, pointer
            `,
        }}
      ></div>
    </div>
  );
});

export default DrawingCanvas;
