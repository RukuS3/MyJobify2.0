import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

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
  datosCargados: boolean = false;

  // Nueva variable para guardar datos del usuario creador
  usuarioCreador: any = null;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.auth.currentUser.then(user => {
      this.usuarioActualUid = user ? user.uid : null;

      if (id) {
        this.afs.collection('Publicacion').doc(id).valueChanges().subscribe(pub => {
          this.publicacion = pub;

          if (this.publicacion) {
            this.publicacion.id = id;
          }

          if (this.publicacion?.usuarioId) {
            this.cargarUsuarioCreador(this.publicacion.usuarioId);  // Cargar datos usuario creador
            this.cargarSolicitud();
          }
        });
      }
    });
  }

  // Método para cargar datos del usuario creador
  cargarUsuarioCreador(usuarioId: string) {
    this.afs.collection('usuarios').doc(usuarioId).valueChanges().subscribe(usuario => {
      this.usuarioCreador = usuario;
    });
  }

  cargarSolicitud() {
    if (this.usuarioActualUid && this.publicacion?.usuarioId && this.publicacion.id) {
      this.afs.collection('Solicitudes').doc(this.publicacion.usuarioId)
        .collection('solicitudesRecibidas', ref => 
          ref
            .where('solicitanteUid', '==', this.usuarioActualUid)
            .where('publicacionId', '==', this.publicacion.id)
        )
        .valueChanges({ idField: 'id' })
        .subscribe(solicitudes => {
          if (solicitudes.length > 0) {
            this.solicitudEnviada = true;
            this.estadoSolicitud = solicitudes[0]['estado'];
          } else {
            this.solicitudEnviada = false;
            this.estadoSolicitud = null;
          }
          this.datosCargados = true;
        }, error => {
          console.error('Error al cargar solicitud:', error);
          this.datosCargados = true;
        });
    } else {
      this.datosCargados = true;
    }
  }

  async enviarSolicitud() {
    if (!this.usuarioActualUid || !this.publicacion) return;
    if (this.usuarioActualUid === this.publicacion.usuarioId) return;

    if (this.solicitudEnviada && this.estadoSolicitud === 'rechazada') {
      console.warn('Solicitud fue rechazada anteriormente. No se puede volver a enviar.');
      return;
    }

    if (this.solicitudEnviada) {
      console.warn('Ya hay una solicitud enviada.');
      return;
    }

    try {
      //  1. Obtener los datos del usuario solicitante y tiparlos
      const usuarioDoc = await this.afs.collection('usuarios').doc(this.usuarioActualUid).get().toPromise();
      const usuarioData = usuarioDoc?.data() as {
        nombre: string;
        apellido: string;
        fotoUrl: string;
      };

      if (!usuarioData) {
        console.error('No se encontraron datos del usuario solicitante');
        return;
      }

      // 2. Construir solicitud incluyendo los datos del usuario
      const solicitud = {
        publicacionId: this.publicacion.id,
        solicitanteUid: this.usuarioActualUid,
        fechaSolicitud: new Date(),
        estado: 'pendiente',
        solicitanteNombre: usuarioData.nombre || '',
        solicitanteApellido: usuarioData.apellido || '',
        solicitanteFoto: usuarioData.fotoUrl || '',
        agregarfoto: this.publicacion.agregarfoto || ''
      };

      // 3. Guardar la solicitud
      await this.afs.collection('Solicitudes')
        .doc(this.publicacion.usuarioId)
        .collection('solicitudesRecibidas')
        .add(solicitud);

      this.solicitudEnviada = true;
      this.estadoSolicitud = 'pendiente';

    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }
  }
}
