angular.module('planillasApp').controller('ModalNewUsuario', function ($scope, $rootScope, $q, URLS, $location, $uibModalInstance, $http, user, AuthService) {
    var promises = [
        AuthService.getUser(),
        $rootScope.GF.load_tipo_usuarios(),
        $rootScope.GF.load_unidades_academicas(),
        $rootScope.GF.load_especialidades()
    ];

    $scope.user = angular.copy(user);
    $scope.nuevo_usuario = {};

    $scope.tipo_usuarios = [];
    $q.all(promises).then(function () {
        if ($rootScope.GF.isRoot()) {
            $scope.tipo_usuarios = [
                {id: 2, name: 'Administrador'}, {id: 3, name: 'Jefe de carrera'}, {id: 4, name: 'Secretaria'}
            ];
        } else if ($rootScope.GF.isAdmin()) {
            $scope.tipo_usuarios = [
                {id: 3, name: 'Jefe de carrera'}, {id: 4, name: 'Secretaria'}
            ];
        } else if ($rootScope.GF.isJefeCarrera()) {
            $scope.tipo_usuarios = [
                {id: 4, name: 'Secretaria'}
            ];
        }

        if (user) {//modificar
            $scope.nuevo_usuario = angular.copy(user);
            $scope.nuevo_usuario.especialidad = $scope.nuevo_usuario.especialidad.id;
            $scope.nuevo_usuario.tipo_usuario = $scope.nuevo_usuario.tipo_usuario.id;
            $scope.nuevo_usuario.unidad_academica = $scope.nuevo_usuario.unidad_academica.id;
            delete ($scope.nuevo_usuario.activo);
            delete ($scope.nuevo_usuario.password);
        } else {//NUEVO
            $scope.nuevo_usuario.especialidad = $rootScope.GF.getEspecialidadId();
            $scope.nuevo_usuario.tipo_usuario = $scope.tipo_usuarios[0]['id'];
            $scope.nuevo_usuario.unidad_academica = $rootScope.CURRENT_USER['unidad_academica']['id'];
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
                    toastr.success("Cuenta modificada exitosamente");
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
        $uibModalInstance.close(success);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
