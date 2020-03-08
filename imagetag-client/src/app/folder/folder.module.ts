import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ImageCanvasComponent } from '../components/image-canvas/image-canvas.component';
import { MarkersDataComponent } from '../components/markers-data/markers-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [
    FolderPage,

    // Components
    ImageCanvasComponent,
    MarkersDataComponent
  ]
})
export class FolderPageModule {}
