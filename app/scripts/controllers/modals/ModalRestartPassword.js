angular.module('planillasApp').controller('ModalRestartPassword', function ($scope,$rootScope,$http2,URLS,$location,$uibModalInstance) {
  $scope.restartPassword = function(email){
      $http2.post(URLS.RESTART,{email:email},
        function(data){
          if(data.Success){
            toastr.info(data.Message);
            $scope.ok(true);
          }else{
            toastr.warning(data.Message);
          }
        })
  };
  $scope.ok = function (success) {
    $uibModalInstance.close(success);
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
