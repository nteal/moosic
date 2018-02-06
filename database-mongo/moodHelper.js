const Mood = require('./index');


exports.createNew = function(query){
  //search for existing mood:
  return Mood.findOneAndUpdate({query: query}, { $inc: { timesSearched: 1}})
    .then((found) => {
      if(!found){
        const newMood = new Mood({query: query, timesSearched: 0});
        return newMood.save(function(err){
          if(err){
            console.log('ya hit an error trying to actually make a new mood: ', err);
          }
        })
      }
    })
    .catch((err) => {
      console.log('ya hit an error in findOneAndUpdate: ', err);
    })
}

const modelToObj = (model) => {
  return {query: model.query, timesSearched: model.timesSearched};
}

const addObjToSorted = (sortedArr, moodObj) => {
  if(sortedArr.length === 0){
    return [moodObj];
  }

  for(i = 0; i < sortedArr.length; i++){
    if(moodObj.timesSearched > sortedArr[i].timesSearched){
      return sortedArr.slice(0, i).concat(moodObj).concat(sortedArr.slice(i));
    } else if(i === sortedArr.length - 1){
      return sortedArr.concat(moodObj);
    }
  }
}

exports.sortByTimesSearched = (arrOfObjs) => {
  let sorted = [];
  arrOfObjs.forEach(mood => {
    sorted = addObjToSorted(sorted, mood);
  });
  return sorted;
}
