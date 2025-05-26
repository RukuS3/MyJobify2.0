import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',  
    pathMatch: 'full',
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./seguridad/auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./seguridad/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./seguridad/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'detalle-publicacion',
    loadChildren: () => import('./trabajos/detalle-publicacion/detalle-publicacion.module').then( m => m.DetallePublicacionPageModule)
  },
  {
    path: 'chat-preview',
    loadChildren: () => import('./contacto/chat-preview/chat-preview.module').then( m => m.ChatPreviewPageModule)
  },
  {
    path: 'chat-open',
    loadChildren: () => import('./contacto/chat-open/chat-open.module').then( m => m.ChatOpenPageModule)
  },
  {
    path: 'miperfil',
    loadChildren: () => import('./seguridad/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
  },  {
    path: 'informacion',
    loadChildren: () => import('./seguridad/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'crear-publicacion',
    loadChildren: () => import('./seguridad/crear-publicacion/crear-publicacion.module').then( m => m.CrearPublicacionPageModule)
  },
  {
    path: 'add-publicacion',
    loadChildren: () => import('./seguridad/add-publicacion/add-publicacion.module').then( m => m.AddPublicacionPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./contacto/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./contacto/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'privacidad-terminos',
    loadChildren: () => import('./contacto/privacidad-terminos/privacidad-terminos.module').then( m => m.PrivacidadTerminosPageModule)
  },
  {
    path: 'quienes-somos',
    loadChildren: () => import('./contacto/quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
  },
  {
    path: 'edit-publicacion',
    loadChildren: () => import('./seguridad/edit-publicacion/edit-publicacion.module').then( m => m.EditPublicacionPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}