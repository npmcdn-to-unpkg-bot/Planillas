'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:CarrerasCtrl
 * @description
 * # CarrerasCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('CarrerasCtrl', function ($scope, URLS, $http2, $rootScope, ModelService) {
      $scope.especialidadModel = new ModelService.EspecialidadesModel();
  });
