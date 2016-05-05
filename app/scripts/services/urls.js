'use strict';

/**
 * @ngdoc service
 * @name planillasApp.URLS
 * @description
 * # URLS
 * Service in the planillasApp.
 */
angular.module('planillasApp')
    .service('URLS', function () {

        var api_url = localStorage.getItem("planillas_api");
        var SERVER = (api_url || 'apiPlanillas/public/');

        return {
            LOGIN: SERVER + "login",
            LOGOUT: SERVER + "logout",
            AUTO_LOGIN: SERVER + "login",

            START_GESTION: SERVER + 'api/gestion_academicas/start',
            FINISH_GESTION: SERVER + 'api/gestion_academicas/finish',
            UNIDADES_ACADEMICAS: SERVER + "api/unidad_academica",
            ESPECIALIDADES: SERVER + "api/especialidades",
            MONTO_CATEGORIA: SERVER + "api/monto_categoria",
            GESTIONES_ACADEMICAS: SERVER + "api/gestion_academicas",
            TIPO_USUARIO: SERVER + "api/tipo_usuario",
            USUARIOS: SERVER + "api/usuarios",
            PLANILLAS: SERVER + "api/planillas",
            GRADO_DOCENTE: SERVER + "api/grado_docente",
            TIPO_PAGO: SERVER + "api/tipo_pago",
            PREVIEW_PLANILLA: SERVER + "api/reporte/preview",
            REPORTES: SERVER + "api/reportes",
            ITEM_REPORTES: SERVER + "api/reporte/item",

            PLANILLAS_REPORTE_TXT: SERVER + "planillas/fileReport",
            PLANILLAS_ADD: SERVER + "planillas/add",

            PLANILLAS_LIMPIAR_REINTEGRO: SERVER + "planillas/limpiarReintegro",
            PLANILLAS_LIMPIAR_ATRASOS: SERVER + "planillas/limpiarAtrasos",
            SINCRONIZACIONES: SERVER + "sincronizaciones",
            SINCRONIZACION: SERVER + "syncronize/Planillas",
            SINCRONIZACION_PLANILLAS: SERVER + "syncronize/Planillas",
            SINCRONIZACION_ESPECIALIDADES: SERVER + "syncronize/Especialidades",
            SINCRONIZACION_CUENTAS_BANCOS: SERVER + "syncronize/CuentasBancos",

            SINCRONIZACION_CATEGORIAS_DOCENTES: SERVER + "syncronize/CategoriasDocentes",
            SINCRONIZACION_CARGA_HORARIA: SERVER + "syncronize/CargaHoraria",

            LISTA_DOCENTES: SERVER + "docentes",
            LISTA_MATERIAS: SERVER + "materias",
            ALLREPORTES: SERVER + "reporte/all",

            DOCENTES: SERVER + "docentes",
            DOCENTES_ADD: SERVER + "docentes/add",
            INICIAR_GESTION_ACADEMICA: SERVER + "gestionAcademica/iniciar",
            FINALIZAR_GESTION_ACADEMICA: SERVER + "gestionAcademica/finalizar",

            LOGS: SERVER + "logs",

            TEST: SERVER + 'test',
            QUERY: SERVER + 'root/query/emilio/ifae',
            RESTART: SERVER + 'Mail'
        }
    });
