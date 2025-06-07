import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denuncia-detalle',
  templateUrl: './denuncia-detalle.page.html',
  styleUrls: ['./denuncia-detalle.page.scss'],
})
export class DenunciaDetallePage implements OnInit {
  denuncia: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firebaseService.obtenerDenunciaPorId(id).subscribe(async data => {
        if (data) {
          const fecha = data['fecha']?.toDate ? data['fecha'].toDate() : data['fecha'];
          const denunciadoUid = data['denunciadoUid'];
          
          // Obtener nombre completo del denunciado
          const denunciadoNombre = await this.firebaseService.obtenerNombreUsuario(denunciadoUid);
          
          this.denuncia = {
            id,
            ...data,
            fecha,
            denunciadoNombre: denunciadoNombre || 'Usuario desconocido'
          };
        }
      });
    }
  }


  aprobarDenuncia() {
    if (!this.denuncia) return;

    // 1. Actualizar la denuncia en la base, por ejemplo marcándola como aprobada
    this.firebaseService.actualizarDenuncia(this.denuncia.id, { estado: 'aprobada' })
      .then(() => {
        // 2. Eliminar la denuncia para que desaparezca de la lista
        return this.firebaseService.eliminarDenuncia(this.denuncia.id);
      })
      .then(() => {
        // 3. Crear notificación para el denunciante
        this.firebaseService.enviarNotificacion(
          this.denuncia.denuncianteUid,
          `Tu denuncia contra ${this.denuncia.denunciadoNombre} ha sido aprobada.`
        );

        // 4. Crear notificación para el denunciado
        this.firebaseService.enviarNotificacion(
          this.denuncia.denunciadoUid,
          `Se ha aprobado una denuncia en tu contra. Por favor revisa tu cuenta.`
        );

        // 5. Mensaje o navegación después de aprobar
        alert('Denuncia aprobada, eliminada y notificaciones enviadas.');
        this.goBack();
      })
      .catch(error => {
        console.error('Error al aprobar denuncia', error);
        alert('Error al aprobar la denuncia.');
      });
  }


  rechazarDenuncia() {
    if (!this.denuncia) return;

    // 1. Eliminar la denuncia de la base de datos
    this.firebaseService.eliminarDenuncia(this.denuncia.id)
      .then(() => {
        // 2. Crear notificación para el denunciante
        this.firebaseService.enviarNotificacion(
          this.denuncia.denuncianteUid,
          `Tu denuncia contra ${this.denuncia.denunciadoNombre} fue rechazada.`
        );

        alert('Denuncia rechazada y notificación enviada.');
        this.goBack();
      })
      .catch(error => {
        console.error('Error al rechazar denuncia', error);
        alert('Error al rechazar la denuncia.');
      });
  }


  goBack() {
    this.router.navigate(['admin/panel']);
  }
}
