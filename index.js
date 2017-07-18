var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var https = require('https');

var ticketUrl = {
  host: 'desk.zoho.com',
  port: 443,
  path: '/api/v1/tickets/4000537054497?authtoken=8e0f373acc2e43ca95d8413e5f2537bb&orgId=4241905'
};

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.get('/tickets', function(request, response) {
	https.get(ticketUrl, function(response){		
  		console.log("Node app is running at Status:" + response.statusCode)
  		console.log("Node app is running at localhost:" + response)
  		response.on('data', function(chunk){
  	 		console.log('BODY: ' + chunk)
  	 		response.send("URL STATUS IS " + response.statusCode)
  		});
	}).on("error", function(e){
 		console.log("Got error: " + e.message);
	});
})

app.get('/oauth' , function(request, response){
	var oauthURL = {
		host: 'accounts.zoho.com',
		port: 443,
		path: '/oauth/v2/auth?response_type=code&client_id=1000.GGXNNVQJA8OC0759779T38C4AT3OGD&scope=ZohoSupport.tickets.ALL&redirect_uri=https://sample-desk.herokuapp.com/oauthrequest'
	}
	https.get(oauthURL, function(resp) {
		console.log("Node app is running at Status:" + resp.statusCode)
  		console.log("Node app is running at localhost:" + resp)
		resp.on('data', function(chunk){
  	 		console.log('BODY: ' + chunk)
  	 		resp.send("URL STATUS IS " + resp.statusCode)
  		});
	})
})

app.get('/oauthrequest', function(request, response){
	var code = request.query.code
	var redirectURL = {
		host : 'accounts.zoho.com',
		port : '443',
		method : 'POST',
		path : '/oauth/v2/token?grant_type=authorization_code&scope=ZohoSupport.tickets.ALL&client_id=1000.GGXNNVQJA8OC0759779T38C4AT3OGD&client_secret=d2966b8ed2e65ba05c3ce76220a63ef1cc74d21d61&redirect_uri=https://sample-desk.herokuapp.com/oauthrequest&code='+code
	}
	https.request(redirectURL, function(request, response) {
		response.on('data', function(chunk){
  	 		console.log('BODY: ' + chunk)
  	 		response.send("URL STATUS IS " + response.statusCode)
  		});
	})
	console.log(code);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
