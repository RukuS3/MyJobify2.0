import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})
export class CrearPublicacionPage implements OnInit {
  publicaciones: any[] = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    // Asegúrate de que el nombre coincide exactamente con la colección en Firestore: "Publicacion"
    this.afs.collection('Publicacion').valueChanges().subscribe(data => {
      this.publicaciones = data.map((pub: any) => ({
        ...pub,
        fecha: pub.fecha?.toDate ? pub.fecha.toDate() : pub.fecha // convierte timestamp a Date
      }));
    });
  }
}
