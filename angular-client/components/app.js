angular.module('app')
.controller('AppCtrl', function(itemsService) {
  itemsService.getAll((data) => {
    this.items = data;
  });
})
.component('app', {
  bindings: {},
  // probably need to add folowing line:
  // controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});