angular.module('planillasApp').controller('ModalDatosPagoCtrl', function ($scope,$rootScope, $modalInstance, items,$timeout) {
  $scope.items = items;
  $scope.selected = {};

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
