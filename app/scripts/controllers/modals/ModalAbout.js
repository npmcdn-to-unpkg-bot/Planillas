angular.module('planillasApp').controller('ModalAboutCtrl', function ($scope,$rootScope, $modalInstance, items,$timeout) {

  $scope.developer = "Est. Eyvind Emilio Tinini Coaquira";
  $scope.carrera = "Cnl. Julio Cesar Narvaez Tamayo";
  $scope.institucion = "Escuela Militar de Ingeniería";
  $scope.docente = "Licenciada. Claudia Yaniquez";
  $scope.items = items;
  $scope.selected = {};

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.item1 =false;
  $scope.item2 =false;
  $scope.item3 =false;
  $scope.item4 =false;
  $timeout(function(){$scope.item1 = true;},500);
  $timeout(function(){$scope.item2 = true;},1000);
  $timeout(function(){$scope.item3 = true;},1500);
  $timeout(function(){$scope.item4 = true;},2000);
});
