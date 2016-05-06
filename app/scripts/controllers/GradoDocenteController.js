'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:MateriasCtrl
 * @description
 * # MateriasCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('GradoDocenteController', function ($scope, URLS, $http2, $rootScope, ModelService, AuthService) {
        AuthService.getUser().then(function () {
            if ($rootScope.GF.isRoot() || $rootScope.GF.isAdmin() || $rootScope.GF.isJefeCarrera()) {
                $scope.grado_docente_model = new ModelService.GradoDocenteModel({
                    editable: true,
                    delete: true
                });
            } else {
                $scope.grado_docente_model = new ModelService.GradoDocenteModel({
                    editable: false,
                    delete: false,
                    add_new: false
                });
            }
        });
    });
