import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  telefono: string = '+56 987654321';
  correo: string = 'correo@ejemplo.com';
  direccion: string = 'Av. Siempre Viva 742';

  modoEdicion: boolean = false;

  editandoTelefono: boolean = false;
  editandoCorreo: boolean = false;
  editandoDireccion: boolean = false;

  valoracion: number = 3.5; 



  // Imagen de perfil por defecto
  fotoPerfil: string = 'https://placehold.co/150x150';

  constructor() {}

  ngOnInit() {}

  async cambiarFotoPerfil() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos // Abre la galería
      });

      this.fotoPerfil = image.dataUrl;
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  }

guardarCambios() {
  console.log('Teléfono:', this.telefono);
  console.log('Correo:', this.correo);
  console.log('Dirección:', this.direccion);


  this.editandoTelefono = false;
  this.editandoCorreo = false;
  this.editandoDireccion = false;
}
}