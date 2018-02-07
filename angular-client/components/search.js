angular.module('app')
.component('search', {
  bindings: {
    // items: '<',
  },
  controller: function($http, $sce) {
    // this.url='https://www.youtube.com/watch?v=';
    this.url= $sce.trustAsResourceUrl('https://www.youtube.com/embed/otnyM9RJG4o');

    this.getUrl = function(){
      const searchComp = this;
      return  $sce.getTrustedResourceUrl(searchComp.url);
    };

    this.player = function(url){
      $sce.trustAsResourceUrl(url)
    }
    

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
        searchComp.url = $sce.trustAsResourceUrl(`https://www.youtube.com/embed/${moodObj.data}`);
      })
      .catch((err) => {
        console.log('ya hit an err in http request in search.js', err);
      })

      document.getElementById('input').value = '';
    }
  },

  templateUrl: '/templates/search.html'
});