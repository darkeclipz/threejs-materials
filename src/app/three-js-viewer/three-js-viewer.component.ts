import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
declare const THREE: any;

@Component({
  selector: 'three-js-viewer',
  templateUrl: './three-js-viewer.component.html',
  styleUrls: ['./three-js-viewer.component.css']
})

export class ThreeJsViewerComponent implements AfterViewInit {

  @ViewChild('output', { static: true }) output: ElementRef;
  @Input('width') width: number = undefined;
  @Input('height') height: number = undefined;
  @Input('material') material: any;
  @Input('useSkybox') useSkybox: boolean = false;

  private camera: any;
  private renderer: any;
  private scene: any;
  private animationHandle: any;
  private angle: number = 0;
  private objectDistance: number = 2;
  private threeMaterial: any;
  private rotationSpeed: number = 0.0025;

  ngAfterViewInit() {
    setTimeout(async () => this.init(), 0);
  }

  init(): void {
    if(this.width == undefined || this.height == undefined) {
      this.updateWindowSize();
    }
    this.render();
  }

  render(): void {
    this.scene = new THREE.Scene();
    this.threeMaterial = this.material.toMaterial();
    this.addRenderer();
    this.addCamera();
    this.addSphere();
    this.addLights();
    if(this.useSkybox) {
      this.addSkybox();
    }
    if(this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    this.animate();
  }

  addSkybox() {
    const shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = this.threeMaterial.envMap;
    const skyboxMaterial = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });
    const skyboxGeometry = new THREE.CubeGeometry(200, 200, 200)
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    this.scene.add(skybox);
  }

  addCamera() {
    const aspect = this.width / this.height;
    const fov = 75;
    const nearClippingPlane = 0.1;
    const farClippingPlane = 1000;
    this.camera = new THREE.PerspectiveCamera(
      fov, 
      aspect, 
      nearClippingPlane, 
      farClippingPlane
    );
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.output.nativeElement, 
      antialias: true 
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(new THREE.Color(0xffffff), 1);   
  }

  addSphere() {
    const radius = 1;
    const detail = 128;
    const geometry = new THREE.SphereGeometry(radius, detail, detail);
    const sphere = new THREE.Mesh(geometry, this.threeMaterial);
    this.camera.position.z = this.objectDistance;
    this.scene.add(sphere);
  }

  updateWindowSize() {
    const canvasWindow = document.getElementById('canvas-window');
    const bbox = canvasWindow.getBoundingClientRect();
    this.width = bbox.width;
    this.height = bbox.height;
  }

  onResize() {
    this.updateWindowSize();
    this.render();
  }

  animate() {
    this.animationHandle = requestAnimationFrame(() => this.animate());
    this.rotateCamera();
    this.renderer.render(this.scene, this.camera);
  }

  rotateCamera() {
    this.angle += this.rotationSpeed;
    const radius = this.objectDistance;
    this.camera.position.x = radius * Math.cos(this.angle);
    this.camera.position.z = radius * Math.sin(this.angle);
    this.camera.lookAt(new THREE.Vector3());
  }

  addLights() {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const globalLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(globalLight);

    const light = new THREE.PointLight(0x404040, 2, 10, 2);
    light.position.set(2, 2, 3);
    this.scene.add(light);
  }
}