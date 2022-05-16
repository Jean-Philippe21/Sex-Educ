import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComptePage } from '../compte/compte.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  private compteur_1 : number = 0;

  private compteur_2 : number = 0;

  private monCompteur : number =0;

  constructor(public navCtrl: NavController,public compteService : CompteService,public actionSheetController: ActionSheetController,public alertController: AlertController,public popoverController: PopoverController, private router : Router) {
    
    this.compteur_1 = 0;
    this.compteur_2 = 0;

  }

  private Nom_User : string;

  private Sexe_User : string;

  private RouteVersPageSuivant : string;

 
  updateCompteur(){
    this.compteur_1 =0;
    this.compteur_2 =0;
    console.log('Nom user :',this.Nom_User.length);
  }


  async onGoToCompte(){
  	 //console.log("Voici le nom utilisateur et le sexe mis à jour:",this.Nom_User,this.Sexe_User);
  	 if((this.Nom_User==undefined || this.Nom_User.length==0) || (this.Sexe_User==undefined) ){

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: '<strong>Merci d\'entrez un nom utilisateur ou pseudo et votre orientation sexuel pour pouvoir poursuivre votre inscription.</strong>',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        await alert.present();


    }
      if((this.Nom_User!=undefined && this.Nom_User.length!=0) && (this.Sexe_User!=undefined)){

            this.RouteVersPageSuivant = '/inscription-page/'+this.Nom_User+'/'+this.Sexe_User;

            this.router.navigateByUrl(this.RouteVersPageSuivant);

      }

      

  	 //return { Nom : this.Nom_User, Sexe : this.Sexe_User};


  }

  async  aSupprimer(){

    console.log('nnnnnnonononon 0');

    this.monCompteur = this.monCompteur +1;

    if( (this.compteur_1==0) && (this.compteur_2==0) && (this.Nom_User==undefined || this.Nom_User.length==0) && (this.Sexe_User==undefined) ){

        console.log('nnnnnnonononon 1');

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: '<strong>Merci d\'entrez votre nom utilisateur ou pseudo et votre orientation sexuel (celle que vous avez donné à votre inscription).</strong>',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        await alert.present();

        this.compteur_1 = 2;

        this.compteur_2 = 2;

    }

    if( (this.Nom_User == undefined || this.Nom_User.length==0) && (this.compteur_1!=2) ){

        console.log('nnnnnnonononon 2');

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: '<strong>Entrez votre nom ou pseudo utilisateur. Merci de réessayer</strong>!',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        await alert.present();

        this.compteur_1 = 1;

    }

    if( (this.Sexe_User == undefined) && (this.compteur_2!=2) ){

        console.log('nnnnnnonononon 3');

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Merci d\'entrez votre orientation sexuel ou celle que vous avez donné à votre inscription.</strong>!',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        await alert.present();

        this.compteur_2 = 1;
    }

      this.compteService.firstUsing = true;

      if((this.Nom_User!=undefined && this.Nom_User.length!=0) && (this.Sexe_User!=undefined)){

            //this.RouteVersPageSuivant = '/compte';
            this.RouteVersPageSuivant = '/verification-infos-connexion'+'/'+this.Nom_User+'/'+this.Sexe_User;

            console.log('Voici la route :',this.RouteVersPageSuivant);

            this.router.navigateByUrl(this.RouteVersPageSuivant);

      }

      if(this.monCompteur >= 1){

        this.compteur_1 = 0;

        this.compteur_2 = 0;

      }


  }

}
