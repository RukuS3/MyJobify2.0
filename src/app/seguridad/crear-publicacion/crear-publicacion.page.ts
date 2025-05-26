import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})
export class CrearPublicacionPage implements OnInit {
  publicaciones: any[] = [];
  titulo: string = '';
  descripcion: string = '';

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.afs.collection('Publicacion', ref => ref.orderBy('fecha', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.publicaciones = data.map((pub: any) => ({
          ...pub,
          fecha: pub.fecha?.toDate ? pub.fecha.toDate() : pub.fecha
        }));
      });
  }

  async crearPublicacion() {
    const user = await this.auth.currentUser;
    if (!user) {
      alert('Debes iniciar sesión para publicar.');
      return;
    }

    if (!this.titulo || !this.descripcion) {
      alert('Completa todos los campos.');
      return;
    }

    const nuevaPub = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha: new Date(),
      creadorUid: user.uid,
      nombreUsuario: user.displayName || 'Anónimo',
      imagen: '' // aquí iría la URL si subes imágenes
    };

    await this.afs.collection('Publicacion').add(nuevaPub);

    // Limpiar campos
    this.titulo = '';
    this.descripcion = '';
    alert('¡Publicación creada!');
  }
}
