import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComptePage } from './compte/compte.page';
import { InscriptionPagePage } from './inscription-page/inscription-page.page';
import { CompteService } from './compte.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './database.service';
import { CreateContenuPage } from './create-contenu/create-contenu.page';
import { HTTP } from '@ionic-native/http/ngx'; 

import { RequestService } from './service/request.service';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { Camera } from '@ionic-native/camera/ngx'; 
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
//import { FilePath } from '@ionic-native/file-path/ngx';
import { FluxVideoPage } from './flux-video/flux-video.page';
import { MessageriePage } from './messagerie/messagerie.page';
import { ParametrePage } from './parametre/parametre.page';
import { PreMessageriePage } from './pre-messagerie/pre-messagerie.page';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ConfigComptePage } from './config-compte/config-compte.page';
import { PublicationDiscussionPage } from './publication-discussion/publication-discussion.page';
import { VerificationInfosConnexionPage } from './verification-infos-connexion/verification-infos-connexion.page';

import { OrderModule } from 'ngx-order-pipe';
import { File } from '@ionic-native/file/ngx';
import { LocalDataBaseService } from './service/local-data-base.service';
import { VariableDeCommunicationService } from './service/variable-de-communication.service';


@NgModule({
  declarations: [AppComponent, ComptePage, InscriptionPagePage, CreateContenuPage,FluxVideoPage,MessageriePage,ParametrePage,PreMessageriePage, ConfigComptePage,PublicationDiscussionPage,VerificationInfosConnexionPage],
  entryComponents: [ComptePage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, OrderModule],
  providers: [
    StatusBar,
    SplashScreen,
    CompteService,
    RequestService,
    DatabaseService,
    LocalDataBaseService,
    VariableDeCommunicationService,
    SQLite,
    SQLitePorter,
    HTTP,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera, 
    FileTransfer,
    StreamingMedia 

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
