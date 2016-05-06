'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:StartgestionCtrl
 * @description
 * # StartgestionCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('StartgestionCtrl', function ($scope, $rootScope, AuthService, URLS, StatusMessageService, $API, $http) {

        AuthService.getUser()
            .then(function (user) {
                $scope.new_gestion = {
                    gestion: 2015,
                    periodo_gestion: 'I',
                    unidad_academica: user.unidad_academica['id'],
                    especialidad: user.especialidad['id'],
                    iu: 12.5,
                    it: 3.0,
                    abierto: 1,
                    cA: 74,
                    cB: 65.8,
                    cC: 60.9,
                    cD: 56,
                    cL: 56,
                    oA: 70.5,
                    oB: 62.7,
                    oC: 58,
                    oD: 53.3,
                    oL: 53.3
                };
                $scope.iniciar_nueva_gestion = function (new_gestion) {
                    $http.post(URLS.START_GESTION, new_gestion)
                        .then(function (data) {
                            $rootScope.autoLogin({force: true});
                            toastr.success(data['data']['detail']);
                        }, function (data) {
                            StatusMessageService.showReject(data);
                        });
                };
                $scope.finalizar_gestion = function () {
                    $rootScope.openModalConfirm(
                        function () {
                            var data = {
                                gestion: $rootScope.CURRENT_USER['gestion']['gestion'],
                                periodo_gestion: $rootScope.CURRENT_USER['gestion']['periodo_gestion']
                            };

                            $http.post(URLS.FINISH_GESTION, data)
                                .then(function (data) {
                                    $rootScope.autoLogin({force: true});
                                    toastr.success(data['data']['detail']);
                                }, function (data) {
                                    StatusMessageService.showReject(data);
                                });
                        },
                        function (data) {
                        },
                        "FINALIZAR GESTIÓN", "Esta seguro de finalizar la Gestión académica \" " + $rootScope.GF.getFullGestionNamme() + " \" ?"
                    );
                };
            })
    });
