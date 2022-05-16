import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CompteService } from '../compte.service';
import { DatabaseService } from '../database.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verification-infos-connexion',
  templateUrl: './verification-infos-connexion.page.html',
  styleUrls: ['./verification-infos-connexion.page.scss'],
})
export class VerificationInfosConnexionPage implements OnInit {

  private Nom_User : string;

  private Sexe_User : string;

  private Mot_de_passe : string;

  constructor(public navCtrl: NavController,
   public compteService : CompteService, public ds: DatabaseService, 
   public actionSheetController: ActionSheetController,
   public alertController: AlertController,public popoverController: PopoverController,
   public loadingController: LoadingController,private router : Router, private activatedRouter: ActivatedRoute) { 

    this.Nom_User = this.activatedRouter.snapshot.paramMap.get("Nom_User");

    this.Sexe_User = this.activatedRouter.snapshot.paramMap.get("Sexe_User");

  }

  ngOnInit() {
  }




  async VerifInfosConnexion(){

    if(this.Mot_de_passe!=undefined && this.Mot_de_passe.length!=0){

      //*****************Je fais signe a l'utilisateur d'attendre ..........

      const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios'
      //duration: 2000
      });
      await loading.present();  

    //********************************************************************

      this.compteService.VerifSiBonCompteDeConnexion(this.Nom_User,this.Sexe_User,this.Mot_de_passe);

        setTimeout( async () =>{

                      if(this.compteService.retourAvantDemande){

                            await this.compteService.VerifiInfosConnexion(this.Nom_User,this.Sexe_User,this.Mot_de_passe);
                      

                            setTimeout( async () =>{
                            
                              if(this.compteService.autorisationPourConnexion){

                                await loading.dismiss();

                                const RouteVersPageSuivant = '/compte';
                                
                                 console.log('888888888888 id_compte =  :',this.compteService.recupIdCompte());
                                
                                this.router.navigateByUrl(RouteVersPageSuivant);



                                this.compteService.sauvegardePremiereConnexionOuPas(false);
                              
                              }else{

                                  await loading.dismiss();

                                  const alert = await this.alertController.create({
                                      
                                      cssClass: 'my-custom-class',
                                      header: 'Erreur',
                                      mode:'ios',
                                      message: '<strong>Les information que vous avez entrez ne correspondent à aucun compte.Merci de réessayer</strong>!',
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
                            
                            },5000);

                      }else{

                            await loading.dismiss();

                            const alert = await this.alertController.create({
                                
                                cssClass: 'my-custom-class',
                                header: 'Erreur',
                                mode:'ios',
                                message: '<strong> Le compte auquel vous voulez vous connecté n\'est pas celui qui est créer sur cette application.</strong>!',
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
                      
                      
            
                      
      }, 5000);


    }else{

        const alert = await this.alertController.create({
                                
                                cssClass: 'my-custom-class',
                                header: 'Erreur',
                                mode:'ios',
                                message: '<strong> Merci de renseigner le mot de passe </strong>!',
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



  }

}
