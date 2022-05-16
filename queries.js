const Pool = require('pg').Pool

const pool = new Pool({
	user: 'imsp_remote',
	host: '217.160.13.112',
	database: 'sex_educ',
	password: 'imsp',
	port: 5436
});

const  fs = require('fs');


const getUsersPublication = (request, response) => {
	const id_compte_auteur = parseInt(request.params.id);

	pool.query('select *from Publication where id_compte_auteur = $1', [id_compte_auteur],(error, results)=>{
		if(error){
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const recupAllPublication = (request, response) => {
	const id_limite = parseInt(request.params.id);

	const Statut_legal = parseInt(request.params.StatusLegal);

	if (Statut_legal == 1 && id_limite == 0) {


				pool.query('select *from Publication where age_legal= true', [],(error, results)=>{
				if(error){
					throw error
				}

				console.log('All Publication :',results.rows);
				response.status(200).json(results.rows)
			})

	}

	if (Statut_legal == 0 && id_limite == 0 ) {

				pool.query('select *from Publication where age_legal= false', [],(error, results)=>{
				if(error){
					throw error
				}
				response.status(200).json(results.rows)
			})

	}

	if (Statut_legal == 1 && id_limite > 0) {

				pool.query('select *from Publication where age_legal= true and id > $1 ', [id_limite],(error, results)=>{
				if(error){
					throw error
				}
				response.status(200).json(results.rows)
			})
	}

	if (Statut_legal == 0 && id_limite > 0) {

				pool.query('select *from Publication where age_legal= false and id > $1 ', [id_limite],(error, results)=>{
				if(error){
					throw error
				}
				response.status(200).json(results.rows)
			})

	}

	
}

const sendContenu = (request, response) =>{
	var path = request.params.idcompte.toString()+"/"+request.params.nom;
	console.log('Voici le chemin de l\'image:',path);

	response.download(path);
}

const getVerifId =(request, response)=> {
	const Identification_Compte = parseInt(request.params.id)

	//select (Nom, Sexe, Age, Nom_User, Type_Compte, Photo_Profile, Nombre_abonnee, Visibilite, Admin_Visibilite, Identification_Compte, Mot_de_passe, Langue, Pays) from compte where Identification_Compte= $1
	console.log('Je verifie si cette id existe :');
	if (Identification_Compte == NaN) {

	}else{
			pool.query('select Age from compte where Identification_Compte= $1', [Identification_Compte], (error, results) =>{
			if(error){
				throw ereror 
			}

			console.log(results.rows);

			response.status(200).json(results.rows)
		})
	}
	
}

const getUserById = (request, response)=> {
	const Identification_Compte = parseInt(request.params.id)

	//select (Nom, Sexe, Age, Nom_User, Type_Compte, Photo_Profile, Nombre_abonnee, Visibilite, Admin_Visibilite, Identification_Compte, Mot_de_passe, Langue, Pays) from compte where Identification_Compte= $1
	console.log('ooo',Identification_Compte);
	if (Identification_Compte == NaN) {

	}else{
			pool.query('select Sexe, Age, Nom_User, Photo_Profile, Nombre_abonnee, Identification_Compte, Langue, Pays from compte where Identification_Compte= $1', [Identification_Compte], (error, results) =>{
			if(error){
				throw ereror 
			}

			console.log(results.rows);

			response.status(200).json(results.rows)
		})
	}
	
}

const getUserStory = (request, response)=> {
	const Identification_Compte = parseInt(request.params.id)

	pool.query('select *from Story where Story.lien = $1', [Identification_Compte], (error, results) =>{
		if(error){
			throw ereror 
		}

		response.status(200).json(results.rows)
	})
}

const getNewId = (request, response)=> {
	
	const nombreFactice = 2;

	pool.query('insert into  tableGenereIdPourCompteNonPro(nombre) values ($1)', [nombreFactice], (error, results) => {
		if(error){
			throw error
		}

		
	})


	setTimeout(function(){
					
					pool.query('select (newId) from tableGenereIdPourCompteNonPro order by newId DESC limit 1', (error, results) =>{
						if(error){
							throw ereror 
						}

                                                console.log(results.rows[0]['newid']);

						response.status(200).json(results.rows[0]['newid'])
					})
					
			},2000);

	
}


const createUser = (request, response)=> {

	const type_de_compte;

	const { Nom, Sexe, Age, Nom_User,Type_Compte, Identification_Compte, Mot_de_passe, Langue,Pays, Tel, Prenom, Mail, Adresse_postal, Theme_compte  } = request.body

	pool.query('insert into  Compte(Nom,Sexe,Age,Nom_User,Type_Compte, Identification_Compte ,Mot_de_passe, Langue,Pays) values ($1, $2, $3, $4,$5,$6,$7,$8,$9)', [Nom, Sexe, Age, Nom_User, Type_Compte ,Identification_Compte,Mot_de_passe, Langue, Pays], (error, results) => {
		if(error){
			throw error
		}

		
	})

	type_de_compte = Type_Compte;

	const si_majeur = Age;

	var Statut_legal;

	if (si_majeur > 17) {
		 Statut_legal= 'true';
	}else{
		 Statut_legal = 'false';
	}

	pool.query('insert into  Info_personnel(Mail, Numero_tel, Theme, Adresse_postale, Statut_legal, Numero_identification) values ($1, $2, $3, $4,$5,$6)', [Mail,Tel,Theme_compte,Adresse_postal,Statut_legal,Identification_Compte], (error, results) => {
		if(error){
			throw error
		}

		var js = JSON.stringify(`Utilisateur est ajouter avec id:`)

		response.status(201).send(js)
	})
	

	//On ne créer le dossier pour le compte que si celui ci est un compte pro

	if ((Statut_legal=='true') && (type_de_compte==1) ) {

		fs.mkdir(Identification_Compte.toString(), function(error){
			if (error) {
					console.log('échec de création du répertoire', error);
			}else{
					console.log('répertoire créé');
			}
		});
		
	}


}
const enregistrerPublication = (request, response)=> {

	const { Age_legal, Visibiliter, id_compte_auteur, Video, Image, Image1, Image2, Image3, Text, lien, nom_profile, titre_publication, commentaire_auteur, lk, etiquete_photo, etiquete_text, etiquete_video } = request.body

	console.log(request.body);

	console.log(id_compte_auteur);

	var id_contenu;

	pool.query('insert into  Publication(Age_legal,Visibiliter,id_compte_auteur) values ($1, $2, $3)', [Age_legal, Visibiliter, id_compte_auteur], (error, results) => {
		if(error){
			throw error
		}

		//var answer = JSON.stringify(`Publication creer !`)

		//response.status(201).send(answer)
	})

	setTimeout(function(){
			pool.query('select *from Publication where id_compte_auteur = $1 order by id DESC limit 1', [id_compte_auteur], (error, results) =>{
			if(error){
				throw ereror 
			}

			id_contenu = results.rows[0].id;
			//response.status(200).json(results.rows)

			//var answer = JSON.stringify(`Publication creer !`)

			//response.status(201).send(answer)
		})
		console.log('waiting...');

			setTimeout(function(){
					
					console.log(id_contenu);

						pool.query('insert into  Contenu(Video,Image,Image1,Image2,Image3,Text,lien,id_contenu,id_compte_auteur, Titre_publication, Commentaire_auteur, lke) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [Video, Image, Image1, Image2, Image3, Text, lien, id_contenu, id_compte_auteur, titre_publication, commentaire_auteur, lk], (error, results) => {
						if(error){
							throw error
						}

						//var answer = JSON.stringify(`Contenu et Publication enregistrer !`)

						//response.status(201).send(answer)
						})
			},2000);

			setTimeout(function(){
					
					console.log(id_contenu);
					var isCheck = false;

						pool.query('insert into  CheckUpPublication(id_compte_auteur, id_publication, isCheckup) values ($1, $2, $3)', [id_compte_auteur, id_contenu, isCheck], (error, results) => {
						if(error){
							throw error
						}

						var answer = JSON.stringify(`Contenu et Publication enregistrer !`)

						response.status(201).send(answer)
						})
			},1000);

	},1000);



	
}

const checkNewPublication = (request, response)=> {
	console.log('Je suis dans la fonction checkNewPublication');
	//const { Nom, Nom_User } = request.body
	const id_auteur = parseInt(request.params.id);
	const siDejaRecuperer = false;

	pool.query('select  *from CheckUpPublication where id_compte_auteur = $1 and isCheckup = $2', [id_auteur, siDejaRecuperer], (error, results) => {
		if(error){
			throw error
		}

		console.log(results.rows);
		response.status(200).json(results.rows)
	})

	pool.query('update checkUpPublication set ischeckup = true where id_compte_auteur=$1 and ischeckup = $2', [id_auteur, siDejaRecuperer], (error, results) => {
		if(error){
			throw error
		}

	})

}

const checkNewMessage = (request, response)=> {

	console.log('Je suis dans la fonction checkNewMessage');
	
	const id_auteur = parseInt(request.params.id_destinataire);
	var siNewMessage = false;

	pool.query('select  *from DiscussionMessage where id_compte_destinateur = $1  and isdelivery = false', [id_auteur], (error, results) => {
		if(error){
			throw error
		}

		if (results.rows.length > 0) {
			console.log(results.rows);
			siNewMessage = true;
			
			response.status(200).json(results.rows);
			
		}else{
			console.log(results.rows);
			response.status(200).json('false');//Pas de nouveau Message
		}
		
	})

}

const checkNewMessageJ = (request, response)=> {

	console.log('Je suis dans la fonction checkNewMessageJ...');
	
	const id_auteur = parseInt(request.params.id_destinataire);
	var siNewMessage = false;

	pool.query('select  (id_compte_auteur) from DiscussionMessage where id_compte_destinateur = $1  and isdelivery = false', [id_auteur], (error, results) => {
		if(error){
			throw error
		}

		if (results.rows.length > 0) {
			//console.log(results.rows);
			siNewMessage = true;
			
			response.status(200).json(results.rows);
			
		}else{
			console.log(results.rows);
			response.status(200).json('false');//Pas de nouveau Message
		}
		
	})

}

const UpdateStatusMessage = (request, response)=> {

	console.log('Update isDelivery');
	
	const id_message = parseInt(request.params.idMessage);
	//const idDelivery = request.params.isDelivery;
	//const {idDelivery,id_message } = request.body;
	//var siNewMessage = false;

	console.log(id_message);
	console.log(request.params.isDelivery);

	if (request.params.isDelivery) {

			pool.query('update DiscussionMessage set isdelivery = true where id = $1', [id_message], (error, results) => {
			if(error){
				throw error
			}

			
			var answer = JSON.stringify(`true`)

			response.status(201).send(answer)
			
		})

	}

	

} 

const recupNewPublication = (request, response)=> {

	const id_publication_and_contenu = parseInt(request.params.id);
	

	pool.query('select *from (Publication join Contenu on Publication.id = Contenu.id_contenu) where Publication.id=$1', [id_publication_and_contenu], (error, results) => {
		if(error){
			throw error
		}

		console.log(results.rows);
		response.status(200).json(results.rows)
	})
}


const recupererIdapplication = (request, response)=> {
	//const { Nom, Nom_User } = request.body
	const Nom = request.body.Nom
	const Nom_User = request.body.Nom_User
	//const Nom = 'AVOSSEVOU'
	//const Nom_User = 'Jp_avoss'

	pool.query('select Identification_Compte from Compte where Nom = $1 and Nom_User = $2', [Nom, Nom_User], (error, results) => {
		if(error){
			throw error
		}

		response.status(200).json(results.rows)
	})
}
const recupIdpublication = (request, response)=> {
	const id_compte_auteur = parseInt(request.params.id)

	pool.query('select *from Publication where id_compte_auteur = $1 order by id DESC limit 1', [id_compte_auteur], (error, results) =>{
		if(error){
			throw ereror 
		}

		response.status(200).json(results.rows)
	})
}

const recupContenu = (request, response)=> {
	const id = parseInt(request.params.id)

	const id_pub = parseInt(request.params.id_publ)

	pool.query('select *from Contenu where id_compte_auteur = $1 and id_contenu = $2', [id,id_pub], (error, results) =>{
		if(error){
			throw ereror 
		}

		response.status(200).json(results.rows)
	})
}

const getUsersInfos_partie_1 = (request, response)=> {
	const mail = request.params.mail

	const Nom_User = request.params.Nom_User

	const password = request.params.password

	var num_id_compte;

	pool.query('select Identification_Compte from Compte where Nom_User=$1 and Mot_de_passe=$2', [Nom_User,password], (error, results) =>{
		if(error){
			
			throw ereror 
		}

		if (results.rows.length > 0) {

				num_id_compte = results.rows[0]['identification_compte'];

				if (num_id_compte > 0) {
				
					console.log(num_id_compte);

					var js = JSON.stringify(num_id_compte)

					response.status(201).send(js)			
				}else{

					num_id_compte = -229;

					var js = JSON.stringify(num_id_compte)

					response.status(201).send(js)
				}

		}else{
			num_id_compte = -229;

					var js = JSON.stringify(num_id_compte)

					response.status(201).send(js)
		}




	})

	/*setTimeout(function(){
		console.log('apres');
	},50);*/


	
}

const getUsersInfos_partie_2 = (request, response)=> {
	const mail = request.params.mail

	const Nom_User = request.params.Nom_User

	const password = request.params.password

	var num_id_compte = request.params.num_id_compte;

	//num_id_compte = 23455;

	if (num_id_compte > 0) {

			pool.query('select *from Compte JOIN Info_personnel On  Info_personnel.numero_identification=$1 where  Compte.Nom_User=$2 and Compte.Mot_de_passe=$3 and Info_personnel.mail=$4', [num_id_compte,Nom_User,password,mail], (error, results) =>{
			if(error){
				throw ereror 
			}

			var js = JSON.stringify(results.rows)

			response.status(201).send(js)

			//response.status(200).json(results.rows)
		})
	}else{
			var js = JSON.stringify('-229')

			response.status(201).send(js)		
	}

	
}


const enregistreContenu = (request, response)=> {
	const { Video, Image, Image1, Image2, Image3, Text, lien, id_contenu, id_compte_auteur } = request.body

	pool.query('insert into  Contenu(Video,Image,Image1,Image2,Image3,Text,lien,id_contenu,id_compte_auteur) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [Video, Image, Image1, Image2, Image3, Text, lien, id_contenu, id_compte_auteur], (error, results) => {
		if(error){
			throw error
		}

		var answer = JSON.stringify(`Contenu enregistrer !`)

		response.status(201).send(answer)
	})
}

const enregistreMessage = (request, response) => {

	const { Contenu, id_compte_auteur, id_compte_sortant, dateEmittion } = request.body

	var dateEmittionAvecBonneMiseEnForme = dateEmittion.toString();

	var id_compte_auteur_Int = parseInt(id_compte_auteur);

	var id_compte_sortant_Int = parseInt(id_compte_sortant);

	var id_message_enregistrer;

	console.log('la date recu :',dateEmittion);
	console.log('Contenu :',Contenu);
	console.log('id_compte_auteur :',id_compte_auteur_Int);
	console.log('id_compte_sortant:',id_compte_sortant_Int);

	var isdelivery = false;

	/*

	pool.query('insert into  Message(contenu, date_emition) values ($1, $2) RETURNING id_message', [Contenu, dateEmittionAvecBonneMiseEnForme], (error, results) => {
		if(error){
			throw error
		}

		console.log('L\'id du Message :',results.rows[0]['id_message']);

		id_message_enregistrer = results.rows[0]['id_message']

		//var answer = JSON.stringify(`Contenu enregistrer !`)

		//response.status(201).send(answer)
	}) 

	setTimeout(function(){
					
				pool.query('insert into  Discussion(id_compte_auteur, id_compte_destinateur,id_Message) values ($1, $2, $3)', [id_compte_auteur_Int,id_compte_sortant_Int,id_message_enregistrer], (error, results) => {
				
				if(error){
					throw error
				}

				//console.log('L\'id du Message :',results.rows[0]['id_message']);

				//id_message_enregistrer = results.rows[0]['id_message']

				var answer = JSON.stringify(`Contenu enregistrer !`)

				response.status(201).send(answer)
			})					
					
			},2000);*/

	pool.query('insert into  DiscussionMessage(id_compte_auteur, id_compte_destinateur,contenu, date_emition, isdelivery) values ($1, $2, $3, $4, $5)', [id_compte_auteur_Int,id_compte_sortant_Int,Contenu,dateEmittion,isdelivery], (error, results) => {
				
				if(error){
					throw error
				}

				var answer = JSON.stringify(`Contenu enregistrer !`)

				response.status(201).send(answer)
			})	



}

const multer = require('multer');

const storage = multer.diskStorage({

			destination: function(req, file, cb){
				//cb(null, 'uploads/');
				cb(null, req.body.idUser.toString()+"/");
				console.log(req.body.idUser);

			},
			filename: function(req, file, cd){
				cd(null, file.originalname);
			}

});


const uploadImg = multer({storage: storage}).single('image_1');

//*************************************** On va voir *******************************************************


//**********************************************************************************************************

const recupeImage = (req, res) => {

	const { idUser } = req.body

	console.log('coucou');

		var answer = JSON.stringify(`Contenu enregistrer !`)

		res.status(201).send(answer)
	
		console.log(idUser);


	//res.send('OK');
		
		//const file = fs.createWriteStream('image/photo.jpg', { flags: "wx"});
		/*const  fs = require('fs');

		fs.createReadStream(request.body).pipe(fs.createWriteStream("photo.jpg"));

		/*fs.writeFileSync("test.jpg",request.body,"binary",function(error){
			if (error) {
				throw error;
			}

			response.status(201).send('OK');
		})	*/

}

const recupId = (request, response)=> {
	const Nom = request.params.Nom

	const Nom_User = rerequest.params.Nom_User

	console.log('Nom=%s et Nom_User=%s',Nom,Nom_User)

	pool.query('select Identification_Compte from Compte where Nom = $1 and Nom_User= $2', [Nom,Nom_User], (error, results) =>{
		if(error){
			throw error 
		}

		var answer = JSON.stringify(`Recuperation de Id`)

		response.status(201).send(answer)
	})
}




const putUser = (request, response)=> {
	const idd = parseInt(request.params.id)

	const { nom, contenu, tag, id } = request.body

	pool.query('insert into oo (nom, contenu,tag, id) values ($1, $2, $3, $4)', [nom, contenu, tag, id], (error, results) => {
		if(error){
			throw error
		}

		var answer = JSON.stringify(`Utilisateur a ajouter avec id: ${idd}`)

		response.status(201).send(answer)
	})
}

const updateUser = (request, response)=> {
	const id = parseInt(request.params.id)

	const { nom, contenu, tag } = request.body

	pool.query('insert into oo (nom, contenu,tag, id) values ($1, $2, $3, $4)', [nom, contenu,tag, id], (error, results) => {
		if (error) {
			throw error
		}

		var answer = JSON.stringify(`Update effectuer !`)

		response.status(200).send(answer)
      
	})
}

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('delete from Compte where id = $1', [id], (error, results) =>{
		if (error) {
			throw error
		}

		var answer = JSON.stringify(`Utilisateur supprimer`)

		response.status(200).send(answer)
	})
}

module.exports = {
	getUsersPublication,
	getUserById,
        getVerifId,
	getUserStory,
	createUser,
	updateUser,
	deleteUser,
	recupId,
	recupererIdapplication,
	enregistrerPublication,
	recupIdpublication,
	enregistreContenu,
	recupContenu,
	getUsersInfos_partie_1,
	getUsersInfos_partie_2,
	recupeImage,
	uploadImg,
	checkNewPublication,
	recupNewPublication,
	sendContenu,
	enregistreMessage,
	checkNewMessage,
	UpdateStatusMessage,
	checkNewMessageJ,
	recupAllPublication,
	getNewId,
	
}
