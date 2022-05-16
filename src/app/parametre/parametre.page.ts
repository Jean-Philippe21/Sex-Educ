import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
//import { ConfigurePage } from '../Modal/ConfigurePage';
import { ConfigComptePage } from '../config-compte/config-compte.page';
import { AlertController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  //public currentModal;
    public compte: Compte;

  constructor(public navCtrl: NavController, private activatedRouter: ActivatedRoute,private compteService: CompteService,public actionSheetController: ActionSheetController,public modalController: ModalController,public alertController: AlertController,public popoverController: PopoverController) {

      this.recupDataCompte();

   }

  ngOnInit() {
  }

  public name8 : string;
  //public compte: Compte =new Compte('Amoussou','M',28,'Qc+',1,false,false,12435782,'****','fr','France',60290926,'Patricia','patricia@gmail.com','2 place du pré','Sexe');
  public compteAdpt: Compte;
  public Nom: string= 'Nom : '+this.compte.Nom;
  public Sexe: string= 'Sexe : '+this.compte.Sexe;
  public Age: string= 'Age : '+this.compte.Age;
  public Nom_User: string= 'Pseudo : '+this.compte.Nom_User;
  public Type_Compte: string= 'Type Compte : '+this.compte.Type_Compte;
  Photo_Profile : string;
  public Nombres_abonnee : string= 'Nombre abonnee : '+this.compte.Nombres_abonnee;
  Visibilite : boolean;
  Admin_Visibilite : boolean;
  public Identification_Compte : string='Identifiant compte : '+this.compte.Identification_Compte;
  public Mot_de_passe : string=this.compte.Mot_de_passe;
  Langue : string;
  Pays : string;
  public Tel: string='Téléphone : '+this.compte.Tel;
  public Prenom: string='Prénom : '+this.compte.Prenom;
  public Mail: string='Mail : '+this.compte.Mail;
  public Adresse_postal: string='Adresse postal : '+this.compte.Adresse_postal;
  public Theme_compte: string='Theme : '+this.compte.Theme_compte;


  async handleButtonClick() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Albums',
        buttons: [
          { text: 'Delete', role: 'destructive',
            handler: () => {
              console.log('coucou jp');
            }
          },
          { text: 'compte invisible', icon: 'toggle' },
          { text: 'Play' },
          { text: 'Favorite' },
          { text: 'Cancel', role: 'cancel' }
        ],
        cssClass: 'custom-css',
        animated: false,
        backdropDismiss: false,
        keyboardClose: false
      });

      await actionSheet.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ConfigComptePage,
      cssClass: 'my-custom-class'
    });
    

    return await modal.present();

     //this.compteService.currentModal = this.modalController;
  }

  

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aide',
      //subHeader: 'Subtitle',
      message: 'Obtenir de l\'aide...',
      mode: 'ios',
      buttons: [ {text : 'https://arretonslesviolences.gouv.fr/',
      handler: () => {
            const openCapacitorSite = async () => {
                  await Browser.open({ url: 'https://arretonslesviolences.gouv.fr/' });
            };
            console.log('Jean-Philippe......');
          }
        },
        {text : 'https://www.violencejetequitte.fr/',
      handler: () => {
            const openCapacitorSite = async () => {
                  await Browser.open({ url: 'https://www.violencejetequitte.fr/' });
            };
            console.log('Jean-Philippe......');
          }
        },
      {text : '3919'}, 
      {text : 'Annuler'} 
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      mode:'ios',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
//*******************************************************************

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Changer de mot de passe',
      mode:'ios',
      inputs: [
        {
          name: 'new_password',
          type: 'password',
          placeholder: 'Confirmer le nouveau mot de passe',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 30,
            inputmode: 'decimal'
          }
        },
        {
          name: 'new_password_bis',
          type: 'password',
          placeholder: 'Confirmer le nouveau mot de passe',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 30,
            inputmode: 'decimal'
          }
        }, 
        {
          name: 'last_password',
          type: 'password',
          placeholder: 'Ancien Mot de passe',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 30,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel et la donné :) ');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data.last_password);
            if(data.last_password===this.Mot_de_passe){

              if(data.new_password===data.new_password_bis){
                console.log('Okay toutes est okay');
                this.retour_user(0);
              }else{
                this.retour_user(2);
              }

            }else{
              this.retour_user(1);
            }
          }
        }
      ]
    });

    await alert.present();
  }
//------------------ Fonction pour faire un retour a l'utilisateur apres update du mot_de_passe

  retour_user(indicateur : number){
    if(indicateur==0){
      this.presentAlertConfirm_For_Fonction_retour_utilisateur(0);
    }
    if(indicateur==1){
      this.presentAlertConfirm_For_Fonction_retour_utilisateur(1);
    }
    if(indicateur==2){
      this.presentAlertConfirm_For_Fonction_retour_utilisateur(2);
    }
  }

//---------------------------------------Fin de la fonction --------------------------------

//********************************************************************************

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      mode:'ios',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3',
          handler: () => {
            console.log('Radio 3 selected');
          }
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4',
          handler: () => {
            console.log('Radio 4 selected');
          }
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5',
          handler: () => {
            console.log('Radio 5 selected');
          }
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6',
          handler: () => {
            console.log('Radio 6 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

//**********************************************************************

  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Checkbox',
      mode:'ios',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          handler: () => {
            console.log('Checkbox 1 selected');
          },
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2',
          handler: () => {
            console.log('Checkbox 2 selected');
          }
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3',
          handler: () => {
            console.log('Checkbox 3 selected');
          }
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4',
          handler: () => {
            console.log('Checkbox 4 selected');
          }
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5',
          handler: () => {
            console.log('Checkbox 5 selected');
          }
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6',
          handler: () => {
            console.log('Checkbox 6 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

//*********************************************************************************

  async presentAlertPrompte() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mon Compte',
      mode:'ios',
      inputs: [
        {
          name: 'Nom_U',
          type: 'text',
          value: this.Nom_User,
          placeholder: 'Nom Utilisateur'
        },
        {
          name: 'Nom',
          type: 'text',
          id: 'name2-id',
          value: this.Nom,
          placeholder: 'Mon Nom'
        },
        // multiline input.
        {
          name: 'sexe',
          id: 'paragraph',
          type: 'text',
          value: this.Sexe,
          placeholder: 'Sexe'
        },
        {
          name: 'age',
          id: 'paragraph',
          type: 'text',
          value: this.Age,
          placeholder: 'Age'
        },
        {
          name: 'type_C',
          id: 'paragraph',
          type: 'text',
          value: this.Type_Compte,
          placeholder: 'Type de compte'
        },
        {
          name: 'Id_C',
          id: 'paragraph',
          type: 'text',
          value: this.Identification_Compte,
          placeholder: 'Identification compte'
        },
        {
          name: 'prenom',
          id: 'paragraph',
          type: 'text',
          value: this.Prenom,
          placeholder: 'Mon prenom'
        },
        {
          name: 'theme_C',
          id: 'paragraph',
          type: 'text',
          value: this.Theme_compte,
          placeholder: 'Theme du compte'
        },
        {
          name: 'tel',
          id: 'paragraph',
          type: 'text',
          value: this.Tel,
          placeholder: 'Mon numero'
        },
        {
          name: 'mail',
          id: 'paragraph',
          type: 'text',
          value: this.Mail,
          placeholder: 'Mon mail'
        },
        {
          name: 'addr',
          id: 'paragraph',
          type: 'text',
          value: this.Adresse_postal,
          placeholder: 'Adresse Postal'
        }
               
      ],
      buttons: [
        {
          text: 'Quitter',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok et mon age : ',data.age);
            if(this.Age!=data.age){
              console.log('l\'age a changé !!!!');
              this.presentAlertConfirm_For_Fonction_prompte(1);
            }
            if(this.Nom_User!=data.Nom_U){
              this.presentAlertConfirm_For_Fonction_prompte(2);

            }
            if(this.Nom!=data.Nom){
              this.presentAlertConfirm_For_Fonction_prompte(3);

            }
            if(this.Sexe!=data.sexe){
              this.presentAlertConfirm_For_Fonction_prompte(4);

            }
            if(this.Type_Compte!=data.type_C){
              this.presentAlertConfirm_For_Fonction_prompte(5);

            }
            if(this.Identification_Compte!=data.Id_C){
              this.presentAlertConfirm_For_Fonction_prompte(6);

            }
            if(this.Prenom!=data.prenom){
              this.presentAlertConfirm_For_Fonction_prompte(7);
            }
            if(this.Theme_compte!=data.theme_C){
              this.presentAlertConfirm_For_Fonction_prompte(8);

            }
            if(this.Tel!=data.tel){
              this.presentAlertConfirm_For_Fonction_prompte(9);

            }
            if(this.Mail!=data.mail){
              this.presentAlertConfirm_For_Fonction_prompte(10);

            }
            if(this.Adresse_postal!=data.addr){
              this.presentAlertConfirm_For_Fonction_prompte(11);

            }

          }
        }
      ]
    });

    await alert.present();
  }



//*********************************************************************************
  async presentAlertConfirm_For_Fonction_retour_utilisateur(indicateur : number) {

    if(indicateur==0){

              const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre mot de passe </strong>?',
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de mot de passe');
                  }
                }, {
                  text: 'Oui',
                  handler: () => {
                    console.log('Changement du mot de passe');
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==1){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>l\'ancien mot de passe renseigné n\'est pas correct. Merci de réessayer</strong>!',
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

    if(indicateur==2){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>l\'ancien mot de passe renseigné est correct. Mais les deux premiers renseigné ne sont pas identiques. Merci de réessayer</strong>!',
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
   

//*********************************************************************************

//--------------------------------------------------------------------------

  async presentAlertConfirm_For_Fonction_prompte(indicateur : number) {

    if(indicateur==0){

              const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre mot de passe </strong>?',
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de mot de passe');
                  }
                }, {
                  text: 'Oui',
                  handler: () => {
                    console.log('Changement du mot de passe');
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==1){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne vous pas modifier l\'age. Cette age correspond a l\'age que vous aviez déclaré à la création de votre compte</strong>!',
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
    if(indicateur==2){
      const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre nom utilisateur. Merci de le confirmé </strong>.',
              inputs: [
                          {
                            name: 'Nom_U',
                            type: 'text',
                            placeholder: 'Nouveau nom utilisateur'
                          }
                      ],
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de nom');
                  }
                }, {
                  text: 'Oui',
                  handler: (data) => {
                    console.log('Changement du nom utilisateur : ',data.Nom_U);
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==3){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pour le moment pas changer votre nom</strong>!',
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

    if(indicateur==4){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pour le moment pas changer votre sexe</strong>!',
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

    if(indicateur==5){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pour le moment pas changer votre Type de compte, mais vous pouvez toujours cachez votre compte.</strong>!',
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
    if(indicateur==6){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pas changer votre Identifiant.</strong>!',
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

    if(indicateur==7){
          const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pas changer votre prénom. Il n\'est visible que pour vous. </strong>!',
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

    if(indicateur==8){
      const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre theme?</strong>.',
              buttons: [
                {
                  text: 'Masculin',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de nom');
                  }
                },
                {
                  text: 'Feminin',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de nom');
                  }
                },
                {
                  text: 'Bisexuel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de nom');
                  }
                },
                {
                  text: 'Je ne suis pas sur',
                  handler: (data) => {
                    console.log('Changement du nom utilisateur : ',data.Nom_U);
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==9){
      const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre numéro? Merci de le confirmé </strong>.',
              inputs: [
                          {
                            name: 'num',
                            type: 'number',
                            placeholder: 'Mon numéro'
                          }
                      ],
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de num');
                  }
                }, {
                  text: 'Oui',
                  handler: (data) => {
                    console.log('Changement de numero : ',data.num);
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==10){
      const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre mail? Merci de le confirmé </strong>.',
              inputs: [
                          {
                            name: 'mail',
                            type: 'text',
                            placeholder: 'Mon mail'
                          }
                      ],
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de mail');
                  }
                }, {
                  text: 'Oui',
                  handler: (data) => {
                    console.log('Changement de mail : ',data.mail);
                  }
                }
              ]
            });

        await alert.present();
    }

    if(indicateur==11){
      const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirmation',
              mode:'ios',
              message: '<strong>Voulez-vous vraiment changé votre Adresse? Merci de le confirmé </strong>.',
              inputs: [
                          {
                            name: 'adresse',
                            type: 'text',
                            placeholder: 'Mon adresse'
                          }
                      ],
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Pas de changement de adresse');
                  }
                }, {
                  text: 'Oui',
                  handler: (data) => {
                    console.log('Changement de adresse : ',data.adresse);
                  }
                }
              ]
            });

        await alert.present();
    }




    

    
  }


//-------------------------------------------------------------------------

/*-------------------------------------------------------------------------
  Fonction pour la sauvegarde des modifications de données du compte
---------------------------------------------------------------------------*/
private updateInfosCompte(){

}

/*-------------------------------------------------------------------------
  Fonction pour la recuperation des données du compte
---------------------------------------------------------------------------*/

private async recupDataCompte(){

    this.compte = await this.compteService.trouveInfoCompte();

  }

}