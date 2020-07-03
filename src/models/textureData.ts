import { Point } from "./point";

export class TextureData {
    wrap: Point = new Point();
    repeat: Point = new Point(1);
    flipY: boolean = false;
    rotation: number = 0;
  
    apply(texture: any) {
      texture.wrapS = parseInt(this.wrap.x.toString());
      texture.wrapT = parseInt(this.wrap.y.toString());
      texture.repeat.set(this.repeat.x, this.repeat.y);
      texture.flipY = this.flipY;
      texture.rotation = this.rotation;
    }
  }