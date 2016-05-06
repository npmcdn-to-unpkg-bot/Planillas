angular.module('planillasApp')
    .controller('ModalViewCourse', function ($scope, $rootScope, $API, $q, URLS, $location, $uibModalInstance, registro) {
        $scope.registro = angular.copy(registro);

        $scope.ok = function (new_value_pensul) {
            $uibModalInstance.close(new_value_pensul);
        };
        $scope.cancel = function () {
            toastr.info('cancelado');
            $uibModalInstance.dismiss('cancel');
        };
    });
