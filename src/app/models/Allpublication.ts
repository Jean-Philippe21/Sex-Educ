import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Allpublication {

  id : number;

  StatusLegal : number;




  constructor(id : number, St : number ) {
    
    this.id = id;

    this.StatusLegal = St;
 
  }

}