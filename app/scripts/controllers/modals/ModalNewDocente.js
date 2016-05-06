angular.module('planillasApp').controller('ModalNewDocente', function ($scope,$rootScope,$http2,URLS,$location,$uibModalInstance) {

  function init(){
    $scope.nuevo_usuario_docente = {};
    $scope.nuevo_usuario_docente.Nombre = "";
    $scope.nuevo_usuario_docente.ApPaterno = "";
    $scope.nuevo_usuario_docente.ApMaterno = "";
    $scope.nuevo_usuario_docente.CI = "";
    $scope.nuevo_usuario_docente.idUnidadAcademica = "";
  }
  init();

  $scope.guardar = function(new_user){
    var error = false;
    new_user = angular.copy(new_user);
    new_user.id = $rootScope.GF.getUser().id;
    for(var val in new_user){
      if(!new_user[""+val])error = true;
    }
    if(error || !new_user.ORIGEN){
      toastr.warning('Llene todos los campos');
      return;
    }
    new_user.CI = new_user.CI + ' ' + new_user.ORIGEN;
    new_user.ApPaterno = new_user.ApPaterno.toUpperCase();
    new_user.ApMaterno = new_user.ApMaterno.toUpperCase();
    new_user.Nombre  = new_user.Nombre.toUpperCase();
    new_user.Docente = new_user.ApPaterno + " "+new_user.ApMaterno +" "+new_user.Nombre;
    $http2.post(URLS.DOCENTES_ADD,new_user,
      function(data){
        if(data.Success){
          $scope.nuevo_usuario_docente = {};
          $scope.ok(true);
        }
        $scope.cancel();
      })
  };
  $scope.ok = function (success) {
    $uibModalInstance.close(success);
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
