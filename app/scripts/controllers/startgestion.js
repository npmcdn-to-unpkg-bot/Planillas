'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:StartgestionCtrl
 * @description
 * # StartgestionCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('StartgestionCtrl', function ($scope, $rootScope, URLS, $http2) {
    $scope.iniciar_nueva_gestion = function (newGestion) {
      newGestion.All = true;
      $http2.post(URLS.INICIAR_GESTION_ACADEMICA, newGestion
        , function (data) {
          if (data.Success)
            $rootScope.autologin();
        }
        , function () {
        });
    };
    $scope.finalizar_gestion = function () {
      $rootScope.openModalConfirm(
        function(){
          var data = {
            Gestion:$rootScope.GF.getUser().Gestion.Gestion,
            idPeriodoGestion:$rootScope.GF.getUser().Gestion.idPeriodoGestion
          };
          $http2.post(URLS.FINALIZAR_GESTION_ACADEMICA, data
            , function (data) {
              if (data.Success)
                $rootScope.autologin();
            }
            , function () {
            });
        },
        function(){
          toastr.info('Cancelado');
        },
        "FINALIZAR GESTION","Esta seguro de finalizar la Gestion academica \" "+$rootScope.GF.getFullGestionNamme()+" \" ?"
      );

    };
  });
