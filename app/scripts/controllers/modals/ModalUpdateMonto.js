angular.module('planillasApp').controller('ModalUpdateMonto', function ($scope,$rootScope,$http2,URLS,$location,$modalInstance,$q,$http) {

  $scope.updateMontoPago = function(monto,dataNew){
    var d = $q.defer();
    var data = {
      Monto:dataNew,
      id:monto.id
    };
    $http2.put(URLS.MONTOS_PAGO,data,function(res) {
      $rootScope.GF.load_montos_pago();
      res = res || {};
      if(res.status === 'ok') {
        d.resolve()
      } else {
        d.resolve(res.msg)
      }
    },function(e){
      d.resolve();
    });
    return d.promise;
  };
  $scope.ok = function (success) {
    $modalInstance.close(success);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
