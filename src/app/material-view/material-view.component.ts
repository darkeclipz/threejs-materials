import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThreePhongMaterial, Material, ThreeBasicMaterial } from '../material-edit/material-edit.component';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {

  public materials: Material[] = [];

  constructor(private router: Router) {
    for(let i = 0; i < 4*5; i++) {
      let material = (Math.random() >= 0.5)
       ? new ThreePhongMaterial()
       : new ThreeBasicMaterial();
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
