import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  solicitudesPendientesCount = 0;
  usuarioUid: string | null = null;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  async ngOnInit() {
    const user = await this.auth.currentUser;
    this.usuarioUid = user?.uid ?? null;

    if (this.usuarioUid) {
      this.afs.collection('Solicitudes').doc(this.usuarioUid)
        .collection('solicitudesRecibidas', ref => ref.where('estado', '==', 'pendiente'))
        .valueChanges()
        .subscribe(data => {
          this.solicitudesPendientesCount = data.length;
        });
    }
  }
}