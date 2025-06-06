import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { InicioPageRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
