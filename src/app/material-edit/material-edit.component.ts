import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ThreeJsViewerComponent } from '../three-js-viewer/three-js-viewer.component';
import { TextureInputComponent } from '../texture-input/texture-input.component';
import { ColorInputComponent } from '../color-input/color-input.component';
import { Material } from '../../models/material';
import { PhongMaterial } from '../../models/phongMaterial';
import { RangeInputComponent } from '../range-input/range-input.component';

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

  @ViewChild('opacity') opacity: RangeInputComponent;
  @ViewChild('alphaTest') alphaTest: RangeInputComponent;
  @ViewChild('shininess') shininess: RangeInputComponent;
  @ViewChild('reflectivity') reflectivity: RangeInputComponent;
  @ViewChild('refractionRatio') refractionRatio: RangeInputComponent;
  @ViewChild('bumpScale') bumpScale: RangeInputComponent;

  material: Material = new PhongMaterial();
  onResizeEventHandle: any;

  ngAfterViewInit(): void {
    this.onResizeEventHandle = window.addEventListener('resize', 
      () => this.threeJsViewer.onResize()
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResizeEventHandle);
  }

  update(): void {
    this.updateMaterialColors();
    this.updateMaterialSliders();
    this.updateMaterialTextures();
    //this.threeJsViewer.updateMaterial(this.material.toMaterial());
    this.threeJsViewer.render();
  }

  private updateMaterialColors() {
    this.material.color = this.color.value;
    this.material.ambient = this.ambient.value;
    this.material.emissive = this.emissive.value;
    this.material.specular = this.specular.value;
  }

  private updateMaterialTextures() {
    this.material.map = this.map.texture;
    this.material.envMap = this.envMap.texture;
    this.material.lightMap = this.lightMap.texture;
    this.material.specularMap = this.specularMap.texture;
    this.material.bumpMap = this.bumpMap.texture;
    this.material.normalMap = this.normalMap.texture;
  }
  
  private updateMaterialSliders() {
    this.material.opacity = this.opacity.value;
    this.material.alphaTest = this.alphaTest.value;
    this.material.shininess = this.shininess.value;
    this.material.reflectivity = this.reflectivity.value;
    this.material.refractionRatio = this.refractionRatio.value;
    this.material.bumpScale = this.bumpScale.value;
  }
}