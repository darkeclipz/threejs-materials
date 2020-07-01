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
    reader.readAsDataURL(event.target.files[0]);
  }
}
