'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:EliminarregistrosCtrl
 * @description
 * # EliminarregistrosCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('EliminarregistrosCtrl', function ($scope, $rootScope, $http2, URLS, ModelService) {

        $scope.logs_model = new ModelService.LogsModel();
        $scope.gestiones_academicas_model = new ModelService.GestionesAcademicasModel();

        $rootScope.removeGestionAcademica = function (id) {
            $rootScope.openModalConfirm(function () {
                $http2.patch(URLS.GESTIONES_ACADEMICAS, {id: id},
                    function (data) {
                        if (data.Success) {
                            $rootScope.GF.load_gestiones_academicas();
                        }
                    })
            }, function () {
            }, "ELIMINAR GESTION ACADEMICA", "Seguro que desea eliminar registro de Gestion Academica?");
        };


        $rootScope.removeLogs = function (log) {
            $rootScope.openModalConfirm(function () {
                $http2.patch(URLS.LOGS, {id: log.id},
                    function (data) {
                        if (data.Success) {
                            $rootScope.GF.load_logs();
                        }
                    })
            }, function () {
            }, "ELIMINAR LOGS", "Seguro que desea eliminar registro?");
        };

        $rootScope.getLogReport = function (repor) {
            var report = angular.copy(repor);
            report.FileName = true;
            window.open(URLS.LOGS + '?' + $.param(report), "LOGS");
        }
    });
