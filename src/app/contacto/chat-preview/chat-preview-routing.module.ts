import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPreviewPage } from './chat-preview.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPreviewPageRoutingModule {}
