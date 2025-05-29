import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudEmpleoPageRoutingModule } from './solicitud-empleo-routing.module';

import { SolicitudEmpleoPage } from './solicitud-empleo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudEmpleoPageRoutingModule
  ],
  declarations: [SolicitudEmpleoPage]
})
export class SolicitudEmpleoPageModule {}
