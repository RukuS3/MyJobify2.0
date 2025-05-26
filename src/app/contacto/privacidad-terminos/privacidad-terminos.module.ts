import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacidadTerminosPageRoutingModule } from './privacidad-terminos-routing.module';

import { PrivacidadTerminosPage } from './privacidad-terminos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacidadTerminosPageRoutingModule
  ],
  declarations: [PrivacidadTerminosPage]
})
export class PrivacidadTerminosPageModule {}
