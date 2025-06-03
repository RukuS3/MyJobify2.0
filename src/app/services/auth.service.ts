
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
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((cred) => {
        localStorage.setItem('user', JSON.stringify(cred.user));
        return cred;
      });
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
        fotoUrl: '', 
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
    localStorage.removeItem('user');
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

  isLoggedIn(): boolean {
    return !!this.afAuth['auth'].currentUser;
  }

}
