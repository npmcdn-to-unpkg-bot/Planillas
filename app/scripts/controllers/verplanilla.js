'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:VerplanillaCtrl
 * @description
 * # VerplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('VerplanillaCtrl', function ($scope, $rootScope, AuthService, URLS, $http, $q, $uibModal, $timeout, $API, ModelService) {
        $scope.general_disable_items = {
            gestion: true,
            periodo_gestion: true
        };

        /*$scope.docente_model = new ModelService.DocentesModel();
        $scope.materia_model = new ModelService.MateriasModel();
        $scope.grado_docente_model = new ModelService.GradoDocenteModel();

        var promises = [
            AuthService.getUser(),
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

        $scope.nueva_planilla = {};
        $scope.nueva_planilla_disabled = {};
        $scope.load_init_params = function () {
            $q.all(promises)
                .then(function (datas) {
                    var user = datas[0];
                    $scope.nueva_planilla['especialidad'] = user['gestion']['especialidad'];
                    $scope.nueva_planilla['docente'] = '';
                    $scope.nueva_planilla['cuenta_bancaria'] = '';
                    $scope.nueva_planilla['grado'] = $rootScope.GLOBALS.GRADOS_DOCENTE[0].id;
                    $scope.nueva_planilla['materia'] = '';
                    $scope.nueva_planilla['tipo'] = $rootScope.GLOBALS.TIPOS_DOCENCIA[0].id;
                    $scope.nueva_planilla['horas_semanales'] = $rootScope.GLOBALS.TIEMPOS_CARGA_HORARIA[0].id;
                    $scope.nueva_planilla['categoria'] = $rootScope.GLOBALS.TIPOS_CATEGORIAS[0].id;
                    $scope.nueva_planilla['reintegro'] = 0;
                    $scope.nueva_planilla['atrasos_periodos'] = 0;
                    $scope.nueva_planilla['factura'] = $rootScope.GLOBALS.FACTURA_ITEMS[0].id;
                    $scope.nueva_planilla['pensul'] = $rootScope.GLOBALS.PENSUL[0].id;
                    $scope.nueva_planilla['gestion'] = user['gestion']['gestion'];
                    $scope.nueva_planilla['periodo_gestion'] = user['gestion']['periodo_gestion'];
                    $scope.nueva_planilla['unidad_academica'] = user['gestion']['unidad_academica'];
                    $scope.nueva_planilla['paralelo'] = 'A';//default
                    $scope.nueva_planilla['semestre'] = 10;//default
                    $scope.nueva_planilla['habilitado'] = 1;
                    $scope.nueva_planilla['tipo_pago'] = $rootScope.GLOBALS.TIPO_PAGO[0].id;
                    //temporales
                    $scope.nueva_planilla_disabled = {};
                    $scope.tmp = {};
                });
        };
        $scope.load_init_params();
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
        $scope.setInfoDocente = function (id_docente) {
            (new $API.Planillas()).$get({
                    docente: id_docente,
                    gestion: $rootScope.CURRENT_USER['gestion']['gestion'],
                    periodo_gestion: $rootScope.CURRENT_USER['gestion']['periodo_gestion'],
                    activo: 1
                })
                .then(function (data) {
                    if (data['data'].length > 0) {
                        var info = data['data'][0];
                        $scope.nueva_planilla_disabled['cuenta_bancaria'] = info['cuenta_bancaria'] ? true : false;
                        $scope.nueva_planilla_disabled['categoria'] = true;
                        $scope.nueva_planilla_disabled['factura'] = true;
                        $scope.nueva_planilla_disabled['grado'] = true;
                        $scope.nueva_planilla_disabled['pensul'] = true;
                        $scope.nueva_planilla_disabled['tipo_pago'] = true;

                        $scope.nueva_planilla['cuenta_bancaria'] = info['cuenta_bancaria'];
                        $scope.nueva_planilla['categoria'] = info['categoria'];
                        $scope.nueva_planilla['factura'] = info['factura'];
                        $scope.nueva_planilla['grado'] = info['grado'];
                        $scope.nueva_planilla['pensul'] = info['pensul'];
                        $scope.nueva_planilla['tipo_pago'] = info['tipo_pago'];
                    } else {
                        $scope.nueva_planilla_disabled['cuenta_bancaria'] = false;
                        $scope.nueva_planilla_disabled['categoria'] = false;
                        $scope.nueva_planilla_disabled['factura'] = false;
                        $scope.nueva_planilla_disabled['grado'] = false;
                        $scope.nueva_planilla_disabled['pensul'] = false;
                        $scope.nueva_planilla_disabled['tipo_pago'] = false;
                    }
                })
        };
        $scope.guardar_nueva_planilla = function (planilla) {
            (new $API.Planillas()).$create(planilla)
                .then(function () {
                    $scope.setInfoDocente(planilla.docente);
                    toastr.success("Registro ingresado");
                    $scope.load_planillas();
                }, function () {
                    toastr.warning("No se pudo guardar");
                })
        };

        $scope.planillas_data = {};

        $scope.planillas_query_params = {
            page_size: 25,
            page: 1,
            gestion: $rootScope.CURRENT_USER['gestion']['gestion'],
            periodo_gestion: $rootScope.CURRENT_USER['gestion']['periodo_gestion'],
            unidad_academica: $rootScope.CURRENT_USER['gestion']['unidad_academica'],
            activo: 1,
            is_complete_serializer: 1
        };

        $scope.filters = {};

        $scope.load_planillas = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            (new $API.Planillas()).$get(query_params)
                .then(function (data) {
                    $scope.planillas_data = data;
                }, function () {
                    $scope.planillas_data = angular.copy($scope.planillas_query_params);
                    $scope.planillas_data['data'] = [];
                });
        };
        $scope.set_filters = function () {
            AuthService.getUser()
                .then(function (user) {
                    $scope.filters = {
                        unidad_academica: user['gestion']['unidad_academica'],
                        especialidad: user['gestion']['especialidad'],
                        docente: null,
                        materia: null,
                        factura: null,
                        categoria: null,
                        tipo_pago: 1
                    };
                    $scope.load_planillas();
                });
        };
        $scope.set_filters();
        $scope.show_preview = function () {
            var query_params = $.extend({}, $scope.planillas_query_params, $scope.filters);
            setTimeout(function () {
                window.open(URLS.PREVIEW_PLANILLA + "?" + $.param(query_params), "Reporte", "location=0,height=600, width=1200");
            }, 0);
        };*/
        //$rootScope.updateNumeroCuenta = function (docente, numeroCuenta) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        CuentaBancaria: numeroCuenta
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updatePensul = function (docente, Pensul) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Pensul: Pensul
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateGrado = function (docente, Grado) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Grado: Grado
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateMateria = function (docente, idMateria) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        idMateria: idMateria
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateTipoDocencia = function (docente, Tipo) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Tipo: Tipo
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //$rootScope.updateHorasSemanales = function (docente, horasSem) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        HorasSemanales: horasSem
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateCategoria = function (docente, Categoria) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Categoria: Categoria
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //$rootScope.updateFactura = function (docente, Factura) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Factura: (Factura == 1 ? 1 : 0)
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateTipoPago = function (docente, tipo_pago) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        es_semanal: (tipo_pago == 1 ? 1 : 0)
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.updateReintegro = function (docente, reintegro) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Reintegro: reintegro
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //$rootScope.updateAtrasos = function (docente, nroPeriodos) {
        //    var d = $q.defer();
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        AtrasosPeriodos: nroPeriodos
        //    };
        //    $http2.put(URLS.PLANILLAS, data, function (res) {
        //        $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        res = res || {};
        //        if (res.status === 'ok') {
        //            d.resolve()
        //        } else {
        //            d.resolve(res.msg)
        //        }
        //    }, function (e) {
        //        d.resolve();
        //    });
        //    return d.promise;
        //};
        //
        //$rootScope.HabilitarDocente = function (docente, habilitado) {
        //    var data = {
        //        id: docente.id,
        //        idDocente: docente.idDocente,
        //        idEspecialidad: docente.idEspecialidad,
        //        Habilitado: habilitado ? 1 : 0
        //    };
        //    $rootScope.openModalConfirm(
        //        function () {
        //            $http2.put(URLS.PLANILLAS, data, function (data) {
        //                $rootScope.generarPlanilla(1, $rootScope.filters.items_for_page);
        //                if ($rootScope.filters && $rootScope.filters.pagination_selected) {
        //                    $rootScope.generarPlanilla(1, $rootScope.filters.items_for_page);
        //                } else {
        //                    $rootScope.generarPlanilla(1, $rootScope.filters.items_for_page);
        //                    $rootScope.filters.pagination_selected = 0;
        //                }
        //            });
        //        },
        //        function () {
        //        },
        //        "DOCENTE - PLANILLAs",
        //        "Seguro que desea " + (habilitado ? "Habilitar" : "inhabilitar") + " docente de planillas"
        //    )
        //};
        //
        //$rootScope.eliminarRegistro = function (docente_registro) {
        //    $rootScope.openModalConfirm(function () {
        //        $http2.patch(URLS.PLANILLAS, {id: docente_registro.id},
        //            function () {
        //                $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //            })
        //    }, function () {
        //    }, "ELIMINAR REGOSTRO", "Seguro que desea eliminar registro?")
        //};
        //
        //$rootScope.generarReporteCuentasTXT = function () {
        //    var Query = queryBuilder();
        //    Query.FileBanco = "si";
        //
        //    setTimeout(function () {
        //        window.open(URLS.PLANILLAS_REPORTE_TXT + "?" + $.param(Query), "Reporte");
        //    }, 0);
        //};
        //$rootScope.LimpiarReintegro = function () {
        //    if ($rootScope.GF.isRoot()) {
        //        toastr.info('No se puede modificar reintegros');
        //        return;
        //    }
        //    var data = queryBuilder(0);
        //    var query = {};
        //    if ($rootScope.GF.isAdmin()) {
        //        if (!data.idEspecialidad) {
        //            toastr.warning("Debe especificar especialidad");
        //            return;
        //        }
        //        query.idEspecialidad = data.idEspecialidad;
        //    }
        //    $http2.post(URLS.PLANILLAS_LIMPIAR_REINTEGRO, query, function (data) {
        //        if (data.Success) {
        //            $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        }
        //    });
        //};
        //$rootScope.LimpiarAtrasos = function () {
        //    if ($rootScope.GF.isRoot()) {
        //        toastr.info('No se puede modificar reintegros');
        //        return;
        //    }
        //    var data = queryBuilder(0);
        //    var query = {};
        //    if ($rootScope.GF.isAdmin()) {
        //        if (!data.idEspecialidad) {
        //            toastr.warning("Debe especificar especialidad");
        //            return;
        //        }
        //        query.idEspecialidad = data.idEspecialidad;
        //    }
        //
        //    $http2.post(URLS.PLANILLAS_LIMPIAR_ATRASOS, query, function (data) {
        //        if (data.Success) {
        //            $rootScope.generarPlanilla(currentPage, $rootScope.filters.items_for_page);
        //        }
        //    });
        //};
        //$rootScope.getFinalPlanilla = function () {
        //    var Query =
        //        "header= Planillas de pago a 20 semanas &" +
        //        "idEspecialidad=" + (queryBuilder().idEspecialidad || '') + '&' +
        //        "weeks=20";
        //    setTimeout(function () {
        //        window.open(URLS.REPORTES + "?" + Query, "Reporte", "location=0,height=600, width=1200");
        //    }, 0);
        //};
        //$rootScope.generarReportePlanilla = function (isfinal) {
        //    var Query = queryBuilder();
        //    Query.final = isfinal ? 1 : 0;
        //    if (isfinal) {
        //        var modalInstance = $uibModal.open({
        //            animation: true,
        //            templateUrl: 'views/modals/ModalSetFooter.html',
        //            controller: 'ModalSetFooter',
        //            size: 'lg',
        //            resolve: {
        //                items: function () {
        //                    return $rootScope.filters;
        //                }
        //            }
        //        });
        //        modalInstance.result.then(function (Footers) {
        //            if (Footers) {
        //                setTimeout(function () {
        //                    window.open(URLS.REPORTES + "?" + $.param(Query) + '&' + $.param(Footers), "Reporte", "location=0,height=600, width=1200");
        //                }, 0);
        //            } else {
        //                toastr.info("Cancelado");
        //            }
        //        }, function () {
        //            $log.info('Modal dismissed at: ' + new Date());
        //        });
        //    } else {
        //        setTimeout(function () {
        //            window.open(URLS.REPORTES + "?" + $.param(Query), "Reporte", "location=0,height=600, width=1200");
        //        }, 0);
        //    }
        //};
        //
        //$scope.menusPayrollList = [
        //    ['Ver informacion', function ($itemScope) {
        //        $rootScope.openModalViewCourso($itemScope.docente);
        //    }],
        //    ['Eliminar', function ($itemScope) {
        //        $scope.eliminarRegistro($itemScope.docente);
        //    }]
        //];
        //
        //$scope.exportData = function (id) {
        //    var data = queryBuilder(1);
        //    data.items = 1000000000000;
        //    $http2.post(URLS.PLANILLAS, data,
        //        function (data) {
        //            if (data.Success) {
        //                $rootScope.planillas_listing_page_exel = data.items;
        //                $timeout(function () {
        //                    if ($rootScope.filters.SHOW_REINTEGRO) {
        //                        var blob = new Blob([document.getElementById('exportableReport').innerHTML], {
        //                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        //                        });
        //                        saveAs(blob, "Planillas- " + ($rootScope.filters.NUMERO_SEMANAS || "") + ".xls");
        //                    } else {
        //                        var blob = new Blob([document.getElementById('exportable').innerHTML], {
        //                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        //                        });
        //                        saveAs(blob, "Planillas- " + ($rootScope.filters.NUMERO_SEMANAS || "") + ".xls");
        //                    }
        //                })
        //            }
        //        });
        //};

    });


