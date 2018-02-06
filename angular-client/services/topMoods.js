angular.module('app')
.service('itemsService', function($http) {
  this.getAll = function(callback) {
    $http.get('/moods')
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
});