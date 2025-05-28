import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-publicacion',
  templateUrl: './save-publicacion.page.html',
  styleUrls: ['./save-publicacion.page.scss'],
  standalone:false
})
export class SavePublicacionPage implements OnInit {

  publicaciones: any[] = [];
  limite: number = 5;

  constructor() { }

  ngOnInit() {
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
