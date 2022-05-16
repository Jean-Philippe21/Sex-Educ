import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config-compte',
  templateUrl: './config-compte.page.html',
  styleUrls: ['./config-compte.page.scss'],
})
export class ConfigComptePage implements OnInit {

  constructor(private compteService: CompteService,public modalController: ModalController) { }

  ngOnInit() {
  }

  cacherMonCompte: string = "No";
  public Nom_Compte : string = "Amoussou (static)";
  public lien_image_compte : string = "../../assets/icon/jp_2.jpg";
  public cacher_mon_compte : string = "Cacher mon compte";
  public text_etat_compte : string = `Vous avez un compte en tant qu'utilisateur simple.Vous pouvez communiqué avec les créateurs de contenu.
                  Vous ne pouvez pas créer du contenu.
                  Vous ne pouvez que suivre des comptes.
                  Si vous êtes majeur et capable de produire du contenu instructif et positif, merci de créer un compte professionnel.`;

  public dismiss() {
      console.log('fvfvfvfvfrv');
      /*if (this.compteService.currentModal) {
        this.compteService.currentModal.dismiss().then(() => { this.compteService.currentModal = null; });
      }
      this.currentModal.dismiss({
        'dismissed' : true
      });*/
      this.modalController.dismiss();
  }

  public update(){
    console.log('voici la variable:',this.cacherMonCompte);
  }

}
