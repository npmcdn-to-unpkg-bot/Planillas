angular.module('planillasApp').controller('ModalSetFooter', function ($scope, $rootScope, $http2, URLS, $location, $uibModalInstance, items, $timeout) {
    $scope.footers = {};
    $scope.footers.header = items.filter_HEADER_PLANILLA;

    $scope.ok = function (footers) {
        $uibModalInstance.close(footers);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
