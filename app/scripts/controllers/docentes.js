'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:DocentesCtrl
 * @description
 * # DocentesCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('DocentesCtrl', function ($scope, URLS, $http2, $rootScope, ModelService, AuthService) {

        AuthService.getUser().then(function (user) {
            if ($rootScope.GF.isRoot()) {
                $scope.docentesModel = new ModelService.DocentesModel({
                    editable: true,
                    delete: true,
                    default_fields: [{name: 'unidad_academica', value: 1}]
                });
            } else if ($rootScope.GF.isAdmin() || $rootScope.GF.isJefeCarrera()) {
                $scope.docentesModel = new ModelService.DocentesModel({
                    editable: true,
                    delete: true,
                    query_params: {unidad_academica: user['unidad_academica']['id']},
                    disabled_fields: ['unidad_academica'],
                    default_fields: [{name: 'unidad_academica', value: user['unidad_academica']['id']}]
                });
            } else {
                $scope.docentesModel = new ModelService.DocentesModel({
                    editable: false,
                    delete: false,
                    add_new: false,
                    query_params: {unidad_academica: user['unidad_academica']['id']},
                    disabled_fields: ['unidad_academica'],
                    default_fields: [{name: 'unidad_academica', value: user['unidad_academica']['id']}]
                });
            }
        });
    });
