import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ComptePage } from '../compte/compte.page';
import { Compte } from '../models/Compte';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CompteService } from '../compte.service';
import { DatabaseService } from '../database.service';
import { ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-inscription-page',
  templateUrl: './inscription-page.page.html',
  styleUrls: ['./inscription-page.page.scss'],
})
export class InscriptionPagePage implements OnInit {

    ProOuPas : boolean;

    SiMajeur : boolean=false;

  constructor(public navCtrl: NavController, private activatedRouter: ActivatedRoute, public compteService : CompteService, public ds: DatabaseService, private toastController : ToastController,public actionSheetController: ActionSheetController,public alertController: AlertController,public popoverController: PopoverController,public loadingController: LoadingController,private router : Router) {
  	
  	this.Nom_pseudo = this.activatedRouter.snapshot.paramMap.get("Nom_User");

  	this.Sexe = this.activatedRouter.snapshot.paramMap.get("Sexe_User");

  	//console.log("Suis dans la passe inscription :",this.Nom_pseudo,this.Sexe);
   }

  ngOnInit() {


  }

//routerLink="/compte"

	Nom_pseudo: string;

	Sexe: string;

	Age: string;
  	
  	Nom_User: string;

  	Prenom : string;
  
  	Type_Compte:number;
  	
  	Photo_Profile : string;
  
  	Nombres_abonnee : number;
  
  	Visibilite : boolean;
  	
  	Admin_Visibilite : boolean;
  
  	Identification_Compte : number;
  
  	Mot_de_passe : string;
  
  	Langue : string;
  
  	Pays : string;

  	Tel : number;

  	Mail : string;

  	Adresse_postal : string;

  	Theme : string;

  	Numero_Identification_legal : number;

    loading : any;

    private caseCochez_1 : number =0;

    private caseCochez_2 : number =0;

    private compteur1 : number = 2;

    private compteur2 : number = 2;

    private displayOrNot_1 : boolean = true;//Pour connaitre le choix de l'utilisateur par rapport aux publication sensibles

    private displayOrNot_2 : boolean = true;//Pareil

    private compteur3 : number = 2;

    //la procedure de vérification d'identité doit ce faire dans ou avant la fonction
    //de création "creeCompte()"


  async verificationAvantCreationCompte(){

    //let id_temp : any;
    let id : number;


    //this.presentLoading();
    //*****************Je fais signe a l'utilisateur d'attendre ..........

      this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios'
      //duration: 2000
      });
      await this.loading.present();  

    //********************************************************************

    //**************Je vérifie que toutes les informations sont bien entrée*******
    console.log('*********************************************************');
    console.log('voici age : ',this.Age);
    console.log('voici Type_Compte',this.Type_Compte);
    console.log('voici Pays :',this.Pays);
    console.log('voici Tel :',this.Tel);
    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) ){
      console.log('voici Nom_User :', this.Nom_User);
      console.log('voici Prenom :', this.Prenom);
      console.log('voici Mail :', this.Mail);
      console.log('voici Adresse_postal :',this.Adresse_postal);
      console.log('voici le theme :',this.Theme);
      console.log('voici le Numero_Identification_legal :',this.Numero_Identification_legal);

    }

    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 0 ) ){
      console.log('voici displayOrNot_1 :', this.displayOrNot_1);
      console.log('voici displayOrNot_2 :', this.displayOrNot_2);
    }

    console.log('voici Mot_de_passe :',this.Mot_de_passe);

    console.log('etat accord utilisateur : ',this.compteService.getaccordConditionUtilisation());

    console.log('*********************************************************');

    if( (this.Age!=undefined) && (this.Type_Compte!=undefined) && (this.Pays!=undefined) && (this.Tel!=undefined) && (this.Mot_de_passe!=undefined && this.Mot_de_passe.length>=4) && (this.compteService.getaccordConditionUtilisation()) ){

        if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) ){

          if( (this.Nom_User!=undefined && this.Nom_User.length!=0) && (this.Prenom!=undefined && this.Prenom.length!=0) && (this.Mail!=undefined && this.Mail.length!=0) && (this.Adresse_postal!=undefined && this.Adresse_postal.length!=0) && (this.Theme!=undefined) && (this.Numero_Identification_legal!=undefined) ){

          }else{

                    await this.loading.dismiss();

                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Erreur',
                      mode:'ios',
                      message: '<strong>Il y a des informations manquantes. Merci de remplir les champs manquants</strong>',
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

                    console.log('Informations incomplete');

                    return 0;
          }

        }

        if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 0 ) ){

            if( this.displayOrNot_1 && this.displayOrNot_2 ){

              await this.loading.dismiss();

                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Erreur',
                      mode:'ios',
                      message: '<strong>Il y a des informations manquantes. Merci de remplir les champs manquants</strong>',
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

              console.log('Informations incomplete.....');

              return 0;

            }else{
                //c'est bon
            }

        }       

    }else{

      await this.loading.dismiss();

                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Erreur',
                      mode:'ios',
                      message: '<strong>Il y a des informations manquantes. Merci de remplir les champs manquants</strong>',
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

      console.log('Information incomplete....');

      return 0;

    }

    //***************************Fin vérification **********************************


    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) ){
      //recupération d'un identifiant autogénéré pour le compte

      
      this.compteService.verifSiIdLibre(this.Numero_Identification_legal);


      setTimeout( () =>{
                      
                   console.log('mon cher element :',this.compteService.authorisationPourId);

                   this.creeCompte();

                   this.compteService.getmajeurOupas(true);

                   /*--------------------------------------------------------------
                    Pour les comptes pro, par default le contenu sensible est 
                    accessible
                   ---------------------------------------------------------------*/

                   setTimeout( () =>{

                        if(this.compteService.etatCreationCompte){

                              this.compteService.getvoirOupasPublicationMajeur(true);

                               console.log('Je veux voir de publication sensible');

                               this.compteService.sauvegardeInfoCompte(this.Pays,this.Tel);

                               const RouteVersPageSuivant = '/compte';

                               this.router.navigateByUrl(RouteVersPageSuivant);
                       
                       }else{
                        console.log('Une erreur est arrivé!!');
                       }

                   },8000);
                 
                   
      }, 8000);

      

    }else{
      console.log('Le compte n\'est pas pro');

      
    }

    if( (parseInt(this.Age) < 18) && ( this.Type_Compte == 0 ) ){
      //recupération d'un identifiant autogénéré pour le compte

      this.compteService.getNewId();

      setTimeout( async () =>{
                      console.log('Le nouvelle id : ',this.compteService.idTemp);
                      this.Numero_Identification_legal = this.compteService.idTemp;
                      this.creeCompte();

                      this.compteService.getmajeurOupas(false);

                      /*--------------------------------------------------------
                        Par default, les mineurs n'ont pas accès au contenu
                        sensible
                      --------------------------------------------------------*/

                      setTimeout( () =>{

                            if(this.compteService.etatCreationCompte){

                                  this.compteService.getvoirOupasPublicationMajeur(false);

                                  console.log('Je veux pas voir de publication sensible');
                                
                                  this.compteService.sauvegardeInfoCompte(this.Pays,this.Tel);

                                  const RouteVersPageSuivant = '/compte';

                                  this.router.navigateByUrl(RouteVersPageSuivant);

                          }else{
                            console.log('Une erreur est arrivé');
                          }


                      },8000);

                               
                      
                      
      }, 8000);




      

    }

    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 0 ) ){

      this.compteService.getNewId();

     setTimeout( async () => {
                      console.log('Le nouvelle id : ',this.compteService.idTemp);
                      this.Numero_Identification_legal = this.compteService.idTemp;
                      this.creeCompte();

                      this.compteService.getmajeurOupas(true);

                      setTimeout( async () => {

                          if(this.compteService.etatCreationCompte){

                              if(this.caseCochez_1==1 && this.caseCochez_2==0){
                     
                                this.compteService.getvoirOupasPublicationMajeur(false);

                                console.log('Je veux pas voir de publication sensible');

                              } 

                              if(this.caseCochez_1==0 && this.caseCochez_2==1){
                           
                                this.compteService.getvoirOupasPublicationMajeur(true);

                                console.log('Je veux voir des publications sensibles');

                              } 

                              this.compteService.sauvegardeInfoCompte(this.Pays,this.Tel);

                              const RouteVersPageSuivant = '/compte';

                              this.router.navigateByUrl(RouteVersPageSuivant);

                          }else{
                            console.log('Il y a eu un probleme a la creation du compte');
                          }

                      },8000);


                      
      }, 8000);

   

    }

    //**************** J'arrête l'attente **********************
    
        
        
        //await loading.dismiss();

        //console.log('Loading dismissed!');

    //**********************************************************

    

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios'
      //duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
     await loading.dismiss();
    
  }

  async DestrouLoading(){

    //await this.loading.dismiss();

    console.log('Loading dismissed!');
  }



 async creeCompte(){
 
  	let age_en_int = parseInt(this.Age);

    let telephone = this.Tel;

    /***********************************************************
     *  Il faut crypté le mot de passe avant de continuer ou pas
     **********************************************************/

  	let newCompte = new Compte(this.Nom_User, this.Sexe, age_en_int, this.Nom_pseudo, this.Type_Compte, false,false,this.Numero_Identification_legal, this.Mot_de_passe, 'fr', this.Pays, telephone,this.Prenom,
  this.Mail,this.Adresse_postal,this.Theme);

    this.compteService.id_du_compte = this.Numero_Identification_legal;

  	await this.compteService.addCompte(newCompte);

  	
    
    if(this.ds.creerBDD()){

        /*const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Information',
                      mode:'ios',
                      message: '<strong>Base de données créer</strong>',
                      buttons: [
                         {
                          text: 'Ok',
                          handler: () => {
                            console.log('Confirm Okay');
                          }
                        }
                      ]
                    });

         await alert.present();*/

    }else{

        await this.loading.dismiss();

        const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Erreur',
                      mode:'ios',
                      message: '<strong>Une erreur dans la création de la base de données</strong>',
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

        return 0;

    }

  	

  	this.ds.creerTables();

    /*this.ds.creerTableInfoCompte();

    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) ){

      this.ds.creerTablesInfoForComptePro();
    }*/

      setTimeout( async () => {
          
          this.compteService.deleteCompte();//A supprimer si deployement dans un autre portable

          this.compteService.deleteInfoCompte();//A supprimer aussi

          //this.compteService.deleteInfoComptePro();//A supprimer aussi

          this.compteService.deleteInfoPublication();

          this.compteService.deletePremiereConnexion();

          this.compteService.sauvegardeCompte(newCompte);

          if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) ){

            this.compteService.deleteInfoComptePro();

            this.compteService.sauvegardeInfoComptePro(this.Adresse_postal,this.Theme,this.Prenom,this.Mail);
          }

              this.compteService.firstUsing = true;
              this.compteService.sauvegardePremiereConnexionOuPas(true);

                console.log('Voici valeurRetour : ',this.compteService.etatCreationCompte);

                //if()
                if(this.compteService.etatCreationCompte){
                  console.log('cdcccccccc');
                  await this.loading.dismiss();
                }else{
                  console.log('Un probleme est arrivé');
                }


      },5000);
        	 

    /*setTimeout( async () => {

       
        
        


    },8000);*/

    
  }

 async pro_ou_pas(){
    if( (parseInt(this.Age) >= 18) && ( this.Type_Compte == 1 ) )
    {
      this.ProOuPas = true;
      this.SiMajeur = false;
      console.log(this.ProOuPas);

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Information',
          mode:'ios',
          message: '<strong>Une procédure d\'authentification vous sera demandé</strong>',
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


    }else{
      this.ProOuPas = false;
      this.SiMajeur = false;
    }

    if((parseInt(this.Age) >= 18) && ( this.Type_Compte == 0 )){
      this.SiMajeur = true;
    }

    if((parseInt(this.Age) < 18) && ( this.Type_Compte == 1 )){

      const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Erreur',
          mode:'ios',
          message: '<strong>Vous ne pouvez pas créer du contenu, vous êtes mineur.</strong>',
          buttons: [
             {
              text: 'Ok',
              handler: () => {
                this.Type_Compte =0;
                console.log('Confirm Okay');
              }
            }
          ]
        });

      await alert.present();

    }

  }

  updateTypeCompte(){
    this.pro_ou_pas();
  }

  public fonction(){

    if(this.compteur1%2==0){

      this.caseCochez_1 = this.caseCochez_1 + 1;

      console.log('Cocher... :', this.caseCochez_1);

      this.compteur1 = this.compteur1 + 1;
    
    }else{

      if(this.compteur1%2!=0){

        this.caseCochez_1 = this.caseCochez_1 - 1;

        console.log('Cocher... :', this.caseCochez_1);

        this.compteur1 = this.compteur1 + 1;

      }

    }

    if(this.caseCochez_1==1){
      this.displayOrNot_2=false;
    }else{
      this.displayOrNot_2=true;
    }



  }

  public fonction_2(){

    if(this.compteur2%2==0){

      this.caseCochez_2 = this.caseCochez_2 + 1;

      console.log('voici ma variable 2 :', this.caseCochez_2);

      this.compteur2 = this.compteur2 + 1;
    
    }else{

      if(this.compteur2%2!=0){

        this.caseCochez_2 = this.caseCochez_2 - 1;

        console.log('voici ma variable 2 :', this.caseCochez_2);

        this.compteur2 = this.compteur2 + 1;

      }

    }

    if(this.caseCochez_2==1){
      this.displayOrNot_1=false;
    }else{
      this.displayOrNot_1=true;
    }

    //console.log('voici ma variable 2 :',);

  }

  public accordConditionUtilisation(){

      if(this.compteur3%2==0){
        this.compteService.setaccordConditionUtilisation(false);
      }else{
        this.compteService.setaccordConditionUtilisation(true);
      }

      this.compteur3 = this.compteur3 +1;



  }

}
