angular.module('planillasApp').controller('ModalNewUsuario', function ($scope, $rootScope, $http2, URLS, $location, $modalInstance, items,$timeout) {
  $scope.items = items;
  $scope.nuevo_usuario = {};
  console.log('se ejecuta modal');
  if (items) {//modificar
    console.log(items);
    $scope.nuevo_usuario = angular.copy(items);
    delete ($scope.nuevo_usuario.Activo);
  } else {//NUEVO
    $timeout(function(){
      $scope.nuevo_usuario.idEspecialidad = $rootScope.GF.getEspecialidadId();
      $scope.nuevo_usuario.Especialidad = $rootScope.GF.getEspecialidadName();
      $scope.nuevo_usuario.idTipoUsuario = $rootScope.GLOBALS.TIPOS_USUARIO[0].idTipoUsuario;
      $scope.nuevo_usuario.tipo = $rootScope.GLOBALS.TIPOS_USUARIO[0].tipo;
      $scope.nuevo_usuario.idUnidadAcademica = $rootScope.GF.getUser().idUnidadAcademica;
      $scope.nuevo_usuario.UnidadAcademica = $rootScope.GF.getUser().UnidadAcademica;
    })
  }


  $scope.guardar = function (new_user) {
    var error = false;
    console.log(new_user);
    for (var val in new_user) {
      if (!new_user[val]) {
        error = true;
        break;
      }
    }
    if (error) {
      toastr.warning('LLene todos los campos');
      return;
    }
    if (items) {
      $http2.put(URLS.USUARIOS, new_user,
        function (data) {
          if (data.Success) {
            $rootScope.GF.load_usuarios();
            $scope.ok();
          }
        })
    } else {
      $http2.post(URLS.USUARIOS, new_user,
        function (data) {
          if (data.Success) {
            $rootScope.GF.load_usuarios();
            $scope.ok();
          }
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
