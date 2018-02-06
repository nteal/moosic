var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var mood = require('../database-mongo/index');
var moodHelper = require('../database-mongo/moodHelper');

var app = express();
app.use(bodyParser.json())
app.use(express.static('angular-client'))

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
  //req.body is json you want

  //add search to db, incremenet number if found
  moodHelper.createNew(req.body.query)
    .then((newMood) => {
      res.status(201).send(req.body);
      res.end();
    })
    .catch((err) => {
      console.log('yah hit an err trying to post to /moods: ', err);
    });
  //change this to send back the sound data (after retrieving sound data, and after adding search to db)

})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

