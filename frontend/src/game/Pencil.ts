export default class Pencil {
  private _color: string = 'black';
  private _lineWidth: number = 2;

  constructor() {};

  set color(color: string) {
    this._color = color;
  }

  set lineWidth(width: number){
    this._lineWidth = width;
  }

  get color() {
    return this._color;
  }

  get lineWidth(){
    return this._lineWidth;
  }
}