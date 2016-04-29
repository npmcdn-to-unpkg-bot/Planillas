angular.module('planillasApp')
  .controller('ModalViewCourse', function ($scope, $rootScope, $http2, URLS, $location, $modalInstance, registro) {
    $scope.docente = angular.copy(registro);
    /*
    * Abierto: 1
    * ApMaterno: "Mendoza"
    * ApPaterno: "Carrasco
    * "AtrasosPeriodos: 12
    * Atrasos_Periodos: 12
    * CI: "6542534 Lp"
    * Categoria: "B"
    * CuentaBancaria: "
    * 5432543253lp
    * "Especialidad: "Ingenieria Comercial"Factura: 0Gestion: 2015Grado: "Egr"Habilitado: 1HorasSemanales: 16IT: 29.5944IU: 123.31LiquidoPagable: 833.5756Materia: "BASES DE INDUSTRIAL"Monto: 62.7Nombre: "Rocio"Nombres: "Carrasco Mendoza Rocio"NombresDef: "Carrasco Mendoza Rocio"Paralelo: "A"Pensul: 1Reintegro: 0Semestre: 3Tipo: "Catedra"Total_1: 1003.2Total_2: 986.48Total_3: 986.48Total_4: 152.9044UnidadAcademica: "La Paz"id: 58idDocente: 87idEspecialidad: 8idMateria: 61idPeriodoGestion: 1idUnidadAcademica: 1vIT: 3vIU: 12.5
    * */
    $scope.guardarMateria = function (mat) {
      var new_mat = angular.copy(mat);
      var error = false;
      for (var val in new_mat) {
        if (!new_mat["" + val])error = true;
      }
      if (error) {
        toastr.warning('Llene todos los campos');
        return;
      }
      new_mat.Materia = new_mat.Materia.toUpperCase();
      if (materia) {
        $http2.put(URLS.LISTA_MATERIAS, new_mat,
          function (data) {
            if (data.Success) {
              $rootScope.GF.load_lista_materias();
              $scope.ok();
            }
            $scope.cancel();
          })
      } else {
        $http2.post(URLS.LISTA_MATERIAS, new_mat,
          function (data) {
            if (data.Success) {
              $rootScope.GF.load_lista_materias();
              $scope.ok(true);
            }
            $scope.cancel();
          })
      }
    };
    $scope.ok = function (success) {
      $modalInstance.close(success);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
