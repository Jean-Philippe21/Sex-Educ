import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { CompteService } from '../compte.service';
import { Publication } from '../models/Publication';
import { Contenu } from '../models/Contenu';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-flux-video',
  templateUrl: './flux-video.page.html',
  styleUrls: ['./flux-video.page.scss'],
})
export class FluxVideoPage implements OnInit {

  constructor(private compteService: CompteService,private streamingMedia: StreamingMedia) { 
    let newPublication : Publication = new Publication(true,true,2021,'../../assets/icon/vvv.mp4', '../../assets/icon/jp_1.jpg', '../../assets/icon/jp_2.jpg','../../assets/icon/jp_1.jpg', '../../assets/icon/jp_1.jpg','Je suis dans un moode de ouf la franchement', 'localhost:8100/compte','../../assets/icon/avatar.svg','Jp_avoss', 'Publication Dynamic 3','Ceci est ma toute premiere publication llll, cree par mes soins !',false,true,false,true);

    newPublication.id = 88;

  }

  ngOnInit() {
    
  }

  maVideo(){

     let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: false
    };

    this.streamingMedia.playVideo('../../assets/icon/vvv.mp4', options);

  }

   

}
