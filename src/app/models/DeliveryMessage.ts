import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class DeliveryMessage {

  isDelivery : boolean;

  idMessage : number;




  constructor(idD : boolean, idMessage : number ) {
    
    this.isDelivery = idD;

    this.idMessage = idMessage;
 
  }

}