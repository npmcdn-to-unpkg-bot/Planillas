'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:CarrerasCtrl
 * @description
 * # CarrerasCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('CarrerasCtrl', function ($scope, URLS, $http2, $rootScope, ModelService, AuthService) {
        AuthService.getUser().then(function () {
            if ($rootScope.GF.isRoot() || $rootScope.GF.isAdmin()) {
                $scope.especialidadModel = new ModelService.EspecialidadesModel({
                    editable: true,
                    delete: true
                });
            } else {
                $scope.especialidadModel = new ModelService.EspecialidadesModel({
                    editable: false,
                    delete: false,
                    add_new: false
                });
            }
        })
    });
