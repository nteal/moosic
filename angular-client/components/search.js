angular.module('app')
.component('search', {
  bindings: {
    // items: '<',
  },
  controller: function($http) {
    this.log = function() {
      console.log('You searched for', document.getElementById('input').value);
      $http({
        method: "POST",
        url: "/moods",
        "Content-Type": "applicaiton/json",
        body: {"mood": "sad"},
      }).then((moodObj) => {
        console.log('your mood is: ', moodObj)
        //moodObj should be music object (of some sort)
        //TODO: do something you're supposed to with music object....
          //render to player tags?
      }).catch((err) => {
        console.log('ya hit an err in http request in search.js');
      })

      document.getElementById('input').value = '';
    }
  },

  templateUrl: '/templates/search.html'
});