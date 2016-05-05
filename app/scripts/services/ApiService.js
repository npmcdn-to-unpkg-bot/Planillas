'use strict';

/**
 * @ngdoc service
 * @name emiApp.ApiService
 * @description
 * # ApiService
 * Service in the psicologiaApp.
 */
angular.module('planillasApp')
    .service('$API', function ($q, $resource) {
        var api_url = localStorage.getItem("planillas_api");
        var base_url = (api_url || 'apiPlanillas/public/') + 'api/';

        function getModelResource(url) {
            return $resource(url, {id: '@id'}, {
                update: {method: 'PUT'},
                create: {method: 'POST', transformRequest: angular.identity, headers: {'Content-Type': undefined}},
                patch: {method: 'PATCH', transformRequest: angular.identity, headers: {'Content-Type': undefined}}
            });
        }

        return {
            Especialidades: getModelResource(base_url + 'especialidades/:id/'),
            Materias: getModelResource(base_url + 'materias/:id/'),
            Docentes: getModelResource(base_url + 'docentes/:id/'),
            Usuarios: getModelResource(base_url + 'usuarios/:id/'),
            Logs: getModelResource(base_url + 'logs/:id/'),
            UnidadAcademica: getModelResource(base_url + 'unidad_academica/:id/'),
            GestionAcademicas: getModelResource(base_url + 'gestion_academicas/:id/'),
            TipoUsuario: getModelResource(base_url + 'tipo_usuario/:id/'),
            Planillas: getModelResource(base_url + 'planillas/:id/'),
            Reportes: getModelResource(base_url + 'reportes/:id/')
        };
    });
