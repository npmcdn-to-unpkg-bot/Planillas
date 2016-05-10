'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:GenerarplanillaCtrl
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('PayrollController', function ($scope, $rootScope, $API, $q, toastr, AuthService, URLS, $uibModal, $http) {
        var promises = [
            $rootScope.GF.load_especialidades(),
            $rootScope.GF.load_gradosDocentes(),
            $rootScope.GF.load_unidades_academicas()
        ];

        $scope.tmp = {
            docente: '',
            tmp_docente: ''
        };

        $scope.tmp_filters = {
            docente: null,
            especialidad: null
        };

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
                })
        };
        $scope.searchCustomMatter = function (search_value) {
            var data = {
                search: search_value,
                page_size: 10
            };
            (new $API.Materias()).$get(data)
                .then(function (data) {
                    $scope.custom_list_materias = data['data'];
                })
        };
        $scope.planillas_data = {};

        $scope.planillas_query_params = {
            page_size: 25,
            page: 1,
            is_complete_serializer: 1
        };

        $scope.filters = {};

        $scope.load_planillas = function () {
            var defer = $q.defer();
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            (new $API.Planillas()).$get(query_params)
                .then(function (data) {
                    $scope.planillas_data = data;
                    defer.resolve(data);
                }, function () {
                    defer.reject();
                    $scope.planillas_data = angular.copy($scope.planillas_query_params);
                    $scope.planillas_data['data'] = [];
                });
            return defer.promise;
        };

        $scope.enable_fields = {
            especialidad: false,
            status: false,
            filter_unidad_academica: false,
            filter_especialidad: false
        };

        $scope.set_filters = function () {
            $q.all(promises)
                .then(function () {
                    AuthService.getUser()
                        .then(function (user) {

                            if ($rootScope.GF.isRoot()) {
                                $scope.enable_fields.filter_unidad_academica = true;
                            }
                            if ($rootScope.GF.isAdmin() || $rootScope.GF.isRoot()) {
                                $scope.enable_fields.especialidad = true;
                                $scope.enable_fields.filter_especialidad = true;
                            }

                            $scope.filters = {
                                docente: null,
                                materia: null,
                                factura: null,
                                categoria: null,
                                tipo_pago: 1,
                                horas_or_semanas: 1,
                                habilitado: '',
                                pensul: ''
                            };

                            if (user['gestion']) {
                                $scope.filters.unidad_academica = user['gestion']['unidad_academica'];
                                $scope.filters.especialidad = user['gestion']['especialidad'];
                                $scope.filters.gestion = user['gestion']['gestion'];
                                $scope.filters.periodo_gestion = user['gestion']['periodo_gestion'];
                            } else {
                                $scope.filters.unidad_academica = user['unidad_academica']['id'];
                                $scope.filters.especialidad = user['especialidad']['id'];
                                $scope.filters.gestion = 2015;
                                $scope.filters.periodo_gestion = 'I';
                            }
                            $scope.load_planillas();
                        });
                });
        };
        $scope.set_filters();

        $scope.show_preview_payroll = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            setTimeout(function () {
                window.open(URLS.PREVIEW_PLANILLA + "?" + $.param(query_params), "Reporte", "location=0,height=600, width=1200");
            }, 0);
        };

        $scope.download_file_banco = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            query_params.file_banco = 1;
            setTimeout(function () {
                window.open(URLS.PLANILLAS + "?" + $.param(query_params), "Reporte", "location=0,height=600, width=1200");
            }, 0);
        };

        $scope.limpiar = function (item) {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            query_params['clean'] = item;
            $http.post(URLS.PLANILLAS + "/clean?" + $.param(query_params))
                .then(function () {
                    $scope.load_planillas();
                    toastr.success('Borrado correctamente');
                }, function () {
                    $scope.load_planillas();
                    toastr.warning('No se pudo borrar');
                })
        };

        $scope.show_modal_report = function () {
            var planilla = angular.copy($scope.filters);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/ModalSetFooter.html',
                controller: 'ModalSetFooter',
                size: 'lg',
                resolve: {
                    planilla: function () {
                        return planilla;
                    }
                }
            });
            modalInstance.result.then(function (footers) {
                var query_params = $.extend({}, $scope.planillas_query_params, footers);
                setTimeout(function () {
                    window.open(URLS.PREVIEW_PLANILLA + "?" + $.param(query_params), "Reporte", "location=0,height=600, width=1200");
                }, 0);
            });
        };

        $scope.$on('load_planillas_event', function () {
            $scope.load_planillas();
        });
        $scope.refresh_payroll = function (options) {
            var hide_message = options && options['hide_message'];
            $scope.load_planillas()
                .then(function () {
                    if (!hide_message)
                        toastr.success("Planilla actualizada");
                }, function () {
                    if (!hide_message)
                        toastr.warning("No se encontraro resultados");
                })
        };

        $scope.update_item_payroll = function (new_value, id, key) {
            var defer = $q.defer();
            var update_data = {
                id: id
            };
            update_data[key] = new_value;
            (new $API.Planillas()).$update(update_data)
                .then(function (data) {
                    toastr.success('Modificado correctamente');
                    defer.resolve(data);
                    $scope.load_planillas();
                }, function (data) {
                    toastr.warning('No se pudo modificar');
                    defer.reject(data);
                });
            return defer.promise;
        };

        $scope.menusPayrollList = [
            ['Ver mas información', function ($itemScope) {
                $scope.openDetailModal($itemScope.registro);
            }],
            ['Eliminar', function ($itemScope) {
                $scope.eliminarRegistro($itemScope.registro);
            }]
        ];

        $scope.openDetailModal = function (registro) {
            var modalInstance = $uibModal.open({
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
            modalInstance.result.then(function (id_pensul) {
                if (id_pensul) {
                    $scope.update_item_payroll(id_pensul, registro.id, 'pensul');
                }
            }, function () {
                $scope.load_planillas();
            });
        };

        $rootScope.eliminarRegistro = function (registro) {
            $rootScope.openModalConfirm(function () {
                (new $API.Planillas).$delete({id: registro.id})
                    .then(function () {
                        $scope.load_planillas();
                        toastr.success('Registro eliminado');
                    }, function () {
                        $scope.load_planillas();
                        toastr.warning('No se pudo eliminar');
                    })
            }, function () {
            }, "ELIMINAR REGOSTRO", "Seguro que desea eliminar registro?")
        };

        $scope.editable = false;

        $scope.$on('disable_editable_payroll', function () {
            $scope.editable = false;
        });

        $scope.$on('active_editable_payroll', function () {
            $scope.editable = true;
        });
    });
