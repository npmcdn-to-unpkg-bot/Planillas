'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
