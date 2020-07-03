import { Component, ViewChild, ElementRef, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'texture-input',
  templateUrl: './texture-input.component.html',
  styleUrls: ['./texture-input.component.css']
})
export class TextureInputComponent implements AfterViewInit {

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('image') image: ElementRef;
  @Input('texture') texture: any;
  @Output('change') change: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit(): void {
    this.fileUpload.nativeElement.addEventListener('change', 
      (event: any) => this.loadImage(event)
    );
  }

  loadImage(event: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.image.nativeElement.src = reader.result;
      this.texture = reader.result;
      this.change.emit();
    }
    if(event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      console.warn('Failed to load uploaded texture. Event files is empty.');
    }
  }
}

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

export class Point {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = x) {
    this.x = x;
    this.y = y;
  }
}
