import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private router: Router,
    private afAuth: AngularFireAuth
  ){
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      montoPaga: ['', [Validators.required, Validators.min(0)]],
      comuna: ['', Validators.required], // ✅ este debe coincidir con el ion-select
      categoria: ['', Validators.required], // ✅ solo uno
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/crear-publicacion']);
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  seleccionarImagenDesdeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imagenFile = file;
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

    const user = await this.afAuth.currentUser;
    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }

    const form = this.publicacionForm.value;
    const nuevaPublicacion = {
      agregarfoto: urlImagen,
      titulo: form.titulo,
      descripcion: form.descripcion,
      montoPaga: Number(form.montoPaga),
      comuna: form.comuna,
      categoria: form.categoria,
      fecha: new Date(),
      usuarioId: user.uid
    };

    try {
      console.log("Usuario antes de guardar:", user);
      await this.firebaseService.crearPublicacion(nuevaPublicacion);
      const userAfter = await this.afAuth.currentUser;
      console.log("Usuario después de guardar:", userAfter);

      if (userAfter) {
        this.router.navigate(['/crear-publicacion']);
      } else {
        console.warn("El usuario se desconectó después de crear la publicación.");
      }
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
    }
  }
}
