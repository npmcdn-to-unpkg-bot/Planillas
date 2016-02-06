'use strict';

/**
 * @ngdoc service
 * @name planillasApp.ModelService
 * @description
 * # ModelService
 * Service in the planillasApp.
 */

angular.module('planillasApp')
    .service('ModelService', function ($API) {
        /**
         #Model object example:
         {
            resource: $resource,
            params: Array-FieldObjects
            showFields: Array-string-Fields-show
         }

         #Resource
         $resource
         #FieldObjects
         fieldObject = {
                label:'String',//render in html
                name:'String',//service endpoint field
                type:string|largeString|boolean|date|time|datetime|email|file|color|image|password|range
                required:true|false,
                Model:ModelObject,
                list:['stringA','stringB','stringC'],
                results:[promiseResultArray]
            }
         #ShowFields
         showFields = ['StringField','StringField',....]
         #filterFields = ['','',..]
         **/
        var BaseModel = function (child_model, config) {
            config = config || {};
            this.id_name = 'id';
            this.fields = [];
            this.extra_fields = [];
            this.showFields = [];
            this.filterFields = [];
            this.disabled_fields = [];
            this.dataResponse = {};
            this.nameView = 'name';
            this.config = {
                title: '',
                subTitle: ''
            };
            this.searchEnabled = false;
            this.editable = true;
            this.delete = true;
            this.add_new = true;
            var context = this;
            if (typeof (child_model) == 'function') {
                child_model(context);
                angular.forEach(config, function (value, key) {
                    context[key] = config['key'];
                });
                context.extra_query_params = config.query_params || {};
            }
        };


        var EspecialidadesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'idEspecialidad';
                context.resource = $API.Especialidades;
                context.fields = [
                    {label: "Especialidad", name: "Especialidad", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.showFields = ['Especialidad'];
                context.filterFields = ['Especialidad'];
                context.nameView = 'Especialidad';
                context.config = {title: 'Lista de Especialidades'};
                context.delete = false;
                context.editable = false;
            }, config);
        };

        var MateriasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'idMateria';
                context.resource = $API.Materias;
                context.fields = [
                    {label: "Materia", name: "Materia", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.showFields = ['Materia'];
                context.filterFields = ['Materia'];
                context.nameView = 'Materia';
                context.config = {title: 'Lista de Materias'};
                context.searchEnabled = true;
            }, config);
        };

        var UnidadAcademicaModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'idUnidadAcademica';
                context.resource = $API.UnidadAcademica;
                context.fields = [
                    {label: "Unidades Academicas", name: "UnidadAcademica", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.showFields = ['UnidadAcademica'];
                context.nameView = 'UnidadAcademica';
                context.config = {title: 'Unidades Academicas'};
            }, config);
        };
        var DocentesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'idDocente';
                context.resource = $API.Docentes;
                context.fields = [
                    {label: "Apellido materno", name: "ApPaterno", type: 'string', required: true},
                    {label: "Apellido materno", name: "ApMaterno", type: 'string', required: true},
                    {label: "Nombbres", name: "Nombre", type: 'string', required: true},
                    {label: "Carnet", name: "CI", type: 'string', required: true},
                    {
                        label: "Unidad Academica",
                        name: "idUnidadAcademica",
                        type: 'number',
                        model: new UnidadAcademicaModel(),
                        required: true
                    }
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.showFields = ['ApPaterno', 'ApMaterno', 'Nombre', 'CI', 'idUnidadAcademica'];
                context.filterFields = ['ApPaterno', 'ApMaterno', 'Nombre', 'CI'];
                context.nameView = 'Nombre';
                context.config = {title: 'Docentes'};
                context.searchEnabled = true;
            }, config);
        };

        return {
            EspecialidadesModel: EspecialidadesModel,
            DocentesModel: DocentesModel,
            MateriasModel: MateriasModel,
            UnidadAcademicaModel: UnidadAcademicaModel
        };
    });
