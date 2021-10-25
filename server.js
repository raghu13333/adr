const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const basicAuth = require('express-basic-auth');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const aws = require( 'aws-sdk' );
const cors = require("cors");
const mysql = require('mysql')
app.use(cors());

const dbs = require("./models");

dbs.sequelize.sync({ force: false }).then(() => {
	console.log("Drop and re-sync db.");
  });

  
  const db = mysql.createConnection({
    host: 'database-1.cinibtozq2y8.ap-southeast-1.rds.amazonaws.com',
    user:"admin",
    password:"Welcome#1",
    connectionLimit: 10,
    database: "new_schema"
})

db.connect(err => {
    if(err){
        throw err
    }
    console.log('MYSQL Connected')
})
/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

// We export the router so that the server.js file can pick it up
module.exports = router;

const profile = require( './routes/api/profile');

app.use( '/api/profile', profile );

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory
require('./db')();


if ( process.env.NODE_ENV === 'production' ) {
	// Set a static folder
	app.use( express.static( 'client/build' ) );
	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

}
const auth = basicAuth({
	users: {
	  admin: '123',
	  user: '456',
	},
  });


  const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	Bucket: process.env.AWS_BUCKET
});


  app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

  app.get('/authenticate', auth, (req, res) => {
	const options = {
	  httpOnly: true,
	  signed: true,
	};
  
	if (req.auth.user === 'admin') {
	  res.cookie('name', 'admin', options).send({ screen: 'admin' });
	} else if (req.auth.user === 'user') {
	  res.cookie('name', 'user', options).send({ screen: 'user' });
	}
  });
  app.get('/read-cookie', (req, res) => {
	if (req.signedCookies.name === 'admin') {
	  res.send({ screen: 'admin' });
	} else if (req.signedCookies.name === 'user') {
	  res.send({ screen: 'user' });
	} else {
	  res.send({ screen: 'auth' });
	}
  });
  
  app.get('/clear-cookie', (req, res) => {
	res.clearCookie('name').end();
  });

	app.get('/db',(req,res)=>{
		let sql ='select distinct dataset from new_schema.images'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/files', (req,res)=>{
		let id = req.signedCookies["name"];
	 let sql ="select *from new_schema.images where username ='user'" 
	 db.query(sql, (err,results) =>{
			if(err){
				throw err
			}
			 console.log(results)
			res.send(results);
		})
	})

	app.get('/pdata',(req,res)=>{
		
		let sql ='select *from new_schema.images'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/tables',(req,res)=>{
		let sql ='show tables'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/', function (req, res) {
		// Cookies that have not been signed
	  
		// Cookies that have been signed
		console.log('Signed Cookies: ', req.signedCookies.name)
	  })


// Set up a port
const port = process.env.PORT || 5000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );