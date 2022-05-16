import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'compte',
    loadChildren: () => import('./compte/compte.module').then( m => m.ComptePageModule)
  },
  {
    path: 'inscription-page/:Nom_User/:Sexe_User',
    loadChildren: () => import('./inscription-page/inscription-page.module').then( m => m.InscriptionPagePageModule)
  },
  {
    path: 'create-contenu',
    loadChildren: () => import('./create-contenu/create-contenu.module').then( m => m.CreateContenuPageModule)
  },
  {
    path: 'flux-video',
    loadChildren: () => import('./flux-video/flux-video.module').then( m => m.FluxVideoPageModule)
  },
  {
    path: 'messagerie/:id',
    loadChildren: () => import('./messagerie/messagerie.module').then( m => m.MessageriePageModule)
  },
  {
    path: 'parametre',
    loadChildren: () => import('./parametre/parametre.module').then( m => m.ParametrePageModule)
  },
  {
    path: 'pre-messagerie',
    loadChildren: () => import('./pre-messagerie/pre-messagerie.module').then( m => m.PreMessageriePageModule)
  },
  {
    path: 'config-compte',
    loadChildren: () => import('./config-compte/config-compte.module').then( m => m.ConfigComptePageModule)
  },
  {
    path: 'publication-discussion/:id/:id_P',
    loadChildren: () => import('./publication-discussion/publication-discussion.module').then( m => m.PublicationDiscussionPageModule)
  },
  {
    path: 'verification-infos-connexion/:Nom_User/:Sexe_User',
    loadChildren: () => import('./verification-infos-connexion/verification-infos-connexion.module').then( m => m.VerificationInfosConnexionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
