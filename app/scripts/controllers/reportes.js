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
        $scope.load_reports = function () {
            (new $API.Reportes()).$get($scope.filters)
                .then(function (data) {
                    $scope.reportes_data = data;
                });
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
                $scope.load_reports();
            });
    });
