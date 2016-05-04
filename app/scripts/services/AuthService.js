'use strict';

/**
 * @ngdoc service
 * @name planillasApp.Auth
 * @description
 * # AuthService
 * Service in the planillasApp.
 */
angular.module('planillasApp')
    .service('AuthService', function (URLS, $q, $http, StatusMessageService) {
        var currentUser = null;

        function login(_user, options) {
            var defer = $q.defer(),
                force = options && options['force'],
                user = {};
            if (_user) {
                user = {
                    username: _user['name'],
                    password: _user['password']
                };
            }
            if (currentUser && !force) {
                defer.resolve(currentUser);
            } else {
                $http.post(URLS.LOGIN, user)
                    .then(function (data) {
                        data = data.data;
                        currentUser = data['user'];
                        defer.resolve(currentUser);
                        StatusMessageService.showResolve(data, options);
                    }, function (data) {
                        currentUser = null;
                        defer.reject(data);
                        StatusMessageService.showReject(data, options);
                    });
            }
            return defer.promise;
        }

        function autoLogin(options) {
            return login(false, options);
        }


        function getUser() {
            return login();
        }

        function logout() {
            var defer = $q.defer();
            $http.post(URLS.LOGOUT, {})
                .then(function (data) {
                    defer.resolve(data);
                    location.reload();
                }, function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        }

        return {
            login: login,
            autoLogin: autoLogin,
            getUser: getUser,
            logout: logout
        }
    });
