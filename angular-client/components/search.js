angular.module('app')
.component('search', {
  bindings: {
    // items: '<',
  },
  controller: function($http) {
    this.log = function() {
      console.log('You searched for', document.getElementById('input').value);
      //TODO: make http request here
      $http({
        method: "POST",
        //TODO: fix this to be more general (probably /moods at some point)
        // url: "localhost:3000/moods",
        url: "/moods",
        "Content-Type": "applicaiton/json",
        body: {"mood": "sad"},
      }).then((moodObj) => {
        console.log('you mood is: ', moodObj)
      }).catch((err) => {
        console.log('ya hit an err in http request in search.js');
      })

      document.getElementById('input').value = '';
    }
  },

  templateUrl: '/templates/search.html'
});