import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

export class Publication {
  Age_legal: boolean;
  Visibiliter: boolean;
  id: number;
  id_compte_auteur: number;
  avatar_img: string;
  nom_profile: string;
  titre_publication: string;
  commentaire_auteur: string;
  lk:boolean;
  Video: string;
  Image: string;
  Image1: string;
  Image2: string;
  Image3: string;
  Text: string;
  lien: string;
  tab_contenu = [];
  etiquete_photo: boolean;
  etiquete_text: boolean;
  etiquete_video: boolean;
  SiAfficher: boolean = false;


  constructor(Age_legal:boolean,Visibiliter:boolean,id_compte_auteur:number,Video: string, Image: string,Image1: string, Image2 : string, Image3 : string, Text: string, lien: string, avatar_img: string,nom_profile: string, titre_publication: string,commentaire_auteur: string,lk:boolean, etiquete_photo: boolean, etiquete_text: boolean, etiquete_video: boolean ) {

    this.Age_legal = Age_legal;
    this.Visibiliter = Visibiliter;
   
    this.id_compte_auteur = id_compte_auteur;

    this.Video = Video;
    this.Image = Image;
    this.Image1 = Image1;
    this.Image2 = Image2;
    this.Image3 = Image3;
    this.Text = Text;
    this.lien = lien;

    this.avatar_img = avatar_img;
    this.nom_profile = nom_profile;
    this.titre_publication = titre_publication;
    this.commentaire_auteur = commentaire_auteur;
    this.lk = lk;

    if(Image != ' ')
    {
      this.tab_contenu.push(Image);
    }
    if(Image1 !='')
    {
      this.tab_contenu.push(Image1);
    }
    if(Image2 !='')
    {
      this.tab_contenu.push(Image2);
    }
    if(Image3 !='')
    {
      this.tab_contenu.push(Image3);
    }

    this.etiquete_photo = etiquete_photo;
    this.etiquete_text = etiquete_text;
    this.etiquete_video = etiquete_video;
   
  }

}









