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
  filtroTexto: string = '';
  limite: number = 5;

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

  get publicacionesFiltradas() {
    return this.publicaciones.filter(item =>
      item.titulo.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
      item.comuna.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
  }

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
