import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeJsViewerComponent } from './three-js-viewer/three-js-viewer.component';
import { MaterialViewComponent } from './material-view/material-view.component';
import { MaterialEditComponent } from './material-edit/material-edit.component';
import { TextureInputComponent } from './texture-input/texture-input.component';
import { ColorInputComponent } from './color-input/color-input.component';
import { RangeInputComponent } from './range-input/range-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeJsViewerComponent,
    MaterialViewComponent,
    MaterialEditComponent,
    TextureInputComponent,
    ColorInputComponent,
    RangeInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
