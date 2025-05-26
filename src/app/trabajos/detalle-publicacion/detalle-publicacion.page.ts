import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage {
  publicacion = {
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/960px-Bugatti_Chiron_1.jpg',
    titulo: 'Lavar auto de vicio',
    ubicacion: 'Bosque city',
    descripcion: 'lavame el fockin auto.',
    rating: 4.5
  };

  constructor() {}
}
