'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:PayrollPaymentsController
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('PayrollPaymentsController', function ($scope, $rootScope, $API, $q, toastr, AuthService, ModelService) {
        $scope.payroll_paymemts = [];
        $scope.payroll_paymemts_model = ModelService.PagosPlanillasModel();

        $scope.load_payroll_payments = function () {
            (new $API.PagosPlanillas()).$get()
                .then(function (data) {
                    $scope.payroll_paymemts = data.data;
                });
        };
        AuthService.getUser()
            .then(function () {
                $scope.load_payroll_payments();
            });
    });
