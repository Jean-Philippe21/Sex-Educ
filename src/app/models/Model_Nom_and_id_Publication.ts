import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Model_Nom_and_id_Publication {


  NomPublication : string; //c'est le nom de la publication dont les commentaires apparaissent 

  id_publication : number;

  id_compte_auteur_publication : number;


  constructor(NomP : string, id_publication : number, id_compte_auteur_publication : number ) {
    
    this.NomPublication = NomP;

    this.id_publication = id_publication;

    this.id_compte_auteur_publication = id_compte_auteur_publication;
 
  }

}