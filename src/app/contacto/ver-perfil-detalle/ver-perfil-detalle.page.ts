import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-ver-perfil-detalle',
  templateUrl: './ver-perfil-detalle.page.html',
  styleUrls: ['./ver-perfil-detalle.page.scss'],
})
export class VerPerfilDetallePage implements OnInit {

  perfil: any = null;
  puedeVerDatosPrivados = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const uid = params['uid'];
      if (uid) {
        this.cargarPerfil(uid);
      }
    });

    this.auth.authState.subscribe(user => {
      this.puedeVerDatosPrivados = !!user; // Si está autenticado, puede ver datos privados
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
    // Aquí podrías redirigir a un formulario o abrir un alert
    console.log('Denuncia enviada (simulada)');
  }

  marcarTareaCompletada() {
    // Lógica para marcar la tarea como completada
    console.log('Tarea marcada como completada');
  }
}
