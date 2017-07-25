'use strict';
function testfn(){
  var AWS = require('aws-sdk');
  AWS.config.update({region:'us-east-1'});

  var creds = new AWS.Credentials('AKIAI24YOORKIQHQ6Z4Q', 'l+wH73m6BoqZZNQy9lmC4UhbYLOa+3FNFDGXf/iX');

  var support = new AWS.Support({credentials:creds});

  var params = {
    communicationBody: 'test ticket', /* required */
    subject: 'TEST CASE--Please ignore', /* required */
  };



  support.createCase(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

}

// //const express = require('express');
// const simpleOauthModule = require('simple-oauth2');

// const app = express();

// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))

// const oauth2 = simpleOauthModule.create({
//   client: {
//     id: '1000.GGXNNVQJA8OC0759779T38C4AT3OGD',
//     secret: 'd2966b8ed2e65ba05c3ce76220a63ef1cc74d21d61',
//   },
//   auth: {
//     tokenHost: 'https://accounts.zoho.com',
//     tokenPath: '/oauth/v2/token',
//     authorizePath: '/oauth/v2/auth',
//   },
// });

// // Authorization uri definition
// const authorizationUri = oauth2.authorizationCode.authorizeURL({
//   redirect_uri: 'https://sample-desk.herokuapp.com/callback',
//   scope: 'ZohoSupport.tickets.ALL',
//   state: '3(#0/!~',
// });

// // Initial page redirecting to Github
// app.get('/auth', (req, res) => {
//   console.log(authorizationUri);
//   res.redirect(authorizationUri);
// });

// // Callback service parsing the authorization token and asking for the access token
// app.get('/callback', (req, res) => {
//   const code = req.query.code;
//   const options = {
//     code,
//   };

//   oauth2.authorizationCode.getToken(options, (error, result) => {
//     if (error) {
//       console.error('Access Token Error', error.message);
//       return res.json('Authentication failed');
//     }

//     console.log('The resulting token: ', result);
//     const token = oauth2.accessToken.create(result);

//     return res
//       .status(200)
//       .json(token);
//   });
// });

// app.get('/success', (req, res) => {
//   res.send('');
// });

app.get('/', (req, res) => {
  testfn();
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.listen(app.get('port'), () => {
  console.log('Express server started on port 3000'); // eslint-disable-line
});
