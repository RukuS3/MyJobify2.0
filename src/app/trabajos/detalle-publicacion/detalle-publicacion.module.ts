import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePublicacionPageRoutingModule } from './detalle-publicacion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DetallePublicacionPage } from './detalle-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePublicacionPageRoutingModule,
    SharedModule 
  ],
  declarations: [DetallePublicacionPage]
})
export class DetallePublicacionPageModule {}
