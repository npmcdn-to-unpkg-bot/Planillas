angular.module('planillasApp').controller('ModalUpdateMonto', function ($scope, $rootScope, $http2, URLS, $location, $modalInstance, $q, $http) {
    $rootScope.GF.load_pensuls();
    $rootScope.GF.load_current_monto_categoria();
    $scope.updateMontoPago = function (monto, new_monto) {
        var d = $q.defer();
        var data = {
            monto: new_monto
        };
        $http.put(URLS.MONTO_CATEGORIA + "/" + monto.id, data)
            .then(function () {
                $rootScope.GF.load_current_monto_categoria();
                d.resolve();
            }, function () {
                d.reject();
            });
        return d.promise;
    };
    $scope.ok = function (success) {
        $modalInstance.close(success);
    };
});
