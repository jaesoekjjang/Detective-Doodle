import React, { forwardRef, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cursorRadius, eraserAtom, pencilAtom, toolTypeAtom } from '../../recoil/canvasAtom';

import type Canvas from '../../game/Canvas';
import type { Status } from '.';
import CanvasMask from './CanvasMask';
import { useSocket } from '../hooks/useSocket';
import Point from '../../game/models/Point';
import { currentRoomAtom } from '../../recoil/roomAtom';

interface DrawingCanvasProps {
  canvas: Canvas | null;
  status: Status;
}

const DrawingCanvas = forwardRef<HTMLDivElement, DrawingCanvasProps>(
  ({ canvas, status }, containerRef) => {
    const socket = useSocket();
    const { id: roomId } = useRecoilValue(currentRoomAtom);

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
        canvas.onMouseDown({ point, ...toolData.current });
        isDrawing.current = true;
        socket?.emit('draw_start', { roomId, drawData: point });
      });

      canvas.element.addEventListener('mousemove', (e) => {
        if (!isDrawing.current) return;
        const point = canvas.relativePoint({ x: e.clientX, y: e.clientY });
        canvas.onMouseMove({ toolData: toolData.current, point });
        socket?.emit('draw', {
          roomId,
          drawData: { tool, toolData: toolData.current, point },
        });
      });

      canvas.element.addEventListener('mouseup', () => {
        canvas.storeImage();
        isDrawing.current = false;
        socket?.emit('draw_end', { roomId });
      });

      canvas.element.addEventListener('mouseout', () => {
        isDrawing.current = false;
      });

      socket?.on('draw_start', (point: Point) => {
        console.log('mousedown');
        canvas.onMouseDown(point);
      });

      socket?.on('draw', (data: any) => {
        const { toolData, point } = data;
        canvas.onMouseMove({ toolData, point });
      });

      socket?.on('draw_end', () => {
        canvas.storeImage();
        isDrawing.current = false;
      });

      socket?.on('set_tool', (tool) => (canvas.tool = tool));

      socket?.on('redo', () => canvas.redo());
      socket?.on('undo', () => canvas.undo());
      socket?.on('clear', () => canvas.clear());
      //? 이렇게 해서 roomId를 클라이언트에서 보내야 하나? 서버에서 찾는게 더 좋은건 아닌가?
    }, [canvas, roomId]);

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
