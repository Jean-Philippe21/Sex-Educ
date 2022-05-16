import { Injectable } from '@angular/core';
import { Compte } from './models/Compte';
import { InfosCompte } from './models/InfosCompte';
import { InfosComptePro } from './models/InfosComptePro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatabaseService} from './database.service';
import { ToastController } from '@ionic/angular';
import { Publication } from './models/Publication';
import { Contenu } from './models/Contenu';
import { HTTP } from '@ionic-native/http/ngx';

import { map } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Message } from './models/Message';
import { Discussion } from './models/Discussion';
import { Message_a_envoiyer } from './models/Message_a_envoiyer';
import { DeliveryMessage } from './models/DeliveryMessage';
import { CompteSuivi } from './models/CompteSuivi';
import { Allpublication } from './models/Allpublication';
import { Model_id_sotant_id_publication } from './models/Model_id_sotant_id_publication';
import { Model_Nom_and_id_Publication } from './models/Model_Nom_and_id_Publication';
import { InfosVerificationConnexion } from './models/InfosVerificationConnexion';
import { AlertController } from '@ionic/angular';

import { RequestService } from './service/request.service';
import { LocalDataBaseService } from './service/local-data-base.service';
//import { VariableDeCommunicationService } from './service/variable-de-communication.service';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class CompteService {

 public photos: Photto[] = [];

 private PHOTO_STORAGE: string = "photos";

 private platform: Platform;

 public compte: Compte;
	
 public Mes_Publication: Publication[] = [];

 public Contenu_Mes_Publication: Contenu[] = [];

 public siNewPubli : boolean = false;

 public TableIdNewPublication : number[] =[];

 public TableForNewPublication : any[] = [];

 public UserName : string;

 public Tab_Message : Message[] = [];

 public Ensemble_des_Discussions : Discussion[] = [];

 public Tab_compteSimple_meSuive : CompteSuivi[] = [];

 public Tab_temp_id : number[] =[];

 public indexDeDepardPublication : number;

 public firstUsing : boolean=false;

 public currentModal;

 public idTemp : number =0;

 public id_du_compte : number;

 public authorisationPourId : boolean;

 private majeurOupas : boolean = false;

 private voirOupasPublicationMajeur : boolean = false;

 public etatCreationCompte : boolean = false;

 public autorisationPourConnexion : boolean = false;

 private accordConditionUtilisation : boolean = true;

 public indice_derniere_publication : number = -1;

 private db;

 public infosCompte : InfosCompte;

 public infosComptePro : InfosComptePro;


//**********Mes variables a usage factice !!!! *************************
 public idPublication_factice : number;

 public nomPublication : string;

 public info_publication_factice : Model_Nom_and_id_Publication;

 //********************************************************************

 //*************** VARIBLES DE communication entre ici et compte.page ***************

 	public retourFonction_recupStatusLegalCompte : number; 

 	public resultatSQL;

 //********************************************************************************** 

 //*************** VARIABLE DE communication entre ici et verification-infos-connexion******

 		public retourAvantDemande : boolean = false;

 //*****************************************************************************************

 

  constructor(private http: HttpClient, private dbs: DatabaseService, private toastController : ToastController, platform: Platform,public alertController: AlertController, public requestService: RequestService,public localDataBaseService : LocalDataBaseService,public file: File) {
  		this.platform = platform;
  		this.db = dbs
   }

  httpHeader = {
		headers: new HttpHeaders({'Content-Type' : 'application/json'})
	};

	public getmajeurOupas(val : boolean){
			this.majeurOupas = val;
	}

	public setmajeurOupas():boolean{
		return this.majeurOupas;
	}

	public getvoirOupasPublicationMajeur(val : boolean){
			this.voirOupasPublicationMajeur = val;
	}

	public setvoirOupasPublicationMajeur():boolean{
		return this.voirOupasPublicationMajeur;
	}

	public getaccordConditionUtilisation(){
		return this.accordConditionUtilisation;
	}

	public setaccordConditionUtilisation(val : boolean){
		this.accordConditionUtilisation = val;
	}

 /************************************************************************
  		Fonction ajouter un compte a la base de données distante et 
  		renvoi "true" dans la variable "etatCreationCompte" quand toutes est 
  		okay pour la création de l'utilisateur
  ************************************************************************/

	public async addCompte(compte : Compte){

		var	reponseServeur:any;
		var retour : boolean = false;

	    //reponseServeur = await this.requestService.requestHTMLPost('https://avossevou.eu:3000/users/', compte);
	  await this.http.post('https://avossevou.eu:3000/users/', compte).subscribe(async (res:any) => {
	     	reponseServeur = res;
	     
			    
						    if(reponseServeur==false){
						    		return;
						    }

						    var reponseEnInt = parseInt(reponseServeur);

						    if(reponseEnInt==229){
												console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww11111111111111111111111');

												this.etatCreationCompte = true;

												//Sauvegardez la valeur de cette variable ici
												retour = await this.localDataBaseService.EnregistreCompteLocalement(compte);

												console.log('le retour de la fonction : ',retour);

												return retour;
				    				}	
				    		return retour;

				 });  
	}//cette fonction est terminé !!!



	public getCompte(id): Observable<Compte>{
		return this.http.get<any>('https://avossevou.eu:3000/users/non/'+id);

	}//A supprimer

	async	getNewId(){

		await this.http.get<any>('https://avossevou.eu:3000/new/get/id/forCompte/').subscribe((data) =>{
			console.log('cccest bon : ',data);
			this.idTemp = data;
		});
	}//Bon...

	public verifSiIdLibre(id){

		console.log('Suis dans verifSiIdLibre et voici id :',id);

		return this.http.get<any>('https://avossevou.eu:3000/recup/id/new/compte/'+id).subscribe((data) =>{

				this.authorisationPourId = data;

				console.log('ma data :',data);

				console.log('this.authorisationPourId',this.authorisationPourId);

		});
	}

	async VerifSiBonCompteDeConnexion(Nom_User : string,Sexe_User : string, Mot_de_passe : string){
				/*---------------------------------------------------------------------
						Juste pour etre sur que seul de compte present dans la base de donnée
						local peut se connecté avec cette application là
				---------------------------------------------------------------------*/

				let data = this.file.readAsText(this.file.externalDataDirectory, 'BDD.txt');

			      data.then(fdata =>{
			        console.log('Le contenu du fichier est :',fdata);

			        let dataEnJSon = JSON.parse(fdata);

			        //console.log('le Nom enregistrer : ',dataEnJSon.Theme_compte);

			        setTimeout( async () =>{

											console.log('voici Nom_User=',dataEnJSon.Nom_User);

											console.log('voici Sexe=',dataEnJSon.Sexe);

											console.log('voici Mot_de_passe=',dataEnJSon.Mot_de_passe);

											console.log('Et celui que recu Nom_User=',Nom_User);

											console.log('Et celui que recu Sexe=',Sexe_User);

											console.log('Et celui que recu Mot_de_passe=',Mot_de_passe);

											if(dataEnJSon.Nom_User==Nom_User){

												if(dataEnJSon.Sexe==Sexe_User){

														if(dataEnJSon.Mot_de_passe==Mot_de_passe){

																this.retourAvantDemande = true;
																console.log('++++++++++++++++++++++++C\'est bon++++++++++++++++++++++++++');

																console.log('id du compte : ',dataEnJSon.Identification_Compte);

        												this.id_du_compte = dataEnJSon.Identification_Compte;
														}

												}

											}

							},500);

			      })

				/*const sql = "select *from compte";

				const resultatSQL = await this.db.executerSQL(sql);

				setTimeout( async () =>{

						console.log('voici Nom_User=',resultatSQL.rows.item(0).Nom_User);

						console.log('voici Sexe=',resultatSQL.rows.item(0).Sexe);

						console.log('voici Mot_de_passe=',resultatSQL.rows.item(0).Mot_de_passe);

						console.log('Et celui que recu Nom_User=',Nom_User);

						console.log('Et celui que recu Sexe=',Sexe_User);

						console.log('Et celui que recu Mot_de_passe=',Mot_de_passe);

						if(resultatSQL.rows.item(0).Nom_User==Nom_User){

							if(resultatSQL.rows.item(0).Sexe==Sexe_User){

									if(resultatSQL.rows.item(0).Mot_de_passe){

											this.retourAvantDemande = true;
									}

							}

						}

				},500);
				*/
				



	}//C'est bon

	async VerifiInfosConnexion(Nom_User : string,Sexe_User : string, Mot_de_passe : string){

			/*----------------------------------------------------------------------------
					Il faut dès cette ligne recupéré dans la base de donnée local l'id du compte
					si bien sur celle si est renseigné avant la suite, si non, il risque 
					d'y avoir des problèmes pour l'authentification des comptes déjà inscrit
			------------------------------------------------------------------------------*/

			/*let data = this.file.readAsText(this.file.externalDataDirectory, 'BDD.txt');

      data.then(fdata =>{
       
        let dataEnJSon = JSON.parse(fdata);

        console.log('id du compte : ',dataEnJSon.Identification_Compte);

        this.id_du_compte = dataEnJSon.Identification_Compte;
      })
      */


			let mesInfos = new InfosVerificationConnexion(Nom_User,Sexe_User,Mot_de_passe,this.id_du_compte);

			this.http.post('https://avossevou.eu:3000/connexion/infos/verif', mesInfos).subscribe((res:any) => {
				console.log("Ma réponse",res);

				if(res==0){
					this.autorisationPourConnexion = false;
				}else{
					if(res==-229){
						this.autorisationPourConnexion = true;
					}
				}

				if(res!=0 && res!=-229){
					console.log("Une erreur est arrivé dans la fonction VerifInfosConnexion");
				}
		});

	}//C'est bon

	public push(Nom : string, Sexe : String){
		alert('COUCOU');
	}//A supprimé
	
	

	public async sauvegardeCompte(compte : Compte){

			this.compte = compte;
			var retour : boolean = false;

			/*--------------------------------------
				Recuperation de certaines informations avant
			---------------------------------------*/

			let data = this.file.readAsText(this.file.externalDataDirectory, 'BDD.txt');

      data.then(fdata =>{
        
       let dataEnJSon = JSON.parse(fdata);

        console.log('le Nom enregistrer : ',dataEnJSon.Theme_compte);

        this.compte.Langue = dataEnJSon.Langue;
        this.compte.Pays = dataEnJSon.Pays;
        this.compte.Tel = dataEnJSon.Tel;

      })

      /*-------------------------------
        	Sauvegarde dans le fichier
        --------------------------------*/

        retour = await this.localDataBaseService.EnregistreCompteLocalement(this.compte);

				console.log('le retour de la fonction (sauvegardeCompte) : ',retour);

			

			/*const  sql = "insert into Compte(Nom,Sexe,Age,Nom_User,Type_Compte,Photo_Profile,Nombres_abonnee,Visibilite,Mot_de_passe,Identification_Compte) values(?,?,?,?,?,?,?,?,?,?)";

			const paramsSQL = [compte.Nom, compte.Sexe, compte.Age, compte.Nom_User, compte.Type_Compte, compte.Photo_Profile, compte.Nombres_abonnee, compte.Visibilite, compte.Mot_de_passe, compte.Identification_Compte];


		return this.db.executerSQL(sql, paramsSQL);*/
	}//Bon 

	public async sauvegardeInfoCompte(pays : string, tel : number){
		/*--------------------------------
			ATTENTION : les arguments pays et tel ne sont pas enregistrer ici
		---------------------------------*/

		var retour : boolean = false;

		 this.infosCompte = new InfosCompte(this.majeurOupas,this.voirOupasPublicationMajeur,this.accordConditionUtilisation,true);

		 retour = await this.localDataBaseService.EnregistreInfosCompteLocalement(this.infosCompte);
		

			return retour;
		/*const sql = "insert into info_compte(majeurOupas,voirOupasPublicationMajeur,accordConditionUtilisation,visibiliter,Pays,Tel) values(?,?,?,?,?,?) ";

		const paramsSQL = [this.majeurOupas,this.voirOupasPublicationMajeur,this.accordConditionUtilisation,true,pays,tel];

		return this.db.executerSQL(sql,paramsSQL);*/

	}//Bon

	public 	async sauvegardeInfoComptePro(Adresse_postal : string, Theme_compte : string, Prenom : string, mail : string){

		var retour : boolean = false;

		this.infosComptePro = new InfosComptePro(Adresse_postal,Theme_compte,Prenom,mail);

		retour = await this.localDataBaseService.EnregistreInfosCompteProLocalement(this.infosComptePro);

		return retour;
		/*const sql = "insert into info_compte_pro(Adresse_postal,Theme_compte,Prenom,mail) values(?,?,?,?)";

		const paramsSQL = [Adresse_postal,Theme_compte,Prenom,mail];

		return this.db.executerSQL(sql,paramsSQL);
		*/
	}//Bon

	public async sauvegardeIndiceDernierePublication(indice : number){

		var retour : boolean = false;

		retour = await this.localDataBaseService.EnregistreIndiceDernierePublicationLocalement(indice);

		
		return retour;

		/*const sql = "insert into info_publication(indice_derniere_publication) values(?) ";

		const paramsSQL = [indice];

		return this.db.executerSQL(sql,paramsSQL);*/

	}//Bon

	public async sauvegardePremiereConnexionOuPas(etat : boolean){

		var retour : boolean = false;

		retour = await this.localDataBaseService.EnregistrePremiereConnexionOuPasLocalement(etat);

		return retour;

		/*const sql_0 = "delete from PremiereConnexion";

		console.log('..........Suis dans sauvegardePremiereConnexionOuPas...........');

		this.db.executerSQL(sql_0);

		setTimeout( () =>{

			const sql = "insert into PremiereConnexion(premiereConnexionOuPas) values(?) ";

			const paramsSQL = [etat];

			return this.db.executerSQL(sql,paramsSQL);

		},2000);*/

	}//Bon
	
	public trouveInfoCompte(){
		let data = this.file.readAsText(this.file.externalDataDirectory, 'BDD.txt');

      data.then(fdata =>{
        console.log('Le contenu du fichier est :',fdata);

        let dataEnJSon = JSON.parse(fdata);

        console.log('le Nom enregistrer : ',dataEnJSon.Theme_compte);

        this.compte.Nom_User = dataEnJSon.Nom_User;

        this.compte.Sexe = dataEnJSon.Sexe;

        this.compte.Age = dataEnJSon.Age;

        this.compte.Type_Compte = dataEnJSon.Type_Compte;

        this.compte.Identification_Compte = dataEnJSon.Identification_Compte;

        this.compte.Mot_de_passe = dataEnJSon.Mot_de_passe;

        this.compte.Langue = dataEnJSon.Langue;

        this.compte.Pays = dataEnJSon.Pays;

        this.compte.Tel = dataEnJSon.Tel;

     })

		return this.compte;
	}//Bon


	public trouveInfoCompteId(){
		return this.compte.Identification_Compte;
	}//Bon
  
		async deleteCompte(){
			const sql = "delete from compte";

			const resultatSQL = await this.db.executerSQL(sql);
		}//A suivre

		async deleteInfoPublication(){
			const sql = "delete from info_publication";

			const resultatSQL = await this.db.executerSQL(sql);
		}//A suivre

		async deletePremiereConnexion(){
			const sql = "delete from PremiereConnexion";

			const resultatSQL = await this.db.executerSQL(sql);
		}//A suivre

		async deleteInfoCompte(){

			const sql = "delete from info_compte";

			await this.db.executerSQL(sql);
		}//A suivre

		async deleteInfoComptePro(){

			const sql = "delete from info_compte_pro";

			await this.db.executerSQL(sql);
		
		}//A suivre

		async recupStatusLegalCompte(){

			let data = this.file.readAsText(this.file.externalDataDirectory, 'INFOSCOMPTE.txt');

      data.then(fdata =>{
        //console.log('Le contenu du fichier est :',fdata);

        let dataEnJSon = JSON.parse(fdata);

        //console.log('le Nom enregistrer : ',dataEnJSon.Theme_compte);

        setTimeout( async () =>{

				

										console.log('Je suis dans la fonction recupStatusLegalCompte');

										console.log('Retour base de donnees pour si majeurOupas :',dataEnJSon.majeurOupas);

										console.log('Retour base de données pour voirOupasPublicationMajeur :',dataEnJSon.voirOupasPublicationMajeur)

										if(dataEnJSon.majeurOupas=='true'){
											//l'utilisateur est majeur
												if(dataEnJSon.voirOupasPublicationMajeur=='true'){
													//l'utilisateur veux voir les publications pour adultes
															console.log('Je mets retourFonction_recupStatusLegalCompte a 1 ...001');
														this.retourFonction_recupStatusLegalCompte = 1;
												}else{
													//l'utilisateur veux pas voir les publications pour adultes
													console.log('Je mets retourFonction_recupStatusLegalCompte a 0  ...02');
														this.retourFonction_recupStatusLegalCompte = 0;
													
												}

										}else{
											//l'utilisateur n'est pas majeur
											console.log('Je mets retourFonction_recupStatusLegalCompte a 0 ...3');
											this.retourFonction_recupStatusLegalCompte = 0;
											
										}

										//this.retourFonction_recupStatusLegalCompte =0 ; //si non pas default on retourne 0

				},1000);

      })

      /*
			const sql = "select *from  info_compte";

			this.resultatSQL = await this.db.executerSQL(sql);

			*/
		}//Bon

		async recupIndiceDernierePublication(){

			let data = this.file.readAsText(this.file.externalDataDirectory, 'INDICEDERNIEREPUBLICATION.txt');

      data.then(fdata =>{
        console.log('Le contenu du fichier est :',fdata);

        let dataEnJSon = parseInt(fdata);

        //console.log('le Nom enregistrer : ',dataEnJSon);
        this.indice_derniere_publication = dataEnJSon;
      })



			/*const sql = "select *from  info_publication";

			const resultatSQL = await this.db.executerSQL(sql);

			setTimeout( async () =>{

				console.log("Voici l\'indice du dernier element du tableau",resultatSQL.rows.item(0).indice_derniere_publication);

				this.indice_derniere_publication = resultatSQL.rows.item(0).indice_derniere_publication;
				//this.indexDeDepardPublication = resultatSQL.rows.item(0).indice_derniere_publication;

			},1000);*/

		}	//Bon

		async recupIdCompte(){

			const sql = "select *from  compte";

			const resultatSQL = await this.db.executerSQL(sql);

			setTimeout( async () =>{

				console.log("Voici id du compte :",resultatSQL.rows.item(0).Identification_Compte);

				//this.indice_derniere_publication = resultatSQL.rows.item(0).indice_derniere_publication;
				//this.indexDeDepardPublication = resultatSQL.rows.item(0).indice_derniere_publication;

			},1000);
		}//A supprimer

		async recupPremiereConnexionOuPas(){

			let data = this.file.readAsText(this.file.externalDataDirectory, 'PREMIERECONNEXIONOUPAS.txt');

      data.then(fdata =>{
        //console.log('Le contenu du fichier est :',fdata);

        //let dataEnJSon = JSON.parse(fdata);

        //console.log('le Nom enregistrer : ',dataEnJSon.Theme_compte);
		        if(fdata=="true"){
								this.firstUsing = true;        	
		        }else{
		        	this.firstUsing =false;
		        }

      })

			/*const sql = "select *from  PremiereConnexion";

			const resultatSQL = await this.db.executerSQL(sql);

			setTimeout( async () =>{

				this.firstUsing = resultatSQL.rows.item(0).premiereConnexionOuPas;

				console.log('Voici le statuts this.firstUsing=',this.firstUsing);

			},800);*/

		}	//Bon

    async infoCompte(){

    	this.compte = this.trouveInfoCompte();

    	/*const sql = "select *from compte";

    	const resultatSQL = await  this.db.executerSQL(sql);

			this.compte.Nom = resultatSQL.rows.item(0).Nom;
    	this.compte.Sexe = resultatSQL.rows.item(0).Sexe;
    	this.compte.Age = resultatSQL.rows.item(0).Age;
    	this.compte.Nom_User= resultatSQL.rows.item(0).Nom_User;
    	this.compte.Type_Compte = resultatSQL.rows.item(0).Type_Compte;
    	this.compte.Photo_Profile = resultatSQL.rows.item(0).Photo_Profile;
    	this.compte.Nombres_abonnee = resultatSQL.rows.item(0).Nombres_abonnee;
    	this.compte.Visibilite = resultatSQL.rows.item(0).Visibilite;
    	//this.compte.Admin_Visibilite = resultatSQL.Admin_Visibilite;
    	this.compte.Mot_de_passe = resultatSQL.rows.item(0).Mot_de_passe;
    	this.compte.Identification_Compte = resultatSQL.rows.item(0).Identification_Compte;*/
  	
    	this.UserName = this.compte.Nom_User;

    	this.compte.Nom = 'toto';

    	//***********************************************************************
    	/*
    		setTimeout( async () => {





    			const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mon Compte',
      mode:'ios',
      inputs: [
        {
          name: 'Nom_U',
          type: 'text',
          value: this.compte.Nom_User,
          placeholder: 'Nom Utilisateur'
        },
        {
          name: 'Nom',
          type: 'text',
          id: 'name2-id',
          value: this.compte.Nom,
          placeholder: 'Mon Nom'
        },
        // multiline input.
        {
          name: 'sexe',
          id: 'paragraph',
          type: 'text',
          value: this.compte.Sexe,
          placeholder: 'Sexe'
        },
        {
          name: 'age',
          id: 'paragraph',
          type: 'text',
          value: this.compte.Age,
          placeholder: 'Age'
        },
        {
          name: 'type_C',
          id: 'paragraph',
          type: 'text',
          value: this.compte.Type_Compte,
          placeholder: 'Type de compte'
        },
        {
          name: 'Id_C',
          id: 'paragraph',
          type: 'text',
          value: this.compte.Identification_Compte,
          placeholder: 'Identification compte'
        },
        {
          name: 'Mot_de_passe',
          id: 'paragraph',
          type: 'text',
          value: this.compte.Mot_de_passe,
          placeholder: 'Mot de passe'
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
            
          }
        }
      ]
    });

    await alert.present();


    	},3000);*/

    	//***********************************************************************
			
			const toast = await this.toastController.create({
				header: "Succès",
				message: this.compte.Nom_User,
				color: "success",
				position: "bottom",
				duration: 15000
			});

			toast.present();

    }//bon

    public netoiMemoire(){
    	this.compte = new Compte(' ',' ', 0, ' ', 0, false,false,-1, ' ', ' ', ' ',0,' ' , ' ' , ' ' ,' ');

    	const sql = "insert into Compte(Nom,Sexe,Age,Nom_User,Type_Compte,Photo_Profile,Nombres_abonnee,Visibilite,Admin_Visibilite,Mot_de_passe,Identification_Compte) values(?,?,?,?,?,?,?,?,?,?,?)";

    	const paramsSQL = [this.compte.Nom, this.compte.Sexe, this.compte.Age, this.compte.Nom_User, this.compte.Type_Compte, this.compte.Photo_Profile, this.compte.Nombres_abonnee, this.compte.Visibilite, this.compte.Mot_de_passe, this.compte.Identification_Compte];

		return this.db.executerSQL(sql, paramsSQL);

    }//A Suivre

    public supprimer(id: number){

    	const sql = "delete from Compte where id = ?";

    	const paramsSQL = [id];

    	return this.db.executerSQL(sql, paramsSQL);
    }//A Suivre

    async createPublication(Age_legal:boolean,Visibiliter:boolean,id_compte_auteur:number,Video: string, Image: string, Image1:string,Image2:string,Image3 : string, Text: string, lien: string,avatar_img: string,nom_profile: string, titre_publication: string,commentaire_auteur: string,lk:boolean,etiquete_photo: boolean, etiquete_text: boolean, etiquete_video: boolean){

    	let newPublication = new Publication(Age_legal,Visibiliter,id_compte_auteur,Video, Image, Image1,Image2, Image3, Text, lien, avatar_img,nom_profile, titre_publication,commentaire_auteur,lk,etiquete_photo, etiquete_text, etiquete_video);

    	
    	 this.http.post('https://avossevou.eu:3000/users/publication/', newPublication).subscribe((res:any) => {
			//console.log(res);
		});

		await this.delay(1000);
		

	 	 await this.http.get<Publication>('https://avossevou.eu:3000/users/id/publication/'+id_compte_auteur).subscribe((data) =>{
			newPublication.id = data[0].id;	
			/*console.log("Voici le contenu de newPublication.id : ", newPublication.id , " et data[id]=", data[0].id );*/				
		});

		await this.delay(1000);
		
		/*
		console.log("id publication bbbb : ", newPublication.id);
		console.log("id compte auteur : ", id_compte_auteur);
		*/

		this.Mes_Publication.push(newPublication);

		

		 let newContenu = new Contenu(Video, Image, Image1,Image2, Image3, Text, lien, newPublication.id,id_compte_auteur);

		 		 
		 this.http.post('https://avossevou.eu:3000/users/contenu/publication/', newContenu).subscribe((res:any) => {
			//console.log(res);
		});
		

		this.Contenu_Mes_Publication.push(newContenu);

    }

    async CheckSiNewPublication(id){

			let i=0, etiquetPhoto, etiquetText, etiquetVideo;
			let newPublication;
			let lienImage,lienImage1,lienImage2,lienImage3,lienVideo;
			let testX : boolean = false;

    	await this.http.get<any>('https://avossevou.eu:3000/users/derniere/publication/'+id).subscribe((data) =>{
			//newPublication.id = data[0].id;

					if(typeof data[0] != 'undefined'){
							//console.log('data is : ',data);
					}else{
						//console.log('Pas de nouvelle publication');
						this.siNewPubli = false;
					}

			
				for(i=0;i<data.length;i++){
					if(data[0].id != 0){
					//	console.log(data[i]);
						//console.log(data[i].id);
						//console.log(data[i].id_publication);
						//console.log(data[i].ischeckup);
						if(data[i].ischeckup==false)
						{
							this.siNewPubli= true;
						}else{
							this.siNewPubli= false;
						}
						//console.log('voici la valeur de siNewPubli :',this.siNewPubli);
						this.TableIdNewPublication.push(data[i].id_publication);
					}else{
						//console.log('pas de nouvelle publication');
						this.siNewPubli = false;
					}
					//console.log(this.siNewPubli);
				}							
		});

    	await this.delay(1000);

    	if(this.siNewPubli == true){
    			//console.log('Voici les id des nouvelles publication :');
    			for(i=0;i<this.TableIdNewPublication.length;i++){
    				//console.log(this.TableIdNewPublication[i]);
    					//console.log('Un tour de boucle : indice :',i);
    					//console.log('Table IdPublication :',this.TableIdNewPublication);
    				await this.http.get<any>('https://avossevou.eu:3000/users/recup/new/publication/'+this.TableIdNewPublication[i]).subscribe((data) =>{
    					//console.log('ll',data[0]);
    					if((data[0].video !="") && (data[0].image== "") && (data[0].image1=="") && (data[0].image2=="") && (data[0].image3=="") && (data[0].text=="")){
    						etiquetVideo = true;
    						etiquetPhoto = false;
    						etiquetText = false;
    						lienVideo = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
    						testX = true;
    						//console.log('Coucou video');
    					}


    					if((data[0].video =="") && (data[0].image!= "") && (data[0].text=="")){
    						etiquetPhoto = true;
    						etiquetVideo = false;
    						etiquetText = false;
    						lienImage = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
    						lienImage1 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
    						lienImage2 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
    						lienImage3 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
    						testX = true;
    						//console.log('Coucou image');
    					}

    					if((data[0].video =="") && (data[0].image== "") && (data[0].image1=="") && (data[0].image2=="") && (data[0].image3=="") && (data[0].text!="")){
    						etiquetVideo = false;
    						etiquetPhoto = false;
    						etiquetText = true;
    						testX = true;
    						//console.log('Coucou text');
    					}

    					if(typeof this.UserName == 'undefined'){
		    						
				    						this.UserName = "Compte Pro";
				    					
    					}

    					if(etiquetPhoto == true){
    							//console.log('gggggg',data[0].image2);
    							//console.log('gggggg',data[0].image);
    							//console.log('gggggg',data[0].image1);
    							//console.log('gggggg',data[0].image3);
    							//console.log('id de la publication :',data[0].id)
									
    							if( (data[0].image!= "") && (data[0].image1=="") && (data[0].image2=="") && (data[0].image3=="") ){

    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+id.toString()+"/"+data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									//console.log('Voici 1',newPublication);
    										newPublication.id = data[0].id;
    									
    							}

    							if( (data[0].image!= "") && (data[0].image1!="") && (data[0].image2=="") && (data[0].image3=="") ){
    									//console.log('if 2');
    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+id.toString()+"/"+data[0].image, lienImage1+id.toString()+"/"+data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									//console.log('Voici 2');
    										newPublication.id = data[0].id;
    							}

    							if( (data[0].image!= "") && (data[0].image1!= "") && (data[0].image2!="") && (data[0].image3=="") ){
    									//console.log('if 3');
    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+id.toString()+"/"+data[0].image, lienImage1+id.toString()+"/"+data[0].image1, lienImage2+id.toString()+"/"+data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									//console.log('Voici 3');
    										newPublication.id = data[0].id;
    							}





    					}

    					if(etiquetVideo == true){
    						//console.log("Je suis dans la creation de newPublication :",etiquetVideo);
    							newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,lienVideo+id.toString()+"/"+data[0].video,data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									
    										newPublication.id = data[0].id;

    										//console.log('Voici 1',newPublication);

    										testX = true;
    					}

    					if(etiquetText == true){
    							newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									
    										newPublication.id = data[0].id;

    										//console.log('Voici 1',newPublication);

    										testX = true;
    					}

    					//console.log(newPublication);

    					if(testX == true){
									//console.log('Un push ....');
	    						this.Mes_Publication.push(newPublication);
	    						//Suppression de l'id dans TableIdNewPublication
	    						var indexx = this.TableIdNewPublication.indexOf(newPublication.id);
	    						this.TableIdNewPublication.splice(indexx);
	    						//console.log('Voici le nouveau Tableau d\'indice :',this.TableIdNewPublication);
    					}
    				
    					
    				});

    				//console.log('cpts :',this.Mes_Publication);

    			}
    	}


    	//console.log('Voici la table contenant les publications :');
    	//console.log('kkkkkkk',this.Mes_Publication);

    }
//*************************************************************************************
    async recupAllPublication(id_de_depard : number, status_legal : number){

    	console.log('suis dans recupAllPublication et voici id_de_depard:',id_de_depard);

    	console.log('le status_legal :',status_legal);

    	let i=0, etiquetPhoto, etiquetText, etiquetVideo;
			let newPublication;
			let lienImage,lienImage1,lienImage2,lienImage3,lienVideo;
			let testX : boolean = false;

			let info = new Allpublication(id_de_depard,status_legal);

    	await this.http.get<any>('https://avossevou.eu:3000/recup/all/publication/'+info.id+'/'+info.StatusLegal).subscribe((data) =>{

			
				for(i=0;i<data.length;i++){
					if(data[i].id != 0){
					//	console.log(data[i]);
						//console.log(data[i].id);
						//console.log(data[i].id_publication);
						//console.log(data[i].ischeckup);
						
						//console.log('voici la valeur de siNewPubli :',this.siNewPubli);
						this.TableIdNewPublication.push(data[i].id);
						this.TableForNewPublication.push(data[i]);
					}else{
						//console.log('pas de nouvelle publication');
						//this.siNewPubli = false;
					}
					//console.log(this.siNewPubli);
				}							
			});

    	await this.delay(1000);

    	console.log('MERDEEEEEEEE :',this.TableIdNewPublication);

    	console.log('Puis MERDEEEEEEEE :',this.TableForNewPublication);

    	//if(this.siNewPubli == true){
    			console.log('LONGUEUR DU TABLEAU :',this.TableIdNewPublication.length);
    	for(i=this.indexDeDepardPublication;i<this.TableIdNewPublication.length;i++){
    				//console.log(this.TableIdNewPublication[i]);
    				console.log('Un tour de boucle : indice :',this.TableIdNewPublication[i]);
    					//console.log('Table IdPublication :',this.TableIdNewPublication);
    				if(this.TableIdNewPublication[i] != undefined){

    					await this.http.get<any>('https://avossevou.eu:3000/users/recup/new/publication/'+this.TableIdNewPublication[i]).subscribe((data) =>{
    							console.log('ll',data[0]);
    							
    							console.log('et i :',i);
    							if( (data[0]!=undefined ) && (data[0].video !="") && (data[0].image=== "") && (data[0].image1==="") && (data[0].image2==="") && (data[0].image3==="") && (data[0].text==="")){
			    						etiquetVideo = true;
			    						etiquetPhoto = false;
			    						etiquetText = false;
			    						lienVideo = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
			    						testX = true;
			    						console.log('Coucou video');
			    				}

			    				if((data[0]!=undefined ) && (data[0].video ==="") && (data[0].image!= "") && (data[0].text==="")){
	    								etiquetPhoto = true;
	    								etiquetVideo = false;
	    								etiquetText = false;
	    								lienImage = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
	    								lienImage1 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
	    								lienImage2 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
	    								lienImage3 = "https://avossevou.eu:3000/users/get/imgOrvideoOrtext/";
	    								testX = true;
	    								console.log('Coucou image');
    							}

    							if((data[0]!=undefined ) && (data[0].video ==="") && (data[0].image=== "") && (data[0].image1==="") && (data[0].image2==="") && (data[0].image3==="") && (data[0].text!="")){
    									etiquetVideo = false;
    									etiquetPhoto = false;
    									etiquetText = true;
    									testX = true;
    									console.log('Coucou text');
    							}

    							if(typeof this.UserName == 'undefined'){
		    						
				    					this.UserName = "Compte Pro";
				    					
    							}

    							if(etiquetPhoto == true){
    									console.log('gggggg photo',data[0]);
	    								//console.log('gggggg photo',data[0].image);
	    								//console.log('gggggg photo',data[0].image1);
	    								//console.log('gggggg photo',data[0].image3);
	    								//console.log('id de la publication :',data[0].id)
	    								console.log('Mon problemeeeeee :',i);
									
	    								if( (data[0].image!="") && (data[0].image1=="") && (data[0].image2=="") && (data[0].image3=="") ){

	    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+ this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
	    									console.log('Voici 1',newPublication);
	    									newPublication.id = data[0].id;
	    									
	    								}

    									if( (data[0].image!="") && (data[0].image1!="") && (data[0].image2=="") && (data[0].image3=="") ){
    										//console.log('if 2');
    										newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image, lienImage1+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    										console.log('Voici 2',newPublication);
    										newPublication.id = data[0].id;
    									}

    									if( (data[0].image!="") && (data[0].image1!="") && (data[0].image2!="") && (data[0].image3=="") ){
    										//console.log('if 3');
    										newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,lienImage+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image, lienImage1+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image1, lienImage2+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    										console.log('Voici 3',newPublication);
    										newPublication.id = data[0].id;
    									}
    							}

    							if(etiquetVideo == true){
    									//console.log("Je suis dans la creation de newPublication :",etiquetVideo);
    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,lienVideo+this.TableForNewPublication[i].id_compte_auteur.toString()+"/"+data[0].video,data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									
    									newPublication.id = data[0].id;

    									//console.log('Voici 1',newPublication);

    									testX = true;
    							}

    							if(etiquetText == true){
    									newPublication = new Publication(data[0].age_legal,data[0].visibiliter,data[0].id_compte_auteur,data[0].video,data[0].image, data[0].image1, data[0].image2, data[0].image3,data[0].text,data[0].lien,'../../assets/icon/avatar.svg',this.UserName,data[0].titre_publication,data[0].commentaire_auteur,data[0].lke,etiquetPhoto, etiquetText, etiquetVideo);
    									
    									newPublication.id = data[0].id;

    									//console.log('Voici 1',newPublication);

    									testX = true;
    							}
    							
    							if(testX == true){
										//console.log('Un push ....');
	    								this.Mes_Publication.push(newPublication);
	    								//on enregistre temporairement l'id dans "Tab_temp_id"
	    								this.Tab_temp_id.push(newPublication.id);
	    								/*
	    								//Suppression de l'id dans TableIdNewPublication
	    								var indexx = this.TableIdNewPublication.indexOf(newPublication.id);
	    								this.TableIdNewPublication.splice(indexx);
	    								//console.log('Voici le nouveau Tableau d\'indice :',this.TableIdNewPublication);
    									*/
    							}

    							
    					}); //FIN DE LA REQUETE !!!!	
    					await this.delay(1000);
    					console.log('Un tour de boucle finnnnnnn:',i);
    				}
    				

    				//console.log('cpts :',this.Mes_Publication);
			}

			setTimeout( async () =>{

				console.log('Fonction recupAllPublication : indice_derniere_publication a enregistré :',this.TableIdNewPublication[this.TableIdNewPublication.length -1]);

				this.sauvegardeIndiceDernierePublication(this.TableIdNewPublication[this.TableIdNewPublication.length -1]);
			
				for(i=0;i<this.Tab_temp_id.length;i++){

							//Suppression de l'id dans TableIdNewPublication
		    			var indexx = this.TableIdNewPublication.indexOf(this.Tab_temp_id[i]);
		    			this.TableIdNewPublication.splice(indexx);

				}

				console.log('Voici le nouveau Tableau d\'indice :',this.TableIdNewPublication);

			},9000);

    	//}


  }

//*************************************************************************************

    public recupIdPublication(){

    } 

    public delay(ms : number){
    	return new Promise(resolve => setTimeout(resolve, ms));
    }

    public enregistreMessage(tab : any){

    		console.log('Voici tab :',tab);

    		console.log('Mon find :',this.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == tab.id_compte_auteur));

    		if(this.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == tab.id_compte_auteur) == -1){
    			
    			console.log('Coucou');
    			this.Ensemble_des_Discussions.push(tab);

    			console.log('la table Ensemble_des_Discussions :');

    			console.log(this.Ensemble_des_Discussions);

    		}else{
    			
    			console.log('Ton if na pas encore marcher !!!!');
    		}

    		
    }

    public newEnregistreDiscussion(id_s : number){

    	let x =this.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == id_s); 

    	if( x == -1 && id_s != undefined){
    			
    			console.log('Coucou id_s recu :: ',id_s);

    			let Msgs : Message[] = [];

    			this.Ensemble_des_Discussions.push(new Discussion(id_s,Msgs,this.idPublication_factice));

    			console.log('la table Ensemble_des_Discussions :');

    			console.log(this.Ensemble_des_Discussions);

    			this.http.get<any>('https://avossevou.eu:3000/users/non/'+id_s).subscribe((data) =>{
						
						console.log('La donné ::',data[0]);

						this.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte(data[0]['nom_user'] , data[0]['sexe'] , data[0]['age'] , data[0]['nom_user'] , 1, false,false,data[0]['identification_compte'] , "undefined", data[0]['langue'] , data[0]['pays'] ,0,"undefined","undefined","undefined","undefined"), false,this.info_publication_factice, true));
							
						console.log('kkkkkkkk ::',this.Tab_compteSimple_meSuive);

						/*let Msgs : Message[] = [];
    
    				this.enregistreMessage(new Discussion(id_s, Msgs));
    				*/

					});

    			
    			return (this.Ensemble_des_Discussions.length - 1);

    		}else{
    			
    			console.log('Ton if na pas encore marcher !!!!');
    			return x;
    		}
    }

    public envoiMessage(id_compte_auteur : number,id_compte_sortant : number, Contenu : any, dateEmittion : string){

    	let LeMessage = new Message_a_envoiyer(id_compte_auteur,id_compte_sortant, Contenu, dateEmittion);

    	console.log('Je suis dans la fonction envoiMessage et voici le Message_a_envoiyer :');
    	console.log(LeMessage);

    	this.http.post('https://avossevou.eu:3000/usersM/message/enregistreTemp/', LeMessage).subscribe((res:any) => {
			console.log(res);
		});

    }

    public CheckAndGetNewMessage(id_compte_auteur : number, indiceDiscussion : number){
    	//id_compte_auteur est l'id du compte lui meme 

    	var i,indexElementAenregistrer=-1;
    	var newMessage;

    	console.log('Jean-Philippe voici Ensemble_des_Discussions :: ',this.Ensemble_des_Discussions);
					console.log('Et voici Tab_compteSimple_meSuive :: ',this.Tab_compteSimple_meSuive);
    	
    	this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/'+id_compte_auteur).subscribe((data) =>{
			
				for(i=0;i<data.length;i++){

					console.log('Suis dans CheckAndGetNewMessage et i=',i);
					console.log('la data',data[i]['id_compte_auteur']);
					console.log('id_compte_auteur haha :',id_compte_auteur);

					indexElementAenregistrer = this.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == data[i]['id_compte_auteur']);

					let indexElementCompteSuive = this.Tab_compteSimple_meSuive.findIndex(x  => x.compte.Identification_Compte == id_compte_auteur );


					//console.log('++++ Jean-Philippe :: ',indexElementCompteSuive);

					if(indexElementAenregistrer != -1){

							newMessage = new Message(data[i]['contenu'],data[i]['id_compte_destinateur'],data[i]['date_emition']);
							newMessage.lu = false;
							this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.push(newMessage);
							this.Ensemble_des_Discussions[indexElementAenregistrer].SiNouveauMessage = true;
							//this.Tab_compteSimple_meSuive[indexElementCompteSuive].SiNouveauMessage = true;
							this.ReturnConfirmation(true,data[i]['id']);
							console.log('Index du dernier element ajouter :',this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.length - 1);
					}

					if( (indexElementAenregistrer == -1) && (indexElementCompteSuive == -1) ){
							//console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! :',data[i]['id_compte_auteur']);
							this.newEnregistreDiscussion(data[i]['id_compte_auteur']);
					}

				}

				console.log('Mon tableau Ensemble_des_Discussions :');
				console.log(this.Ensemble_des_Discussions);

		});

    }

    //*********************************************************

    	 public CheckNewMessage(id_compte_auteur : number){
    	//id_compte_auteur est l'id du compte lui meme 

    	var i,indexElementAenregistrer=-1;
    	
    	this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/JusteCheck/'+id_compte_auteur).subscribe((data) =>{
			
				for(i=0;i<data.length;i++){

						//console.log('dkhejghcvbhd',data[i]['id_compte_auteur']);
					//indexElementAenregistrer = this.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == data[i]['id_compte_auteur']);

					let indexElementCompteSuive = this.Tab_compteSimple_meSuive.findIndex(x  => x.compte.Identification_Compte == data[i]['id_compte_auteur'] );

					if(indexElementCompteSuive != -1){

							//newMessage = new Message(data[i]['contenu'],data[i]['id_compte_destinateur'],data[i]['date_emition']);
							//newMessage.lu = false;
							//this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.push(newMessage);
							//this.Ensemble_des_Discussions[indexElementAenregistrer].SiNouveauMessage = true;
							if(data=== "false"){
								console.log('Il est false enfin');
							}else{
								this.Tab_compteSimple_meSuive[indexElementCompteSuive].SiNouveauMessage = true;
							}
							
							console.log('Le num de compte : ',id_compte_auteur);
							console.log('Le resultat :', data);
							//console.log('Index du dernier element ajouter :',this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.length - 1);
					}

				}

			
		});

    }

    //********************************************************


    public ReturnConfirmation(isDelivery : boolean, idMessage : number){

    	let ensemble = new DeliveryMessage(isDelivery,idMessage);

    	this.http.get<any>('https://avossevou.eu:3000/usersM/message/DeliveryOkay/'+ensemble.isDelivery+'/'+ensemble.idMessage).subscribe((res:any) => {
			console.log(res);
			});

    }

    

    
    public async addNewToGallery(){

    	const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    	const savedImageFile = await this.savePicture(capturedPhoto);

    	this.photos.unshift(savedImageFile);

    	Storage.set({
    		key: this.PHOTO_STORAGE,
    		value: JSON.stringify(this.photos)
    	});
    }

  	private async savePicture(cameraPhoto: CameraPhoto){

  		const base64Data = await this.readAsBase64(cameraPhoto);

  		const fileName = new Date().getTime() + '.jpeg';

  		const savedFile = await Filesystem.writeFile({
  			path: fileName,
  			data: base64Data,
  			directory: Directory.Data
  		});

  		 if (this.platform.is('hybrid')) {
	      return {
	        filepath: savedFile.uri,
	        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
	      };
	    }else{
			  		return{
			  			filepath: fileName,
			  			webviewPath: cameraPhoto.webPath
			  		};	    	
	    }

  	}

  	private async readAsBase64(cameraPhoto: CameraPhoto){

  		 if (this.platform.is('hybrid')) {
			    
			    const file = await Filesystem.readFile({
			      path: cameraPhoto.path
			    });

			    return file.data;
			  }else{
				  		const response = await fetch(cameraPhoto.webPath!);
			  		const blob = await response.blob();

			  		return await this.convertBlobToBase64(blob) as string;		  	
			  }


  	}

  	convertBlobToBase64 = (blob : Blob) => new Promise((resolve, reject) =>{
  		const reader = new FileReader();
  		reader.onerror = reject;
  		reader.onload = () =>{
  			resolve(reader.result);
  		};
  		reader.readAsDataURL(blob);
  	});

  	public async loadSaved(){
  		const photoList = await Storage.get({key : this.PHOTO_STORAGE});
  		this.photos = JSON.parse(photoList.value) || [];

  		if (!this.platform.is('hybrid')){
		  		for(let photo of this.photos){
		  			const readFile = await Filesystem.readFile({
		  				path: photo.filepath,
		  				directory: Directory.Data  			
		  			});
		  			photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

		  		}
  		}

  	
  	}


  	//------------------------------------les nouvelles fonctions pour discussion---------

  public CheckAndGetNewMessagePublicationDiscussion(id_compte_auteur : number,id_publication : number,id_compte_sortant : number){
    	//id_compte_auteur est l'id du compte lui meme 

    	var i,indexElementAenregistrer=-1;
    	var newMessage;
    	var conteneur : Model_id_sotant_id_publication;
    	var id_dernier_message_de_cette_discussion : number;

    	console.log('Jean-Philippe voici Ensemble_des_Discussions :: ',this.Ensemble_des_Discussions);
					//console.log('Et voici Tab_compteSimple_meSuive :: ',this.Tab_compteSimple_meSuive);

			indexElementAenregistrer = this.Ensemble_des_Discussions.findIndex(x  => x.id_publication_sur_laquelle_porte_la_discussion == id_publication);

			conteneur = new Model_id_sotant_id_publication(id_compte_sortant,id_publication);				

			if(indexElementAenregistrer == -1){

				indexElementAenregistrer = this.newEnregistreDiscussionForPublication(id_compte_sortant,id_publication,this.nomPublication);

				id_dernier_message_de_cette_discussion = -1;

				this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/ForPublication/'+conteneur.id_publication+'/'+conteneur.id_compte_sortant+'/'+id_dernier_message_de_cette_discussion).subscribe((data) =>{

					for(i=0;i<data.length;i++){

							newMessage = new Message(data[i]['contenu'],data[i]['id_compte_destinateur'],data[i]['date_emition']);
							newMessage.lu = false;
							newMessage.id_message=data[i]['id'];
							this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.push(newMessage);
							this.Ensemble_des_Discussions[indexElementAenregistrer].SiNouveauMessage = true;
					


					}

				});				

			}else{

				//******************** Calcule du bon indice de dernier message *******

							id_dernier_message_de_cette_discussion = this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.length - 1;

							if(this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion[id_dernier_message_de_cette_discussion] == undefined){
								id_dernier_message_de_cette_discussion = -1;
							}else{

									id_dernier_message_de_cette_discussion = this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion[id_dernier_message_de_cette_discussion].id_message;		

									if(id_dernier_message_de_cette_discussion<=0){
										id_dernier_message_de_cette_discussion=0;
									}

							}

							

				//******************* Fin calcul **************************************

				this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/ForPublication/'+conteneur.id_publication+'/'+conteneur.id_compte_sortant+'/'+id_dernier_message_de_cette_discussion).subscribe((data) =>{

					for(i=0;i<data.length;i++){

							newMessage = new Message(data[i]['contenu'],data[i]['id_compte_destinateur'],data[i]['date_emition']);
							newMessage.lu = false;
							newMessage.id_message=data[i]['id'];
							this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.push(newMessage);
							this.Ensemble_des_Discussions[indexElementAenregistrer].SiNouveauMessage = true;
							//this.Tab_compteSimple_meSuive[indexElementCompteSuive].SiNouveauMessage = true;
							//?????????this.ReturnConfirmation(true,data[i]['id']);

					}

				});

			}

    }

    ReturnConfirmation_For_Publication_Discussion(isDelivery : boolean, idMessage : number, id_publication : number){

    	let ensemble = new DeliveryMessage(isDelivery,id_publication);

    	this.http.get<any>('https://avossevou.eu:3000/usersM/message/DeliveryOkay/'+ensemble.isDelivery+'/'+ensemble.idMessage).subscribe((res:any) => {
			console.log(res);
			});

    }

    newEnregistreDiscussionForPublication(id_s : number ,id_publication : number,Nom_publication : string){

    	let x =this.Ensemble_des_Discussions.findIndex(x  => x.id_publication_sur_laquelle_porte_la_discussion == id_publication); 

    	if( x == -1 && id_publication != undefined){
    			
    			console.log('Coucou id_s recu :: ',id_s);

    			let Msgs : Message[] = [];

    			this.Ensemble_des_Discussions.push(new Discussion(id_s,Msgs,id_publication));

    			console.log('la table Ensemble_des_Discussions :');

    			console.log(this.Ensemble_des_Discussions);

    			

    			this.http.get<any>('https://avossevou.eu:3000/users/non/'+id_s).subscribe((data) =>{
						
						console.log('La donné ::',data[0]);
					

						this.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte(data[0]['nom_user'] , data[0]['sexe'] , data[0]['age'] , data[0]['nom_user'] , 1, false,false,data[0]['identification_compte'] , "undefined", data[0]['langue'] , data[0]['pays'] ,0,"undefined","undefined","undefined","undefined"), false, new Model_Nom_and_id_Publication(Nom_publication,id_publication,id_s),false));
							
						console.log('kkkkkkkk ::',this.Tab_compteSimple_meSuive);


					});

    			
    			return (this.Ensemble_des_Discussions.length - 1);

    		}else{
    			
    			console.log('Ton if na pas encore marcher !!!!');
    			return x;
    		}

    }


    public envoiMessageDiscussionPublication(id_compte_auteur : number,id_compte_sortant : number, Contenu : any, dateEmittion : string, id_publication : number){

    	let LeMessage = new Message_a_envoiyer(id_compte_auteur,id_compte_sortant, Contenu, dateEmittion);

    	LeMessage.id_publication = id_publication;

    	console.log('Je suis dans la fonction envoiMessage et voici le Message_a_envoiyer :');
    	console.log(LeMessage);

    	this.http.post('https://avossevou.eu:3000/usersM/messageDiscussionPublication/enregistreTemp/', LeMessage).subscribe((res:any) => {
			console.log(res);
		});

    }

    public CheckNewPublicationMessage(id_publication : number){
    	//id_compte_auteur est l'id du compte lui meme 

			    	var i,indexElementAenregistrer=-1;

			    	var index = this.Ensemble_des_Discussions.findIndex(x  => x.id_publication_sur_laquelle_porte_la_discussion == id_publication);
			    	
			    	var id_dernier_message_enregistrer= this.Ensemble_des_Discussions[index].contenu_discussion.length - 1;

										id_dernier_message_enregistrer = this.Ensemble_des_Discussions[index].contenu_discussion[id_dernier_message_enregistrer].id_message;		

										if(id_dernier_message_enregistrer<=0){
											id_dernier_message_enregistrer=0;
										}



			    	this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/JusteCheck/Publication/'+id_publication+'/'+id_dernier_message_enregistrer).subscribe((data) =>{
						
							for(i=0;i<data.length;i++){

								let indexElementCompteSuive = this.Tab_compteSimple_meSuive.findIndex(x  => x.info_publication.id_publication == data[i]['id_publication'] );

								if(indexElementCompteSuive != -1){

										if(data=== "false"){
											console.log('Il est false enfin');
										}else{
											this.Tab_compteSimple_meSuive[indexElementCompteSuive].SiNouveauMessage = true;
										}
										
										console.log('Le resultat :', data);
										//console.log('Index du dernier element ajouter :',this.Ensemble_des_Discussions[indexElementAenregistrer].contenu_discussion.length - 1);
								}

							}

						
					});

    }

    	//++++++ La fonction qui suit est une copie de la précédeente avec plus de variable+++++

								    			public CheckNewPublicationMessagedouble(id_publication : number,id_s : number, Nom_publication : string){
								    					//id_compte_auteur est l'id du compte lui meme 

											    	var i,indexElementAenregistrer=-1;

											    	var index = this.Ensemble_des_Discussions.findIndex(x  => x.id_publication_sur_laquelle_porte_la_discussion == id_publication);
											    	
											    	if(index == -1){

											    		var id_dernier_message_enregistrer=-1;
											    		
											    		this.http.get<any>('https://avossevou.eu:3000/Check/New/Message/JusteCheck/Publication/'+id_publication+'/'+id_dernier_message_enregistrer).subscribe((data) =>{

											    				if(data=== "false"){

											    				}else{
											    						this.newEnregistreDiscussionForPublication(id_s,id_publication,Nom_publication);

											    						setTimeout(() => {
																			  
											    									console.log('LONGUEUR de Tab_compteSimple_meSuive :',this.Tab_compteSimple_meSuive.length);
											    				
														    						for(i=0;i<this.Tab_compteSimple_meSuive.length;i++){
														    							//if(this.Tab_compteSimple_meSuive[i].info_publication.id_publication!=NaN){
														    								this.Tab_compteSimple_meSuive[i].id_publication = this.Tab_compteSimple_meSuive[i].info_publication.id_publication;
														    								this.Tab_compteSimple_meSuive[i].NomPublication = this.Tab_compteSimple_meSuive[i].info_publication.NomPublication;
														    							console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
														    							
														    						}

														    						for(i=0;i<data.length;i++){

														    							let indexElementCompteSuive = this.Tab_compteSimple_meSuive.findIndex(x  => x.id_publication == data[i]['id_publication'] );
														    							console.log('Suis dans .... et voici data[i][\'id_publication\'] : ',data[i]['id_publication']);
														    							console.log('LLLLLe find donne : ',this.Tab_compteSimple_meSuive.findIndex(x  => x.id_publication == data[i]['id_publication'] ));
																							console.log('Voici Tab_compteSimple_meSuive :',this.Tab_compteSimple_meSuive);
																							if(indexElementCompteSuive != -1){

																								console.log(' !!!!!!!!!!!!!!!!!! suis dans le if !!!!!!!!!!!!!!!!');
																								this.Tab_compteSimple_meSuive[indexElementCompteSuive].SiNouveauMessage = true;
																							}
														    						}

																			}, 2000);

											    						


											    				}

											    		});
											    	}

								    }

    	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    	async attendre(){
		    setTimeout(() => {
		                   console.log('Je suis entrain d\'attendre 2s');
		                   //this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].contenu_discussion.push(new Message("Je me suis envoyer ce message",this.id_s,new Date().toISOString()));
		      }, 2000);
		  }

  	//----------------------------------------------------------------------------------
}

export interface Photto {
	filepath: string;
	webviewPath: string;
}