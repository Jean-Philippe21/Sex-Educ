import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { Publication } from '../models/Publication';
import { Contenu } from '../models/Contenu';
import { NavController } from '@ionic/angular';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  

  heartType: string = "heart-empty"
  like;
  etatDef : boolean = true;
  private id : number; //id c'est id du compte auquel je veux ecrire !!!
  constructor(public navCtrl: NavController, private activatedRouter: ActivatedRoute,private compteService: CompteService) {

    //---------------------------------------------------------------------------------------------------- 

     //this.compteService.infoCompte();

    //let newPublication : Publication = new Publication(true,true,2021,'../../assets/icon/vvv.mp4', '../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','Je suis dans un moode de ouf la franchement', 'localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss', 'Publication Dynamic 3','Ceci est ma toute premiere publication llll, cree par mes soins !',false,true,false,false);

    //newPublication.id = 88;

     //this.compteService.Mes_Publication = [].concat(newPublication);

     //let newContenu : Contenu = new Contenu('../../assets/icon/vvv.mp4', '../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','Je suis dans un moode de ouf la franchement', 'localhost:8100/compte', newPublication.id, 1998);

     //this.compteService.Contenu_Mes_Publication = [].concat(newContenu);

     //console.log(newPublication.tab_contenu);
     //------------------------------------------------------------------------------------------------
      let newPublication_1 : Publication = new Publication(true,true,9547,'../../assets/icon/vvv.mp4', '../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','', 'localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss', 'Publication Dynamic 3','Ceci est 2ème publication llll, cree par mes soins !',false,true,false,false);

       newPublication_1.id = 2;

     this.compteService.Mes_Publication = [].concat(newPublication_1);

     let newContenu_1 : Contenu = new Contenu('../../assets/icon/vvv.mp4', '../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','Je suis dans un moode de ouf la franchement', 'localhost:8100/compte', newPublication_1.id, 1998);

     this.compteService.Contenu_Mes_Publication = [].concat(newContenu_1);

     //-------------------------------------------------------------

      this.compteService.recupStatusLegalCompte();

      this.compteService.recupPremiereConnexionOuPas();

     setTimeout( () =>{

        console.log("////////////////////////// la variable est this.compteService.firstUsing =",this.compteService.firstUsing);

        if(this.compteService.firstUsing){

            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

            this.compteService.indexDeDepardPublication = 0;

            this.compteService.firstUsing = false;

            this.compteService.sauvegardePremiereConnexionOuPas(false);

            console.log('Suis juste avant recupAllPublication et retourFonction_recupStatusLegalCompte = ',this.compteService.retourFonction_recupStatusLegalCompte);

            this.compteService.recupAllPublication(0, this.compteService.retourFonction_recupStatusLegalCompte);

       }else{

            console.log('*****777777777777777777777777777***************************************************************************************');

            this.compteService.indexDeDepardPublication = this.compteService.TableIdNewPublication.length;

            this.compteService.recupIndiceDernierePublication();

            setTimeout( () =>{

                console.log('Le dernier indice enregistré dans indice_derniere_publication (suite a enregistrement dans la base) :',this.compteService.indice_derniere_publication);

                //console.log('Le resultat obtenu par mon propre calcul :',this.compteService.TableIdNewPublication[this.compteService.indexDeDepardPublication - 1]);

                //this.compteService.recupAllPublication(this.compteService.TableIdNewPublication[this.compteService.indexDeDepardPublication - 1],this.compteService.retourFonction_recupStatusLegalCompte);

                this.compteService.recupAllPublication(this.compteService.indice_derniere_publication,this.compteService.retourFonction_recupStatusLegalCompte);

            },3000);
    
       }


     },5000);

   


  }
   

  compte: Compte[]=[];

  ngOnInit() {
      this.etatDef = true;
  }

   etat : string;

  allonsy(){
  	
  }
  ajouterLike(post, lk, id){
    
  for(const publication of this.compteService.Mes_Publication){
      if(publication.id == id)
      {
        if(publication.lk == false)
        {
          publication.lk = true;
            //console.log(this.compteService.Mes_Publication);
        }
      }
  }

  }
  supprimeLike(post, lk, id){
  this.like = false;

    for(const publication of this.compteService.Mes_Publication){
      if(publication.id == id)
      {
        if(publication.lk == true)
        {
          publication.lk = false;
        }
      }
    }

  }


  async  createpublication(){
      /*
      //------------------------------------------------------------------------------------------------

       this.compteService.createPublication(true,true,100,'../../assets/icon/vvv.mp4','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','','localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss','Publication Dynamic 3','Ceci est 2ème publication TTTTT11111 cree par mes soins !',false,false, false, true);

       await this.compteService.delay(3000);
      //------------------------------------------------------------------------------------------------
         this.compteService.createPublication(true,true,100,'../../assets/icon/vvv.mp4','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','','localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss','Publication Dynamic 3','Ceci est 2ème publication TTTTT22222 cree par mes soins !',false,true, false, false);
      
         await this.compteService.delay(3000);
     //------------------------------------------------------------------------------------------------

       this.compteService.createPublication(true,true,100,'../../assets/icon/vvv.mp4','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','','localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss','Publication Dynamic 3','Ceci est 2ème publication TTTTT3333 cree par mes soins !',false,false, false, true);

        await this.compteService.delay(3000);
     //-----------------------------------------------------------------------------------------------

       this.compteService.createPublication(true,true,100,'../../assets/icon/vvv.mp4','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','','localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss','Publication Dynamic 3','Ceci est 2ème publication TTTTT44444 cree par mes soins !',false,true, false, false);
       */
       this.compteService.CheckSiNewPublication(23455);

       await this.compteService.delay(5000);

       //console.log('voilà :',this.compteService.Mes_Publication);
       //console.log('mon booleen',this.etat);
  }

  gereAffichage(id,index){
    //console.log('JP jp',id);
 
  }

  onGoToDiscussion(id_compte_auteur : number, id_publication : number,Nom_publication : string){
    //let t=this.compteService.newEnregistreDiscussion(id_compte_auteur);

    let t=this.compteService.newEnregistreDiscussionForPublication(id_compte_auteur,id_publication,Nom_publication);

    console.log('le t :',t);

    this.id = id_compte_auteur;

    return { id : id_compte_auteur, id_P : id_publication };

  }



}
