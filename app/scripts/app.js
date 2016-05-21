'use strict';

/**
 * @ngdoc overview
 * @name planillasApp
 * @description
 * # planillasApp
 *
 * Main module of the application.
 */
angular
    .module('planillasApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'xeditable',
        'ui.select',
        'angularMoment',//https://github.com/urish/angular-moment
        'toastr',
        'ui.bootstrap.contextMenu',
        'textAngular',
        'ngCsvImport',
        'content-editable'
    ])
    .config(function ($routeProvider, $httpProvider, uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when('/', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MainCtrl'
            })
            .when('/Login', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Gestion/Old', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Gestion', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/EliminarRegistros', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Usuarios', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Sincronizacion', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Reportes', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/GenerarPlanilla', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/VerPlanilla', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Docentes', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/Materias', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/GradoDocentes', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/CloseSystem', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/queryBuild', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/restartPassword', {
                templateUrl: 'views/restartpassword.html',
                controller: 'MenuCtrl'
            })
            .when('/Carreras', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl',
                controllerAs: 'carreras'
            })
            .when('/Contratos', {
                templateUrl: 'views/contratos.html',
                controller: 'ContratosCtrl',
                controllerAs: 'Contratos'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('angularMomentConfig', {
        timezone: 'America/La_Paz' // e.g. 'Europe/London'
    })
    .run(function ($rootScope, $location, $log, $http2, URLS, editableOptions, editableThemes, $uibModal, toastr, $q, AuthService, $http) {
        editableThemes.bs3.inputClass = 'input-sm small';
        editableThemes.bs3.buttonsClass = 'btn-sm small';
        //editableOptions.theme = 'bs3';
        editableThemes['default'].submitTpl = '<button type="submit"> <i class="glyphicon glyphicon-ok"></i> </button>';
        editableThemes['default'].cancelTpl = '<button type="button"> <i class="glyphicon glyphicon-minus"></i> </button>';
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "500",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        $rootScope.CURRENT_VIEW = 'views/loader.html';
        $rootScope.CURRENT_USER = null;

        $rootScope.GF = {};
        $rootScope.GF.isLogged = function () {
            return $rootScope.CURRENT_USER ? true : false;
        };
        $rootScope.GF.getFullGestionNamme = function () {
            return ($rootScope.CURRENT_USER['gestion']['periodo_gestion']) + ' - ' + $rootScope.CURRENT_USER['gestion']['gestion'];
        };
        $rootScope.GF.getFullName = function () {
            return $rootScope.CURRENT_USER['nombres'] + ' ' + $rootScope.CURRENT_USER['apellidos'];
        };
        $rootScope.GF.getEspecialidadName = function () {
            return $rootScope.CURRENT_USER['especialidad']['name'];
        };
        $rootScope.GF.getEspecialidadId = function () {
            return $rootScope.CURRENT_USER['especialidad']['id'];
        };
        $rootScope.GF.getUnidadAcademicaName = function () {
            return $rootScope.CURRENT_USER['unidad_academica']['name'];
        };
        $rootScope.GF.getUnidadAcademicaId = function () {
            return $rootScope.CURRENT_USER['unidad_academica']['id'];
        };
        $rootScope.GF.isRoot = function () {
            return $rootScope.CURRENT_USER['tipo_usuario']['id'] == 1;
        };
        $rootScope.GF.isAdmin = function () {
            return $rootScope.CURRENT_USER['tipo_usuario']['id'] == 2;
        };
        $rootScope.GF.isJefeCarrera = function () {
            return $rootScope.CURRENT_USER['tipo_usuario']['id'] == 3;
        };
        $rootScope.GF.isSecretaria = function () {
            return $rootScope.CURRENT_USER['tipo_usuario']['id'] == 4;
        };
        $rootScope.GF.load_unidades_academicas = function (fcnScs, fcnErr) {
            return $http.get(URLS.UNIDADES_ACADEMICAS)
                .then(function (data) {
                    $rootScope.GLOBALS.UNIDADES_ACADEMICAS = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };
        $rootScope.GF.load_especialidades = function (fcnScs, fcnErr) {
            return $http.get(URLS.ESPECIALIDADES)
                .then(function (data) {
                    $rootScope.GLOBALS.ESPECIALIDADES = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };
        $rootScope.GF.load_current_monto_categoria = function (fcnScs, fcnErr) {
            var data = {
                gestion: $rootScope.CURRENT_USER['gestion']['gestion'],
                periodo_gestion: $rootScope.CURRENT_USER['gestion']['periodo_gestion'],
                unidad_academica: $rootScope.CURRENT_USER['gestion']['unidad_academica']
            };
            return $http.get(URLS.MONTO_CATEGORIA, {params: data})
                .then(function (data) {
                    $rootScope.GLOBALS.MONTO_CATEGORIA = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };
        $rootScope.GF.load_tipo_usuarios = function (fcnScs, fcnErr) {
            return $http.get(URLS.TIPO_USUARIO)
                .then(function (data) {
                    $rootScope.GLOBALS.TIPO_USUARIO = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };
        $rootScope.GF.load_gestiones_academicas = function (fcnScs, fcnErr) {
            return $http.get(URLS.GESTIONES_ACADEMICAS)
                .then(function (data) {
                    $rootScope.GLOBALS.ALL_GESTIONES_ACADEMICAS = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };
        $rootScope.GF.load_gradosDocentes = function () {
            return $http.get(URLS.GRADO_DOCENTE)
                .then(function (data) {
                    $rootScope.GLOBALS.GRADOS_DOCENTE = data['data']['data'];
                });
        };
        $rootScope.GF.load_tipoPago = function () {
            return $http.get(URLS.TIPO_PAGO)
                .then(function (data) {
                    $rootScope.GLOBALS.TIPO_PAGO = data['data']['data'];
                    //$rootScope.GLOBALS.PAGO_ITEMS = [{id: 1, name: "Semanal"}, {id: 0, name: "Horas"}];
                });
        };

        $rootScope.login = function (user, options) {
            var defer = $q.defer();
            AuthService.login(user, options)
                .then(function (user) {
                    $rootScope.CURRENT_USER = user;
                    defer.resolve(user);
                    redirects();
                }, function (data) {
                    defer.reject(data);
                    $rootScope.setMenu_Login();
                });
            return defer.promise;
        };
        $rootScope.autoLogin = function (options) {
            options = options || {};
            options['hideMessage'] = true;
            return $rootScope.login(false, options);
        };
        $rootScope.getUser = function () {
            return AuthService.getUser();
        };
        $rootScope.logout = function () {
            AuthService.logout()
                .then(function () {
                    location.reload();
                }, function () {
                    location.reload();
                });
        };
        $rootScope.setMenu_Login = function () {
            $location.url('/Login');
            $rootScope.CURRENT_VIEW = 'views/login.html';
        };

        function redirects() { //usuario logueado
            var locationPath = $location.path();
            if (!$rootScope.CURRENT_USER['gestion'] && ($rootScope.GF.isJefeCarrera() || $rootScope.GF.isSecretaria())) {
                $location.url('/CloseSystem');
                $rootScope.CURRENT_VIEW = 'views/close_system.html';
                return;
            }
            switch (locationPath) {
                case "/":
                    $location.url('/Gestion');
                    break;
                case "/Login":
                    $location.url('/Gestion');
                    break;
                case "/Gestion":
                    $rootScope.CURRENT_VIEW = 'views/startgestion.html';
                    break;
                case "/Usuarios":
                    $rootScope.CURRENT_VIEW = 'views/usuarios.html';
                    break;
                case "/Docentes":
                    $rootScope.CURRENT_VIEW = 'views/docentes.html';
                    break;
                case "/Materias":
                    $rootScope.CURRENT_VIEW = 'views/materias.html';
                    break;
                case "/GradoDocentes":
                    $rootScope.CURRENT_VIEW = 'views/grado_docentes.html';
                    break;
                case "/Carreras":
                    $rootScope.CURRENT_VIEW = 'views/carreras.html';
                    break;
                case "/Reportes":
                    $rootScope.CURRENT_VIEW = 'views/reportes.html';
                    break;
                case "/Sincronizacion":
                    if ($rootScope.GF.isSecretaria()) {
                        $location.url("/Gestion");
                    } else {
                        $rootScope.CURRENT_VIEW = 'views/sincronizacion.html';
                    }
                    break;
                case "/GenerarPlanilla":
                    if ($rootScope.GF.isSecretaria()) {
                        $location.url("/Gestion");
                    }
                    $rootScope.CURRENT_VIEW = 'views/generarplanilla.html';
                    //$rootScope.CURRENT_VIEW = 'views/verplanilla.html';
                    break;
                case "/VerPlanilla":
                    //if ($rootScope.GF.isSecretaria()) {
                    //    $rootScope.CURRENT_VIEW = 'views/verplanillasecretaria.html';
                    //} else {
                    $rootScope.CURRENT_VIEW = 'views/verplanilla.html';
                    // }
                    break;
                case "/CloseSystem":
                    $rootScope.CURRENT_VIEW = 'views/close_system.html';
                    break;
                case "/queryBuild":
                    if (!$rootScope.GF.isRoot()) {
                        $location.url("/Gestion");
                    }
                    $rootScope.CURRENT_VIEW = 'views/querybuild.html';
                    break;
                case "/EliminarRegistros":
                    if ($rootScope.GF.isAdmin() || $rootScope.GF.isRoot())
                        $rootScope.CURRENT_VIEW = 'views/eliminarregistros.html';
                    else
                        $location.url("/Gestion");
                    break;
            }
            if (locationPath.search("/Gestion/Old") >= 0) {
                $rootScope.CURRENT_VIEW = 'views/gestionold.html';
            }
        }

        $rootScope.$on('$routeChangeStart', function () {
            //$log.warn('Change Route to ' + $location.path());
            $rootScope.autoLogin()
                .then(function (user) {
                    if (user && $rootScope.GF.isLogged()) {
                        redirects();
                    } else {
                        $rootScope.setMenu_Login();
                    }
                }, function () {
                    $rootScope.setMenu_Login();
                });
        });

        $rootScope.GLOBALS = {};
        $rootScope.GLOBALS.TIPO_PAGO = [{id: 1, name: "Horas", short: 'Hrs'}, {id: 2, name: "Semanal", short: "Sem"}];
        $rootScope.GLOBALS.TIPOS_CATEGORIAS = [
            {id: 'A', name: "A"}, {id: 'B', name: "B"}, {id: 'C', name: "C"}, {id: 'D', name: "D"}
        ];
        $rootScope.GLOBALS.TIPOS_DOCENCIA = [
            {id: 1, name: "Teoría", short: 'T'},
            {id: 2, name: "Práctica", short: 'P'},
            {id: 3, name: "Laboratorio", short: 'L'}];
        $rootScope.GLOBALS.FACTURA_ITEMS = [{id: "Si", name: "Si"}, {id: "No", name: "No"}];
        $rootScope.GLOBALS.PENSUL = [
            {id: 1, name: "Objetivos", short: 'Obj'},
            {id: 2, name: "Competencias", short: 'Comp'}
        ];
        $rootScope.GLOBALS.HORAS_OR_SEMANAS = [];
        $rootScope.GLOBALS.TIEMPOS_CARGA_HORARIA = [];
        $rootScope.GLOBALS.NUMEROS_PAGINACION = [];
        var i;
        for (i = 1; i <= 50; i++) {
            $rootScope.GLOBALS.HORAS_OR_SEMANAS.push(i);
        }
        for (i = 1; i <= 25; i++) {
            $rootScope.GLOBALS.TIEMPOS_CARGA_HORARIA.push({id: i, name: i});
        }
        for (i = 1; i <= 10; i++) {
            $rootScope.GLOBALS.NUMEROS_PAGINACION.push(i * 5);
        }

        $rootScope.GLOBALS.TIEMPOS_ATRASOS = [];
        $rootScope.GLOBALS.TIEMPOS_ATRASOS.push({id: 0, name: '0'});
        for (i = 1; i <= 35; i += 1) {
            $rootScope.GLOBALS.TIEMPOS_ATRASOS.push({id: i, name: i + ''});
        }

        $rootScope.openModalConfirm = function (ok, cancel, title, message) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ModalConfirm.html',
                controller: 'ModalConfirm',
                size: 'md',
                resolve: {
                    title: function () {
                        return title;
                    },
                    message: function () {
                        return message;
                    }
                }
            });
            modalInstance.result.then(function () {
                ok();
            }, function () {
                cancel();
            });
        };
    });

angular.module('planillasApp').controller('ModalConfirm', function ($scope, $uibModalInstance, message, title) {
    $scope.mensaje = message;
    $scope.title = title;
    $scope.ok = function () {
        $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss(false);
    };
});
