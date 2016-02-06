'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:GenerarplanillaCtrl
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('PayrollController', function ($scope, $rootScope, $API, $filter, toastr, $uibModal, ModelService) {


        /*
         CI: "3567257 Or"
         Categoria: "B"
         CuentaBancaria: "1423414"
         Factura: 1
         Grado: "Egr"
         HorasSemanales: 1
         Pensul: 2
         Tipo: "Practica"
         idDocente: 83
         idEspecialidad: ""
         idMateria: 67
         idUnidadAcademica: ""
         */
        $scope.td_SpesialtyActive = false;
        $scope.td_ReimbursementActive = false;
        $scope.editPayroll = false;

        $scope.isSearchCollapsed = false;
        $scope.isNewPayrollCollapsed = false;

        $scope.PayrollDetail = [];

        //
        $scope.modelTeacher = new ModelService.DocentesModel();
        $scope.modelMatter = new ModelService.MateriasModel();


        $scope.openModalEdit = function (Model, rowItem) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/crud/modals/myModalContent.html',
                controller: 'ModalCrudController',
                size: 'md',
                resolve: {
                    Model: function () {
                        return Model;
                    },
                    rowItem: function () {
                        return rowItem;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
            return modalInstance.result;
        };

        $scope.openModalCreate = function (Model) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/crud/modals/crudModalCreate.html',
                controller: 'ModalCreateCrudController',
                size: 'md',
                resolve: {
                    Model: function () {
                        return Model;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
            return modalInstance.result;
        };

        $scope.searchTeachers = function () {
            $rootScope.GF.load_lista_docentes();
        };
        $scope.searchMatter= function () {
            $rootScope.GF.load_lista_materias();
        };
    });
