import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-publicacion',
  templateUrl: './add-publicacion.page.html',
  styleUrls: ['./add-publicacion.page.scss'],
})
export class AddPublicacionPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  publicacionForm: FormGroup;
  fotoPublicacion: string = 'https://placehold.co/200x200?text=Agregar+foto';
  imagenFile: File | null = null;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      montoPaga: ['', [Validators.required, Validators.min(0)]],
      comuna: ['', Validators.required],
    });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }
  seleccionarImagenDesdeInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPublicacion = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Aquí podrías subir la imagen a Firebase Storage si quieres.
    // Por ejemplo:
    // this.firebaseService.subirImagen(file).then(url => {
    //   this.fotoPublicacion = url;
    // });
  }
}

  async onImagenSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenFile = file;

      // Vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPublicacion = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async publicar() {
    if (this.publicacionForm.invalid) return;

    let urlImagen = this.fotoPublicacion;

    if (this.imagenFile) {
      try {
        urlImagen = await this.firebaseService.subirImagen(this.imagenFile);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        return;
      }
    }

    const form = this.publicacionForm.value;
    const nuevaPublicacion = {
      agregarfoto: urlImagen,
      titulo: form.titulo,
      descripcion: form.descripcion,
      montoPaga: Number(form.montoPaga),
      comuna: form.comuna,
      fecha: new Date(),
      usuarioId: '20'
    };

    try {
      await this.firebaseService.crearPublicacion(nuevaPublicacion);
      this.router.navigate(['/']);
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
    }
  }
}
