import { Injectable } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Publicaciones
  crearPublicacion(data: any) {
    return this.firestore.collection('Publicacion').add(data);
  }

  eliminarPublicacion(id: string) {
    return this.firestore.collection('Publicacion').doc(id).delete();
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
