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
        $scope.eliminarDocente = function (docente) {
            $rootScope.openModalConfirm(function () {
                $http2.patch(URLS.LISTA_DOCENTES, {idDocente: docente.idDocente},
                    function (data) {
                        if (data.Success) {
                            $rootScope.GF.load_lista_docentes();
                        }
                    })
            }, function () {
            }, "ELIMINAR DOCENTE", "Seguro que desea eliminar docente?");
        };

        AuthService.getUser().then(function () {
            if ($rootScope.GF.isRoot() || $rootScope.GF.isAdmin() || $rootScope.GF.isJefeCarrera()) {
                $scope.especialidadModel = new ModelService.DocentesModel({
                    editable: true,
                    delete: true
                });
            } else {
                $scope.especialidadModel = new ModelService.DocentesModel({
                    editable: false,
                    delete: false,
                    add_new: false
                });
            }
        });
    });
