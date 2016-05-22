'use strict';

/**
 * @ngdoc service
 * @name planillasApp.$http2
 * @description
 * # $http2
 * Service in the planillasApp.
 */
angular.module('planillasApp')
    .service('$http2', function ($cookies, $rootScope, $http, $log, $q) {
        var count = 0;

        function request(url, method, data, fcnSuccess, fcnError, hideMessage) {
            var deferred = $q.defer();
            $rootScope.LOADER_ASYNC = true;
            count++;
            $http({
                url: url,
                method: method,
                data: method != "GET" ? data : "",
                params: method == "GET" ? data : ""
            }).success(function (data) {
                count--;
                if (count == 0) {
                    $rootScope.LOADER_ASYNC = false;
                }
                //$rootScope.LOADER_ASYNC = false;
                try {
                    if (angular.isFunction(fcnSuccess))fcnSuccess(data);
                    if (data.Success) {
                        deferred.resolve(data);
                        if (data.Message && !hideMessage) {
                            toastr.success(data.Message);
                            toastr.clear();
                        }

                    } else {
                        deferred.reject(data);
                        if (data.Message && !hideMessage)toastr.warning(data.Message);
                    }
                } catch (e) {
                    toastr.error('Error del navegador');
                    if (angular.isFunction(fcnError))fcnError();
                    deferred.reject(data);
                }
            }).error(function (data, code, headers) {
                count--;
                if (count == 0) {
                    $rootScope.LOADER_ASYNC = false;
                }
                deferred.reject(data, code, headers);
                switch (code) {
                    case 500:
                        //toastr.error('Error interno del servidor');
                        toastr.info('Debe refrescar la tabla planilla');
                        break;
                    case 503:
                        toastr.error('Revise su conexión a internet');
                        break;
                    case 404:
                        toastr.error('Error en el servidor');
                        break;
                    default:
                        toastr.error('Error desconocido');
                }
                //$rootScope.LOADER_ASYNC = false;
                if (angular.isFunction(fcnError))fcnError(data, code, headers);
            });
            return deferred.promise;
        }

        function post(url, data, fcnSuccess, fcnError, hideMessage) {
            return request(url, "POST", data, fcnSuccess, fcnError, hideMessage);
        }

        function get(url, data, fcnSuccess, fcnError, hideMessage) {
            return request(url, "GET", data, fcnSuccess, fcnError, hideMessage);
        }

        function put(url, data, fcnSuccess, fcnError, hideMessage) {
            return request(url, "PUT", data, fcnSuccess, fcnError, hideMessage);
        }

        function patch(url, data, fcnSuccess, fcnError, hideMessage) {
            return request(url, "PATCH", data, fcnSuccess, fcnError, hideMessage);
        }

        return {
            post: post,
            get: get,
            put: put,
            patch: patch
        };
    });
