'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:SincronizacionCtrl
 * @description
 * # SincronizacionCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('SincronizacionCtrl', function ($scope, $q, $http, ModelService, $timeout) {
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
            for (var i = 0; i < list_array.length; i++) {
                list_array[i].text_error = '';
                list_array[i].actualizado = false;
            }

            function save(index) {
                if (index >= list_array.length) {
                    return;
                }
                var form_data = new FormData();
                form_data.append('ApPaterno', list_array[index].ApPaterno);
                form_data.append('ApMaterno', list_array[index].ApMaterno);
                form_data.append('Nombre', list_array[index].Nombre);
                form_data.append('CI', list_array[index].CI);
                form_data.append('idUnidadAcademica', list_array[index].idUnidadAcademica);

                (new ModelService.DocentesModel()).resource.create(form_data, function () {
                    list_array[index].actualizado = true;
                    save(index + 1);
                }, function () {
                    list_array[index].actualizado = false;
                    list_array[index].text_error = 'Docente ya registrado';
                    save(index + 1);
                });
            }

            save(0);

        };

        $scope.sincronizar_materias = function (list_array) {
            if (!list_array) {
                return;
            }
            for( var i = 0; i < list_array.length;i++){
                list_array[i].text_error = '';
                list_array[i].actualizado = false;
            }
            function save(index) {
                if (index >= list_array.length) {
                    return;
                }
                var form_data = new FormData();
                form_data.append('Materia', list_array[index].Materia);

                (new ModelService.MateriasModel()).resource.create(form_data, function () {
                    list_array[index].actualizado = true;
                    save(index + 1);
                }, function () {
                    list_array[index].actualizado = false;
                    list_array[index].text_error = 'Materia ya registrado';
                    save(index + 1);
                });
            }

            save(0);
        };

        $scope.sincronizar_especialidades = function (list_array) {
            if (!list_array) {
                return;
            }
            for( var i = 0; i < list_array.length;i++){
                list_array[i].text_error = '';
                list_array[i].actualizado = false;
            }
            function save(index) {
                if (index >= list_array.length) {
                    return;
                }
                var form_data = new FormData();
                form_data.append('Especialidad', list_array[index].Especialidad);

                (new ModelService.EspecialidadesModel()).resource.create(form_data, function () {
                    list_array[index].actualizado = true;
                    save(index + 1);
                }, function () {
                    list_array[index].actualizado = false;
                    list_array[index].text_error = 'Especialidad ya registrado';
                    save(index + 1);
                });
            }

            save(0);
        };
    });
