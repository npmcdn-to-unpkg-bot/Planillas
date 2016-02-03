angular.module('planillasApp').controller('ModalNewMateria', function ($scope,$rootScope,$http2,URLS,$location,$modalInstance,materia) {
  function init(){
    $scope.nueva_materia = {};
    $scope.nueva_materia.Materia = "";
  }
  if(!materia){init();}else{
    $scope.nueva_materia = angular.copy(materia);
  }
  $scope.guardarMateria = function(mat){
    var new_mat = angular.copy(mat);
    var error = false;
    for(var val in new_mat){
      if(!new_mat[""+val])error = true;
    }
    if(error){
      toastr.warning('Llene todos los campos');
      return;
    }
    new_mat.Materia = new_mat.Materia.toUpperCase();
    if(materia){
      $http2.put(URLS.LISTA_MATERIAS,new_mat,
        function(data){
          if(data.Success){
            $rootScope.GF.load_lista_materias();
            $scope.ok();
          }
          $scope.cancel();
        })
    }else{
      $http2.post(URLS.LISTA_MATERIAS,new_mat,
        function(data){
          if(data.Success){
            $rootScope.GF.load_lista_materias();
            $scope.ok(true);
          }
          $scope.cancel();
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
