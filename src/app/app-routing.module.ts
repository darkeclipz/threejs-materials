import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeJsViewerComponent } from './three-js-viewer/three-js-viewer.component';
import { MaterialViewComponent } from './material-view/material-view.component';
import { MaterialEditComponent } from './material-edit/material-edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: MaterialViewComponent },
  { path: 'edit', component: MaterialEditComponent },
  { path: '3d', component: ThreeJsViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
