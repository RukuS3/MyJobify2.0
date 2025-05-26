import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.page.html',
  styleUrls: ['./edit-publicacion.page.scss'],
})
export class EditPublicacionPage implements OnInit {
  publicacionForm: FormGroup;
  id: string = '';
  fotoPublicacion: string = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // Imagen por defecto
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      montoPaga: ['', Validators.required],
      comuna: ['', Validators.required],
      agregarfoto: [''],
      fecha: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.afs.collection('Publicacion').doc(this.id).valueChanges().subscribe((data: any) => {
      if (data) {
        this.fotoPublicacion = data.agregarfoto || this.fotoPublicacion;
        this.publicacionForm.patchValue(data);
      }
    });
  }

  async actualizarPublicacion() {
    const data = this.publicacionForm.value;
    data.agregarfoto = this.fotoPublicacion;

    try {
      await this.afs.collection('Publicacion').doc(this.id).update(data);
      const toast = await this.toastCtrl.create({
        message: 'Publicación actualizada con éxito',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/crear-publicacion']); // Puedes cambiar la ruta si deseas volver a otra vista
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al actualizar la publicación',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      console.error(error);
    }
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  seleccionarImagenDesdeInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPublicacion = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['/crear-publicacion']); // O cualquier ruta que corresponda
  }
}
