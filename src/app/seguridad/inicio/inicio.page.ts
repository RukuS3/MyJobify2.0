import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone:false

})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  publicaciones = [
    {
      titulo: 'Necesito lavar el auto de V1cio',
      rating: 4.7,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/960px-Bugatti_Chiron_1.jpg'
    },
    {
      titulo: 'Busco personal de aseo',
      rating: 4.9,
      imagen: 'https://media.istockphoto.com/id/109720424/es/foto/mujer-usando-ropa-nacional-peruano-el-sagrado-valley-cuz.jpg?s=612x612&w=0&k=20&c=GzKdhaYprOSjE5pBqL-Z8_g8pd48zvze2_s_Q1G1wYU='
    },
    {
      titulo: 'Necesito arreglar un mueble',
      rating: 4.3,
      imagen: 'https://media.istockphoto.com/id/1840587346/es/vídeo/muebles-de-madera-rotos-dejados-en-la-calle.jpg?s=640x640&k=20&c=UIellDtCclMTAOKYKda3cuUcp81wZxGr5JbFgUk_wLk='
    }
  ];

}
