var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const queryString = require('query-string');
var mood = require('../database-mongo/index');
var moodHelper = require('../database-mongo/moodHelper');
const config = require('../config');

var app = express();
app.use(bodyParser.json())
app.use(express.static('angular-client'))

const clientId = process.env.CLIENTID || config.clientId;
const userId = process.env.USERID || config.userId;

const PORT = process.env.PORT || 3000;
//used app.use(express.static... instead
// app.get('/', function(req, res){
//   res.redirect(path.join(__dirname, '../angular-client/index.html'));
//   // res.redirect(path.join(__dirname, '../angular-client/index.html'));
//   res.end();
// })
app.get('/moods', function (req, res) {
  mood.find()
  .then((allMoods) => {
    res.header(200).send(moodHelper.sortByTimesSearched(allMoods).slice(0, 5));
    res.end()
  })
  .catch((err) => {console.log('yah hit an error in your get req to /mood: ', err)});
});


app.post('/moods', function(req, res){
  console.log('good job, you hit moods!');
  //req.body.query is mood string]
    //need to convert it to correct code

 

  axios.get(`https://c1339077868.web.cddbp.net/webapi/json/1.0/radio/create?genre=36065&genre=36054&client=${clientId}&user=${userId}`,
  {
    // params: queryString.stringify({ 
    //   // genre: '36065',
    //   genre: [ '36065', '36054', '36056', '36063' ],
    //  client: config.clientId,
    //  user: config.userId}),
  }).then((response) => {
      console.log('your response is: ', response);
      const useableBody = response.data;
      const radioId = useableBody.RESPONSE[0].RADIO[0].ID
      console.log('the body in your new request is: ', useableBody);
      console.log('your new radio id should be...: ',radioId);


      moodHelper.createNew(req.body.query)
      .then((newMood) => {
        res.status(201).send(radioId);
        res.end();
      })
      .catch((err) => {
        console.log('yah hit an err trying to post to /moods: ', err);
      });

    })
    .catch((err) => {console.log('error in axios', err)});

  
});

app.listen(PORT, function() {
  console.log('listening on port 3000!');
});

