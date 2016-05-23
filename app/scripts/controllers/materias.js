'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:MateriasCtrl
 * @description
 * # MateriasCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('MateriasCtrl', function ($scope, URLS, $http2, $rootScope, ModelService, AuthService) {
        $scope.eliminarMateria = function (mat) {
            $rootScope.openModalConfirm(function () {
                $http2.patch(URLS.LISTA_MATERIAS, {idMateria: mat.idMateria},
                    function (data) {
                        if (data.Success) {
                        }
                    });
            }, function () {
            }, 'ELIMINAR MATERIA', 'Seguro que desea eliminar materia?');
        };
        AuthService.getUser().then(function () {
            if ($rootScope.GF.isRoot() || $rootScope.GF.isAdmin() || $rootScope.GF.isJefeCarrera()) {
                $scope.materiasModel = new ModelService.MateriasModel({
                    editable: true,
                    delete: true
                });
            } else {
                $scope.materiasModel = new ModelService.MateriasModel({
                    editable: false,
                    delete: false,
                    add_new: false
                });
            }
        });
    });
