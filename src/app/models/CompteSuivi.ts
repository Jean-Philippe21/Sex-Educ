import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Compte } from '../models/Compte';
import { Model_Nom_and_id_Publication } from '../models/Model_Nom_and_id_Publication';

export class CompteSuivi {

  compte : Compte;

  SiNouveauMessage : boolean = false;

  NomPublication : string; //c'est le nom de la publication dont les commentaires apparaissent 

  id_publication : number;

  info_publication : Model_Nom_and_id_Publication;

  Flag_si_message : boolean = false;//Il sera a 'false' pour les publications et 'true' pour les message normaux


  constructor(cpt : Compte, SiNew : boolean,info_publication : Model_Nom_and_id_Publication, Flag_si_message : boolean) {
    
    this.compte = cpt;

    this.SiNouveauMessage = SiNew;

    this.info_publication = info_publication;
    this.Flag_si_message = Flag_si_message;
 
  }

}