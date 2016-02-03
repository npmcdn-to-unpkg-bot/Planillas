'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('UsuariosCtrl', function ($scope,$rootScope,$http2,$modal,$log,URLS) {

    $scope.openModalNewUsuario = function(usuario){
      $rootScope.GF.load_tipo_usuarios(function(){
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/ModalNewUsuario.html',
            controller: 'ModalNewUsuario',
            size: 'md',
            resolve: {
              items: function () {
                return usuario;
              }
            }
          });
          modalInstance.result.then(function (selectedItem) {
            //    $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
      });
    };


    $scope.eliminarUsuario = function(user){
      $scope.type_update = 1;
      $rootScope.openModalConfirm(function(){
        $http2.patch(URLS.USUARIOS,{id:user.id},
          function(data){
            if(data.Success){
              $rootScope.GF.load_usuarios();
            }
          })
      },function(){},"ELIMINAR USUARIO","Seguro que desea eliminar usuario?");
    };

    $scope.alta_baja_usuario = function(user,act){
      $http2.put(URLS.USUARIOS,{id:user.id,Activo:act},
        function(data){
          if(data.Success){
            $rootScope.GF.load_usuarios();
          }
        })
    };
  });
