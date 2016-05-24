'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:ContractsController
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('InvoicesController', function ($scope, ModelService, AuthService) {
        AuthService.getUser()
            .then(function () {
                $scope.invoice_model = new ModelService.FacturasModel();
            });
    });
