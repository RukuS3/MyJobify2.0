import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.page.html',
  styleUrls: ['./chat-preview.page.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class ChatPreviewPage {
  chats = [
    { mensaje: '¿Está disponible el trabajo todavía?', tiempo: 'ahora' },
    { mensaje: 'Estoy en camino', tiempo: 'hace 30 min' },
    { mensaje: 'Tendré que cancelar', tiempo: 'hace 1 hr' },
    { mensaje: '¿Qué hay que pintar?', tiempo: 'hace 2 hrs' },
  ];

  goToChat(chat: any) {
    // Navegar al chat seleccionado
  }
}