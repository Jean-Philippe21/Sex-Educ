import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Model_id_sotant_id_publication {

  id_publication: number;
  id_compte_sortant: number;
  
  

  constructor(id_sortant: number, id_publication: number ) {
    
    this.id_publication = id_publication;

    this.id_compte_sortant = id_sortant;
    
 
  }

}