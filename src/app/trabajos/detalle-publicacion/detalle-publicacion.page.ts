import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage implements OnInit {
  publicacion: any;
  usuarioActualUid: string | null = null;
  solicitudEnviada: boolean = false;
  estadoSolicitud: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.auth.currentUser.then(user => {
      this.usuarioActualUid = user ? user.uid : null;

      if (id) {
        this.afs.collection('Publicacion').doc(id).valueChanges().subscribe(pub => {
          this.publicacion = pub;
          this.cargarSolicitud();
        });
      }
    });
  }

  cargarSolicitud() {
    if (this.usuarioActualUid && this.publicacion?.usuarioId) {
      this.afs.collection('Solicitudes').doc(this.publicacion.usuarioId)
        .collection('solicitudesRecibidas', ref => ref.where('solicitanteUid', '==', this.usuarioActualUid))
        .valueChanges({ idField: 'id' })
        .subscribe(solicitudes => {
          if (solicitudes.length > 0) {
            this.solicitudEnviada = true;
            this.estadoSolicitud = solicitudes[0]['estado'];
          } else {
            this.solicitudEnviada = false;
            this.estadoSolicitud = null;
          }
        });
    }
  }

  async enviarSolicitud() {
    if (!this.usuarioActualUid || !this.publicacion) return;

    if (this.usuarioActualUid === this.publicacion.usuarioId) return;

    const solicitud = {
      publicacionId: this.route.snapshot.paramMap.get('id'),
      solicitanteUid: this.usuarioActualUid,
      fechaSolicitud: new Date(),
      estado: 'pendiente',
    };

    try {
      await this.afs.collection('Solicitudes')
        .doc(this.publicacion.usuarioId)
        .collection('solicitudesRecibidas')
        .add(solicitud);
      this.solicitudEnviada = true;
      this.cargarSolicitud(); // Actualiza estado después de enviar
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }
  }
}
