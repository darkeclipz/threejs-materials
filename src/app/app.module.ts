import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeJsViewerComponent } from './three-js-viewer/three-js-viewer.component';
import { MaterialViewComponent } from './material-view/material-view.component';
import { MaterialEditComponent } from './material-edit/material-edit.component';
import { TextureUploaderComponent } from './texture-uploader/texture-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeJsViewerComponent,
    MaterialViewComponent,
    MaterialEditComponent,
    TextureUploaderComponent
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
