import Canvas from "./Canvas"
import Game from "./Game"

export const WIDTH = '540px'
export const HEIGHT = '540px'

export const startGame = () =>{
  Game.config({canvas: new Canvas()});
  Game.getInstance();
}

export const clear = () =>{
  Game.getInstance().clear();
}

export const setColor = (color: string) =>{
  Game.getInstance().me.setColor(color);
}