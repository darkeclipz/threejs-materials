import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ThreeJsViewerComponent } from '../three-js-viewer/three-js-viewer.component';
import { TextureInputComponent } from '../texture-input/texture-input.component';
import { ColorInputComponent } from '../color-input/color-input.component';

declare var THREE: any;

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements AfterViewInit, OnDestroy {

  @ViewChild('viewer') viewer: ElementRef;
  @ViewChild(ThreeJsViewerComponent) threeJsViewer: ThreeJsViewerComponent;
  @ViewChild('color') color: ColorInputComponent;
  @ViewChild('ambient') ambient: ColorInputComponent;
  @ViewChild('emissive') emissive: ColorInputComponent;
  @ViewChild('specular') specular: ColorInputComponent;
  @ViewChild('map') map: TextureInputComponent;
  @ViewChild('envMap') envMap: TextureInputComponent;
  @ViewChild('lightMap') lightMap: TextureInputComponent;
  @ViewChild('specularMap') specularMap: TextureInputComponent;
  @ViewChild('bumpMap') bumpMap: TextureInputComponent;
  @ViewChild('normalMap') normalMap: TextureInputComponent;

  material: Material;
  onResizeEventListener: any;

  constructor() { 
    this.material = new ThreePhongMaterial();
  }

  ngAfterViewInit(): void {
    this.onResizeEventListener = window.addEventListener('resize', 
      () => this.threeJsViewer.onResize()
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResizeEventListener);
  }

  update(): void {
    this.material.color = this.color.value;
    this.material.ambient = this.ambient.value;
    this.material.emissive = this.emissive.value;
    this.material.specular = this.specular.value;

    if(this.map.texture) {
      this.material.map = this.map.texture;
    }

    if(this.envMap.texture) {
      this.material.envMap = this.envMap.texture;
    }

    if(this.lightMap.texture) {
      this.material.lightMap = this.lightMap.texture;
    }

    if(this.specularMap.texture) {
      this.material.specularMap = this.specularMap.texture;
    }

    if(this.bumpMap.texture) {
      this.material.bumpMap = this.bumpMap.texture;
    }

    if(this.normalMap.texture) {
      this.material.normalMap = this.normalMap.texture;
    }

    this.threeJsViewer.render();
  }

  updateCallback(): void {
    console.log('updateCallback');
  }

  logMaterial(): void {
    console.log('Material', this.material);
  }

  materialTypes(): void {
    console.log('MeshBasicMaterial', new THREE.MeshBasicMaterial());
    console.log('MeshLambertMaterial', new THREE.MeshLambertMaterial());
    console.log('MeshPhongMaterial', new THREE.MeshPhongMaterial());
  }
}

export class Material {
  name: string = 'Material';
  color: string = '#ffffff';
  ambient: string = '#ffffff';
  emissive: string = '#000000';
  specular: string = '#111111';
  wireframe: boolean = false;
  map: any = undefined;
  envMap: string = undefined;
  alphaTest: number = 0;
  side: number = 0;
  transparent: boolean = false;
  opacity: number = 1;
  fog: boolean = false;
  lightMap: string = undefined;
  specularMap: string = undefined;
  normalMap: string = undefined;
  bumpMap: string = undefined;
  bumpScale: number = 1;
  shininess: number = 30;
  metal: boolean = false;
  reflectivity: number = 1;
  refractionRatio: number = 0.98;
  combine: number = 0;
  envMapMapping: number = 0;

  constructor() {
    this.name = "Material";
  }

  randomColor(): any {
    const color = new THREE.Color();
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    return color.getHexString();
  }

  loadTexture(textureBase64Encoded: string) {
    const img = new Image();
    const texture = new THREE.Texture(img);
    img.onload = () => { texture.needsUpdate = true };
    img.src = textureBase64Encoded;
    return texture;
  }

  toMaterial() {
    return null;
  }
}

export class ThreeBasicMaterial extends Material {
  toMaterial() {
    console.error('ThreeBasicMaterial not implemented.');
  }
}

export class ThreePhongMaterial extends Material {

  toMaterial(): any {

    const m = new THREE.MeshPhongMaterial({ 
      name: this.name,
      color: this.color,
      ambient: this.ambient,
      emissive: this.emissive,
      specular: this.specular,
      wireframe: this.wireframe,
      alphaTest: this.alphaTest,
      side: parseInt(this.side.toString()),
      transparent: this.transparent,
      opacity: this.opacity,
      depthTest: true, // default: true
      depthWrite: true, // default: true
      fog: this.fog,
      shininess: this.shininess,
      metal: this.metal,
      bumpScale: this.bumpScale,
      reflectivity: this.reflectivity,
      refractionRatio: this.refractionRatio,
      combine: parseInt(this.combine.toString())
    });

    if(this.map) {
      m.map = this.loadTexture(this.map);
    }

    if(this.envMap) {
      m.envMap = this.loadTexture(this.envMap);
      m.envMap.mapping = THREE.SphericalReflectionMapping;
    }

    if(this.lightMap) {
      m.lightMap = this.loadTexture(this.lightMap);
    }

    if(this.specularMap) {
      m.specularMap = this.loadTexture(this.specularMap);
    }

    if(this.bumpMap) {
      m.bumpMap = this.loadTexture(this.bumpMap);
    }

    if(this.normalMap) {
      //m.normalMap = this.loadTexture(this.normalMap);
      console.warn('normal map not implemented.');
    }

    // urls of the images, one per half axis
    var urls = [
      'assets/img/cubemap/posx.jpg',
      'assets/img/cubemap/negx.jpg',
      'assets/img/cubemap/posy.jpg',
      'assets/img/cubemap/negy.jpg',
      'assets/img/cubemap/posz.jpg',
      'assets/img/cubemap/negz.jpg'
    ];

    // Load a cubemap example
    const cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;
    switch(parseInt(this.envMapMapping.toString())) {
      case 0: cubemap.mapping = THREE.CubeReflectionMapping; break;
      case 1: cubemap.mapping = THREE.CubeRefractionMapping; break;
    }
    console.log('cubemap.mapping', cubemap.mapping);
    m.envMap = cubemap;

    m.needsUpdate = true;
   
    return m;
  }
}
