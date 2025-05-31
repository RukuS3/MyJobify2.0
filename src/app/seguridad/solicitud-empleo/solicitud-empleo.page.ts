import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-solicitud-empleo',
  templateUrl: './solicitud-empleo.page.html',
  styleUrls: ['./solicitud-empleo.page.scss'],
})
export class SolicitudEmpleoPage implements OnInit {

  solicitudes: any[] = [];
  usuarioActualUid: string | null = null;
  solicitudesPendientesCount: number = 0; 

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  async ngOnInit() {
    try {
      this.usuarioActualUid = await this.getUsuarioUid();
      console.log('UID actual (creador):', this.usuarioActualUid);

      if (this.usuarioActualUid) {
        this.afs.collection('Solicitudes').doc(this.usuarioActualUid)
          .collection('solicitudesRecibidas', ref => ref.orderBy('fechaSolicitud', 'desc'))
          .valueChanges({ idField: 'id' })
          .subscribe(data => {
            console.log('Solicitudes recibidas:', data);
            this.solicitudes = data;

            // 👇 contar solo solicitudes pendientes
            this.solicitudesPendientesCount = data.filter((sol: any) => sol.estado === 'pendiente').length;
          });
      }
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
    }
  }

  private async getUsuarioUid(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.uid : null;
  }

  aceptarSolicitud(id: string) {
    if (!this.usuarioActualUid) return;

    this.afs.collection('Solicitudes').doc(this.usuarioActualUid)
      .collection('solicitudesRecibidas').doc(id)
      .update({ estado: 'aceptada' })
      .catch(err => console.error('Error al aceptar solicitud:', err));
  }

  rechazarSolicitud(id: string) {
    if (!this.usuarioActualUid) return;

    this.afs.collection('Solicitudes').doc(this.usuarioActualUid)
      .collection('solicitudesRecibidas').doc(id)
      .update({ estado: 'rechazada' })
      .catch(err => console.error('Error al rechazar solicitud:', err));
  }
}
