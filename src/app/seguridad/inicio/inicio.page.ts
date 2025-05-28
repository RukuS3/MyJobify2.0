import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone:false

})
export class InicioPage implements OnInit {

  publicaciones: any[] = [];
  filtroTexto: string = '';
  limite: number = 5;

  

  constructor(
    private afs: AngularFirestore, 
    private router: Router) 
    {}

  // Esta función lo que hace es que lleva al detalle de la publicación desde el home
  verDetalle(id: string) {
  this.router.navigate(['/trabajos/detalle-publicacion', id]);
  }

  ngOnInit() {
  this.afs.collection('Publicacion', ref => ref.orderBy('fecha', 'desc'))
    .snapshotChanges()
    .subscribe(data => {
      this.publicaciones = data.map(doc => {
        const pub = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;
        return {
          id, // aquí va el ID que necesitas
          ...pub,
          fecha: pub['fecha']?.toDate ? pub['fecha'].toDate() : pub['fecha']
        };
      });


    });
}

  // Permite filtrar por titulo o comuna
  get publicacionesFiltradas() {
    return this.publicaciones.filter(item =>
      item.titulo.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
      item.comuna.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
  }

  // Permite tener un scroll infinito en el home
  cargarMas(event: any) {
    setTimeout(() => {
      this.limite += 5;
      event.target.complete();

      if (this.limite >= this.publicaciones.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
