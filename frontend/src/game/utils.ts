import type { Tools } from './models/Tools';

export const WIDTH = '680px';
export const HEIGHT = '540px';

export const basicColors = [
  '#000000',
  '#787878',
  '#ffffff',
  '#ef4444',
  '#f542aa',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#c32de1',
];

const maxWidth = {
  pencil: 14,
  eraser: 30,
};

const cursorWeight = {
  pencil: 4,
  eraser: 2,
};

export const getMaxWidth = (toolType: 'pencil' | 'eraser') => {
  return maxWidth[toolType];
};

export const getCursorWeight = (toolType: 'pencil' | 'eraser') => {
  return cursorWeight[toolType];
};

export class Queue<T> {
  private elements: { [key in number]: T };
  private head = 0;
  private tail = 0;

  constructor() {
    this.elements = {};
  }

  enqueue(element: T) {
    this.elements[this.tail] = element;
    ++this.tail;
  }

  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    ++this.head;
    return item;
  }

  isEmpty() {
    return this.length === 0;
  }

  get length() {
    return this.tail - this.head;
  }
}
