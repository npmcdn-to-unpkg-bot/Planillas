angular.module('planillasApp').controller('ModalDatosPagoCtrl', function ($scope, $rootScope, $uibModalInstance, $timeout) {
    $scope.selected = {};
    $rootScope.GF.load_especialidades();
    $rootScope.GF.load_current_monto_categoria();

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
