'use strict';

/**
 * @ngdoc function
 * @name planillasApp.controller:VerplanillaCtrl
 * @description
 * # VerplanillaCtrl
 * Controller of the planillasApp
 */
angular.module('planillasApp')
  .controller('VerplanillaCtrl',function ($scope,$rootScope,$http2,URLS,$http,$q,$modal,$log,$timeout) {
    var currentPage = 1;
    $rootScope.NUEVO_DOCENTE = {};
    $rootScope.selectedDocente = function(idDocente){
      $rootScope.NUEVO_DOCENTE.CI = $rootScope.getDocententeById(idDocente).CI;
    };
    $rootScope.guardar_registro  = function(item){
      item = angular.copy(item);
      console.log(queryBuilder());
      item.idEspecialidad = queryBuilder().idEspecialidad;
      item.idUnidadAcademica = queryBuilder().idUnidadAcademica;
      item.idDocente = item.idDocente?item.idDocente.idDocente:null;
      item.idMateria = item.idMateria?item.idMateria.idMateria:null;
      $http2.post(URLS.PLANILLAS_ADD,item,
        function(data){
          if(data.Success){
            $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
            if(item.CI)
              $rootScope.setInfoDocente(item.CI);
          }
        })
    };

    $rootScope.updateNumeroCuenta = function(docente,numeroCuenta){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        CuentaBancaria:numeroCuenta
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.updatePensul = function(docente,Pensul){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Pensul:Pensul
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.updateGrado = function(docente,Grado){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Grado:Grado
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.updateMateria = function(docente,idMateria){
      console.log(idMateria);
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        idMateria:idMateria
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.updateTipoDocencia = function(docente,Tipo){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Tipo:Tipo
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };
    $rootScope.updateHorasSemanales = function(docente,horasSem){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        HorasSemanales:horasSem
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.updateCategoria = function(docente,Categoria){
      console.log("Cambio",docente,Categoria);
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Categoria:Categoria
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };
    $rootScope.updateFactura = function(docente,Factura){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Factura:(Factura==1?1:0)
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };
    $rootScope.updateReintegro = function(docente,reintegro){
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Reintegro:reintegro
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };
    $rootScope.updateAtrasos = function(docente,nroPeriodos){
      console.log("Cambio",docente,nroPeriodos);
      var d = $q.defer();
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        AtrasosPeriodos:nroPeriodos
      };
      $http2.put(URLS.PLANILLAS,data,function(res) {
        $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        res = res || {};
        if(res.status === 'ok') {
          d.resolve()
        } else {
          d.resolve(res.msg)
        }
      },function(e){
        d.resolve();
      });
      return d.promise;
    };

    $rootScope.HabilitarDocente = function(docente,habilitado){
      var data = {
        id:docente.id,
        idDocente:docente.idDocente,
        idEspecialidad:docente.idEspecialidad,
        Habilitado:habilitado?1:0
      };
      $rootScope.openModalConfirm(
        function(){
          $http2.put(URLS.PLANILLAS,data,function(data) {
            $rootScope.generarPlanilla(1,$rootScope.filters.items_for_page);
            if($rootScope.filters && $rootScope.filters.pagination_selected){
              $rootScope.generarPlanilla(1,$rootScope.filters.items_for_page);
            }else{
              $rootScope.generarPlanilla(1,$rootScope.filters.items_for_page);
              $rootScope.filters.pagination_selected = 0;
            }
          });
        },
        function(){},
        "DOCENTE - PLANILLAs",
        "Seguro que desea "+(habilitado?"Habilitar":"inhabilitar")+" docente de planillas"
      )
    };
    $rootScope.filters = {};
    $rootScope.filters.items_for_page = 20;
    $rootScope.filtersObjects = {};

    $rootScope.planillas_list = [];
    $rootScope.total_items = 0;
    $rootScope.planillas_listing_page = {};

    $rootScope.planillas_pages = [];
    //$rootScope.filtersObjects.filter_materia = {};
    //$rootScope.filtersObjects.filter_docente = {};
    //filters.filter_unidad_academica
    //filters.filter_carrera
    //filters.filter_docente
    //filters.filter_materia
    //filters.filter_factura
    //filters.filter_category
    //filters.NUMERO_SEMANAS
    //filters.filter_HEADER_PLANILLA
    //filters.SHOW_REINTEGRO
    var queryBuilder = function(page){
      return  {
        idUnidadAcademica :$rootScope.filters.filter_unidad_academica||'',
        idEspecialidad :$rootScope.filters.filter_carrera||'',
        idDocente :$rootScope.filtersObjects.filter_docente&&$rootScope.filtersObjects.filter_docente.idDocente||'',
        idMateria :$rootScope.filtersObjects.filter_materia&&$rootScope.filtersObjects.filter_materia.idMateria||'',
        Factura :$rootScope.filters.filter_factura||'',
        Categoria  :$rootScope.filters.filter_category||'',
        Reintegro :$rootScope.filters.SHOW_REINTEGRO||'',
        weeks :$rootScope.filters.NUMERO_SEMANAS||1,
        items:$rootScope.filters.items_for_page||'',
        start:((page-1)*$rootScope.filters.items_for_page )||'0',
        Gestion:$rootScope.filters.filter_Gestion ||'0',
        idPeriodoGestion:$rootScope.filters.filter_idPeriodoGestion||'0'
      };
    };
    $rootScope.generarPlanilla = function(page,items_for_page,forceWeeks){

      currentPage = page;
      if($rootScope.total_items && $rootScope.planillas_pages [page-1].items){
        $rootScope.planillas_listing_page = $rootScope.planillas_pages [page-1];
      }
      var data= queryBuilder(currentPage);
      data.items = items_for_page;
      data.weeks = forceWeeks || data.weeks;
      console.log($rootScope.filters);
      console.log(data);
      $http2.post(URLS.PLANILLAS,data,
        function(data){
          if(data.Success){
            $rootScope.total_items = data.total_items;
            $rootScope.planillas_pages = [];
            if(!$rootScope.total_items){
              $rootScope.planillas_listing_page = $rootScope.planillas_pages = Array();
              return;
            }
            console.log("+=====================",$rootScope.filters.items_for_page);
            for(var i = 0; i < ($rootScope.total_items / $rootScope.filters.items_for_page); i++ ){
              $rootScope.planillas_pages.push({page:(i+1),items:false});
            }
            console.log($rootScope.planillas_pages,$rootScope.planillas_pages.length);
            $rootScope.planillas_pages[page-1].items = data.items;
            $rootScope.planillas_listing_page = $rootScope.planillas_pages[page-1];
          }
        })
    };
    $rootScope.eliminarRegistro = function(docente_registro){
      $rootScope.openModalConfirm(function() {
        $http2.patch(URLS.PLANILLAS, {id: docente_registro.id},
          function () {
            $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
          })
      },function(){},"ELIMINAR REGOSTRO","Seguro que desea eliminar registro?")
    };

    $rootScope.generarReporteCuentasTXT = function(){
      var Query = queryBuilder();
      Query.FileBanco  = "si";

      setTimeout(function(){
        window.open(URLS.PLANILLAS_REPORTE_TXT+"?"+ $.param(Query), "Reporte");
      },0);
    };
    $rootScope.LimpiarReintegro = function(){
      if($rootScope.GF.isRoot()){toastr.info('No se puede modificar reintegros');return;}
      var data = queryBuilder(0);
      var query= {};
      if($rootScope.GF.isAdmin()){
        if(!data.idEspecialidad){toastr.warning("Debe especificar especialidad");return ;}
        query.idEspecialidad = data.idEspecialidad;
      }
      $http2.post(URLS.PLANILLAS_LIMPIAR_REINTEGRO,query,function(data){
        if(data.Success){
          $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        }
      });
    };
    $rootScope.LimpiarAtrasos = function(){
      if($rootScope.GF.isRoot()){toastr.info('No se puede modificar reintegros');return;}
      var data = queryBuilder(0);
      var query= {};
      if($rootScope.GF.isAdmin()){
        if(!data.idEspecialidad){toastr.warning("Debe especificar especialidad");return ;}
        query.idEspecialidad = data.idEspecialidad;
      }

      $http2.post(URLS.PLANILLAS_LIMPIAR_ATRASOS,query,function(data){
        if(data.Success){
          $rootScope.generarPlanilla(currentPage,$rootScope.filters.items_for_page);
        }
      });
    };
    $rootScope.getFinalPlanilla = function(){
      var Query =
        "header= Planillas de pago a 20 semanas &"+
        "idEspecialidad=" +(queryBuilder().idEspecialidad || '')+'&'+
        "weeks=20";
      setTimeout(function(){
        window.open(URLS.REPORTES+"?"+Query, "Reporte", "location=0,height=600, width=1200");
      },0);
    };
    $rootScope.generarReportePlanilla = function(isfinal){
      var Query = queryBuilder();
      Query.final = isfinal?1:0;
      console.log('filters');
      console.log($rootScope.filters);

        if(isfinal){
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/modals/ModalSetFooter.html',
            controller: 'ModalSetFooter',
            size: 'lg',
            resolve: {
              items: function () {
                return $rootScope.filters;
              }
            }
          });
          modalInstance.result.then(function (Footers) {
            if(Footers){
              setTimeout(function(){
                window.open(URLS.REPORTES+"?"+ $.param(Query)+'&'+ $.param(Footers), "Reporte", "location=0,height=600, width=1200");
              },0);
            }else{
              toastr.info("Cancelado");
            }
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        }else{
          setTimeout(function(){
            window.open(URLS.REPORTES+"?"+ $.param(Query), "Reporte", "location=0,height=600, width=1200");
          },0);
        }
    };
    $rootScope.load_docentes = function(){
      $rootScope.GF.load_lista_docentes(function(data){},function(){},'idCarrera='+($rootScope.filters.filter_carrera || ''))
    };
    $rootScope.load_materias = function(){
      $rootScope.GF.load_lista_materias(function(data){},function(){},
        'idEspecialidad='+($rootScope.filters.filter_carrera || '')+'&idDocente='+($rootScope.filters.filter_docente&&$rootScope.filters.filter_docente.idDocente || ''))
    };

    $rootScope.selectedEnableds = {};
    $rootScope.setInfoDocente = function(ciDocente){
      console.log("Set info docente : "+ciDocente);
      $rootScope.selectedEnableds = {};
      $http2.post(URLS.PLANILLAS,{CI:ciDocente},function(data){
        console.log(data);
        if(data&&data.items&&data.items.length>0){
          console.log("Itemas");
          $rootScope.NUEVO_DOCENTE.Factura = data.items[0].Factura;
          $rootScope.NUEVO_DOCENTE.Categoria = data.items[0].Categoria;
          $rootScope.NUEVO_DOCENTE.Grado = data.items[0].Grado;
          $rootScope.NUEVO_DOCENTE.CuentaBancaria = data.items[0].CuentaBancaria;
          $rootScope.selectedEnableds.CuentaBancaria = true;
          $rootScope.selectedEnableds.Categoria = true;
          $rootScope.selectedEnableds.Factura = true;
          $rootScope.selectedEnableds.Grado = true;
        }else{
          $rootScope.NUEVO_DOCENTE.Factura = "";
          $rootScope.NUEVO_DOCENTE.Categoria = "";
          $rootScope.NUEVO_DOCENTE.Grado = "";
          $rootScope.NUEVO_DOCENTE.CuentaBancaria = "";
        }
      })
    };
    $rootScope.getPlanillas = function(carrera,idDocente,page,numSem){
      var data = {
        carrera:"",
        idDocente:"",
        start:(page-1)*$rootScope.filters.items_for_page ,
        items:$rootScope.filters.items_for_page,
        weeks:numSem || 1
      };

      if($rootScope.total_items && $rootScope.planillas_pages [page-1].items){
        $rootScope.planillas_listing_page = $rootScope.planillas_pages [page-1];
        //return;
      }
      $http2.post(URLS.PLANILLAS,data,
        function(data){
          if(data.Success){
            if(!$rootScope.total_items){
              $rootScope.total_items = data.total_items;
              $rootScope.planillas_pages = [];
              for(var i = 0; i < ($rootScope.total_items / $rootScope.filters.items_for_page); i++ ){
                $rootScope.planillas_pages.push({page:(i+1),items:false});
              }
              $rootScope.planillas_pages[0].items = data.items;
              $rootScope.planillas_listing_page = $rootScope.planillas_pages[0];

            }else{
              $rootScope.planillas_pages [page-1].items = data.items;
              $rootScope.planillas_listing_page = $rootScope.planillas_pages [page-1];
            }
          }
        })
    };

    $rootScope.NUMERO_SEMANAS_DISPONIBLE = [];
    for(var i = 1 ;i<=20;i++){
      $rootScope.NUMERO_SEMANAS_DISPONIBLE.push(i);
    }

    $rootScope.NUMERO_PAGINACION = [];
    for(var i = 1 ;i<=100;i++){
      $rootScope.NUMERO_PAGINACION.push(i);
    }



    $scope.exportData = function (id) {
      var data= queryBuilder(1);
      data.items  = 1000000000000;
      $http2.post(URLS.PLANILLAS,data,
        function(data){
          if(data.Success){
            $rootScope.planillas_listing_page_exel = data.items;
            $timeout(function(){
              if($rootScope.filters.SHOW_REINTEGRO){
                var blob = new Blob([document.getElementById('exportableReport').innerHTML], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob,"Planillas- "+($rootScope.filters.NUMERO_SEMANAS || "")+".xls");
              }else{
                var blob = new Blob([document.getElementById('exportable').innerHTML], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob,"Planillas- "+($rootScope.filters.NUMERO_SEMANAS || "")+".xls");
              }
            })
          }
        });
    };

  });


