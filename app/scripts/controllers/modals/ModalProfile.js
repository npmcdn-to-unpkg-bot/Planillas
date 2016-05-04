angular.module('planillasApp').controller('ModalProfileCtrl', function ($scope, $rootScope, $API, URLS, $location, $modalInstance) {
    $rootScope.GF.load_unidades_academicas();
    $rootScope.GF.load_especialidades();
    $rootScope.GF.load_tipo_usuarios();

    $scope.nuevo_usuario = angular.copy($rootScope.CURRENT_USER);
    $scope.nuevo_usuario['unidad_academica'] = $scope.nuevo_usuario['unidad_academica']['id'];
    $scope.nuevo_usuario['especialidad'] = $scope.nuevo_usuario['especialidad']['id'];
    $scope.nuevo_usuario['tipo_usuario'] = $scope.nuevo_usuario['tipo_usuario']['id'];

    delete ($scope.nuevo_usuario['activo']);
    delete ($scope.nuevo_usuario['gestion']);
    delete ($scope.nuevo_usuario['password']);

    $scope.UpdateProfile = function (new_user) {
        (new $API.Usuarios()).$update(new_user)
            .then(function () {
                $rootScope.autoLogin({force: true});
                toastr.success('Información de cuenta modificada');
                $scope.ok(true);
            });
    };
    $scope.ok = function (success) {
        $modalInstance.close(success);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
