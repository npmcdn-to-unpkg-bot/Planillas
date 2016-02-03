'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:DocentesCtrl
 * @description
 * # DocentesCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('DocentesCtrl', function ($scope,URLS,$http2,$rootScope) {
    $scope.eliminarDocente = function(docente){
      $rootScope.openModalConfirm(function(){
        $http2.patch(URLS.LISTA_DOCENTES,{idDocente:docente.idDocente},
          function(data){
            if(data.Success){
              $rootScope.GF.load_lista_docentes();
            }
          })
      },function(){},"ELIMINAR DOCENTE","Seguro que desea eliminar docente?");
    };
  });
