var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mysql  = require('mysql');
var cors= require('cors');


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
var app = express();
app.use(cors());

var services = JSON.parse(process.env.VCAP_SERVICES);
var mysql_creds = services['compose-for-mysql'][0].credentials;
var res = mysql_creds.uri.split(/\@|:|\//);
var connection = mysql.createConnection({
    host: res[5],
    port : res[6],
    user: "admin",
    password: res[4],
    database: "compose",
    debug: true
  });
/*
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'patisserie'
*/

var myRouter = express.Router(); 

myRouter.route('/bonjour')
.get(function(req,res){ 
	  res.json({
	  	message : "Youhou", methode : req.method});
})
myRouter.route('/gateau/:id') 
.get(function(req,res){ 
	res.json({
		message : "gateau n°" + req.params.id}); })

myRouter.route('/gateau')
.post(function(req,res){ 
	id= req.query.id;
	nom= req.query.nom;
	connection.connect();
	connection.query('insert into gateau values('+id+',"'+nom+'")', function (error, results, fields) {
		if (error) throw error;		
	});	
	connection.end();
	res.json({
		message : "Gateau ajouté"}); })


myRouter.route('/gateaux') 
.get(function(req,res,next){ 
	connection.connect();
	connection.query('SELECT * from gateau', function (error, results, fields) {
		if (error) throw error;
	res.json({
		message : results}); 
	});	
	
	connection.end(); })

app.use(myRouter); 
app.listen(port, host);
