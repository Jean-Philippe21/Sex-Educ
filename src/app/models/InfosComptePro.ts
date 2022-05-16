import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class InfosComptePro {

  Adresse_postal :string;
  Theme_compte : string;
  Prenom : string;
  mail : string;


  constructor(Adresse_postal :string,Theme_compte : string,Prenom : string,mail : string ) {
    
    this.Adresse_postal = Adresse_postal;
  
    this.Theme_compte = Theme_compte;

    this.Prenom = Prenom;

    this.mail = mail;
    
 
  }

}