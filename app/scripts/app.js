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
        'ngCsvImport'
    ])
    .config(function ($routeProvider, $httpProvider, uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
        $httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
        $routeProvider
            .when('/', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MainCtrl'
            })
            .when('/Login', {
                templateUrl: 'views/splashscreen.html',
                controller: 'LoginCtrl'
            })
            .when('/Home', {
                templateUrl: 'views/splashscreen.html',
                controller: 'HomeCtrl'
            })
            .when('/Gestion/Old', {
                templateUrl: 'views/splashscreen.html',
                controller: 'GestionoldCtrl'
            })
            .when('/Gestion', {
                templateUrl: 'views/splashscreen.html',
                controller: 'StartgestionCtrl'
            })
            .when('/EliminarRegistros', {
                templateUrl: 'views/splashscreen.html',
                controller: 'EliminarregistrosCtrl'
            })
            .when('/Usuarios', {
                templateUrl: 'views/splashscreen.html',
                controller: 'UsuariosCtrl'
            })
            .when('/Sincronizacion', {
                templateUrl: 'views/splashscreen.html',
                controller: 'SincronizacionCtrl'
            })
            .when('/Reportes', {
                templateUrl: 'views/splashscreen.html',
                controller: 'ReportesCtrl'
            })
            .when('/GenerarPlanilla', {
                templateUrl: 'views/splashscreen.html',
                controller: 'VerplanillaCtrl'
            })
            .when('/VerPlanilla', {
                templateUrl: 'views/splashscreen.html',
                controller: 'VerplanillaCtrl'
            })
            .when('/Docentes', {
                templateUrl: 'views/splashscreen.html',
                controller: 'DocentesCtrl'
            })
            .when('/Materias', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MateriasCtrl'
            })
            .when('/CloseSystem', {
                templateUrl: 'views/splashscreen.html',
                controller: 'MenuCtrl'
            })
            .when('/queryBuild', {
                templateUrl: 'views/splashscreen.html',
                controller: 'QuerybuildCtrl'
            })
            .when('/restartPassword', {
                templateUrl: 'views/restartpassword.html',
                controller: 'RestartpasswordCtrl'
            })
            .when('/Carreras', {
                templateUrl: 'views/splashscreen.html',
                controller: 'CarrerasCtrl',
                controllerAs: 'carreras'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('angularMomentConfig', {
        timezone: 'America/La_Paz' // e.g. 'Europe/London'
    })
    .run(function ($rootScope, $location, $log, $http2, URLS, editableOptions, editableThemes, $modal, toastr, $q, AuthService, $http, ModelService) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        $rootScope.CURRENT_VIEW = '';
        $rootScope.GF = {};
        $rootScope.FIRST_REQUEST = true;
        $rootScope.CURRENT_USER = null;
        $rootScope.filters = {};
        $rootScope.filters.items_for_page = 20;

        $rootScope.reloadApp = function () {
            location.reload();
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
            $rootScope.login(false, options);
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
        $rootScope.autoLogin();
        $rootScope.GF.isLogged = function () {
            return $rootScope.CURRENT_USER ? true : false;
        };
        $rootScope.GF.getFullGestionNamme = function () {
            return ($rootScope.CURRENT_USER['gestion']['periodo_gestion']) + ' - ' + $rootScope.CURRENT_USER['gestion']['gestion'];
        };
        $rootScope.GF.getFullName = function () {
            return $rootScope.CURRENT_USER['nombres'] + ' ' + $rootScope.CURRENT_USER['ap_paterno'] + ' ' + $rootScope.CURRENT_USER['ap_materno'];
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

        $rootScope.setMenu_Login = function () {
            $location.url('/Login');
            $rootScope.CURRENT_VIEW = 'views/login.html';
        };
        $rootScope.setMenu_Loader = function () {
            //$location.url('/');
            $rootScope.CURRENT_VIEW = 'views/loader.html';
        };
        $rootScope.setMenu_Home = function () {
            $location.url('/Home');
            $rootScope.CURRENT_VIEW = 'views/home.html';
        };
        $rootScope.setMenu_CloseSystem = function () {
            $location.url('/CloseSystem');
            $rootScope.CURRENT_VIEW = 'views/close_system.html';
        };
        $rootScope.setMenu_Gestion = function () {
            $location.url('/Gestion');
            $rootScope.CURRENT_VIEW = 'views/startgestion.html';
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_especialidades();
        };
        $rootScope.setMenu_GestionPasada = function () {
            $rootScope.filters = {};
            $rootScope.filters.items_for_page = 20;
            $rootScope.GF.load_lista_docentes();
            $rootScope.GF.load_lista_materias();
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_tipos_categoria();
            $rootScope.GF.load_montos_pago();
            $location.url($location.path());
            $rootScope.CURRENT_VIEW = 'views/gestionold.html';
        };
        $rootScope.setMenu_QueryBuild = function () {
            $location.url($location.path());
            $rootScope.CURRENT_VIEW = 'views/querybuild.html';
        };
        $rootScope.setMenu_EliminarRegistros = function () {
            $location.url('/EliminarRegistros');
            $rootScope.CURRENT_VIEW = 'views/eliminarregistros.html';
            $rootScope.GF.load_gestiones_academicas();
            $rootScope.GF.load_logs();
        };
        $rootScope.setMenu_Sincronizacion = function () {
            $location.url('/Sincronizacion');
            $rootScope.CURRENT_VIEW = 'views/sincronizacion.html';
        };
        $rootScope.setMenu_Reportes = function () {
            $rootScope.GF.load_allReport();
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_tipo_usuarios();
            $location.url('/Reportes');
            $rootScope.CURRENT_VIEW = 'views/reportes.html';
        };
        $rootScope.setMenu_GenerarPlanilla = function () {
            $rootScope.filters = {};
            $rootScope.filters.items_for_page = 20;
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_lista_docentes();
            $rootScope.GF.load_lista_materias();
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_tipos_categoria();
            $rootScope.GF.load_montos_pago();
            $rootScope.GF.load_tiempo_carga_horaria();
            $rootScope.GF.load_tiempo_atrasos();
            $rootScope.GF.load_valor_impuestos();
            $rootScope.GF.load_pensuls();
            $rootScope.GF.load_tipos_docencia();
            $rootScope.GF.load_gradosDocentes();
            $rootScope.GF.load_paralelos();
            $rootScope.GF.load_semestres();
            $location.url('/GenerarPlanilla');
            $rootScope.CURRENT_VIEW = 'views/generarplanilla.html';
        };
        $rootScope.setMenu_VerPlanilla = function () {
            $rootScope.filters = {};
            $rootScope.filters.items_for_page = 20;
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_lista_docentes();
            $rootScope.GF.load_lista_materias();
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_tipos_categoria();
            $rootScope.GF.load_montos_pago();
            $rootScope.GF.load_tiempo_carga_horaria();
            $rootScope.GF.load_tiempo_atrasos();
            $rootScope.GF.load_valor_impuestos();
            $rootScope.GF.load_pensuls();
            $rootScope.GF.load_tipos_docencia();
            $rootScope.GF.load_gradosDocentes();
            //$rootScope.GF.load_gr;
            $location.url('/VerPlanilla');
            if ($rootScope.GF.isSecre()) {
                $rootScope.CURRENT_VIEW = 'views/verplanillasecretaria.html';
            } else {
                $rootScope.CURRENT_VIEW = 'views/verplanilla.html';
            }
        };
        $rootScope.setMenu_Usuarios = function () {
            $location.url('/Usuarios');
            $rootScope.CURRENT_VIEW = 'views/usuarios.html';
        };
        $rootScope.setMenu_Docentes = function () {
            $location.url('/Docentes');
            $rootScope.CURRENT_VIEW = 'views/docentes.html';
        };
        $rootScope.setMenu_Carreras = function () {
            $location.url('/Carreras');
            $rootScope.CURRENT_VIEW = 'views/carreras.html';
        };
        $rootScope.setMenu_Materias = function () {
            $location.url('/Materias');
            $rootScope.CURRENT_VIEW = 'views/materias.html';
        };


        function redirects() {
            var locationPath = $location.path();
            if (!$rootScope.CURRENT_USER['gestion'] && ($rootScope.GF.isJefeCarrera() || $rootScope.GF.isSecretaria())) {
                $rootScope.setMenu_CloseSystem();
                return;
            }
            console.log("REDIRECTS");
            switch (locationPath) {
                case "/":
                    $rootScope.setMenu_Gestion();
                    break;
                case "/Login":
                    $rootScope.setMenu_Gestion();
                    break;
                case "/Home":
                    $rootScope.setMenu_Home();
                    break;
                case "/Gestion":
                    $rootScope.setMenu_Gestion();
                    break;
                case "/Usuarios":
                    $rootScope.setMenu_Usuarios();
                    break;
                case "/Docentes":
                    $rootScope.setMenu_Docentes();
                    break;
                case "/Materias":
                    $rootScope.setMenu_Materias();
                    break;
                case "/Carreras":
                    $rootScope.setMenu_Carreras();
                    break;
                case "/Reportes":
                    // $location.url('/Reportes');
                    $rootScope.setMenu_Reportes();
                    break;
                case "/Sincronizacion":
                    // $location.url('/Sincronizacion');
                    $rootScope.setMenu_Sincronizacion();
                    break;
                case "/GenerarPlanilla":
                    // $location.url('/GenerarPlanilla');
                    if ($rootScope.GF.isSecre()) {
                        $location.url("/Gestion");
                    }
                    $rootScope.setMenu_GenerarPlanilla();
                    break;
                case "/VerPlanilla":
                    // $location.url('/VerPlanilla');
                    $rootScope.setMenu_VerPlanilla();
                    break;
                case "/CloseSystem":
                    $location.url('/Gestion');
                    break;
                case "/queryBuild":
                    if (!$rootScope.GF.isRoot()) {
                        $location.url("/Gestion");
                    }
                    $rootScope.setMenu_QueryBuild();
                    break;
                case "/EliminarRegistros":
                    if ($rootScope.GF.isAdmin() || $rootScope.GF.isRoot())
                        $rootScope.setMenu_EliminarRegistros();
                    else
                        $rootScope.setMenu_Gestion();
                    break;
            }
            if (locationPath.search("/Gestion/Old") >= 0) {
                $rootScope.setMenu_GestionPasada();
            }
        }

        $rootScope.$on('$routeChangeStart', function () {
            $log.warn('Change Route to ' + $location.path());
            //if ($rootScope.FIRST_REQUEST) {
            //    $rootScope.setMenu_Loader();
            //    return;
            //}
            if (!$rootScope.GF.isLogged()) {
                $rootScope.setMenu_Login();
                return;
            }
            redirects();
        });

        $rootScope.GLOBALS = {};

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

        $rootScope.GF.load_tipos_docencia = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIPOS_DOCENCIA = [
                {id: 1, name: "Catedra", short: 'T'},
                {id: 2, name: "Práctica", short: 'P'},
                {id: 3, name: "Laboratorio", short: 'L'}];
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

        $rootScope.GF.load_gestiones_academicas = function (fcnScs, fcnErr, items) {
            return $http.get(URLS.GESTIONES_ACADEMICAS)
                .then(function (data) {
                    $rootScope.GLOBALS.ALL_GESTIONES_ACADEMICAS = data['data']['data'];
                    fcnScs && fcnScs(data);
                }, function () {
                    fcnErr && fcnErr();
                })
        };

        $rootScope.GF.load_logs = function (fcnScs, fcnErr) {
            //$http2.get(URLS.LOGS, {}, function (data) {
            //    if (data.Success) {
            //        $rootScope.GLOBALS.LOGS = data.Logs;
            //        fcnScs && fcnScs(data);
            //    }
            //}, function () {
            //    fcnErr && fcnErr();
            //})
        };

///////


        $rootScope.GF.load_usuarios = function (query_params) {
            var defer = $q.defer();
            query_params = query_params || {};
            query_params['is_complete_serializer'] = 1;
            (new (new ModelService.UsuariosModel()).resource())
                .$get(query_params).then(function (data) {
                    defer.resolve(data);
                    console.log(data);
                    $rootScope.GLOBALS.LISTA_USUARIOS = data['data'];
                }
                , function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        };

        $rootScope.GF.load_lista_materias = function (fcnScs, fcnErr, query, items) {
            $http2.get(URLS.LISTA_MATERIAS + '?' + (query || ''), {items: items || 30}, function (data) {
                if (data.Success) {
                    if (!query)$rootScope.GLOBALS.LISTA_MATERIAS = data.Materias;
                    $rootScope.GLOBALS.LISTA_CUSTOM_MATERIAS = data.Materias;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_tipos_categoria = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIPOS_CATEGORIAS = [{id: 'A', name: "A"}, {id: 'B', name: "B"}, {id: 'C', name: "C"}, {
                id: 'D',
                name: "D"
            }];
        };

        $rootScope.GF.load_pensuls = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.PENSUL = [
                {id: 1, name: "Objetivos"},
                {id: 2, name: "Competencias"}
            ];
        };

        $rootScope.GF.load_lista_docentes = function (fcnScs, fcnErr, query) {
            $http2.get(URLS.LISTA_DOCENTES + '?' + (query || ''), {}, function (data) {
                if (data.Success) {
                    if (!query)$rootScope.GLOBALS.LISTA_DOCENTES = data.Docentes;
                    $rootScope.GLOBALS.LISTA_CUSTOM_DOCENTES = data.Docentes;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_allReport = function (fcnScs, fcnErr, items) {
            $http2.get(URLS.ALLREPORTES, {items: items || 20}, function (data) {
                $rootScope.GLOBALS.allreportes = data.Reportes;
                fcnScs && fcnScs(data);
            }, function () {
                fcnErr && fcnErr();
            });
        };

        $rootScope.GF.load_tiempo_carga_horaria = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIEMPOS_CARGA_HORARIA = [];
            for (var i = 0; i <= 25; i++) {
                $rootScope.GLOBALS.TIEMPOS_CARGA_HORARIA.push({id: i, name: i});
            }
        };

        $rootScope.GF.load_paralelos = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.PARALELOS = [
                {id: 'A', name: "A"},
                {id: 'B', name: "B"},
                {id: 'C', name: "C"},
                {id: 'D', name: "D"},
                {id: 'E', name: "E"},
                {id: 'F', name: "F"},
                {id: 'G', name: "G"},
                {id: 'H', name: "H"},
                {id: 'I', name: "I"},
                {id: 'J', name: "J"},
                {id: 'K', name: "K"},
                {id: 'L', name: "L"},
                {id: 'M', name: "M"},
                {id: 'N', name: "N"},
                {id: 'O', name: "O"},
                {id: 'P', name: "P"},
                {id: 'Q', name: "Q"},
                {id: 'R', name: "R"},
                {id: 'S', name: "S"},
                {id: 'T', name: "T"},
                {id: 'U', name: "U"},
                {id: 'V', name: "V"},
                {id: 'W', name: "W"},
                {id: 'X', name: "X"},
                {id: 'Y', name: "Y"},
                {id: 'Z', name: "Z"}
            ];
        };

        $rootScope.GF.load_tiempo_atrasos = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIEMPOS_ATRASOS = [];
            $rootScope.GLOBALS.TIEMPOS_ATRASOS.push({id: 0, name: '0'});
            for (var i = 1; i <= 35; i += 1) {
                $rootScope.GLOBALS.TIEMPOS_ATRASOS.push({id: i, name: i + ''});
            }
        };

        $rootScope.GF.load_gradosDocentes = function (fcnScs, fcnErr) {
            $rootScope.GLOBALS.GRADOS_DOCENTE = [
                {name: 'Coronel', value: 'CRNL'},
                {name: 'Egresado', value: 'Egr'},
                {name: 'Ingeniero', value: 'ING'},
                {name: 'Licenciado', value: 'LIC'}
            ];
        };

        $rootScope.GF.load_semestres = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.SEMESTRES = [{id: 1, name: "1er"},
                {id: 2, name: "2do"},
                {id: 3, name: "3er"},
                {id: 4, name: "4to"},
                {id: 5, name: "5to"},
                {id: 6, name: "6to"},
                {id: 7, name: "7mo"},
                {id: 8, name: "8vo"},
                {id: 9, name: "9no"},
                {id: 10, name: "10mo"}
            ];
        };

        $rootScope.GLOBALS.FACTURA_ITEMS = [{id: 1, name: "Si"}, {id: 0, name: "No"}];
        $rootScope.GLOBALS.PAGO_ITEMS = [{id: 0, name: "Semanal"}, {id: 1, name: "Horas"}];

        $rootScope.openModalConfirm = function (ok, cancel, title, message) {
            var modalInstance = $modal.open({
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
            modalInstance.result.then(function (selectedItem) {
                ok();
            }, function () {
                cancel();
            });
        };
    })
;

angular.module('planillasApp').controller('ModalConfirm', function ($scope, $modalInstance, message, title) {
    $scope.mensaje = message;
    $scope.title = title;

    $scope.ok = function () {
        $modalInstance.close(true);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss(false);
    };
});
