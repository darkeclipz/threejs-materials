import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from '../../models/material';
import { BasicMaterial } from '../../models/basicMaterial';
import { PhongMaterial } from '../../models/phongMaterial';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {

  public materials: Material[] = [];

  constructor(private router: Router) {
    for(let i = 0; i < 4*5; i++) {
      let material = new PhongMaterial();
      material.name = 'Material #' + i;
      this.materials.push(material);
    }
  }

  ngOnInit(): void {
    
  }

  edit() {
    this.router.navigate(['edit']);
  }

}