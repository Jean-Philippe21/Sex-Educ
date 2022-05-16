import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { Publication } from '../models/Publication';
import { Contenu } from '../models/Contenu';
import { Message } from '../models/Message';
import { Discussion } from '../models/Discussion';
import { CompteSuivi } from '../models/CompteSuivi';

@Component({
  selector: 'app-pre-messagerie',
  templateUrl: './pre-messagerie.page.html',
  styleUrls: ['./pre-messagerie.page.scss'],
})
export class PreMessageriePage implements OnInit {


  private id_compte_sortant;

  private id_publication;

  i : number;

  public NoDiscussion : boolean = false;

  constructor(private compteService: CompteService) {
    /*this.compteService.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte("Alex", "M", 32, "Alex", 1, false,false,12355, "mddcvfssdev", 'fr', "France", 552146211,"Alex",
  "jbhedchd@gmail.com","totoc dcv ",'sexe'), false));
    this.showDetail(12355);

    this.compteService.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte("Alex", "M", 32, "Alex", 1, false,false,23455, "mddcvfssdev", 'fr', "France", 552146211,"Alex",
  "jbhedchd@gmail.com","totoc dcv ",'sexe'), false));
    this.showDetail(23455);

    this.compteService.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte("Alex", "M", 32, "Alex", 1, false,false,903465, "mddcvfssdev", 'fr', "France", 552146211,"Alex",
  "jbhedchd@gmail.com","totoc dcv ",'sexe'), false));
    this.showDetail(903465);

    this.compteService.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte("Alex", "M", 32, "Alex", 1, false,false,9545, "mddcvfssdev", 'fr', "France", 552146211,"Alex",
  "jbhedchd@gmail.com","totoc dcv ",'sexe'), false));
    this.showDetail(9545);

    this.compteService.Tab_compteSimple_meSuive.push(new CompteSuivi(new Compte("Alex", "M", 32, "Alex", 1, false,false,9501, "mddcvfssdev", 'fr', "France", 552146211,"Alex",
  "jbhedchd@gmail.com","totoc dcv ",'sexe'), false));
    this.showDetail(9501);

    this.compteService.Ensemble_des_Discussions[3].contenu_discussion.push(new Message("Je suis etranger ...",9502,new Date().toISOString()));
    */
    this.compteService.CheckNewMessage(12355);

    for(this.i=0;this.i<this.compteService.Mes_Publication.length;this.i++){
      //this.compteService.CheckNewPublicationMessage(this.compteService.Mes_Publication[this.i].id);
      if(this.compteService.Mes_Publication[this.i].id!=NaN){
        
        this.compteService.CheckNewPublicationMessagedouble(this.compteService.Mes_Publication[this.i].id, this.compteService.Mes_Publication[this.i].id_compte_auteur , this.compteService.Mes_Publication[this.i].titre_publication);
        this.attendre();
        console.log('Voici le tableau, Tab_compteSimple_meSuive : ',this.compteService.Tab_compteSimple_meSuive);
      
      }
      

    }

    

    if(this.compteService.Tab_compteSimple_meSuive.length == 0){
      this.NoDiscussion = true;
    }

   }

  ngOnInit() {
  }

  showDetail(id_compte : number){
    console.log(this.compteService.Tab_compteSimple_meSuive);

    let Msgs : Message[] = [];
    
    this.compteService.enregistreMessage(new Discussion(id_compte, Msgs,this.compteService.idPublication_factice));


  }

  onGoToMessagerie(id_compte : number, index : number){

    this.id_compte_sortant = id_compte;

    this.compteService.Tab_compteSimple_meSuive[index].SiNouveauMessage = false;

     return { id : this.id_compte_sortant};
  }

  onGoToMessagerieOfDiscussion(id_publication : number, index : number,Nom_publication : string){

    this.id_publication = id_publication;

    this.compteService.Tab_compteSimple_meSuive[index].SiNouveauMessage = false;

     return { id : this.id_publication};
  }

  async attendre(){
    setTimeout(() => {
                   console.log('Je suis entrain d\'attendre 2s');
                   //this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].contenu_discussion.push(new Message("Je me suis envoyer ce message",this.id_s,new Date().toISOString()));
      }, 2000);
  }


}
