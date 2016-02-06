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
    .config(function ($routeProvider, $httpProvider, uiSelectConfig, $resourceProvider) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;
        //$httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
        //$resourceProvider.defaults.stripTrailingSlashes = false;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //delete $httpProvider.defaults.headers.common[]


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
    .run(function ($rootScope, $location, $log, $http2, URLS, editableOptions, editableThemes, $modal, toastr) {
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
        //$rootScope.CURRENT_USER = undefined;
        $rootScope.filters = {};
        $rootScope.filters.items_for_page = 20;
        $rootScope.setMenu_Login = function () {
            console.log('Set menu Login');
            $location.url('/Login');
            $rootScope.CURRENT_VIEW = 'views/login.html';
        };
        $rootScope.setMenu_Loader = function () {
            console.log('Set menu Loader');
            //$location.url('/');
            $rootScope.CURRENT_VIEW = 'views/loader.html';
        };
        $rootScope.setMenu_Home = function () {
            console.log('Set menu Home');
            $location.url('/Home');
            $rootScope.CURRENT_VIEW = 'views/home.html';
        };
        $rootScope.setMenu_CloseSystem = function () {
            console.log('Set menu close System');
            $location.url('/CloseSystem');
            $rootScope.CURRENT_VIEW = 'views/close_system.html';
        };
        $rootScope.setMenu_Gestion = function () {
            console.log('Set menu Gestion');
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
            console.log('Set menu Gestion Pasada');
            $location.url($location.path());
            $rootScope.CURRENT_VIEW = 'views/gestionold.html';
        };
        $rootScope.setMenu_QueryBuild = function () {
            console.log('Set menu query');
            $location.url($location.path());
            $rootScope.CURRENT_VIEW = 'views/querybuild.html';
        };
        $rootScope.setMenu_EliminarRegistros = function () {
            console.log('Set menu Eliminar');
            $location.url('/EliminarRegistros');
            $rootScope.CURRENT_VIEW = 'views/eliminarregistros.html';
            $rootScope.GF.load_gestiones_academicas();
            $rootScope.GF.load_logs();
        };
        $rootScope.setMenu_Sincronizacion = function () {
            console.log('Set menu Sincronizacion');
            $location.url('/Sincronizacion');
            $rootScope.CURRENT_VIEW = 'views/sincronizacion.html';
        };
        $rootScope.setMenu_Reportes = function () {
            console.log('Set menu Reportes');
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
            console.log('Set menu GenerarPlanilla');
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
            console.log('Set menu VerPlanilla');
            $location.url('/VerPlanilla');
            if ($rootScope.GF.isSecre()) {
                $rootScope.CURRENT_VIEW = 'views/verplanillasecretaria.html';
            } else {
                $rootScope.CURRENT_VIEW = 'views/verplanilla.html';
            }
        };
        $rootScope.setMenu_Usuarios = function () {
            console.log('Set menu Usuarios');
            $location.url('/Usuarios');
            $rootScope.CURRENT_VIEW = 'views/usuarios.html';
            $rootScope.GF.load_usuarios();
            $rootScope.GF.load_unidades_academicas();
            $rootScope.GF.load_especialidades();
            $rootScope.GF.load_tipo_usuarios();
            $rootScope.GF.load_pensuls();
            $rootScope.GF.load_tipos_docencia();
        };
        $rootScope.setMenu_Docentes = function () {
            console.log('Set menu Docentes');
            $location.url('/Docentes');
            $rootScope.CURRENT_VIEW = 'views/docentes.html';
            $rootScope.GF.load_lista_docentes();
        };
        $rootScope.setMenu_Carreras = function () {
            console.log('Set menu Carreras');
            $location.url('/Carreras');
            $rootScope.CURRENT_VIEW = 'views/carreras.html';
        };
        $rootScope.setMenu_Materias = function () {
            console.log('Set menu Materias');
            $location.url('/Materias');
            $rootScope.CURRENT_VIEW = 'views/materias.html';
            $rootScope.GF.load_lista_materias();
        };

        $rootScope.GF.isLogged = function () {
            $log.info("IS LOGGUED: ", $rootScope.CURRENT_USER ? true : false);
            return $rootScope.CURRENT_USER ? true : false;
        };
        $rootScope.GF.getUser = function () {
            return $rootScope.CURRENT_USER;
        };
        $rootScope.GF.getFullGestionNamme = function () {
            return ($rootScope.GF.getUser().Gestion.idPeriodoGestion == 1 ? 'I' : 'II') + ' - ' + $rootScope.GF.getUser().Gestion.Gestion;
        };
        $rootScope.GF.getFullName = function () {
            return $rootScope.GF.getUser().Nombres + ' ' + $rootScope.GF.getUser().apPaterno + ' ' + $rootScope.GF.getUser().apMaterno;
        };
        $rootScope.GF.getEspecialidadName = function () {
            return $rootScope.CURRENT_USER.Especialidad
        };
        $rootScope.GF.getEspecialidadId = function () {
            return angular.copy($rootScope.CURRENT_USER.idEspecialidad);
        };
        $rootScope.GF.getUnidadAcademicaId = function () {
            return $rootScope.CURRENT_USER.idUnidadAcademica;
        };
        $rootScope.GF.getUnidadAcademicaName = function () {
            return $rootScope.CURRENT_USER.UnidadAcademica;
        };

        $rootScope.GF.isRoot = function () {
            return $rootScope.GF.getUser().idTipoUsuario == 1;
        };

        $rootScope.GF.isAdmin = function () {
            return $rootScope.GF.getUser().idTipoUsuario == 2;
        };
        $rootScope.GF.isJefeC = function () {
            return $rootScope.GF.getUser().idTipoUsuario == 3;
        };
        $rootScope.GF.isSecre = function () {
            return $rootScope.GF.getUser().idTipoUsuario == 4;
        };
        function redirects() {
            var locationPath = $location.path();
            //if(!$rootScope.GF.getUser().Gestion&&!$rootScope.GF.isAdmin()){
            /*if(!$rootScope.GF.getUser().Gestion && $rootScope.GF.isSecre()){
             toastr.warning("Debe iniciar la gestion academica");
             $rootScope.setMenu_Gestion();return;
             }*/
            if (!$rootScope.GF.getUser().Gestion && ($rootScope.GF.isJefeC() || $rootScope.GF.isSecre())) {
                $rootScope.setMenu_CloseSystem();
                return;
            }
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
            if ($rootScope.FIRST_REQUEST) {
                $rootScope.setMenu_Loader();
                return;
            }
            if (!$rootScope.GF.isLogged()) {
                $rootScope.setMenu_Login();
                return;
            }
            redirects();
        });
        $rootScope.login = function (user, hideMessage) {
            $http2.post(URLS.LOGIN, user, function (data) {
                $rootScope.FIRST_REQUEST = false;
                if (data.Success) {
                    $rootScope.CURRENT_USER = data.User;
                    redirects();
                } else {
                    $rootScope.setMenu_Login();
                }
            }, function () {
                $rootScope.setMenu_Login();
            }, hideMessage);
        };
        $rootScope.autologin = function () {
            $rootScope.login({}, true);
        };
        $rootScope.autologin();
        $rootScope.logout = function () {
            $http2.post(URLS.LOGOUT, {},
                function () {
                    location.reload();
                    // $rootScope.setMenu_Login();
                }, function () {
                    location.reload();
                    //$rootScope.CURRENT_USER = undefined;
                    //$rootScope.setMenu_Login();
                })
        };

        $rootScope.GLOBALS = {};
        $rootScope.GF.load_unidades_academicas = function (fcnScs, fcnErr, items) {
            if ($rootScope.GLOBALS.UNIDADES_ACADEMICAS) {
                fcnScs && fcnScs();
                return;
            }
            $http2.get(URLS.UNIDADES_ACADEMICAS, {items: items || 30}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.UNIDADES_ACADEMICAS = data.UnidadesAcademicas;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_gestiones_academicas = function (fcnScs, fcnErr, items) {
            //if($rootScope.GLOBALS.ALL_GESTIONES_ACADEMICAS)return;
            $http2.get(URLS.GESTIONES_ACADEMICAS, {items: items || 30}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.ALL_GESTIONES_ACADEMICAS = data.GestionAcademica;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_usuarios = function (fcnScs, fcnErr, items) {
            $http2.get(URLS.USUARIOS, {items: items || 30}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.LISTA_USUARIOS = data.Usuarios;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_valor_impuestos = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            if ($rootScope.GF.getUser().Gestion) {
                $rootScope.GLOBALS.VALOR_IMPUESTOS = [
                    {id: 1, name: "Impuesto a las Utilidades (I.U)", value: $rootScope.GF.getUser().Gestion.IU}, {
                        id: 2, name: "Impuesto a las Transacciones(I.T)", value: $rootScope.GF.getUser().Gestion.IT
                    }];
            }
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

        $rootScope.GF.load_tipo_usuarios = function (fcnScs, fcnErr) {
            $http2.get(URLS.TIPOS_USUARIO, {}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.TIPOS_USUARIO = data.tipos_usuarios;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };

        $rootScope.GF.load_especialidades = function (fcnScs, fcnErr) {
            $http2.get(URLS.ESPECIALIDADES, {}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.ESPECIALIDADES = data.Especialidades;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };
        $rootScope.GF.load_tipos_docencia = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIPOS_DOCENCIA = [{id: 1, name: "Catedra", val: 'T'}, {
                id: 2,
                name: "Practica",
                val: 'P'
            }, {id: 3, name: "Laboratorio", val: 'L'}];
        };
        $rootScope.GF.load_tipos_categoria = function (fcnScs, fcnErr) {
            fcnScs && fcnScs();
            $rootScope.GLOBALS.TIPOS_CATEGORIAS = [{id: 'A', name: "A"}, {id: 'B', name: "B"}, {id: 'C', name: "C"}, {
                id: 'D',
                name: "D"
            }];
        };
        $rootScope.GF.load_montos_pago = function (fcnScs, fcnErr) {
            $http2.get(URLS.MONTOS_PAGO, {}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.MONTOS_CATEGORIA = data.montos_pago;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
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
        $rootScope.GF.load_logs = function (fcnScs, fcnErr) {
            $http2.get(URLS.LOGS, {}, function (data) {
                if (data.Success) {
                    $rootScope.GLOBALS.LOGS = data.Logs;
                    fcnScs && fcnScs(data);
                }
            }, function () {
                fcnErr && fcnErr();
            })
        };
        $rootScope.GLOBALS.FACTURA_ITEMS = [{id: 1, name: "Si"}, {id: 0, name: "No"}];


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

    });

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
