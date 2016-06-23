'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:TracingController
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('TracingController', function ($scope, $API, $http, URLS) {
        $scope.tmp_filters = {
            docente: null,
            especialidad: null
        };

        $scope.filters = {docente: 1};
        $scope.custom_list_docente = [];
        $scope.custom_list_materias = [];

        $scope.searchCustomDocente = function (search_value) {
            var data = {
                search: search_value,
                page_size: 10
            };
            (new $API.Docentes()).$get(data)
                .then(function (data) {
                    $scope.custom_list_docente = data['data'];
                });
        };

        $scope.tracing_list = [];
        $scope.sum_total = 0;
        $scope.load_tracing = function () {
            $http.get(URLS.TRACING + "?docente=" + $scope.filters.docente)
                .then(function (data) {
                    $scope.tracing_list = data.data.data;
                    $scope.sum_total = 0;
                    for (var i = 0; (i < $scope.tracing_list.length); i++) {
                        $scope.sum_total +=$scope.tracing_list[i].liquido_pagable;
                        switch ($scope.tracing_list[i].numero_pago) {
                            case 1:
                                $scope.tracing_list[i].numero_pago = "Primer Pago";
                                break;
                            case 2:
                                $scope.tracing_list[i].numero_pago = "Segund Pago";
                                break;
                            case 3:
                                $scope.tracing_list[i].numero_pago = "Tercer Pago";
                                break;
                            case 4:
                                $scope.tracing_list[i].numero_pago = "Cuarto Pago";
                                break;
                            case 5:
                                $scope.tracing_list[i].numero_pago = "Quinto Pago";
                                break;
                            case 6:
                                $scope.tracing_list[i].numero_pago = "Sexto Pago";
                                break;
                            case 7:
                                $scope.tracing_list[i].numero_pago = "Septimo Pago";
                                break;
                            case 8:
                                $scope.tracing_list[i].numero_pago = "Octavo Pago";
                                break;
                            case 9:
                                $scope.tracing_list[i].numero_pago = "Noveno Pago";
                                break;
                        }
                    }
                }, function () {
                    toastr.warning("No se pudo conectar con servidor");
                })
        };

    });
