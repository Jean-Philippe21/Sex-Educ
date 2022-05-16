import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public reponseServeur: any; 

  public messageErreur: string="Une erreur est arrivée."; 

  constructor(public alertController: AlertController) { }


  //Fonction pour effectuer les requêtes GET vers le serveur
  public async requestHTMLGet(url){

        /*****************************************************************************
         *      Partie pour gérer la notification d'erreur
         * ***************************************************************************/

         const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: this.messageErreur,
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        /******************************************************************************
         * Fin partie pour gérer la notification d'erreur
         * *****************************************************************************/

        var requestOptions = {
            method: 'GET',
            
        };
         
        

        await fetch(url,requestOptions)
          .then(result => this.reponseServeur = result)
          .catch(async function(error){

                    console.log('error : ',error);
                    await alert.present();
                    return false;
                });


        console.log(this.reponseServeur);

        return this.reponseServeur;

      }

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

  //Fonction pour effectuer les requêtes POST vers le serveur
  public async requestHTMLPost(url, data){

        /*****************************************************************************
         *      Partie pour gérer la notification d'erreur
         * ***************************************************************************/

         const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: this.messageErreur,
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });

        /******************************************************************************
         * Fin partie pour gérer la notification d'erreur
         * *****************************************************************************/

        var requestOptions = {
            method: 'POST',
            body : data
        };
         
        console.log("Ma data : ",data);

        await fetch(url,requestOptions)
          .then(response => response.text())
          .then(result => this.reponseServeur = result)
          .catch(async function(error){

                    console.log('error : ',error);
                    await alert.present();
                    return false;
                });


        console.log(this.reponseServeur);

        return this.reponseServeur;

      }

}
