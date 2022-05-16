import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { Publication } from '../models/Publication';
import { Contenu } from '../models/Contenu';
import { Message } from '../models/Message';
import { ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.page.html',
  styleUrls: ['./messagerie.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MessageriePage implements OnInit {

  siConnecte : boolean = true;

  messageText : any;

  newMessage : Message;

  monId : number = 23455;

  private id_s : number;//Id_s est identifiant du compte a qui on envoi le message

  private Tableau_des_Messages_de_la_discussion : Message[] = [];

  private indexDesMessagesDansDiscussion : number;

  constructor(public navCtrl: NavController, private activatedRouter: ActivatedRoute,private compteService: CompteService) { 

    this.id_s = parseInt(this.activatedRouter.snapshot.paramMap.get("id"));

    console.log('id du compte sortant :',this.id_s);

    this.indexDesMessagesDansDiscussion =this.compteService.Ensemble_des_Discussions.findIndex(x  => x.id_compte_avec_qui_je_discute == this.id_s);

    console.log('Voic index :',this.indexDesMessagesDansDiscussion);

    console.log('Avant get, attribut :',this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].SiNouveauMessage); 

    this.getMessages();

    console.log(this.compteService.Ensemble_des_Discussions);
    
    setTimeout(() => {
                   console.log('Apres get, attribut :',this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].SiNouveauMessage);

                   if(this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].SiNouveauMessage == true){
                      console.log('Okay pour moi');


                      this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].SiNouveauMessage=false;

                    }

      }, 2000);

    
  }

  ngOnInit() {

  }


  sendMessage(){

    let dateDuMessage = new Date();

    //dateDuMessage = dateDuMessage.toISOString();

    this.newMessage = new Message(this.messageText,23455,new Date().toISOString());

    console.log(this.newMessage);

    this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].contenu_discussion.push(this.newMessage);


    //this.compteService.Tab_Message.push(this.newMessage);

    //console.log(this.compteService.Tab_Message);

    //this.newMessage = '';
   
    //this.Ma_fonction_Trie();
    
    console.log(this.compteService.Ensemble_des_Discussions);

    this.compteService.envoiMessage(23455,this.id_s,this.messageText,this.newMessage.dateEmittion);

     this.messageText= '';
  }

  async getMessages() {

    //this.compteService.Tab_Message.push(new Message("Je suis etranger ...",23456,new Date().toISOString()));

    //this.attendre();

    //le 1 er argument correspond a l'id du compte lui meme
    console.log('voici l\'index rechercher : ',this.indexDesMessagesDansDiscussion);
    await this.compteService.CheckAndGetNewMessage(903465,this.indexDesMessagesDansDiscussion);
    
  }

  Ma_fonction_Trie(){
    this.compteService.Tab_Message.sort(function compare(a,b){
      if(a.dateEmittion < b.dateEmittion )
        return -1;
      if(a.dateEmittion > b.dateEmittion )
        return 1;
      return 0;
    });
    
  }

  MessageAfficherOuPas(index){
    
  }

  async attendre(){
    setTimeout(() => {
                   console.log('Je suis entrain d\'attendre 2s');
                   //this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].contenu_discussion.push(new Message("Je me suis envoyer ce message",this.id_s,new Date().toISOString()));
      }, 2000);
  }

}
