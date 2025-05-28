import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavePublicacionPageRoutingModule } from './save-publicacion-routing.module';

import { SavePublicacionPage } from './save-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavePublicacionPageRoutingModule
  ],
  declarations: [SavePublicacionPage]
})
export class SavePublicacionPageModule {}
