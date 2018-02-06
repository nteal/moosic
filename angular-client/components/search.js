angular.module('app')
.component('search', {
  bindings: {
    // items: '<',
  },
  controller: function($http) {
    this.log = function() {
      let newMood = document.getElementById('input').value;
      console.log('You searched for', newMood);
      $http({
        method: "POST",
        url: "/moods",
        headers:{"Content-Type": "application/json"},

        data: {query: newMood},
      }).then((moodObj) => {
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