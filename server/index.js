var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json())
app.use(express.static('angular-client'))

//used app.use(express.static... instead
// app.get('/', function(req, res){
//   res.redirect(path.join(__dirname, '../angular-client/index.html'));
//   // res.redirect(path.join(__dirname, '../angular-client/index.html'));
//   res.end();
// })

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/moods', function(req, res){
  console.log('good job, you hit moods!');
  //req.body is json you want

  //add search to db, incremenet number if found

  //change this to send back the sound data (after retrieving sound data, and after adding search to db)
  res.status(201).send(req.body);
  res.end();
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

