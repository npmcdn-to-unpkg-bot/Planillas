'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:QuerybuildCtrl
 * @description
 * # QuerybuildCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('QuerybuildCtrl', function ($scope,$rootScope,$http2,URLS) {
    $scope.ejecutarQuery = function(Query){
      $rootScope.openModalConfirm(function(){
        $http2.post(URLS.QUERY,Query,
          function(data){
            if(data.Success){
              toastr.info(data.Message);
              $scope.result = data.RESULT;
            }
          })
      },function(){},"EJECUTAR QUERY","Seguro que desea ejecutar query?, los cambios podrian ser irreversibles");
    };
  });
