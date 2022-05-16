import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

export class Discussion {

  id_compte_avec_qui_je_discute: number;
  
  contenu_discussion : Message[] = [];

  SiNouveauMessage : boolean = false;

  id_publication_sur_laquelle_porte_la_discussion : number;




  constructor(id_compte_avec_qui_je_discute: number, tab : Message[],id_publication ) {
    
    this.id_compte_avec_qui_je_discute = id_compte_avec_qui_je_discute;

    this.contenu_discussion.concat(tab);

    if(id_publication != undefined){
      this.id_publication_sur_laquelle_porte_la_discussion = id_publication
    }
 
  }


}