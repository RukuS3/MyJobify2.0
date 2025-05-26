import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatOpenPageRoutingModule } from './chat-open-routing.module';

import { ChatOpenPage } from './chat-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatOpenPageRoutingModule
  ],
  declarations: [ChatOpenPage]
})
export class ChatOpenPageModule {}
