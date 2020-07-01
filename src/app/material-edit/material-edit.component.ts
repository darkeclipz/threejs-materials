import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ThreeJsViewerComponent } from '../three-js-viewer/three-js-viewer.component';
import { TextureUploaderComponent } from '../texture-uploader/texture-uploader.component';

declare var THREE: any;

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements AfterViewInit {

  @ViewChild('viewer') viewer: ElementRef;
  @ViewChild(ThreeJsViewerComponent) threeJsViewer: ThreeJsViewerComponent;
  @ViewChild('alphaMap') alphaMap: TextureUploaderComponent;
  viewerWidth: number;
  viewerHeight: number;

  material: Material;

  constructor() { 
    this.material = new ThreeBasicMaterial();
  }

  ngAfterViewInit(): void {
    const size = Math.max(this.viewer.nativeElement.offsetWidth, 
                          this.viewer.nativeElement.offsetHeight);
    this.viewerWidth = this.viewerHeight = size;
  }

  update() {
    if(this.alphaMap.texture) {
      this.material.map = this.alphaMap.texture;
    }
    this.threeJsViewer.render();
  }

  logMaterial() {
    console.log('Material', this.material);
  }

  materialTypes() {
    console.log('MeshBasicMaterial', new THREE.MeshBasicMaterial());
    console.log('MeshLambertMaterial', new THREE.MeshLambertMaterial());
    console.log('MeshPhongMaterial', new THREE.MeshPhongMaterial());
    console.log('MeshPhysicalMaterial', new THREE.MeshPhysicalMaterial());
  }
}

export class Material {
  name: string = 'Material';
  color: string = '#ff0000';
  wireframe: boolean = false;
  map: any = undefined;
  alphaTest: number = 0;

  constructor() {
    this.name = "Material";
    this.color = '#' + this.randomColor();
    this.wireframe = false;
  }

  randomColor(): any {
    const color = new THREE.Color();
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    return color.getHexString();
  }

  toMaterial() {
    return null;
  }
}

export class ThreeBasicMaterial extends Material {
  toMaterial() {
    let mapTexture = undefined;
    console.log('ThreeBasicMaterial.toMaterial.alphaMap', this.map);
    if(this.map) {
      const img = new Image();
      mapTexture = new THREE.Texture(img);
      //alphaMapTexture.wrapS = alphaMapTexture.wrapT = THREE.RepeatWrapping;
      //alphaMapTexture.repeat.set(1, 1); 
      img.onload = () => { mapTexture.needsUpdate = true; }
      img.src = this.map;
    }
    return new THREE.MeshLambertMaterial({ 
      name: this.name,
      color: this.color,
      wireframe: this.wireframe,
      alphaTest: this.alphaTest,
      side: THREE.SingleSide,
      transparent: true,
      map: mapTexture,
      depthTest: false,
      depthWrite: true
    });
  }
}

export class ThreePhongMaterial extends Material {
  toMaterial() {
    let alphaMap = null;
    console.log('ThreePhongMaterial.toMaterial.alphaMap', this.map);
    if(this.map) {
      //alphaMap = new THREE.TextureLoader().load(this.alphaMap);
      alphaMap = new THREE.Texture(this.map);
      alphaMap.wrapS = alphaMap.wrapT = THREE.RepeatWrapping;
      alphaMap.repeat.set(1, 1); 
    }
    return new THREE.MeshPhongMaterial({ 
      name: this.name,
      color: this.color,
      wireframe: this.wireframe,
      alphaMap: alphaMap,
      alphaTest: this.alphaTest
    });
  }  
}
