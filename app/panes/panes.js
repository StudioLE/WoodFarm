'use strict';

angular.module('myApp.panes', ['ngRoute', 'ngSanitize', 'uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:pane?/:section?', {
    templateUrl: 'panes/panes.html',
    controller: 'PanesCtrl'
  });
}])

.controller('PanesCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

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
    // If current URL is home
    if($location.path() === '/') {
      return ''
    }
    // If pane matches the current URL
    else if(href === '#/' + $location.path().split('/')[1]) {
      return 'active'
    }
    // If current URL is unknown
    else if(['', 'about', 'stables', 'swimming-pool', 'airfield'].indexOf($location.path().split('/')[1]) === -1) {
      return ''
    }
    else {
      return 'inactive'
    }
  }

  $scope.partial = 'panes/partials/' + $routeParams.pane + '-' + $routeParams.section + '.html'

}]);