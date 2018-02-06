angular.module('app')
.component('search', {
  bindings: {
    // items: '<',
  },
  controller: function($http) {
    this.url='https://www.youtube.com/watch?v=';
    // this.url='https://www.youtube.com/embed/';

    this.getUrl = function(){
      return $sce.trustAsHtml(`<iframe src=${this.url}></iframe>`);
    };

    this.log = function() {
      let searchComp = this;
      let newMood = document.getElementById('input').value;
      console.log('You searched for', newMood);
      
      $http({
        method: "POST",
        url: "/moods",
        headers:{"Content-Type": "application/json"},

        data: {query: newMood},
      })
      .then((moodObj) => {
          console.log('your new url is: ', searchComp.url+moodObj.data);
          searchComp.url = searchComp.url+moodObj.data;
      })
      .catch((err) => {
        console.log('ya hit an err in http request in search.js', err);
      })

      document.getElementById('input').value = '';
    }
  },

  templateUrl: '/templates/search.html'
});