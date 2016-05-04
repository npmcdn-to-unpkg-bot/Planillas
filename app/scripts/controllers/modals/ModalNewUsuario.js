angular.module('planillasApp').controller('ModalNewUsuario', function ($scope, $rootScope, $q, URLS, $location, $modalInstance, $http, user) {
    var promises = [
        $rootScope.GF.load_tipo_usuarios(),
        $rootScope.GF.load_unidades_academicas(),
        $rootScope.GF.load_especialidades()
    ];

    $scope.user = angular.copy(user);
    $scope.nuevo_usuario = {};
    $q.all(promises).then(function () {
        if (user) {//modificar
            $scope.nuevo_usuario = angular.copy(user);
            $scope.nuevo_usuario.especialidad = $scope.nuevo_usuario.especialidad.id;
            $scope.nuevo_usuario.tipo_usuario = $scope.nuevo_usuario.tipo_usuario.id;
            $scope.nuevo_usuario.unidad_academica = $scope.nuevo_usuario.unidad_academica.id;
            delete ($scope.nuevo_usuario.activo);
        } else {//NUEVO
            $scope.nuevo_usuario.especialidad = $rootScope.GF.getEspecialidadId();
            $scope.nuevo_usuario.tipo_usuario = $rootScope.GLOBALS.TIPO_USUARIO[0].id;
            $scope.nuevo_usuario.unidad_academica = $rootScope.CURRENT_USER.unidad_academica.id;
            $scope.nuevo_usuario.ap_paterno = '';
            $scope.nuevo_usuario.ap_materno = '';
            $scope.nuevo_usuario.celular = '';
            $scope.nuevo_usuario.correo = '';
            $scope.nuevo_usuario.username = '';
            $scope.nuevo_usuario.password = '';
        }

    });
    $scope.guardar = function (new_user) {
        if (user) {
            $http.put(URLS.USUARIOS + '/' + new_user.id, new_user)
                .then(function () {
                    $scope.ok();
                    toastr.success("Cuenta creada exitosamente");
                }, function () {
                    toastr.warning("Ha ocurrido un error al modificar la cuenta");
                })
        } else {
            $http.post(URLS.USUARIOS, new_user)
                .then(function () {
                    $scope.ok();
                    toastr.success("Cuenta creada exitosamente");
                }, function () {
                    toastr.warning("Ha ocurrido un error al activar la cuenta");
                })
        }
    };

    $scope.ok = function (success) {
        $modalInstance.close(success);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
