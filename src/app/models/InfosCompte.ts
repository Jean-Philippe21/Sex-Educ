import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class InfosCompte {

 
  majeurOupas : boolean; 
  voirOupasPublicationMajeur : boolean;
  accordConditionUtilisation : boolean;
  visibiliter : boolean;


  constructor(majeurOupas : boolean, voirOupasPublicationMajeur : boolean, accordConditionUtilisation : boolean,visibiliter : boolean ) {
    
    this.majeurOupas = majeurOupas;
  
    this.voirOupasPublicationMajeur = voirOupasPublicationMajeur;

    this.accordConditionUtilisation = accordConditionUtilisation;

    this.visibiliter = visibiliter;
    
 
  }

}