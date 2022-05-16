import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Message {

  Text: string;
  id_compte_auteur_du_message: number;
  dateEmittion : string;
  lu : boolean = true;
  id_message : number;


  constructor(Text: string, id_auteur: number, dateEmittion: string ) {
    
    this.Text = Text;
  
    this.id_compte_auteur_du_message = id_auteur;

    this.dateEmittion = dateEmittion;
    
 
  }

}