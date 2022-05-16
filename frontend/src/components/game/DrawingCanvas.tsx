import React, { forwardRef, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cursorRadius, eraserAtom, pencilAtom, toolTypeAtom } from '../../recoil/canvasAtom';

import Pencil from '../../game/tools/Pencil';
import Eraser from '../../game/tools/Eraser';
import Tool from '../../game/models/Tool';

import type Canvas from '../../game/Canvas';
import type { Status } from '.';
import CanvasMask from './CanvasMask';
import { useSocket } from '../hooks/useSocket';
import Point from '../../game/models/Point';

interface DrawingCanvasProps {
  canvas: Canvas | null;
  status: Status;
}

const DrawingCanvas = forwardRef<HTMLDivElement, DrawingCanvasProps>(
  ({ canvas, status }, containerRef) => {
    const socket = useSocket();

    const isDrawing = useRef(false);

    const tool = useRecoilValue(toolTypeAtom);

    const pencilData = useRecoilValue(pencilAtom);
    const eraserData = useRecoilValue(eraserAtom);

    const toolData = useRef<{ width: number; color: string }>(pencilData);

    useEffect(() => {
      if (!canvas) return;
      canvas.tool = tool;
      socket?.emit('set_tool', tool);
    }, [tool]);

    useEffect(() => {
      if (tool === 'pencil') {
        toolData.current = pencilData;
      }
      if (tool === 'eraser') {
        toolData.current = eraserData;
      }
    }, [pencilData, eraserData]);

    useEffect(() => {
      if (!canvas) return;

      canvas.element.addEventListener('mousedown', (e) => {
        const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
        canvas.onMouseDown(point);
        isDrawing.current = true;
        socket?.emit('draw_start', point);
      });

      canvas.element.addEventListener('mousemove', (e) => {
        if (!isDrawing.current) return;
        const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
        canvas.onMouseMove({ toolData: toolData.current, point });
        socket?.emit('draw', { tool, toolData: toolData.current, point });
      });

      canvas.element.addEventListener('mouseup', () => {
        canvas.storeImage();
        isDrawing.current = false;
        socket?.emit('draw_end');
      });

      canvas.element.addEventListener('mouseout', () => {
        isDrawing.current = false;
      });

      socket?.on('draw_start', (point: Point) => {
        canvas.onMouseDown(point);
      });

      socket?.on('draw', (data: any) => {
        const { toolData, point } = data;
        canvas.onMouseMove({ toolData, point });
      });

      socket?.on('draw_end', () => {
        isDrawing.current = false;
      });

      socket?.on('set_tool', (tool) => {
        canvas.tool = tool;
      });

      socket?.on('put_image', (imageURL: string) => {
        const img = new Image();
        img.src = imageURL;
        canvas.ctx.drawImage(img, 0, 0, canvas.element.width, canvas.element.height);
      });
    }, [canvas]);

    const radius = useRecoilValue(cursorRadius);

    return (
      <div>
        {status !== 'drawing' && <CanvasMask />}
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
  }
);

export default DrawingCanvas;
