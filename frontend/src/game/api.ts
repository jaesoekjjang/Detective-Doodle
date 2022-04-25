import Canvas from "./Canvas"
import Game from "./Game"

export const WIDTH = '540px'
export const HEIGHT = '540px'

export const startGame = () =>{
  Game.config({canvas: new Canvas()});
  Game.getInstance();
}

export const clear = () => {
  Game.getInstance().clear();
}

export const setTool = (tool: 'pencil' | 'eraser') => {
  Game.getInstance().me.setTool(tool);
}

export const setPencilWidth = (width: number) => {
  Game.getInstance().me.setPencilWidth(width);
}

export const setEraserWidth = (width: number) => {
  Game.getInstance().me.setEraserWidth(width);
}