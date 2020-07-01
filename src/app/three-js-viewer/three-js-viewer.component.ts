import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
declare const THREE: any;

/*
  RESOURCES:
    Materials demo: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html
    Textures demo: https://threejsfundamentals.org/threejs/lessons/threejs-textures.html
    Transparancy: https://threejs.org/examples/?q=trans#webgl_materials_physical_transparency
    Subsurface scattering: 
*/

@Component({
  selector: 'three-js-viewer',
  templateUrl: './three-js-viewer.component.html',
  styleUrls: ['./three-js-viewer.component.css']
})

export class ThreeJsViewerComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('output', { static: true }) output: ElementRef;
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('material') material: any;

  private camera: any;
  private renderer: any;
  private scene: any;
  private animationHandle: any;
  private angle: number = 0;

  ngAfterViewInit() {
    setTimeout(async () => this.render(), 0);
  }

  render(): void {
    this.scene = new THREE.Scene();
    const aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.output.nativeElement, antialias: true });
    const detail = 40;
    const geometry = new THREE.SphereGeometry(1, detail, detail);
    const material = this.material.toMaterial();
    console.log('ThreeJsViewer.Material', material);
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
    this.camera.position.z = 2;
    this.addLights();
    this.renderer.setClearColor(new THREE.Color(0xffffff), 1);
    this.renderer.setSize(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
    if(this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    this.animate();
  }

  animate() {
    this.animationHandle = requestAnimationFrame(() => this.animate());
    const radius = 2;
    this.camera.position.x = radius * Math.cos(this.angle);
    this.camera.position.z = radius * Math.sin(this.angle);
    this.camera.lookAt(new THREE.Vector3());
    this.angle += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  addLights() {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const globalLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(globalLight);

    var light = new THREE.PointLight(0x404040, 2, 10, 2);
    light.position.set(2, 2, 3);
    this.scene.add(light);
  }
}