'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:ReportesCtrl
 * @description
 * # ReportesCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('ReportesCtrl', function ($scope, $rootScope, URLS, $http, $log, $API, AuthService) {
        $scope.reportes_data = {};
        $scope.filters = {};
        $scope.path_report_item = URLS.ITEM_REPORTES;
        $rootScope.GF.load_unidades_academicas();
        $scope.load_reports = function () {
            (new $API.Reportes()).$get($scope.filters)
                .then(function (data) {
                    $scope.reportes_data = data;
                });
        };

        $scope.enable_fields = {
            download_xls: false,
            delete_register: false,
            filter_unidad_academica: false
        };
        AuthService.getUser()
            .then(function (user) {
                $scope.filters = {
                    unidad_academica: user['gestion']['unidad_academica'],
                    search: null,
                    page_size: 10,
                    page: 1,
                    is_complete_serializer: 1
                };
                if ($rootScope.GF.isRoot()) {
                    $scope.enable_fields.filter_unidad_academica = true;
                }
                if ($rootScope.GF.isAdmin() || $rootScope.GF.isRoot() || $rootScope.GF.isJefeCarrera()) {
                    $scope.enable_fields.download_xls = true;
                    $scope.enable_fields.delete_register = true;
                }
                $scope.load_reports();
            });
    });
