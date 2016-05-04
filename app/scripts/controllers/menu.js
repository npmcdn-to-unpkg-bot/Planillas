'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('MenuCtrl', function ($rootScope, $modal, $log) {
        $rootScope.openModalProfile = function () {
            $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalProfile.html',
                controller: 'ModalProfileCtrl',
                size: 'md'
            });
        };

        $rootScope.openModalAbout = function () {
            $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalAbout.html',
                controller: 'ModalAboutCtrl',
                size: 'lg'
            });
        };

        $rootScope.openModalDatosPago = function () {
            $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalDatosPago.html',
                controller: 'ModalDatosPagoCtrl',
                size: 'lg'
            });
        };

        $rootScope.openModalUpdateMonto = function () {
            $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalUpdateMonto.html',
                controller: 'ModalUpdateMonto',
                size: 'md'
            });
        };

        $rootScope.modificarDocente = function (docente) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalUpdateDocente.html',
                controller: 'ModalUpdateDocente',
                size: 'md',
                resolve: {
                    docente: function () {
                        return docente;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $rootScope.generarPlanilla(1);
                $rootScope.GF.load_lista_docentes();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $rootScope.openModalNewDocente = function () {
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_lista_docentes(function () {
                $modal.open({
                    animation: true,
                    templateUrl: 'views/modals/ModalNewDocente.html',
                    controller: 'ModalNewDocente',
                    size: 'md'
                });
            });
        };

        $rootScope.openModalNewMateria = function (materia) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalNewMateria.html',
                controller: 'ModalNewMateria',
                size: 'md',
                resolve: {
                    materia: function () {
                        return angular.copy(materia);
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $rootScope.GF.load_lista_materias();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        $rootScope.openModalViewCourso = function (registro) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/modals/ModalViewCourse.html',
                controller: 'ModalViewCourse',
                size: 'md',
                resolve: {
                    registro: function () {
                        return angular.copy(registro);
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                //$rootScope.GF.load_lista_materias();
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };


    });
