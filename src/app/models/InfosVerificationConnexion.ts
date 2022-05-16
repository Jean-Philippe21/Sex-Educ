import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class InfosVerificationConnexion {

  Nom_User: string;
  Sexe_User : string;
  Mot_de_passe : string;
  id_compte : number;


  constructor(N_U: string, S_U: string, M_D_P: string, id_C : number ) {
    
    this.Nom_User = N_U;
  
    this.Sexe_User = S_U;

    this.Mot_de_passe = M_D_P;

    this.id_compte = id_C;
    
 
  }

}