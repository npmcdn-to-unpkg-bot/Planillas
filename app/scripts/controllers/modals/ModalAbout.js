angular.module('planillasApp').controller('ModalAboutCtrl', function ($scope, $rootScope, $uibModalInstance, $timeout) {

    $scope.developer = "Est. Eyvind Emilio Tiñini Coaquira";
    $scope.carrera = "Cnl. DAEN. Julio Cesar Narvaez Tamayo";
    $scope.institucion = "Escuela Militar de Ingeniería";
    $scope.docente = "Lic. Claudia Yañiquez Magne";
    $scope.selected = {};

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.item1 = false;
    $scope.item2 = false;
    $scope.item3 = false;
    $scope.item4 = false;
    $timeout(function () {
        $scope.item3 = true;
    }, 500);
    $timeout(function () {
        $scope.item2 = true;
    }, 1000);
    $timeout(function () {
        $scope.item1 = true;
    }, 1500);
    $timeout(function () {
        $scope.item4 = true;
    }, 2000);
});
