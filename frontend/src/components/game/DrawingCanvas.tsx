import React, { useContext, useEffect, forwardRef, useRef } from 'react';

import type Canvas from '../../game/Canvas';
import { cursorRadius } from '../../game/utils';
import { DrawDataContext } from './DrawDataProvider';
import { ToolTypeContext } from './ToolTypeProvider';

interface DrawingCanvasProps {
  canvas: Canvas | null;
}

const DrawingCanvas = forwardRef<HTMLDivElement, DrawingCanvasProps>(({ canvas }, containerRef) => {
  const isDrawing = useRef(false);

  const { toolType } = useContext(ToolTypeContext);
  const { drawData: data } = useContext(DrawDataContext);
  const drawData = useRef(data);

  useEffect(() => {
    if (!canvas) return;
    canvas.tool = toolType;
  }, [toolType]);

  useEffect(() => {
    drawData.current = data;
  }, [data]);

  useEffect(() => {
    if (!canvas) return;
    canvas.element.addEventListener('mousedown', (e) => {
      const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      canvas.onMouseDown({ point, ...drawData.current });
      isDrawing.current = true;
    });

    canvas.element.addEventListener('mousemove', (e) => {
      if (!isDrawing.current) return;
      const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
      canvas.onMouseMove({ point, ...drawData.current });
    });

    canvas.element.addEventListener('mouseup', () => {
      canvas.storeImage();
      isDrawing.current = false;
    });

    canvas.element.addEventListener('mouseout', () => {
      isDrawing.current = false;
    });
  }, [canvas]);

  const radius = cursorRadius(toolType, data.width);

  return (
    <div className="">
      <div
        className="canvas"
        ref={containerRef}
        style={{
          cursor: `
            url("data:image/svg+xml,%3Csvg width='${radius}' height='${radius}' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")
              ${radius / 2} ${radius / 2}, pointer
            `,
        }}
      ></div>
    </div>
  );
});

export default DrawingCanvas;
