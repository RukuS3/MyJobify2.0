import { Injectable } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Denuncia {
  id?: string;
  fecha?: any; // Firebase Timestamp u objeto Date
  [key: string]: any; // otros campos dinámicos
}

interface ReportePublicacion {
  id?: string;
  fechaReporte?: any; // Firebase Timestamp u objeto Date
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth
  ) {}

  // Publicaciones
  crearPublicacion(data: any) {
    return this.firestore.collection('Publicacion').add(data);
  }

  async eliminarPublicacion(idPublicacion: string): Promise<void> {
    try {
      // Eliminar la publicación
      await this.firestore.collection('Publicacion').doc(idPublicacion).delete();

      // Obtener el UID autenticado
      const user = await this.auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');
      const uid = user.uid;

      // Eliminar solicitudes relacionadas (si existen)
      const solicitudesSnapshot = await this.firestore.collection('Solicitudes')
        .doc(uid)
        .collection('solicitudesRecibidas', ref => ref.where('publicacionId', '==', idPublicacion))
        .get()
        .toPromise();

      for (const solicitudDoc of solicitudesSnapshot.docs) {
        await this.firestore.collection('Solicitudes')
          .doc(uid)
          .collection('solicitudesRecibidas')
          .doc(solicitudDoc.id)
          .delete();
      }
    } catch (error) {
      console.error('Error eliminando publicación y solicitudes relacionadas:', error);
      throw error;
    }
  }

  // Subir imagen
  subirImagen(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `imagenes/${uuidv4()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => resolve(url),
            error: (err) => reject(err)
          });
        })
      ).subscribe();
    });
  }

  // Solicitudes de empleo
  enviarSolicitud(creadorUid: string, solicitud: any) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas')
      .add(solicitud);
  }

  obtenerSolicitudesRecibidas(creadorUid: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas', ref => ref.orderBy('fechaSolicitud', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  obtenerSolicitud(creadorUid: string, solicitanteUid: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas', ref =>
        ref.where('solicitanteUid', '==', solicitanteUid)
      )
      .valueChanges({ idField: 'id' });
  }

  actualizarEstadoSolicitud(creadorUid: string, solicitudId: string, estado: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas')
      .doc(solicitudId)
      .update({ estado });
  }

  // ----------------------
  // Métodos nuevos para Admin Panel
  // ----------------------

  // Obtener denuncias ordenadas por fecha con conversión a Date
  obtenerDenuncias() {
    return this.firestore.collection('denunciasUsuarios', ref => ref.orderBy('fecha', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as DocumentData;
          const id = a.payload.doc.id;
          return {
            id,
            ...data,
            fecha: data['fecha']?.toDate ? data['fecha'].toDate() : data['fecha']
          };
        }))
      );
  }

  obtenerReportesPublicacion() {
    return this.firestore.collection('reportesPublicacion', ref => ref.orderBy('fechaReporte', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return {
            id,
            ...data,
            fechaReporte: data.fechaReporte?.toDate ? data.fechaReporte.toDate() : data.fechaReporte
          };
        }))
      );
  }

  obtenerDenunciaPorId(id: string): Observable<any> {
    return this.firestore.collection('denunciasUsuarios').doc(id).valueChanges();
  }

  // Actualiza campos de una denuncia
  actualizarDenuncia(id: string, data: any) {
    return this.firestore.collection('denunciasUsuarios').doc(id).update(data);
  }

  // Elimina una denuncia
  eliminarDenuncia(id: string) {
    return this.firestore.collection('denunciasUsuarios').doc(id).delete();
  }

  // Envía una notificación (la estructura puede ser diferente según tu diseño)
  enviarNotificacion(uid: string, mensaje: string) {
    const notificacion = {
      mensaje,
      fecha: new Date(),
      leida: false
    };
    return this.firestore.collection('notificaciones').doc(uid).collection('userNotifications').add(notificacion);
  }

  // Nuevo método para obtener el nombre de usuario por UID
  async obtenerNombreUsuario(uid: string): Promise<string> {
    try {
      const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
      if (doc.exists) {
        const data = doc.data() as { nombre?: string; apellido?: string };
        const nombre = data?.nombre || '';
        const apellido = data?.apellido || '';
        return `${nombre} ${apellido}`.trim() || 'Sin nombre';
      } else {
        return 'Usuario no encontrado';
      }
    } catch (error) {
      console.error('Error obteniendo nombre completo de usuario:', error);
      return 'Error al obtener nombre';
    }
  }

  obtenerNotificacionesUsuario(uid: string) {
    return this.firestore.collection('notificaciones').doc(uid).collection('userNotifications', ref => ref.orderBy('fecha', 'desc'))
      .valueChanges({ idField: 'id' });
  }
}
