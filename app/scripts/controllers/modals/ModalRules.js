'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:ModalRulesCtrl
 * @description
 * # ModalRulesCtrl
 * Controller of the planillasApp
 */

angular.module('planillasApp')
    .controller('ModalRulesCtrl', function ($scope, $rootScope, $uibModalInstance, $API, ModelService, $uibModal) {
        $scope.roles = [];
        $scope.current_user_type = false;
        $scope.users_types_model = new ModelService.TipoUsuariosModel(
            {
                onClickRow: function (data) {
                    $scope.current_user_type = data;
                    $scope.load_rules($scope.current_user_type);
                }
            }
        );
        $scope.load_rules = function (user_type) {
            (new $API.Roles).$get({user_type: user_type.id})
                .then(function (data) {
                    $scope.roles = data.data;
                })
        };
        (new $API.TipoUsuario()).$get()
            .then(function (data) {
                $scope.users_types = data.data;
            });

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.update_rol = function (id, item, value) {
            var params = {id: id};
            params[item] = value ? 1 : 0;
            (new $API.Roles()).$update(params)
                .then(function () {
                    $scope.load_rules($scope.current_user_type);
                })
        };
        $scope.addRol = function () {
            var modal_instance = $uibModal.open({
                controller: 'ModalNewRuleCtrl',
                templateUrl: 'add_new_rol',
                size: 'sm',
                resolve: {
                    user_type: function () {
                        return $scope.current_user_type.id;
                    }
                }
            });
            modal_instance.result.then(function () {
                $scope.load_rules($scope.current_user_type);
            })
        };
        $scope.options_context = [
            ['Eliminar rol', function ($itemScope) {
                (new $API.Roles()).$delete({id: $itemScope.rol.id})
                    .then(function () {
                        toastr.success("Eliminado");
                        $scope.load_rules($scope.current_user_type);
                    })
            }]
        ];
    });

angular.module('planillasApp')
    .controller('ModalNewRuleCtrl', function ($scope, $rootScope, $uibModalInstance, $API, user_type) {
        $scope.new_row = {};
        $scope.new_row.user_type = user_type;
        $scope.new_row.view = "";
        $scope.aceptar = function () {
            $scope.new_row.show = $scope.new_row.show ? 1 : 0;
            $scope.new_row.add_new = $scope.new_row.add_new ? 1 : 0;
            $scope.new_row.editable = $scope.new_row.editable ? 1 : 0;
            $scope.new_row.delete = $scope.new_row.delete ? 1 : 0;
            if (!$scope.new_row.view) {
                toastr.warning("Ingrese correctamente los datos");
                return;
            }
            (new $API.Roles()).$create($scope.new_row)
                .then(function () {
                    $uibModalInstance.close(true);
                }, function () {
                    toastr.warning("No se pudo ingresar");
                });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    });
