angular.module('planillasApp').controller('ModalUpdateDocente', function ($scope,$rootScope,$http2,URLS,$location,$uibModalInstance,docente) {

  function init(){
    var aux = angular.copy(docente);
    $scope.nuevo_usuario_docente = {};
    $scope.nuevo_usuario_docente.Nombre = aux.Nombre;
    $scope.nuevo_usuario_docente.ApMaterno = aux.ApMaterno;
    $scope.nuevo_usuario_docente.ApPaterno = aux.ApPaterno;
    $scope.nuevo_usuario_docente.CI = aux.CI;
    $scope.nuevo_usuario_docente.idUnidadAcademica = aux.idUnidadAcademica;
    $scope.nuevo_usuario_docente.idDocente = aux.idDocente;
  }
  init();

  $scope.modificar = function(docenteAux){
    var error = false;
    var new_user = angular.copy(docenteAux);
    for(var val in new_user){
      if(!new_user[""+val])error = true;
    }
    if(error){
      toastr.warning('Llene todos los campos');
      return;
    }
    new_user.ApPaterno = new_user.ApPaterno.toUpperCase();
    new_user.ApMaterno = new_user.ApMaterno.toUpperCase();
    new_user.Nombre  = new_user.Nombre.toUpperCase();
    new_user.Docente = new_user.ApPaterno + " "+new_user.ApMaterno +" "+new_user.Nombre;
    $http2.put(URLS.DOCENTES,new_user,
      function(data){
        if(data.Success) {
          $scope.ok();
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
