'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:PayrollPaymentsController
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('PayrollPaymentsController', function ($scope, $rootScope, $API, $q, toastr, AuthService, ModelService, $uibModal, URLS, $http) {
        $scope.payroll_paymemts = [];
        $scope.payroll_paymemts_model = ModelService.PagosPlanillasModel();

        $scope.filter_payroll_payments = {};

        $scope.load_payroll_payments = function () {
            (new $API.PagosPlanillas()).$get($scope.filters)
                .then(function (data) {
                    $scope.payroll_paymemts = data.data;
                });
        };

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
                });
        };
        $scope.searchCustomMatter = function (search_value) {
            var data = {
                search: search_value,
                page_size: 10
            };
            (new $API.Materias()).$get(data)
                .then(function (data) {
                    $scope.custom_list_materias = data['data'];
                });
        };
        $scope.planillas_data = {};

        $scope.planillas_query_params = {
            page_size: 25,
            page: 1,
            is_complete_serializer: 1,
            numero_pago: 1
        };

        $scope.filters = {};

        $scope.load_planillas = function (force_filters) {
            var defer = $q.defer(), query_params;
            if (force_filters) {
                query_params = force_filters;
                $scope.planillas_query_params = force_filters;
                $scope.filters = force_filters;
            } else {
                query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            }

            (new $API.PagosPlanillas()).$get(query_params)
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

        AuthService.getUser()
            .then(function (user) {
                $scope.filters['gestion_academica'] = user['gestion']['id'];
                $scope.payroll_paymemts_model = ModelService.PagosPlanillasModel({
                    query_params: $scope.filters
                });
                $scope.load_payroll_payments();
                $scope.load_planillas();
            });

        $scope.enable_fields = {
            especialidad: false,
            status: false,
            filter_unidad_academica: false,
            filter_especialidad: false
        };

        $scope.set_filters = function (filters_force) {
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
                                pensul: '',
                            };

                            if (user['gestion']) {
                                $scope.filters.unidad_academica = user['gestion']['unidad_academica'];
                                $scope.filters.especialidad = user['gestion']['especialidad'];
                                $scope.filters.gestion = user['gestion']['gestion'];
                                $scope.filters.periodo_gestion = user['gestion']['periodo_gestion'];
                                $scope.filters.gestion_academica = user['gestion']['id'];
                            } else {
                                $scope.filters.unidad_academica = user['unidad_academica']['id'];
                                $scope.filters.especialidad = user['especialidad']['id'];
                                $scope.filters.gestion = 2015;
                                $scope.filters.periodo_gestion = 'I';
                                $scope.filters.gestion_academica = 0;
                            }
                            if (filters_force) {
                                $scope.filters = angular.copy(filters_force);
                            }
                            //$scope.load_planillas(); pendiente , funcion solo llamada deste evento
                        });
                });
        };
        $scope.set_filters();

        $scope.show_preview_payroll = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            setTimeout(function () {
                window.open(URLS.PREVIEW_PLANILLA + '?' + $.param(query_params), 'Reporte', 'location=0,height=600, width=1200');
            }, 0);
        };

        $scope.download_file_banco = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            query_params.file_banco = 1;
            setTimeout(function () {
                window.open(URLS.PLANILLAS + '?' + $.param(query_params), 'Reporte', 'location=0,height=600, width=1200');
            }, 0);
        };

        $scope.limpiar = function (item) {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            query_params['clean'] = item;
            $http.post(URLS.PLANILLAS + '/clean?' + $.param(query_params))
                .then(function () {
                    $scope.load_planillas();
                    toastr.clear();
                    toastr.success('Borrado correctamente');
                }, function () {
                    $scope.load_planillas();
                    toastr.warning('No se pudo borrar');
                });
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
                    window.open(URLS.PREVIEW_PLANILLA + '?' + $.param(query_params), 'Reporte', 'location=0,height=600, width=1200');
                }, 0);
            });
        };

        $scope.refresh_payroll = function (options) {
            var hide_message = options && options['hide_message'];
            $scope.load_planillas()
                .then(function () {
                    if (!hide_message) {
                        toastr.clear();
                        toastr.success('Planilla actualizada');
                    }
                }, function () {
                    if (!hide_message) {
                        toastr.clear();
                        toastr.warning('No se encontraro resultados');
                    }
                });
        };

        $scope.update_item_payroll = function (new_value, id, key) {
            var defer = $q.defer();
            var update_data = {
                id: id
            };
            update_data[key] = new_value;
            (new $API.PagosPlanillas()).$update(update_data)
                .then(function (data) {
                    toastr.clear();
                    toastr.success('Modificado correctamente');
                    defer.resolve(data);
                    $scope.load_planillas();
                }, function (data) {
                    toastr.warning('No se pudo modificar');
                    defer.reject(data);
                });
            return defer.promise;
        };

        $scope.update_invoice_payroll = function (new_value, number, id, key) {
            var defer = $q.defer();
            var update_data = {
                id: id,
                numero_factura: number
            };
            update_data[key] = new_value;
            (new $API.PagosPlanillas()).$update(update_data)
                .then(function (data) {
                    toastr.clear();
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
                (new $API.Planillas()).$delete({id: registro.id})
                    .then(function () {
                        $scope.load_planillas();
                        toastr.clear();
                        toastr.success('Registro eliminado');
                    }, function () {
                        $scope.load_planillas();
                        toastr.warning('No se pudo eliminar');
                    });
            }, function () {
            }, 'ELIMINAR REGOSTRO', 'Seguro que desea eliminar registro?');
        };

        $scope.editable = false;

        $scope.$on('load_planillas_event', function (event, force_filters) {
            $scope.load_planillas(force_filters);
        });

        $scope.$on('disable_editable_payroll', function () {
            $scope.editable = false;
        });

        $scope.$on('active_editable_payroll', function () {
            $scope.editable = true;
        });

        $scope.changeInvoice = function (register, item) {
            if (register.presenta_factura === 'Si') {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modals/ModalSetInvoice.html',
                    controller: 'ModalSetInvoiceController',
                    size: 'md'
                });
                modalInstance.result.then(function (numero) {
                    console.log(numero);
                    $scope.update_invoice_payroll(register.presenta_factura, numero, register.id, item);
                }, function () {
                    register.presenta_factura = 'No';
                });
            } else {
                $scope.update_item_payroll(register.presenta_factura, register.id, item);
            }
        };
    });

angular.module('planillasApp').controller('ModalSetInvoiceController', function ($scope, $uibModalInstance) {
    $scope.numero = '';
    $scope.ok = function () {
        console.log($scope.numero);
        if (($scope.numero + '').length > 3) {
            $uibModalInstance.close($scope.numero);
        } else {
            $uibModalInstance.dismiss(false);
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(false);
    };
});
