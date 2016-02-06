'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:SincronizacionCtrl
 * @description
 * # SincronizacionCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('SincronizacionCtrl', function ($scope, $q, $http, ModelService) {
        $scope.csv = {
            content: null,
            header: true,
            headerVisible: true,
            separator: ';',
            separatorVisible: true,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: true
        };

        $scope.desde_servidor = function () {

        };

        $scope.sincronizar_docentes = function (list_array) {
            if (!list_array) {
                return;
            }
            var i;
            for (i = 0; i < list_array.length; i++) {
                var form_data = new FormData();
                list_array[i].actualizado = true;
                var exito = function (data) {
                    var indexCopy = angular.copy(i);
                    console.log(data);
                    console.log(indexCopy);
                };
                form_data.append('ApPaterno', list_array[i].ApPaterno);
                form_data.append('ApMaterno', list_array[i].ApMaterno);
                form_data.append('Nombre', list_array[i].Nombre);
                form_data.append('CI', list_array[i].CI);
                form_data.append('idUnidadAcademica', list_array[i].idUnidadAcademica);
                (new ModelService.DocentesModel()).resource.create(form_data, function (data) {
                    console.log('guardado');
                }, function () {
                    console.log('error');
                });
            }
        };

        $scope.sincronizar_materias = function (list_array) {
            //console.log(list_array);
            if (!list_array) {
                return;
            }
            var i;
            for (i = 0; i < list_array.length; i++) {
                console.log((new ModelService.MateriasModel()).resource.create);
                var form_data = new FormData();
                list_array[i].actualizado = true;
                var exito = function (data) {
                    var indexCopy = angular.copy(i);
                    console.log(data);
                    console.log(indexCopy);
//                    list_array[indexCopy].actualizado = true;
                };
                form_data.append('Materia', list_array[i].Materia);
                (new ModelService.MateriasModel()).resource.create(form_data, function (data) {

                }, function () {

                });
            }
        };

        $scope.sincronizar_especialidades = function (list_array) {
            if (!list_array) {
                return;
            }
            var i;
            for (i = 0; i < list_array.length; i++) {
                var form_data = new FormData();
                list_array[i].actualizado = true;
                var exito = function (data) {
                    var indexCopy = angular.copy(i);
                    console.log(data);
                    console.log(indexCopy);
                };
                form_data.append('Especialidad', list_array[i].Especialidad);
                (new ModelService.EspecialidadesModel()).resource.create(form_data, function (data) {

                }, function () {

                });
            }
        };


    });
