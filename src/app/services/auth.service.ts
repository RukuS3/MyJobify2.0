
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, rut: string, nombre: string, apellido: string, telefono: string) {
  return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const uid = cred.user?.uid;
      return this.firestore.collection('usuarios').doc(uid).set({
        uid: uid,
        email: email,
        rut: rut,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        fotoUrl: '', // opcional, inicial vacío
        fechaCreacion: new Date()
      });
    })
    .catch(err => {
      console.error('Error al registrar en Firestore:', err);
      throw err;
    });
}


  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.afAuth.signOut();
  }
  getUsuarioActual() {
    return this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            const uid = user.uid;
            return this.firestore.collection('usuarios').doc(uid).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

}
