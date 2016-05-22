'use strict';

/**
 * @ngdoc service
 * @name planillasApp.InterceptorService
 * @description
 * # InterceptorService
 * Service in the planillasApp.
 */
angular.module('planillasApp')
    .service('InterceptorService', function ($rootScope) {
        var numberRequest = 0;
        return {
            'request': function (config) {
                numberRequest++;
                $rootScope.LOADER_ASYNC = true;
                return config;
            },
            'responseError': function () {
                numberRequest--;
                if (numberRequest <= 0) {
                    $rootScope.LOADER_ASYNC = false;
                    numberRequest = 0;
                }
                return config;
            },
            'response': function (config) {
                numberRequest--;
                if (numberRequest <= 0) {
                    $rootScope.LOADER_ASYNC = false;
                    numberRequest = 0;
                }
                return config;
            }
        };
    });
