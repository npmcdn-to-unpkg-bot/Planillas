angular.module('planillasApp').controller('ModalSetFooter', function ($scope, $rootScope, $http2, URLS, $uibModalInstance, planilla) {
    $scope.footers = {};

    $scope.headers_planilla = planilla;
    $scope.headers_planilla.is_final = 1;
    $scope.headers_planilla.title_header = "Planilla a " + planilla.horas_or_semanas + (planilla.tipo_pago == 1 ? ' Horas' : ' Semanas');
    $scope.headers_planilla.name1 = '';
    $scope.headers_planilla.name2 = '';
    $scope.headers_planilla.name3 = 'Cnl. DAEN. Julio Cesar Narvaez Tamayo';
    $scope.headers_planilla.name4 = 'Cnl. DAEN. John Williams De la Barra Sanjines';
    $scope.headers_planilla.cargo1 = 'RESP. DE INFORMATICA';
    $scope.headers_planilla.cargo2 = 'JEFA DE ASULTOS ADMINISTRATIVOS';
    $scope.headers_planilla.cargo3 = 'DIRECTOR NACIONAL DE INFORMÁTICA';
    $scope.headers_planilla.cargo4 = 'DIRECTOR UNIDAD ACADEMICA';

    $scope.ok = function (footers) {
        var foot = angular.copy(footers);
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        foot.title_header = foot.title_header.replace("\n", "<br>");
        $uibModalInstance.close(foot);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
