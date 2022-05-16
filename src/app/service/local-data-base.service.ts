import { Injectable } from '@angular/core';
import { Compte } from '../models/Compte';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { VariableDeCommunicationService } from './variable-de-communication.service';
import { InfosCompte } from '../models/InfosCompte';
import { InfosComptePro } from '../models/InfosComptePro';



@Injectable({
  providedIn: 'root'
})
export class LocalDataBaseService {

  //*************** VARIABLE DE communication entre ici et local-data-base.service******

    public retourdelafonctionEnregistreCompteLocalement : boolean = false;

 //*****************************************************************************************

  constructor(public file: File, public variableDeCommunicationService : VariableDeCommunicationService) { }

    public async EnregistreCompteLocalement(compte : Compte){

          var retour : boolean = false;
          
          console.log('Le chemin acces est : ',this.file.externalDataDirectory);

          retour = await this.file.writeFile(this.file.externalDataDirectory,'BDD.txt',JSON.stringify(compte),{replace : true}).then(
              ()=> {
                    console.log('99999999999999999999999999999999999999999999999999999999999999999999999');
                    return true;
            }).catch(
              ()=> {
                    return false;
            });

            return retour;

      
    }

    public async EnregistreInfosCompteLocalement(infoscompte : InfosCompte ){

          var retour : boolean = false;
          
          console.log('Le chemin acces est : ',this.file.externalDataDirectory);

          retour = await this.file.writeFile(this.file.externalDataDirectory,'INFOSCOMPTE.txt',JSON.stringify(infoscompte),{replace : true}).then(
              ()=> {
                    console.log('99999999999999999999999999999999999999999999999999999999999999999999999');
                    return true;
            }).catch(
              ()=> {
                    return false;
            });

            return retour;

      
    }

    public async EnregistreInfosCompteProLocalement(infoscomptePro : InfosComptePro ){

          var retour : boolean = false;
          
          console.log('Le chemin acces est : ',this.file.externalDataDirectory);

          retour = await this.file.writeFile(this.file.externalDataDirectory,'INFOSCOMPTEPRO.txt',JSON.stringify(infoscomptePro),{replace : true}).then(
              ()=> {
                    console.log('99999999999999999999999999999999999999999999999999999999999999999999999');
                    return true;
            }).catch(
              ()=> {
                    return false;
            });

            return retour;

      
    }

    public async EnregistreIndiceDernierePublicationLocalement(indice : number ){

          var retour : boolean = false;

          if(indice!=undefined && indice!=null && indice>0){

              console.log('Le chemin acces est : ',this.file.externalDataDirectory);

              retour = await this.file.writeFile(this.file.externalDataDirectory,'INDICEDERNIEREPUBLICATION.txt',JSON.stringify(indice),{replace : true}).then(
                  ()=> {
                        console.log('99999999999999999999999999999999999999999999999999999999999999999999999');
                        return true;
                }).catch(
                  ()=> {
                        return false;
                });

                return retour;

          }else{

              console.log("------------------------ Ecriture refusé ! ----------------------------------------");
              return false;
          }
          
          

      
    }

    public async EnregistrePremiereConnexionOuPasLocalement(etat : boolean){

          var retour : boolean = false;
          
          console.log('Le chemin acces est : ',this.file.externalDataDirectory);

          retour = await this.file.writeFile(this.file.externalDataDirectory,'PREMIERECONNEXIONOUPAS.txt',JSON.stringify(etat),{replace : true}).then(
              ()=> {
                    console.log('99999999999999999999999999999999999999999999999999999999999999999999999');
                    return true;
            }).catch(
              ()=> {
                    return false;
            });

            return retour;

      
    }

}
