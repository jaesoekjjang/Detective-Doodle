import Canvas from "./Canvas"
import Game from "./Game"

export const WIDTH = '540px'
export const HEIGHT = '540px'

export const startGame = () =>{
  new Game(new Canvas());
}
