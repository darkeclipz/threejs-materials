import { Material } from "./material";
declare var THREE: any;

export class PhongMaterial extends Material {

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
      m.envMap = cubemap;
      m.envMap.mapping = THREE.CubeRefractionMapping;
  
      m.needsUpdate = true;
     
      return m;
    }
  }
  