import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Contenu {
  Video: string;
  Image: string;
  Image1: string;
  Image2: string;
  Image3: string;
  Text: string;
  lien: string;
  id_contenu: number;
  id_compte_auteur: number;

  

  constructor(Video: string, Image: string,Image1: string, Image2 : string, Image3 : string, Text: string, lien: string, id_contenu: number, id_auteur: number ) {
    this.Video = Video;
    this.Image = Image;
    this.Image1 = Image1;
    this.Image2 = Image2;
    this.Image3 = Image3;
    this.Text = Text;
    this.lien = lien;
    this.id_contenu = id_contenu;
    this.id_compte_auteur = id_auteur;
    
 
  }

}