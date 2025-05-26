import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatOpenPage } from './chat-open.page';

const routes: Routes = [
  {
    path: '',
    component: ChatOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatOpenPageRoutingModule {}
