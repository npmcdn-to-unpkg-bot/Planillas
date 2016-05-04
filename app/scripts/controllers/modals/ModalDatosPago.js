angular.module('planillasApp').controller('ModalDatosPagoCtrl', function ($scope, $rootScope, $modalInstance, $timeout) {
    $scope.selected = {};
    $rootScope.GF.load_tipos_docencia();
    $rootScope.GF.load_especialidades();
    $rootScope.GF.load_current_monto_categoria();

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
