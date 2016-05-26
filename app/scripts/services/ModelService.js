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
            this.default_fields = [];
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
            if (typeof (child_model) === 'function') {
                child_model(context);
                angular.forEach(config, function (value, key) {
                    context[key] = value;
                });
                context.extra_query_params = config.query_params || {};
                context.default_fields = config.default_fields || {};
                context.disabled_fields = config.disabled_fields || {};
            }
        };

        var EspecialidadesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Especialidades;
                context.fields = [
                    {label: 'Especialidad', name: 'name', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name'];
                context.filterFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Lista de Carreras'};
                context.delete = false;
                context.editable = false;
                context.searchEnabled = true;
                context.onView = function (data) {
                    return data.name;
                };
            }, config);
        };

        var MateriasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Materias;
                context.fields = [
                    {label: 'Materia', name: 'name', type: 'string', required: true},
                    {
                        label: 'Horas de Teoría', name: 'horas_teoria', type: 'number', custom: function (data) {
                        return data + " Hrs/semana"
                    }
                    },
                    {
                        label: 'Horas de Práctica', name: 'horas_practica', type: 'number', custom: function (data) {
                        return data + " Hrs/semana"
                    }
                    },
                    {
                        label: 'Horas de Laboratorio',
                        name: 'horas_laboratorio',
                        type: 'number',
                        custom: function (data) {
                            return data + " Hrs/semana"
                        }
                    }
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name', 'horas_teoria', 'horas_practica', 'horas_laboratorio'];
                context.filterFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Materias'};
                context.searchEnabled = true;
            }, config);
        };

        var UnidadAcademicaModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.UnidadAcademica;
                context.fields = [
                    {label: 'Unidad académica', name: 'name', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Unidades Académicas'};
                context.onView = function (data) {
                    return data.name;
                };
            }, config);
        };

        var DepartamentosModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Departamento;
                context.fields = [
                    {label: 'Nombre', name: 'name', type: 'string', required: true},
                    {label: 'Abreviado', name: 'short', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name'];
                context.nameView = 'name';
                context.config = {title: 'Departamentos'};
            }, config);
        };

        var DocentesModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Docentes;
                context.fields = [
                    {label: 'Apellido paterno', name: 'ap_paterno', type: 'string', required: true},
                    {label: 'Apellido materno', name: 'ap_materno', type: 'string', required: true},
                    {label: 'Nombres', name: 'nombres', type: 'string', required: true},
                    {label: 'Carnet', name: 'ci', type: 'number', required: true},
                    {
                        label: 'Expedido',
                        name: 'departamento',
                        type: 'select',
                        model: new DepartamentosModel(),
                        required: true
                    },
                    {
                        label: 'Unidad Académica',
                        name: 'unidad_academica',
                        type: 'number',
                        model: new UnidadAcademicaModel(),
                        required: true
                    }
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['ap_paterno', 'ap_materno', 'nombres', 'ci', 'unidad_academica'];
                context.filterFields = ['ap_paterno', 'ap_materno', 'ci'];
                context.nameView = 'nombres';
                context.config = {title: 'Docentes'};
                context.searchEnabled = true;
                context.onView = function (data) {
                    return data.ap_paterno + ' ' + data.ap_materno + ' ' + data.nombres;
                };
            }, config);
        };

        var TipoUsuariosModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.TipoUsuario;
                context.fields = [
                    {label: 'Tipo usuario', name: 'name', type: 'string', required: true},
                    {label: 'Descripción', name: 'description', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name', 'description'];
                context.nameView = 'name';
                context.config = {title: 'Tipos de usuarios'};
                context.searchEnabled = false;
            }, config);
        };

        var GradoDocenteModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.GradoDocente;
                context.fields = [
                    {label: 'Grado', name: 'name', type: 'string', required: true},
                    {label: 'Abrebiatura', name: 'short', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['name', 'short'];
                context.nameView = 'name';
                context.config = {title: 'Grados de docencia'};
                context.searchEnabled = false;
            }, config);
        };

        var UsuariosModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Usuarios;
                context.fields = [
                    {label: 'Apellidos', name: 'apellidos', type: 'string', required: true},
                    {label: 'Nombres', name: 'nombres', type: 'string', required: true},
                    {
                        label: 'Especialidad',
                        name: 'especialidad',
                        type: 'select',
                        model: new EspecialidadesModel(),
                        required: true
                    },
                    {
                        label: 'Tipo usuario',
                        name: 'tipo_usuario',
                        type: 'select',
                        model: new TipoUsuariosModel(),
                        required: true
                    },
                    {label: 'Correo', name: 'email', type: 'email', required: true},
                    {label: 'Password', name: 'password', type: 'string', required: true},
                    {label: 'Activo', name: 'activo', type: 'boolean', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['apellidos', 'nombres', 'especialidad', 'tipo_usuario'];
                context.filterFields = ['apellidos', 'nombres'];
                context.nameView = 'nombres';
                context.config = {title: 'Lista de usuarios'};
                context.searchEnabled = true;
                context.table_name = 'account';
                context.name = 'accounts';
                context.onView = function (data) {
                    return data.nombres + ' ' + data.apellidos;
                };
            }, config);
        };

        var LogsModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Logs;
                context.fields = [
                    {
                        label: 'Usuario', name: 'user', type: 'select',
                        model: new UsuariosModel(), required: true
                    },
                    {
                        label: 'Unidad Académica', name: 'unidad_academica', type: 'select',
                        model: new UnidadAcademicaModel(), required: true
                    },
                    {
                        label: 'Tabla', name: 'table', type: 'string', required: true
                    },
                    {label: 'Tipo de acción', name: 'tipo', type: 'string', required: true},
                    {label: 'Descripción', name: 'descripcion', type: 'string', required: true}
                ];
                context.extra_fields = [{label: 'Fecha', name: 'updated_at'}];
                context.showFields = ['user', 'table', 'tipo', 'descripcion'];
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
                    {label: 'Gestión', name: 'gestion', type: 'number', required: true},
                    {
                        label: 'Periodo gestión',
                        name: 'periodo_gestion',
                        type: 'text',
                        required: true
                    },
                    {
                        label: 'Unidad académica',
                        name: 'unidad_academica',
                        type: 'select',
                        model: new UnidadAcademicaModel(),
                        required: true
                    },
                    {label: 'IU', name: 'iu', type: 'number', required: true},
                    {label: 'IT', name: 'it', type: 'number', required: true},
                    {label: 'Abierto', name: 'abierto', type: 'boolean', required: true}
                ];
                context.extra_fields = [{label: 'Última modificación', name: 'updated_at'}];
                context.showFields = ['gestion', 'periodo_gestion', 'unidad_academica'];
                context.nameView = 'gestion';
                context.config = {title: 'Gestiones académicas'};
                context.add_new = false;
                context.editable = false;
                context.searchEnabled = true;
            }, config);
        };

        var ContractModel = function (config) {
            return new BaseModel(function (context) {
                    context.id_name = 'id';
                    context.resource = $API.Contratos;
                    context.fields = [
                        {label: 'Número de contrato', name: 'numero_contrato', type: 'number', required: true},
                        {
                            label: 'Contrato', name: 'contrato', type: 'string', required: true,
                            custom: function (item, data) {
                                console.log(item, data);
                                var url = $API.path + 'obtener_contrato?docente=' + data.docente.id;
                                var html = '<a href="' + url + '" download="Contrato docente"><img src="images/pdf_icon.png" width="40px"></a>';
                                html += '<a href="' + url + '&word=1' + '" download="Contrato docente"><img src="images/word_icon.png" width="40px"></a>';
                                return html;
                            }
                        },
                        {label: 'Información de contrato', name: 'info_contrato', type: 'string', required: true},
                        {label: 'Docente', name: 'docente', type: 'select', required: true, model: new DocentesModel()},
                        {
                            label: 'Gestion academica',
                            name: 'gestion_academica',
                            type: 'select',
                            required: true,
                            model: new GestionesAcademicasModel()
                        }
                    ]
                    ;
                    context.extra_fields = [{label: 'Fecha', name: 'updated_at'}];
                    context.showFields = ['numero', 'docente', 'info_contrato', 'contrato'];
                    context.nameView = 'numero';
                    context.config = {title: 'Contratos docentes'};
                    context.add_new = false;
                    context.delete = false;
                    context.editable = false;
                    context.searchEnabled = true;
                }, config
            );
        };

        var FacturasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.Facturacion;
                context.fields = [
                    {label: 'Numero de factura', name: 'numero', type: 'number', required: true},
                    {label: 'Docente', name: 'docente', type: 'select', required: true, model: new DocentesModel()}
                ];
                context.extra_fields = [{label: 'Fecha de registro', name: 'updated_at'}];
                context.showFields = ['numero', 'docente'];
                context.nameView = 'numero';
                context.config = {title: 'Facturas - docente'};
                context.add_new = false;
                context.editable = false;
                context.searchEnabled = true;
            }, config);
        };

        var PagosPlanillasModel = function (config) {
            return new BaseModel(function (context) {
                context.id_name = 'id';
                context.resource = $API.PagosPlanillas;
                context.fields = [
                    {label: 'Docente', name: 'docente', type: 'select', model: new DocentesModel()},
                    {label: 'Monto', name: 'monto', type: 'string'},
                    {
                        label: 'Pensul', name: 'pensul', type: 'string',
                        custom: function (data) {
                            return data.name;
                        }
                    },
                    {label: 'Carrera', name: 'especialidad', type: 'select', model: new EspecialidadesModel()},
                    {label: 'Categoria', name: 'categoria', type: 'integer'},
                    {label: 'Factura', name: 'factura', type: 'string'},
                    {
                        label: 'Tipo de pago', name: 'tipo_pago', type: 'string',
                        custom: function (data) {
                            return data.name;
                        }
                    },
                    {
                        label: 'Reintegro', name: 'reintegro', type: 'integer', custom: function (data) {
                        return data + ' Bs';
                    }
                    },
                    {
                        label: 'Descuento por valor de atrasos', name: 'total_3', type: 'integer',
                        custom: function (data) {
                            return data + ' Bs';
                        }
                    },
                    {
                        label: 'Descuento por valor de impuestos', name: 'total_4', type: 'integer',
                        custom: function (data) {
                            return data + ' Bs';
                        }
                    },
                    {
                        label: 'Pagado', name: 'liquido_pagable', type: 'string', custom: function (data) {
                        return data + ' Bs';
                    }
                    }
                ];
                context.extra_fields = [{label: 'Fecha', name: 'updated_at'}];
                context.showFields = ['docente', 'especialidad', 'pensul', 'categoria', 'monto', 'factura', 'tipo_pago', 'reintegro', 'total_3', 'total_4', 'liquido_pagable'];
                context.nameView = 'numero';
                context.config = {title: 'Pago realizados en planillas'};
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
            GestionesAcademicasModel: GestionesAcademicasModel,
            GradoDocenteModel: GradoDocenteModel,
            DepartamentosModel: DepartamentosModel,
            ContractModel: ContractModel,
            PagosPlanillasModel: PagosPlanillasModel,
            FacturasModel: FacturasModel
        };
    });
