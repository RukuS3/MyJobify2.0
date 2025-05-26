import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone:false

})
export class InicioPage implements OnInit {

  publicaciones: any[] = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    // Trae todas las publicaciones ordenadas por fecha descendente
    this.afs.collection('Publicacion', ref => ref.orderBy('fecha', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.publicaciones = data.map((item: any) => ({
          ...item,
          fecha: item.fecha?.toDate ? item.fecha.toDate() : item.fecha
        }));
      });
  }

}
