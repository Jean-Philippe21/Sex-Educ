import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { Publication } from '../models/Publication';
import { Contenu } from '../models/Contenu';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx'; 
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
//import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-create-contenu',
  templateUrl: './create-contenu.page.html',
  styleUrls: ['./create-contenu.page.scss'],
})
export class CreateContenuPage implements OnInit {
  img_src: any;
  

  constructor(public compteService: CompteService,
              private camera: Camera,
              private fileTransfer: FileTransfer,
              private actionSheetController: ActionSheetController) { }

  private fileTransferObject: FileTransferObject = this.fileTransfer.create();

  async ngOnInit() {
      //await this.compteService.loadSaved();
  }
   /* 
  addPhotoToGallery(){
    this.compteService.addNewToGallery();
  }*/

  async ouvrirCameraGalerie() {   
     // Création d'un menu (sans fenêtre modale) 
     const actionSheet = await this.actionSheetController.create({ 
       // Titre de du menu 
       header: "Photo depuis galerie/caméra", 
       // Liste des options du menu 
       buttons: [ 
         // Prise de photo par la caméra 
         { 
           // Intitulé de l'option 
           text: "Caméra", 
           // Evénement associé 
           handler: () => { 
             // Prise d'une photo 
             this.ouvrirCamera(); 
           } 
         }, 
         // Extraction d'une photo depuis la galerie 
         { 
           // Intitulé de l'option 
           text: "Galerie", 
           // Evénement associé 
           handler: () => { 
             // Appel de la liste des photos 
             this.rechercherPhotoDansGalerie(); 
           } 
         }, 
         // Annulation 
         { 
           // Intitulé de l'option 
           text: "Annulation", 
           // Rôle 
           role: "cancel" 
         } 
       ] 
     }); 
     // Afffichage du menu 
     await actionSheet.present(); 
   }

    ouvrirCamera(){ 
  
       // Paramètres de la photo de la caméra 
       const cameraOptionsCamera: CameraOptions = { 
         // Résolution 
         quality: 100, 
         // Source (galerie) 
         sourceType: this.camera.PictureSourceType.CAMERA, 
         // Destination 
         destinationType: this.camera.DestinationType.FILE_URI, 
         // Type de codage (JPEG) 
         encodingType: this.camera.EncodingType.JPEG, 
         // Type de média 
         mediaType: this.camera.MediaType.PICTURE 
       } 
  
      // Prise de photo 
       this.camera.getPicture(cameraOptionsCamera) 
       .then((imageData) => 
       { 
         
        this.img_src ='data:image/jpeg;base64,' + imageData;
          
       }, 
       (erreur) => 
       { 
         alert(JSON.stringify("Erreur photo : " + erreur)); 
       }); 
     }

      rechercherPhotoDansGalerie() { 
  
       // Paramètres de la photo 
       const optionsPhotoGalerie: CameraOptions = { 
         // Résolution 
         quality: 100, 
         // Source (galerie) 
         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 
         // Destination 
         destinationType: this.camera.DestinationType.FILE_URI, 
         // Type de codage (JPEG) 
         encodingType: this.camera.EncodingType.JPEG, 
         // Type de média 
         mediaType: this.camera.MediaType.PICTURE 
       } 
  
       // Sélection d'une photo depuis la galerie 
       this.camera.getPicture(optionsPhotoGalerie) 
       .then((imageData) => 
       { 
         // Options du fichier généré 
         let fileUploadOptions: FileUploadOptions = 
         { 
           // Nom du fichier 
           fileName:imageData.substr(imageData.lastIndexOf('/') + 1) + "jpeg", 
           // Transfert en mode non fractionné 
           chunkedMode: false, 
           // Type MIME pour image 
           mimeType: "image/jpg" 
         } 
         // Transfert sur le serveur distant 
         this.fileTransferObject.upload( 
           imageData, 
           '../../assets/icon/'+imageData, 
           fileUploadOptions 
         ) 
         .then(() => 
         { 
           alert("Upload de la photo (galerie) : Réussi"); 
         }, (erreur) => { 
           alert(JSON.stringify("Erreur Upload : " + erreur)); 
         }) 
         //this.img_src = Capacitor.convertFileSrc(imageData);
         this.img_src = imageData;
         /*this.filePath.resolveNativePath(imageData)
            .then(filePath => this.img_src =filePath)*/
       }, 
       (erreur) => 
       { 
         alert(JSON.stringify("Erreur photo : " + erreur)); 
       });   
     }

     recupererNouvellePhotoSiExiste(){
          this.compteService.CheckSiNewPublication(23455);
     }

}
