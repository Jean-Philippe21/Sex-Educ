import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject;

  nomBDD: string = "compte.db";

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) {


  }

  async creerBDD(){

  	try{
      
  		this.db = await this.sqlite.create({ name: this.nomBDD, location: "default"});

  		const sqlCreateDatabase = this.creerTables();

  		const resultatCreationTables = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);

  		return resultatCreationTables ? true : false;
  	
    } catch (error){

  	}

  }

  creerTables(){
  	const sqls = [];

  	sqls.push("CREATE TABLE IF NOT EXISTS compte(Nom varchar(80), Sexe varchar(10), Age integer, Nom_User varchar(80), Type_Compte number,Photo_Profile character varying,Nombres_abonnee integer, Visibilite boolean, Admin_Visibilite boolean, Mot_de_passe varchar(80),Identification_Compte integer);");

    sqls.push("CREATE TABLE IF NOT EXISTS info_compte(majeurOupas boolean, voirOupasPublicationMajeur boolean, accordConditionUtilisation boolean,visibiliter boolean, Pays varchar(80),Tel integer);");

    sqls.push("CREATE TABLE IF NOT EXISTS info_compte_pro(Adresse_postal varchar(120), Theme_compte varchar(80), Prenom varchar(120),mail varchar(120));");

    sqls.push("CREATE TABLE IF NOT EXISTS info_publication(indice_derniere_publication integer);")

    sqls.push("CREATE TABLE IF NOT EXISTS PremiereConnexion(premiereConnexionOuPas boolean);")


  	return sqls.join("\n");
  }

  creerTableInfoCompte(){
    const sqls = [];

    sqls.push("CREATE TABLE IF NOT EXISTS info_compte(majeurOupas boolean, voirOupasPublicationMajeur boolean, accordConditionUtilisation boolean,visibiliter boolean, Pays varchar(80),Tel integer);");

    return sqls.join("\n");
  }

  creerTablesInfoForComptePro(){

    const sqls = [];

    sqls.push("CREATE TABLE IF NOT EXISTS info_compte_pro(Adresse_postal varchar(120), Theme_compte varchar(80), Prenom varchar(120),mail varchar(120));");

    return sqls.join("\n");

  }

  executerSQL(sql: string, params?: any[]){

      //this.db = this.sqlite.open({name:this.nomBDD,location:'default'});

  	    return this.db.executeSql(sql, params);
  }


}
