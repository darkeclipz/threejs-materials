import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'texture-uploader',
  templateUrl: './texture-uploader.component.html',
  styleUrls: ['./texture-uploader.component.css']
})
export class TextureUploaderComponent implements AfterViewInit {

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('image') image: ElementRef;
  @Input('texture') texture: any;
  @Input('change') change: any;

  ngAfterViewInit(): void {
    this.fileUpload.nativeElement.addEventListener('change', 
      (event) => { 
        this.onChange(event)
        if(this.change) {
          this.change();
        }
      }
    );
  }

  onChange(event: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.image.nativeElement.src = reader.result;
      this.texture = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}
