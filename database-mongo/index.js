var mongoose = require('mongoose');
// TODO: should test be changed to something else?
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  mood: String,
  timesSearched: Number
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
//TODO: probably need to either add more exports, or refactor to call thsi table somewhere else
module.exports.selectAll = selectAll;