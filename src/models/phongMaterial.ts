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
  
      if(this.envMap) {
        material.envMap = this.loadTexture(this.envMap);
        material.envMap.mapping = THREE.SphericalReflectionMapping;
      }
  
      if(this.lightMap) {
        material.lightMap = this.loadTexture(this.lightMap);
        this.textureData.apply(material.lightMap);
      }
  
      if(this.specularMap) {
        material.specularMap = this.loadTexture(this.specularMap);
        this.textureData.apply(material.specularMap);
      }
  
      if(this.bumpMap) {
        material.bumpMap = this.loadTexture(this.bumpMap);
        this.textureData.apply(material.bumpMap);
      }
  
      // if(this.normalMap) {
      //   m.normalMap = this.loadTexture(this.normalMap);
      // }
  
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
      console.log('envMap mapping', cubemap.mapping);
      material.envMap = cubemap;
      material.envMap.mapping = THREE.CubeRefractionMapping;
  
      material.needsUpdate = true;
     
      return material;
    }
  }
  