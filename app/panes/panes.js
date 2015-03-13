'use strict';

angular.module('myApp.panes', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:slug?', {
    templateUrl: 'panes/panes.html',
    controller: 'PanesCtrl'
  });
}])

.controller('PanesCtrl', ['$scope', '$location', function($scope, $location) {

  $scope.panes = [{
    url: '#/stables',
    title: 'Stables',
    class: 'stables'
  }, {
    url: '#/swimming-pool',
    title: '<span class="hidden-sm hidden-md">Swimming</span> Pool',
    class: 'pool'
  }, {
    url: '#/airfield',
    title: 'Airfield',
    class: 'airfield'
  }]

  $scope.paneClass = function(href) {
    console.log($location.path())
    console.log(['/', '/about', '/stables', '/swimming-pool', '/airfield'].indexOf($location.path()))
    if($location.path() === '/') {
      return ''
    }
    else if(href === '#' + $location.path()) {
      return 'active'
    }
    // If unknown
    else if(['/', '/about', '/stables', '/swimming-pool', '/airfield'].indexOf($location.path()) === -1) {
      return ''
    }
    else {
      return 'inactive'
    }
  }

}]);