'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:ReportesCtrl
 * @description
 * # ReportesCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('ReportesCtrl', function ($scope,$rootScope,URLS,$http2,$log) {
    $scope.ITEMREPORTES = URLS.ITEMREPORTES;
    $rootScope.eliminarReporte = function(reporte){
        $rootScope.openModalConfirm(function(){
          $http2.patch(URLS.REPORTES,{id:reporte.id},
            function(data){
              if(data.Success){
                $rootScope.GF.load_allReport();
              }
            })
        },function(){},"ELIMINAR REPORTE","Seguro que desea eliminar reporte?");
    };
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
