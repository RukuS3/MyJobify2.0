import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-notifications',
  template: `
    <ion-card *ngIf="notificaciones && notificaciones.length > 0" class="notificaciones-card">
      <ion-card-header>
        <ion-card-title>Notificaciones</ion-card-title>
        <ion-icon name="close-outline" (click)="cerrar.emit()" class="close-icon"></ion-icon>
      </ion-card-header>
      <ion-card-content>
        <ion-item *ngFor="let notificacion of notificaciones">
          {{ notificacion.mensaje }}
        </ion-item>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .notificaciones-card {
      position: fixed;
      top: 70px;
      right: 20px;
      width: 300px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 9999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      background: white;
      border-radius: 8px;
    }
    .close-icon {
      float: right;
      cursor: pointer;
      font-size: 1.4rem;
      color: #999;
    }
  `]
})
export class UserNotificationsComponent {
  @Input() notificaciones: any[] = [];
  @Output() cerrar = new EventEmitter<void>();
}