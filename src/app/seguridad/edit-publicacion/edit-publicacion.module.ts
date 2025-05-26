import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <- Aquí agregas ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { EditPublicacionPageRoutingModule } from './edit-publicacion-routing.module';
import { EditPublicacionPage } from './edit-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <- Asegúrate de incluir esto
    IonicModule,
    EditPublicacionPageRoutingModule
  ],
  declarations: [EditPublicacionPage]
})
export class EditPublicacionPageModule {}
