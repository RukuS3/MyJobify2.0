import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})

export class DetallePublicacionPage implements OnInit {
  publicacion: any;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.afs.collection('Publicacion').doc(id).valueChanges().subscribe(pub => {
        this.publicacion = pub;
      });
    }
  }

  solicitudEnviada: boolean = true; // Cambia a true si ya envió solicitud

  
}