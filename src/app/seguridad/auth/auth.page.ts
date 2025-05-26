import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})
export class AuthPage implements OnInit {

  rut: string = '';       // Campo para el RUT del usuario
  password: string = '';  // Campo para la contraseña del usuario

  constructor(private router: Router) { }

  ngOnInit() {
    // Inicialización si es necesario
  }

  login() {
    if (this.rut && this.password) {
      console.log('Iniciando sesión con:', this.rut, this.password);

      // Navegar correctamente a la página de inicio
      this.router.navigateByUrl('/inicio');
    } else {
      console.error('Por favor ingrese su RUT y su contraseña.');
    }
  }

  // Redirigir a recuperación de contraseña
  forgotPassword() {
    console.log('Redirigiendo a la página de recuperación de contraseña...');
  
  }

  // Redirigir a registro
  goToRegister() {
    console.log('Redirigiendo a la página de registro...');
    this.router.navigate(['/registro']);
  }
}
