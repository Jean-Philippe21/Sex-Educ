import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Message_a_envoiyer {

  Contenu: string;
  id_compte_auteur: number;
  id_compte_sortant: number;
  dateEmittion : string;
  id_publication : number;

  

  constructor(id_auteur: number,id_sortant: number, Text: string, dateEmittion: string ) {
    
    this.Contenu = Text;
  
    this.id_compte_auteur = id_auteur;

    this.dateEmittion = dateEmittion;

    this.id_compte_sortant = id_sortant;
    
 
  }

}