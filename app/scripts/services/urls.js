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
      USUARIOS: SERVER + "usuarios",
      ESPECIALIDADES: SERVER + "especialidades",
      TIPOS_USUARIO: SERVER + "tiposUsuarios",
      MONTOS_PAGO: SERVER + "montosPago",

      PLANILLAS: SERVER + "planillas",
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

      REPORTES: SERVER + "reporte",
      ALLREPORTES: SERVER + "reporte/all",
      ITEMREPORTES: SERVER + "reporte/item",
      DOCENTES: SERVER + "docentes",
      DOCENTES_ADD: SERVER + "docentes/add",

      GESTIONES_ACADEMICAS: SERVER + "gestionAcademica",
      INICIAR_GESTION_ACADEMICA: SERVER + "gestionAcademica/iniciar",
      FINALIZAR_GESTION_ACADEMICA: SERVER + "gestionAcademica/finalizar",
      UNIDADES_ACADEMICAS: SERVER + "unidadesAcademicas",

      LOGS: SERVER + "logs",

      TEST: SERVER + 'test',
      QUERY: SERVER + 'root/query/emilio/ifae',
      RESTART: SERVER + 'Mail'
    }
  });
