angular.module('planillasApp').controller('ModalProfileCtrl', function ($scope,$rootScope,$http2,URLS,$location,$modalInstance) {
  $scope.nuevo_usuario = angular.copy($rootScope.GF.getUser());
  delete ($scope.nuevo_usuario.Activo);
  delete ($scope.nuevo_usuario.Gestion);
  $scope.UpdateProfile = function(new_user){
    var error = false;
    console.log(new_user);
    new_user.id = $rootScope.GF.getUser().id;
    for(var val in new_user){
      if(!new_user[""+val])error = true;
    }
    if(error){
      toastr.warning('Llene todos los campos');
      return;
    }
    $http2.put(URLS.USUARIOS,new_user,
      function(data){
        if(!data)return;
        if(data.Success){
          $rootScope.autologin();
          $scope.ok(true);
        }
      })
  };
  $scope.ok = function (success) {
    $modalInstance.close(success);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
