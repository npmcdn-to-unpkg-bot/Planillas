'use strict';

/**
 * @ngdoc service
 * @name emiApp.ModelService
 * @description
 * # ModelService
 * Service in the emiApp.
 */

angular.module('emiApp')
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
            this.fields = [];
            this.extra_fields = [];
            this.showFields = [];
            this.filterFields = [];
            this.disabled_fields = [];
            this.data = {};
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

        var CityModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.City;
                context.fields = [
                    {label: 'Departamento', name: 'name', type: 'string', required: true},
                    {label: 'Abreviatura', name: 'short', type: 'string', required: true},
                    {label: 'Imagen', name: 'image', type: 'image', required: false, width: 60, height: 60}
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.disabled_fields = ['name'];
                context.showFields = ['image', 'name', 'short'];
                context.config = {title: 'Departamentos'};
                context.delete = false;
                context.add_new = false;
            }, config);
        };
        var PeopleModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.People;
                context.fields = [
                    {label: "Nombre", name: "first_name", type: 'string', required: true},
                    {label: "Apellido", name: "last_name", type: 'string', required: true},
                    {label: "Fecha Nac.", name: "date_of_birth", type: 'date', required: true},
                    {label: "Carnet", name: "ci", type: 'string', required: true},
                    {label: "Ciudad", name: "city", type: 'string', model: new CityModel(), required: true},
                    {
                        label: "Genero",
                        name: "gender",
                        type: 'string',
                        required: true,
                        choices: [{value: 'F', label: 'Femenino'}, {value: 'M', label: 'Masculino'}]
                    },
                    {label: "Imagen", name: "image", type: 'image'}
                ];
                context.showFields = ['first_name', 'last_name', 'date_of_birth', 'ci', 'gender', 'city'];
                context.filterFields = ['first_name', 'ci'];
                context.config = {title: 'Personas'};
                context.searchEnabled = true;
            }, config);
        };

        var SpecialtyModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Specialty;
                context.fields = [
                    {label: "Nombre", name: "name", type: 'string', required: true},
                    {label: "Mision", name: "mission", type: 'largeString'},
                    {label: "Vision", name: "vision", type: 'largeString'},
                    {label: "Perfil", name: "profile", type: 'largeString'},
                    {label: "Objetivo", name: "objective", type: 'largeString'},
                    {label: "Imagen", name: "image", type: 'image', width: 80, height: 'auto', required: true}
                ];
                context.showFields = ['image', 'name', 'mission', 'profile'];
                context.filterFields = ['name', 'mission'];
                context.config = {title: 'Especialidades'};
            }, config);
        };

        var SemesterModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Semester;
                context.fields = [
                    {label: "Semestre", name: "name", type: 'string', required: true},
                    {label: "Nombre corto", name: "short", type: 'string', required: true}
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'}, {label: "Creado", name: 'created_at'}
                ];
                context.disabled_fields = ['name'];
                context.showFields = ['name', 'short'];
                context.filterFields = ['name', 'short'];
                context.config = {title: 'Semestres'};
                context.delete = false;
                context.add_new = false;
            }, config);
        };

        var MatterModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Matter;
                context.fields = [
                    {label: "Materia", name: "name", type: 'string', required: true},
                    {label: "Imagen", name: "image", type: 'image', width: 50, height: 50, required: false}
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'}, {label: "Creado", name: 'created_at'}
                ];
                context.showFields = ['image', 'name'];
                context.filterFields = ['name'];
                context.config = {title: 'Materias'};
            }, config);
        };

        var ParallelModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Parallel;
                context.fields = [
                    {label: "Paralelo", name: "name", type: 'string', required: true}
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'},
                    {label: "Creado", name: 'created_at'}
                ];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.config = {title: 'Paralelo'};
            }, config);
        };

        var GradeModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Grade;
                context.fields = [
                    {label: "Grado", name: "name", type: 'string', required: true},
                    {label: "Abreviatura", name: "short", type: 'string', required: true}
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'}, {label: "Creado", name: 'created_at'}
                ];
                context.showFields = ['name', 'short'];
                context.filterFields = ['name', 'short'];
                context.config = {title: 'Grados'};
                context.searchEnabled = false;
            }, config);
        };

        var CategoryModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Category;
                context.fields = [
                    {label: "Categoria", name: "name", type: 'string', required: true},
                    {label: "Descripcion", name: "description", type: 'largeString'}
                ];
                context.showFields = ['name', 'description'];
                context.filterFields = ['name', 'description'];
                context.config = {title: 'Categorias'};
                context.add_new = false;
            }, config);
        };

        var RestrictionListModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.RestrictionMountCategory;
                context.fields = [
                    {label: "Nombre", name: "name", type: 'string', required: true},
                    {
                        label: "Tipo de docencia actual",
                        name: "current_type_teaching",
                        type: 'integer',
                        model: new TypeTeachingModel(),
                        required: true
                    },
                    {
                        label: "Categoria actual",
                        name: "current_category",
                        type: 'integer',
                        model: new CategoryModel(),
                        required: true
                    },
                    {
                        label: "Tipo de docencia reemplazo",
                        name: "replace_type_teaching",
                        type: 'integer',
                        model: new TypeTeachingModel(),
                        required: true
                    },
                    {
                        label: "Categoria remplazo",
                        name: "replace_category",
                        type: 'integer',
                        model: new CategoryModel(),
                        required: true
                    }
                ];
                context.extra_fields = [{label: "Ultima modificacion", name: 'updated_at'}];
                context.showFields = ['name', 'current_type_teaching', 'current_category', 'replace_type_teaching', 'replace_category'];
                context.filterFields = ['name'];
                context.config = {title: 'Lista de restricciones'};
            }, config);
        };

        var AcademicMethodModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.AcademicMethod;
                context.fields = [
                    {label: "Nombre", name: "name", type: 'string', required: true},
                    {label: "Descripcion", name: "description", type: 'largeString'},
                    {
                        label: "Restricciones",
                        name: "restriction_list",
                        type: 'select',
                        model: new RestrictionListModel(),
                        model_label: function (itemCrudModel) {
                            var textLabel = "";
                            for (var i = 0; i < itemCrudModel.length; i++) {
                                textLabel = "Total: " + itemCrudModel.length;
                            }
                            return textLabel;
                        },
                        multiple: true,
                        required: false
                    }
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'}, {label: "Creado", name: 'created_at'}
                ];
                context.showFields = ['name', 'description', 'restriction_list'];
                context.filterFields = ['name', 'description'];
                context.config = {title: 'Metodo academico'};
            }, config);
        };

        var MountCategoryModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.MountCategory;
                context.fields = [
                    {
                        label: "Metodo academico",
                        name: "academic_method",
                        type: 'string',
                        model: new AcademicMethodModel(),
                        required: true
                    },
                    {label: "Categoria", name: "category", type: 'string', model: new CategoryModel(), required: true},
                    {
                        label: "Monto (Bs)",
                        name: "mount",
                        type: 'number',
                        required: true,
                        min: 0.00,
                        max: 100.00,
                        step: 0.01
                    }
                ];
                context.extra_fields = [
                    {label: "Ultima modificacion", name: 'updated_at'}
                ];
                context.showFields = ['academic_method', 'category', 'mount'];
                context.filterFields = ['mount'];
                context.nameView = 'mount';
                context.config = {title: 'Monto de pago por categoria'};
            }, config);
        };

        var TypeTeachingModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.TypeTeaching;
                context.fields = [
                    {label: "Tipo de docencia", name: "name", type: 'string', required: true}
                ];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.config = {title: 'Tipo de docencia'};
                context.add_new = false;
            }, config);
        };

        var AcademicUnitModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.AcademicUnit;
                context.fields = [
                    {label: "Unidad Academica", name: "name", type: 'string', required: true},
                    {label: "Abreviatura", name: "short", type: 'string', required: true},
                    {label: "Direccion", name: "address", type: 'largeString', required: true},
                    {label: "Telefonos", name: "phone_number", type: 'number', required: true},
                    {label: "Correo electronico", name: "email", type: 'email', required: true},
                    {label: "Imagen", name: "image", type: 'image', required: true}
                ];
                context.showFields = ['name', 'short', 'address', 'phone_number', 'email'];
                context.filterFields = ['name', 'short'];
                context.config = {title: 'Unidades Academicas'};
            }, config);
        };

        var TeacherModel = function (config) {
            return new BaseModel(function (context) {
                context.resource = $API.Teacher;
                context.fields = [
                    {label: "Nombre", name: "first_name", type: 'string', required: true},
                    {label: "Apellido", name: "last_name", type: 'string', required: true},
                    {
                        label: "Genero",
                        name: "gender",
                        type: 'string',
                        required: true,
                        choices: [{value: 'F', label: 'Femenino'}, {value: 'M', label: 'Masculino'}]
                    },
                    {label: "Carnet", name: "ci", type: 'string', required: true},
                    {label: "Ciudad", name: "city", type: 'string', model: new CityModel(), required: true},
                    {label: "Fecha Nac.", name: "date_of_birth", type: 'date', required: true},
                    {
                        label: "Unidad Academica",
                        name: "academic_unit",
                        type: 'string',
                        model: new AcademicUnitModel(),
                        required: true
                    },
                    {label: "Imagen", name: "image", type: 'image', width: 40, height: 40}
                ];
                context.showFields = ['image', 'first_name', 'last_name', 'gender', 'ci', 'city', 'date_of_birth', 'academic_unit'];
                context.filterFields = ['first_name', 'last_name', 'ci'];
                context.nameView = 'first_name';
                context.config = {title: 'Docentes'};
                context.searchEnabled = true;
            }, config);
        };

        return {
            CityModel: CityModel,
            PeopleModel: PeopleModel,
            SpecialtyModel: SpecialtyModel,
            SemesterModel: SemesterModel,
            MatterModel: MatterModel,
            GradeModel: GradeModel,
            CategoryModel: CategoryModel,
            TypeTeachingModel: TypeTeachingModel,
            AcademicUnitModel: AcademicUnitModel,
            TeacherModel: TeacherModel,
            ParallelModel: ParallelModel,
            AcademicMethodModel: AcademicMethodModel,
            MountCategoryModel: MountCategoryModel,
            RestrictionListModel: RestrictionListModel
        };
    });
