angular.module('planillasApp').controller('ModalSetFooter', function ($scope, $rootScope, $http2, URLS, $location, $modalInstance, items, $timeout) {
    $scope.footers = {};
    $scope.footers.header = items.filter_HEADER_PLANILLA;

    $scope.ok = function (footers) {
        $modalInstance.close(footers);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
