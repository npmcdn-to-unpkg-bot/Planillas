'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:ContractsController
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('ContractsController', function ($scope, $rootScope, $API, $q, toastr, AuthService, URLS, $uibModal, $http, ModelService) {
        $scope.custom_list_docente = [];
        $scope.contracts_model = new ModelService.ContractModel();
        $scope.searchCustomDocente = function (search_value) {
            var data = {
                search: search_value,
                page_size: 10
            };
            data = $.extend({}, data, $scope.filter_contracts);
            (new $API.Docentes()).$get(data)
                .then(function (data) {
                    $scope.custom_list_docente = data['data'];
                });
        };

        $scope.filter_contracts = {gestion_academica: 0};
        $scope.contracts = [];

        $scope.load_contracts = function () {
            (new $API.Contratos()).$get($scope.filter_contracts)
                .then(function (data) {
                    $scope.contracts = data.data;
                });
        };


        AuthService.getUser()
            .then(function (user) {
                $scope.filter_contracts = {gestion_academica: user['gestion']['id']};
                $scope.contracts_model = new ModelService.ContractModel({
                    query_params: $scope.filter_contracts
                });
                $scope.load_contracts();
            });
    });
