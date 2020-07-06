import { Material } from "./material";
declare var THREE: any;

export class PhongMaterial extends Material {

    toMaterial(): any {
  
      const material = new THREE.MeshPhongMaterial({ 
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
        material.map = this.loadTexture(this.map);
        this.textureData.apply(material.map);
      }
  
      // if(this.envMap.notNull()) {
      //   material.envMap = this.loadEnvironmentMap(this.envMap);
      //   material.envMap.mapping = THREE.SphericalReflectionMapping;
      // }
  
      // if(this.lightMap) {
      //   material.lightMap = this.loadTexture(this.lightMap);
      //   this.textureData.apply(material.lightMap);
      // }
  
      if(this.specularMap) {
        material.specularMap = this.loadTexture(this.specularMap);
        this.textureData.apply(material.specularMap);
      }
  
      if(this.bumpMap) {
        material.bumpMap = this.loadTexture(this.bumpMap);
        this.textureData.apply(material.bumpMap);
      }

      material.envMap = this.loadDevelopmentCubeBox();
      material.needsUpdate = true;
      return material;
    }

    loadDevelopmentCubeBox() {
      const base = 'assets/img/cubemap/';
      const urls = [
        base + 'posx.jpg', base + 'negx.jpg',
        base + 'posy.jpg', base + 'negy.jpg',
        base + 'posz.jpg', base + 'negz.jpg'
      ];
      const cubemap = THREE.ImageUtils.loadTextureCube(urls);
      cubemap.format = THREE.RGBFormat;
      cubemap.encoding = THREE.sRGBEncoding;
      cubemap.mapping = THREE.CubeReflectionMapping;
      return cubemap;  
    }
  }
  