'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('MenuCtrl', function ($rootScope,$modal,$log) {
    $rootScope.openModalProfile = function(){
      $rootScope.GF.load_unidades_academicas();
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalProfile.html',
        controller: 'ModalProfileCtrl',
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
    }

    $rootScope.openModalAbout = function(){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalAbout.html',
        controller: 'ModalAboutCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $rootScope.items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $rootScope.openModalDatosPago = function(){
      $rootScope.GF.load_lista_materias();
      $rootScope.GF.load_valor_impuestos();
      $rootScope.GF.load_tipo_usuarios();
      if($rootScope.GF.isAdmin() || $rootScope.GF.isRoot()) $rootScope.GF.load_especialidades();
      $rootScope.GF.load_tipos_docencia();
      $rootScope.GF.load_montos_pago();
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalDatosPago.html',
        controller: 'ModalDatosPagoCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $rootScope.items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };


    $rootScope.openModalUpdateMonto = function(){
      $rootScope.GF.load_pensuls(function () {
        $rootScope.GF.load_montos_pago(function(){
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/ModalUpdateMonto.html',
            controller: 'ModalUpdateMonto',
            size: 'md',
            resolve: {
              items: function () {
                return $rootScope.items;
              }
            }
          });
          modalInstance.result.then(function (selectedItem) {
            //  $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        });
      });
    };

    $rootScope.modificarDocente = function(docente){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalUpdateDocente.html',
        controller: 'ModalUpdateDocente',
        size: 'md',
        resolve: {
          docente: function () {
            return docente;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $rootScope.generarPlanilla(1);
        $rootScope.GF.load_lista_docentes();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $rootScope.openModalNewDocente = function(){
      $rootScope.GF.load_unidades_academicas();
      $rootScope.GF.load_lista_docentes(function(){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'views/modals/ModalNewDocente.html',
          controller: 'ModalNewDocente',
          size: 'md',
          resolve: {
            items: function () {
              return $rootScope.items;
            }
          }
        });
        modalInstance.result.then(function (docente) {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      });
    };

    $rootScope.openModalNewMateria = function(materia){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalNewMateria.html',
        controller: 'ModalNewMateria',
        size: 'md',
        resolve: {
          materia: function () {
            return angular.copy(materia);
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $rootScope.GF.load_lista_materias();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };


    $rootScope.openModalViewCourso = function(registro){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/modals/ModalViewCourse.html',
        controller: 'ModalViewCourse',
        size: 'md',
        resolve: {
          registro: function () {
            return angular.copy(registro);
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        //$rootScope.GF.load_lista_materias();
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };





  });
