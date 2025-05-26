import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPreviewPageRoutingModule } from './chat-preview-routing.module';

import { ChatPreviewPage } from './chat-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPreviewPageRoutingModule
  ],
  declarations: [ChatPreviewPage]
})
export class ChatPreviewPageModule {}
