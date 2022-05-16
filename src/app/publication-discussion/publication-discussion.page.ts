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
  selector: 'app-publication-discussion',
  templateUrl: './publication-discussion.page.html',
  styleUrls: ['./publication-discussion.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PublicationDiscussionPage implements OnInit {

  siConnecte : boolean = true;

  messageText : any;

  newMessage : Message;

  monId : number = 12355;

  private id_s : number;//Id_s est identifiant du compte a qui on envoi le message

  private id_publication : number;//Id de la publication sur laquelle est porté la discussion

  private Tableau_des_Messages_de_la_discussion : Message[] = [];

  private indexDesMessagesDansDiscussion : number;

  constructor(public navCtrl: NavController, private activatedRouter: ActivatedRoute,private compteService: CompteService) {

     this.id_s = parseInt(this.activatedRouter.snapshot.paramMap.get("id"));

      console.log('id du compte sortant :',this.id_s);

    this.id_publication = parseInt(this.activatedRouter.snapshot.paramMap.get("id_P"));

    console.log('VVVVOICI id_compte_auteur_de_publication:',this.id_s);

    console.log('VVVVOICI id_publication : ',this.id_publication);


    this.indexDesMessagesDansDiscussion =this.compteService.Ensemble_des_Discussions.findIndex(x  => x.id_publication_sur_laquelle_porte_la_discussion == this.id_publication);

    console.log('Voic index :',this.indexDesMessagesDansDiscussion);

    //console.log('Avant get, attribut :',this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].SiNouveauMessage); 

    this.getMessages();

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

  async getMessages() {

    //this.compteService.Tab_Message.push(new Message("Je suis etranger ...",23456,new Date().toISOString()));

    //this.attendre();

    //le 1 er argument correspond a l'id du compte lui meme
    console.log('voici l\'index rechercher : ',this.indexDesMessagesDansDiscussion);
    //await this.compteService.CheckAndGetNewMessage(903465,this.indexDesMessagesDansDiscussion);

    await this.compteService.CheckAndGetNewMessagePublicationDiscussion(this.monId,this.id_publication,this.id_s);
    
  }

  sendMessage(){

    let dateDuMessage = new Date();

    //dateDuMessage = dateDuMessage.toISOString();

    this.newMessage = new Message(this.messageText,this.monId,new Date().toISOString());

    console.log(this.newMessage);

    this.compteService.Ensemble_des_Discussions[this.indexDesMessagesDansDiscussion].contenu_discussion.push(this.newMessage);


    //this.compteService.Tab_Message.push(this.newMessage);

    //console.log(this.compteService.Tab_Message);

    //this.newMessage = '';
   
    //this.Ma_fonction_Trie();
    
    console.log(this.compteService.Ensemble_des_Discussions);

    //this.compteService.envoiMessage(this.monId,this.id_s,this.messageText,this.newMessage.dateEmittion);

    this.compteService.envoiMessageDiscussionPublication(this.monId,this.id_s,this.messageText,this.newMessage.dateEmittion,this.id_publication);

     this.messageText= '';
  }

}
