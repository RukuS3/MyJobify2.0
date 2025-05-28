import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
  rut: ['', Validators.required],
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  telefono: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  });
  }

  ngOnInit() {}

  onRegister() {
  const { email, password, rut, nombre, apellido, telefono } = this.registerForm.value;
  this.authService.register(email, password, rut, nombre, apellido, telefono)
    .then(() => {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/auth']);
    })
    .catch(err => {
      alert('Error al registrarse: ' + err.message);
    });
}

}
