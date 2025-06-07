import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ver-perfil-detalle',
  templateUrl: './ver-perfil-detalle.page.html',
  styleUrls: ['./ver-perfil-detalle.page.scss'],
})
export class VerPerfilDetallePage implements OnInit {

  perfil: any = null;
  puedeVerDatosPrivados = false;

  mostrarIsla: boolean = false;
  calificacion: number = 0;
  comentario: string = '';

  // Denuncia
  mostrarPanelDenuncia: boolean = false;
  motivoDenuncia: string = '';
  detalleDenuncia: string = '';
  archivo: File | null = null;
  archivoUrl: string | null = null;

  usuarioDenunciadoUid: string = '';
  usuarioDenuncianteUid: string = '';

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const uid = params['uid'];
      if (uid) {
        this.usuarioDenunciadoUid = uid;
        this.cargarPerfil(uid);
      }
    });

    this.auth.authState.subscribe(user => {
      this.puedeVerDatosPrivados = !!user;
      if (user) this.usuarioDenuncianteUid = user.uid;
    });
  }

  cargarPerfil(uid: string) {
    this.afs.collection('usuarios').doc(uid).valueChanges().subscribe(data => {
      this.perfil = data;
    }, error => {
      console.error('Error al cargar perfil:', error);
    });
  }

  denunciarUsuario() {
    this.mostrarPanelDenuncia = true;
  }

  onFileSelected(event: any) {
    this.archivo = event.target.files[0] || null;
  }

  async enviarDenuncia() {
    if (!this.usuarioDenuncianteUid) {
      alert('Debes iniciar sesión para denunciar.');
      return;
    }

    if (!this.motivoDenuncia || !this.detalleDenuncia) {
      alert('Completa todos los campos.');
      return;
    }

    const denunciaBase: any = {
      motivo: this.motivoDenuncia,
      descripcion: this.detalleDenuncia,
      fecha: new Date().toISOString(),
      denuncianteUid: this.usuarioDenuncianteUid,
      denunciadoUid: this.usuarioDenunciadoUid,
      pruebaUrl: null
    };

    try {
      if (this.archivo) {
        if (!this.archivo.type.startsWith('image/') && !this.archivo.type.includes('pdf')) {
          alert('Solo se permiten imágenes o PDFs.');
          return;
        }

        const path = `denuncias_pruebas/${Date.now()}_${this.archivo.name}`;
        const fileRef = this.storage.ref(path);

        const task = this.storage.upload(path, this.archivo);

        task.snapshotChanges().pipe(
          finalize(async () => {
            try {
              const url = await fileRef.getDownloadURL().toPromise();
              denunciaBase.pruebaUrl = url;
              await this.afs.collection('denunciasUsuarios').add(denunciaBase);
              this.resetFormulario();
            } catch (error) {
              console.error('Error al obtener URL de descarga:', error);
              alert('Error al subir el archivo.');
            }
          })
        ).subscribe({
          error: (uploadError) => {
            console.error('Error al subir archivo:', uploadError);
            alert('No se pudo subir el archivo de prueba.');
          }
        });

      } else {
        await this.afs.collection('denunciasUsuarios').add(denunciaBase);
        this.resetFormulario();
      }
    } catch (error) {
      console.error('Error al enviar la denuncia:', error);
      alert('Error al enviar la denuncia.');
    }
  }

  async resetFormulario() {
    this.mostrarPanelDenuncia = false;
    this.motivoDenuncia = '';
    this.detalleDenuncia = '';
    this.archivo = null;
    this.archivoUrl = null;

    const alerta = document.createElement('ion-alert');
    alerta.header = 'Denuncia enviada';
    alerta.message = 'Tu denuncia fue enviada y será revisada más tarde.';
    alerta.buttons = ['OK'];
    document.body.appendChild(alerta);
    await alerta.present();
  }

  enviarCalificacion() {
    console.log('Calificación:', this.calificacion);
    console.log('Comentario:', this.comentario);
  }

  eliminarPublicacion() {
    console.log('Eliminar publicación');
  }
}
