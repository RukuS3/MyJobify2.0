import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


// ========firebase===========
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}