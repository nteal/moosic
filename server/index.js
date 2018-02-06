var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const queryString = require('query-string');
var mood = require('../database-mongo/index');
var moodHelper = require('../database-mongo/moodHelper');
// const config = require('../config')

var app = express();
app.use(bodyParser.json())
app.use(express.static('angular-client'))

const clientId = process.env.CLIENTID || config.clientId;
const userId = process.env.USERID || config.userId;
const googleKey = process.env.GOOGLEKEY || config.googleKey;

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


// app.get('/vids', function(req, res) {
//   axios.get('')
//   .then((youtubeData) => {
//     console.log(youtubeData);
//     res.headder(200).send(youtubeData);
//   })
//   .catch((err) => {console.log('you got an err in your get vids: ', err)});
// })

app.post('/moods', function(req, res){
  console.log('good job, you hit moods!');
  //req.body.query is mood string]
    //need to convert it to correct code

  // const testData = config.fakeData.RESPONSE[0].ALBUM[0];
  // const testArtist = testData.ARTIST[0].VALUE;
  // const testTitle = testData.TITLE[0].VALUE;
  // console.log(testTitle + testArtist);
  // axios.get(`https://www.googleapis.com/youtube/v3/search?q=cute dogs&key=${googleKey}&part=snippet`)
  // .then((youtubeData) => {
  //   console.log(youtubeData);
  //   const videoId = youtubeData.data.items[0].id.videoId;
  //   console.log('your new url is: ', videoId);
  //   res.header(200).send(videoId);
  // })
  // .catch((err) => {console.log('you got an err in your get vids: ', err)});






  axios.get(`https://c1339077868.web.cddbp.net/webapi/json/1.0/radio/create?genre=36065&genre=36054&client=${clientId}&user=${userId}`,
  {
  }).then((response) => {
    console.log('your response is: ', response);
    const musicResponse = response.data;
    const radioId = musicResponse.RESPONSE[0].RADIO[0].ID;
    axios.get(`https://c1339077868.web.cddbp.net/webapi/json/1.0/radio/setting?radio_id=${radioId}&filter_mood=42949&client=${clientId}&user=${userId}`)
    .then((moodStation) => {
      const moodMusicResponse = moodStation.data;
      console.log('the body in your mood request is: ', moodMusicResponse);
      const moodMusicAlbum = moodMusicResponse.RESPONSE[0].ALBUM[0];
      
      //PUT YOUR YOUTUBE CALL HERE

      // const testData = config.fakeData.RESPONSE[0].ALBUM[0];
      const moodArtist = moodMusicAlbum.ARTIST[0].VALUE;
      const moodTitle = moodMusicAlbum.TITLE[0].VALUE;
      const moodSearch = moodTitle + ' ' + moodArtist
      
      console.log('mood search is: ', moodSearch);

      axios.get(`https://www.googleapis.com/youtube/v3/search?q=happy&key=${googleKey}&part=snippet`)
      // axios.get(`https://www.googleapis.com/youtube/v3/search?q=${moodSearch}&key=${googleKey}&part=snippet`)
      .then((youtubeData) => {
        console.log('yourube data is: ', youtubeData);
        const videoId = youtubeData.data.items[0].id.videoId;
        console.log('your new url is: ', videoId);
        // res.header(200).send(videoId);
        moodHelper.createNew(req.body.query)
        .then((newMood) => {
        res.status(201).send(videoId);
        res.end();
      })
      .catch((err) => {
        console.log('yah hit an err trying to post to /moods: ', err);
      })
      .catch((err) => {console.log('you got an err in your get vids: ', err)});
      
      });

    })
    .catch((err) => {console.log('ya hit an error trying to get the mood station', err)});

    })
    .catch((err) => {console.log('error in axios', err)});

  
});

app.listen(PORT, function() {
  console.log('listening on port 3000!');
});

