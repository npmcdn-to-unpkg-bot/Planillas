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
            separator: ',',
            separatorVisible: true,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: true
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
                form_data.append('ap_paterno', list_array[index]['ap_paterno']);
                form_data.append('ap_materno', list_array[index]['ap_materno']);
                form_data.append('nombres', list_array[index]['nombres']);
                form_data.append('ci', list_array[index]['ci']);
                form_data.append('unidad_academica', list_array[index]['unidad_academica']);

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
            for (var i = 0; i < list_array.length; i++) {
                list_array[i].text_error = '';
                list_array[i].actualizado = false;
            }
            function save(index) {
                if (index >= list_array.length) {
                    return;
                }
                var form_data = new FormData();
                form_data.append('name', list_array[index]['name']);

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
            for (var i = 0; i < list_array.length; i++) {
                list_array[i].text_error = '';
                list_array[i].actualizado = false;
            }
            function save(index) {
                if (index >= list_array.length) {
                    return;
                }
                var form_data = new FormData();
                form_data.append('name', list_array[index]['name']);

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
