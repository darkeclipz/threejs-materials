
import { TextureData } from '../models/textureData';
import { EnvironmentMapData } from '../models/environmentMapData';
import { ThreeJsViewerComponent } from 'src/app/three-js-viewer/three-js-viewer.component';
import { BasicMaterial } from './basicMaterial';
import { LambertMaterial } from './lambertMaterial';
import { PhongMaterial } from './phongMaterial';

declare var THREE: any;

export class Material {
    name: string = 'Material';
    color: string = '#ffffff';
    ambient: string = '#ffffff';
    emissive: string = '#000000';
    specular: string = '#111111';
    wireframe: boolean = false;
    map: any = undefined;
    alphaTest: number = 0;
    side: number = 0;
    transparent: boolean = false;
    opacity: number = 1;
    fog: boolean = false;
    //lightMap: string = undefined;
    specularMap: string = undefined;
    //normalMap: string = undefined;
    bumpMap: string = undefined;
    bumpScale: number = 1;
    shininess: number = 30;
    metal: boolean = false;
    reflectivity: number = 1;
    refractionRatio: number = 0.98;
    combine: number = 0;
    envMap: EnvironmentMapData = new EnvironmentMapData();
    envMapMapping: number = 0;
    textureData: TextureData = new TextureData();
    type: MaterialType;

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

    loadEnvironmentMap(envMap: EnvironmentMapData): any {
      return undefined;
    }

    loadDevelopmentCubeBox(): any { 
      return undefined;
    }

    toMaterial() {
      console.error('unable to transform to THREE.Material, '
        + 'casting to appropriate type is required, use .cast()');
    }
  
    cast(): any {
      // we do not want to use a switch statement for this...
      // can we use classes and casting instead?
      switch(this.type) {
        case MaterialType.Basic:   return this as BasicMaterial;
        case MaterialType.Lambert: return this as LambertMaterial;
        case MaterialType.Phong:   return this as PhongMaterial;
      }
    }
}

export declare enum MaterialType {
  Basic = 0,
  Lambert = 1,
  Phong = 2
}