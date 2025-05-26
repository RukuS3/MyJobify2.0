import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})
export class CrearPublicacionPage implements OnInit {
  publicaciones: any[] = [];

  constructor(
    private afs: AngularFirestore,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.afs.collection('Publicacion', ref => ref.orderBy('fecha', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.publicaciones = data.map(doc => {
          const data = doc.payload.doc.data() as any;
          const id = doc.payload.doc.id;
          return {
            id,
            ...data,
            fecha: data.fecha?.toDate ? data.fecha.toDate() : data.fecha
          };
        });
      });
  }

  eliminarPublicacion(id: string) {
    this.firebaseService.eliminarPublicacion(id).then(() => {
      this.publicaciones = this.publicaciones.filter(pub => pub.id !== id);
    }).catch(err => {
      console.error('Error al eliminar publicación:', err);
    });
  }
}
