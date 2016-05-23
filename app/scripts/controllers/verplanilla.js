'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:VerplanillaCtrl
 * @description
 * # VerplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('VerplanillaCtrl', function ($scope, $rootScope, AuthService) {
        $scope.general_disable_items = {
            gestion: true,
            periodo_gestion: true
        };
        AuthService.getUser()
            .then(function () {
                if (!$rootScope.GF.isSecretaria()) {
                    $scope.$broadcast('active_editable_payroll');
                } else {
                    $scope.$broadcast('disable_editable_payroll');
                }
            });
    });


