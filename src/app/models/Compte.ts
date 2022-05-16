import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Compte {
  Nom: string;
  Sexe: string;
  Age: number;
  Nom_User: string;
  Type_Compte:number;
  Photo_Profile : string;
  Nombres_abonnee : number;
  Visibilite : boolean;
  Admin_Visibilite : boolean;
  Identification_Compte : number;
  Mot_de_passe : string;
  Langue : string;
  Pays : string;
  Tel: number;
  Prenom: string;
  Mail: string;
  Adresse_postal: string;
  Theme_compte: string;
  

  constructor(Nom: string,Sexe: string, Age: number,Nom_User: string,Type_Compte: number, Visibilite: boolean, AV: boolean,Identification_Compte : number, Mot_de_passe: string, Langue: string, Pays: string,Tel: number,Prenom: string,Mail: string,Adresse_postal: string,Theme_compte: string ) {
    this.Nom = Nom;
    this.Sexe = Sexe;
    this.Age = Age;
    this.Nom_User = Nom_User;
    this.Type_Compte = Type_Compte;
 	
    this.Identification_Compte = Identification_Compte;


    this.Mot_de_passe = Mot_de_passe;
    this.Langue = Langue;
    this.Pays = Pays;
    this.Tel = Tel;
    this.Prenom = Prenom;
    this.Mail = Mail;
    this.Adresse_postal = Adresse_postal;
    this.Theme_compte = Theme_compte;
  }

}