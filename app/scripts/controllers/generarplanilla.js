'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:GenerarplanillaCtrl
 * @description
 * # GenerarplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
    .controller('GenerarplanillaCtrl', function ($scope, $rootScope, $q, $http, ModelService, $timeout, AuthService, $API) {
        var promises = [
            AuthService.getUser(),
            $rootScope.GF.load_especialidades(),
            $rootScope.GF.load_gradosDocentes(),
            $rootScope.GF.load_unidades_academicas()
        ];
        $scope.nueva_planilla = {};
        $scope.enable_nueva_planilla_fields = {
            especialidad: false
        };

        $scope.load_init_params = function () {
            $q.all(promises)
                .then(function (datas) {

                    if (!$rootScope.GF.isSecretaria()) {
                        $scope.$broadcast('active_editable_payroll');
                    } else {
                        $scope.$broadcast('disable_editable_payroll');
                    }
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
                    //desabilitar
                    if ($rootScope.GF.isAdmin()) {
                        $scope.enable_nueva_planilla_fields.especialidad = true;
                    }
                });
        };
        $scope.load_init_params();

        $scope.refresh_params_nueva_planilla = function () {
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_gradosDocentes();
            $rootScope.GF.load_unidades_academicas();
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
                        //$scope.nueva_planilla_disabled['pensul'] = true;
                        $scope.nueva_planilla_disabled['tipo_pago'] = true;

                        $scope.nueva_planilla['cuenta_bancaria'] = info['cuenta_bancaria'];
                        $scope.nueva_planilla['categoria'] = info['categoria'];
                        $scope.nueva_planilla['factura'] = info['factura'];
                        $scope.nueva_planilla['grado'] = info['grado'];
                       // $scope.nueva_planilla['pensul'] = info['pensul'];
                        //$scope.nueva_planilla['tipo_pago'] = info['tipo_pago'];
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
                    $scope.$broadcast ('load_planillas_event');
                }, function () {
                    toastr.warning("No se pudo guardar");
                })
        };

        $scope.general_disable_items = {
            gestion: true,
            periodo_gestion: true
        };
    });
