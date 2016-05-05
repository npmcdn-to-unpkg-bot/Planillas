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
                    context[key] = value;
                });
                context.extra_query_params = config.query_params || {};
            }
        };

        var EspecialidadesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Especialidades;
                context.fields = [
                    {label: "Especialidad", name: "name", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Lista de Carreras'};
                context.delete = false;
                context.editable = false;
                context.searchEnabled = true;
            }, config);
        };

        var MateriasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Materias;
                context.fields = [
                    {label: "Materia", name: "name", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Lista de Materias'};
                context.searchEnabled = true;
            }, config);
        };

        var UnidadAcademicaModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.UnidadAcademica;
                context.fields = [
                    {label: "Unidad académica", name: "name", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Unidades Académicas'};
            }, config);
        };

        var DocentesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Docentes;
                context.fields = [
                    {label: "Apellido paterno", name: "ap_paterno", type: 'string', required: true},
                    {label: "Apellido materno", name: "ap_materno", type: 'string', required: true},
                    {label: "Nombres", name: "nombres", type: 'string', required: true},
                    {label: "Carnet", name: "ci", type: 'string', required: true},
                    {
                        label: "Unidad Académica",
                        name: "unidad_academica",
                        type: 'number',
                        model: new UnidadAcademicaModel(),
                        required: true
                    }
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['ap_paterno', 'ap_materno', 'nombres', 'ci', 'unidad_academica'];
                context.filterFields = ['ap_paterno', 'ap_materno', 'nombres', 'ci'];
                context.nameView = 'nombres';
                context.config = {title: 'Docentes'};
                context.searchEnabled = true;
            }, config);
        };

        var TipoUsuariosModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.TipoUsuario;
                context.fields = [
                    {label: "Tipo usuario", name: "name", type: 'string', required: true},
                    {label: "Descripción", name: "description", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Tipos de usuarios'};
                context.searchEnabled = true;
            }, config);
        };

        var UsuariosModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Usuarios;
                context.fields = [
                    {label: "Apellido materno", name: "ap_paterno", type: 'string', required: true},
                    {label: "Apellido materno", name: "ap_materno", type: 'string', required: true},
                    {label: "Nombres", name: "nombres", type: 'string', required: true},
                    {label: "Celular", name: "celular", type: 'string', required: true},
                    {
                        label: "Especialidad",
                        name: "especialidad",
                        type: 'select',
                        model: new EspecialidadesModel(),
                        required: true
                    },
                    {
                        label: "Tipo usuario",
                        name: "tipo_usuario",
                        type: 'select',
                        model: new TipoUsuariosModel(),
                        required: true
                    },
                    {label: "Correo", name: "email", type: 'email', required: true},
                    {label: "Nombre de usuario", name: "username", type: 'string', required: true},
                    {label: 'Password', name: 'password', type: 'string', required: true},
                    {label: "Activo", name: "activo", type: 'boolean', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['ap_paterno', 'ap_materno', 'nombres', 'celular', 'especialidad', 'tipo_usuario'];
                context.filterFields = ['ap_paterno', 'ap_materno', 'nombres', 'celular'];
                context.nameView = 'nombres';
                context.config = {title: 'Lista de usuarios'};
                context.searchEnabled = true;
                context.table_name = 'account';
                context.name = 'accounts';
            }, config);
        };

        var LogsModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Logs;
                context.fields = [
                    {
                        label: "Usuario", name: "user", type: 'select',
                        model: new UsuariosModel(), required: true
                    },
                    {
                        label: "Unidad Académica", name: "unidad_academica", type: 'select',
                        model: new UnidadAcademicaModel(), required: true
                    },
                    {
                        label: "Especialidad", name: "especialidad", type: 'select',
                        model: new EspecialidadesModel(), required: true
                    },
                    {label: "Tipo de acción", name: "tipo", type: 'string', required: true},
                    {label: "Descripción", name: "descripcion", type: 'string', required: true}
                ];
                context.extra_fields = [{label: "Fecha", name: 'updated_at'}];
                context.showFields = ['user', 'unidad_academica', 'especialidad', 'tipo', 'descripcion'];
                context.nameView = 'tipo';
                context.editable = false;
                context.delete = false;
                context.add_new = false;
                context.config = {title: 'Logs'};
                context.searchEnabled = true;
            }, config);
        };

        var GestionesAcademicasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.GestionAcademicas;
                context.fields = [
                    {label: "Gestión", name: "gestion", type: 'number', required: true},
                    {
                        label: "Periodo gestión",
                        name: "periodo_gestion",
                        type: 'text',
                        required: true
                    },
                    {
                        label: "Unidad académica",
                        name: "unidad_academica",
                        type: 'select',
                        model: new UnidadAcademicaModel(),
                        required: true
                    },
                    {
                        label: "Especialidad",
                        name: "especialidad",
                        type: 'select',
                        model: new EspecialidadesModel(),
                        required: true
                    },
                    {label: "IU", name: "iu", type: 'number', required: true},
                    {label: "IT", name: "it", type: 'number', required: true},
                    {label: "Abierto", name: "abierto", type: 'boolean', required: true}
                ];
                context.extra_fields = [{label: "Última modificación", name: 'updated_at'}];
                context.showFields = ['gestion', 'periodo_gestion', 'unidad_academica', 'especialidad'];
                context.nameView = 'gestion';
                context.config = {title: 'Gestiones académicas'};
                context.add_new = false;
                context.editable = false;
                context.searchEnabled = true;
            }, config);
        };

        return {
            EspecialidadesModel: EspecialidadesModel,
            DocentesModel: DocentesModel,
            MateriasModel: MateriasModel,
            UnidadAcademicaModel: UnidadAcademicaModel,
            TipoUsuariosModel: TipoUsuariosModel,
            UsuariosModel: UsuariosModel,
            LogsModel: LogsModel,
            GestionesAcademicasModel: GestionesAcademicasModel
        };
    });
