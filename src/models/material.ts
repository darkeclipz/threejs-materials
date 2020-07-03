
import { TextureData } from '../models/textureData';
declare var THREE: any;

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
    textureData: TextureData = new TextureData();

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