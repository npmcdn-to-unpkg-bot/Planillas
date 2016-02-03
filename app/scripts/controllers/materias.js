'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:MateriasCtrl
 * @description
 * # MateriasCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('MateriasCtrl', function ($scope,URLS,$http2,$rootScope) {
    $scope.eliminarMateria = function(mat){
      $rootScope.openModalConfirm(function(){
        $http2.patch(URLS.LISTA_MATERIAS,{idMateria:mat.idMateria},
          function(data){
            if(data.Success){
              $rootScope.GF.load_lista_materias();
            }
          })
      },function(){},"ELIMINAR MATERIA","Seguro que desea eliminar materia?");
    };
  });
