import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearPublicacionPageRoutingModule } from './crear-publicacion-routing.module';
import { CrearPublicacionPage } from './crear-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearPublicacionPageRoutingModule
  ],
  declarations: [CrearPublicacionPage]
})
export class CrearPublicacionPageModule {}
