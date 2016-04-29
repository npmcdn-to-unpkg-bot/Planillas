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
        var base_url = (api_url || 'apiPlanillas/public') + 'api/';

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
            UnidadAcademica: getModelResource(base_url + 'unidad_academica/:id/')
        };
    });
