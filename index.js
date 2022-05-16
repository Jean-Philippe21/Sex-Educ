const  express = require('express');
const  bodyParser = require('body-parser');

//const	cors = require('cors');
const  app = express();
const  db = require('./queries');
const  port = 3000;
const  host = '217.160.13.112';

const  fs = require('fs');

const  https = require('https');


const allowedOrigins = [
	'capacitor://locahost',
	'ionic://locahost',
	'http://localhost',
	'http://localhost:8080',
	'http://192.168.1.34:8100',
	'http://192.168.1.27:3000'
];

/*const corsOptions = {
	origin: (origin, callback) => {
		if(allowedOrigins.includes(origin) || !origin){
			callback(null, true);
		}else{
			callback(new Error('Origin not allowed by CORS'));
		}
	}
}
*/
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})

);
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
//app.options('*',cors(corsOptions));

app.get('/',(request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' });
});

const  key = fs.readFileSync('/etc/letsencrypt/live/avossevou.eu/privkey.pem');
const  cert = fs.readFileSync('/etc/letsencrypt/live/avossevou.eu/fullchain.pem');
//let ssl =  devcert.certificateFor('avossevou.eu_ssl_certificate.cer');
const  server = https.createServer({key : key,cert : cert }, app);
//const  server = https.createServer(ssl, app);

//app.param(['Nom', 'Nom_User'],db.getUserBYNomNomUser);

app.get('/users/:id', db.getUsersPublication);
app.get('/users/non/:id', db.getUserById);
app.get('/users/story/:id', db.getUserStory);

app.get('/new/get/id/forCompte/',db.getNewId);

app.get('/recup/id/new/compte/:id',db.getVerifId);

app.get('/users/connexion/:mail/:Nom_User/:password', db.getUsersInfos_partie_1);

app.get('/users/connexion/:mail/:Nom_User/:password/:num_id_compte', db.getUsersInfos_partie_2);

app.post('/users/pro/',db.uploadImg,db.recupeImage);

app.post('/users/', db.createUser);

app.post('/users/n/', db.recupererIdapplication);

app.post('/users/publication/', db.enregistrerPublication);

app.post('/users/contenu/publication/', db.enregistreContenu);

app.post('/usersM/message/enregistreTemp/',db.enregistreMessage);

app.get('/usersM/message/DeliveryOkay/:isDelivery/:idMessage',db.UpdateStatusMessage);

app.get('/users/get/contenu/publication/:id/:id_publ',db.recupContenu);

app.get('/users/:Nom/:Nom_User', db.recupId);

app.get('/users/id/publication/:id', db.recupIdpublication);

app.get('/users/derniere/publication/:id', db.checkNewPublication);

app.get('/users/recup/new/publication/:id', db.recupNewPublication);

app.get('/users/get/imgOrvideoOrtext/:idcompte/:nom', db.sendContenu);

app.get('/Check/New/Message/:id_destinataire',db.checkNewMessage); //id_destinataire ici est pour vérifier si celui dont l'id est id_destinataire
//a de nouveaux messages ou pas ...

app.get('/Check/New/Message/JusteCheck/:id_destinataire',db.checkNewMessageJ);

app.get('/recup/all/publication/:id/:StatusLegal',db.recupAllPublication);

app.put('/users/:id', db.updateUser);
app.delete('/users/dl/:id', db.deleteUser);

server.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
