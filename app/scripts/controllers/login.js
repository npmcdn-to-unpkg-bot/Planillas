'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('LoginCtrl', function ($scope,$rootScope,$modal,$log) {


    $rootScope.openModalRestartPassword = function(){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalRestartPassword.html',
        controller: 'ModalRestartPassword',
        size: 'md',
        resolve: {
          items: function () {
            return $rootScope.items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $rootScope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });
