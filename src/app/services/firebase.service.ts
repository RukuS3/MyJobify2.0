import { Injectable } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // <-- Importa AngularFireAuth
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth  // <-- Inyecta AngularFireAuth
  ) {}

  // Publicaciones
  crearPublicacion(data: any) {
    return this.firestore.collection('Publicacion').add(data);
  }

  async eliminarPublicacion(idPublicacion: string): Promise<void> {
    try {
      // 1. Eliminar la publicación
      await this.firestore.collection('Publicacion').doc(idPublicacion).delete();

      // 2. Obtener el UID autenticado
      const user = await this.auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');
      const uid = user.uid;

      // 3. Obtener la subcolección 'solicitudesRecibidas' donde publicacionId == idPublicacion
      const solicitudesSnapshot = await this.firestore.collection('Solicitudes')
        .doc(uid)
        .collection('solicitudesRecibidas', ref => ref.where('publicacionId', '==', idPublicacion))
        .get()
        .toPromise();

      // 4. Por cada solicitud que coincida, eliminar
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

  // Enviar solicitud
  enviarSolicitud(creadorUid: string, solicitud: any) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas')
      .add(solicitud);
  }

  // Obtener solicitudes recibidas para el usuario creador
  obtenerSolicitudesRecibidas(creadorUid: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas', ref => ref.orderBy('fechaSolicitud', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  // Obtener solicitud específica de un solicitante para un creador
  obtenerSolicitud(creadorUid: string, solicitanteUid: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas', ref =>
        ref.where('solicitanteUid', '==', solicitanteUid)
      )
      .valueChanges({ idField: 'id' });
  }

  // Actualizar estado de solicitud (aceptada, rechazada, etc.)
  actualizarEstadoSolicitud(creadorUid: string, solicitudId: string, estado: string) {
    return this.firestore.collection('Solicitudes')
      .doc(creadorUid)
      .collection('solicitudesRecibidas')
      .doc(solicitudId)
      .update({ estado });
  }
}
