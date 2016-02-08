'use strict';

/**
 * @ngdoc directive
 * @name emiApp.directive:CrudDirective
 * @description
 * # CrudDirective
 */

angular.module('planillasApp')
    .directive('crudDirective', function ($compile, $templateRequest, $uibModal) {
        return {
            restrict: 'A',
            scope: {
                crudDirective: '=',
                crudPagination: '='
            },
            link: function postLink(scope, element) {
                var data_loaded = false;
                scope.$watch('crudDirective', function () {
                    if (!data_loaded) {
                        if (!scope.crudDirective) {
                            return;
                        }
                        data_loaded = true;
                        generateCrud()
                    }
                }, true);
                function generateCrud() {
                    scope.Model = scope.crudDirective;
                    scope.currentPage = 1;
                    scope.formFilterFields = {};

                    scope.paginationParams = {
                        page_size: 15,
                        page: 1,
                        search: ''
                    };
                    scope.changePage = function () {
                        scope.paginationParams.page = scope.currentPage;
                        scope.loadData();
                    };

                    scope.openModalEdit = function (rowItem, Model) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'views/crud/modals/myModalContent.html',
                            controller: 'ModalCrudController',
                            size: 'md',
                            resolve: {
                                rowItem: function () {
                                    return rowItem;
                                },
                                Model: function () {
                                    return Model;
                                }
                            }
                        });

                        modalInstance.result.then(function () {
                            scope.loadData();
                        }, function () {
                        });
                    };

                    scope.openModalDelete = function (rowItem, Model) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'crudModalDelete.html',
                            controller: 'ModalCrudController',
                            size: 'sm',
                            windowClass: 'centred',
                            resolve: {
                                rowItem: function () {
                                    return rowItem;
                                },
                                Model: function () {
                                    return Model;
                                }
                            }
                        });

                        modalInstance.result.then(function () {
                            scope.loadData();
                        }, function () {
                        });
                    };

                    scope.openModalCreate = function (Model) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'views/crud/modals/crudModalCreate.html',
                            controller: 'ModalCreateCrudController',
                            size: 'md',
                            resolve: {
                                Model: function () {
                                    return Model;
                                }
                            }
                        });

                        modalInstance.result.then(function () {
                            scope.loadData();
                        }, function () {
                        });
                    };

                    scope.loadFilterFields = function () {
                        scope.paginationParams.page = 1;
                        scope.loadData();
                    };
                    function loadData() {
                        var query = scope.Model.extra_query_params;
                        angular.forEach(query, function (value, key) {
                            scope.paginationParams[key] = value;
                        });
                        scope.Model.paginationParams = scope.paginationParams;
                        (new scope.Model.resource()).$get(scope.paginationParams).then(function (data) {
                            console.log(scope, data);
                            scope.Model.dataResponse = data;
                        }, function () {
                            scope.paginationParams.page = 1;
                            scope.Model.paginationParams = scope.paginationParams;
                            loadData();
                        });
                    }

                    scope.loadData = loadData;

                    $templateRequest('views/crud/view.html').then(function (data) {
                        element.html(data);
                        $compile(element.contents())(scope);
                    });

                    scope.loadData();
                }
            }
        };
    })

    .directive('itemFilterField', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                itemFilterField: '=',
                itemCrudModel: '=',
                ngModel: '='
            },
            link: function postLink(scope) {
                var timer = null;
                scope.$watch('ngModel', function (newValue) {
                    $timeout.cancel(timer);
                    timer = $timeout(function () {
                        if ((newValue + '').length >= 0) {
                            var queryFilter = {};
                            queryFilter.search = newValue;
                            queryFilter.page_size = 10;
                            queryFilter.page = 1;
                            (new scope.itemCrudModel.resource()).$get(queryFilter).then(function (data) {
                                //noinspection JSPrimitiveTypeWrapperUsage
                                scope.itemFilterField.dataFilter = data;
                            });
                        }
                    }, 200);
                });
            }
        };
    })

    .directive('itemCrud', function ($compile, $filter) {
        return {
            restrict: 'A',
            scope: {
                itemCrud: '=',
                itemCrudModel: '='
            },
            link: function postLink(scope, element) {
                var text;
                //if (!scope.itemCrud) {
                //    return
                //}
                if (scope.itemCrud.model) {
                    if (scope.itemCrud.type === 'select' && scope.itemCrud.multiple) {
                        if (angular.isFunction(scope.itemCrud.model_label)) {
                            text = scope.itemCrud.model_label(scope.itemCrudModel[scope.itemCrud.name]);
                        }
                        element.html(text || '-');
                        $compile(element.contents())(scope);
                    } else {
                        (new scope.itemCrud.model.resource()).$get(
                            {id: scope.itemCrudModel[scope.itemCrud.name]}
                        ).then(function (data) {
                            scope.itemCrud.model.dataResponse = data;
                            text = scope.itemCrud.model.dataResponse[scope.itemCrud.model.nameView];
                            element.html(text || '-');
                            $compile(element.contents())(scope);
                        });
                    }
                } else {
                    if (scope.itemCrud.choices) {
                        var textChoice = "";
                        for (var i = 0; i < scope.itemCrud.choices.length && !textChoice; i++) {
                            if (scope.itemCrud.choices[i].value === scope.itemCrudModel[scope.itemCrud.name]) {
                                textChoice = scope.itemCrud.choices[i].label;
                            }
                        }
                        element.html(textChoice || '--');
                        $compile(element.contents())(scope);
                    } else {
                        if (scope.itemCrud.name === 'image' && scope.itemCrudModel[scope.itemCrud.name]) {
                            var imgSrc = scope.itemCrudModel[scope.itemCrud.name] || 'images/no-img-available.png';
                            var imageTemplate = '<img src="' + imgSrc + '" width="' + (scope.itemCrud.width || 80) + '" height="' + (scope.itemCrud.height || 80) + '">';
                            element.html(imageTemplate);
                            $compile(element.contents())(scope);
                        } else {
                            var bindText = $filter('CrudFilter')(scope.itemCrudModel[scope.itemCrud.name], scope.itemCrud.type);
                            element.html(bindText || '--');
                            $compile(element.contents())(scope);
                        }
                    }
                }
            }
        };
    })

    .directive('restForm', function ($compile, toastr) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: '=',
                name: '=',
                initForm: '=',
                modalInstance: '='
            },
            link: function postLink(scope, element) {
                scope.newFormModel = scope.initForm ? angular.copy(scope.initForm) : {};
                scope.cleanForm = function () {
                    scope.newFormModel = scope.initForm ? angular.copy(scope.initForm) : {};
                    formattingTypesModel();
                };

                function formattingTypesModel() {
                    if (!scope.initForm) {
                        return;
                    }

                    angular.forEach(scope.initForm, function (value, key) {
                        // verify is "DetailModel" when call sub-id

                        if (typeof (value) === 'object' && value != null && value.id) {
                            console.log(scope.newFormModel);
                            scope.newFormModel[key] = value.id;
                        }
                    });

                    for (var i = 0; i < scope.ngModel.fields.length; i++) {
                        if (scope.ngModel.fields[i].type === 'date') {
                            var dateField = (scope.initForm[scope.ngModel.fields[i].name]).split('-');
                            scope.newFormModel[scope.ngModel.fields[i].name] = new Date(dateField[0], dateField[1] - 1, dateField[2]);
                        }
                        if (scope.ngModel.fields[i].type === 'datetime') {
                            scope.newFormModel[scope.ngModel.fields[i].name] = new Date(scope.initForm[scope.ngModel.fields[i].name]);
                            console.log(scope.initForm[scope.ngModel.fields[i].name]);
                            //console.log(scope.initForm[scope.ngModel.fields[i].name]);
                            /*console.log(scope.initForm, scope.ngModel.fields[i]);
                             console.log(scope.initForm[scope.ngModel.fields[i].name]);
                             var dateField = (scope.initForm[scope.ngModel.fields[i].name]).split('-');
                             scope.newFormModel[scope.ngModel.fields[i].name] = new Date(dateField[0], dateField[1] - 1, dateField[2]);*/
                        }
                    }
                }

                formattingTypesModel();

                var templateForm =
                    '<form name="name" class="form-horizontal" ng-submit="saveForm(newFormModel)">' +
                    '<div class="form-group" ng-repeat="itemF in ngModel.fields" ng-class="itemF.type==\'boolean\'?\'col-sm-6\':\'\'" >' +
                    '<label class="control-label" ng-class="itemF.type==\'boolean\'?\'col-sm-10\':\'col-sm-3\'" data-ng-bind="itemF.label"></label>' +
                    '<div ng-class="itemF.type==\'boolean\'?\'col-sm-2\':\'col-sm-9\'" form-model="newFormModel" form-item-crud="itemF" form-item-disabled="((ngModel.disabled_fields | filter: itemF.name)[0])?true:false" ></div></div>' +
                    '<div class="text-center">' +
                    (scope.initForm ? ('<button type="submit" class="btn btn-success btn-sm mH5"><span class="glyphicon glyphicon-floppy-save"></span> Actualizar datos</button>') : ('<button type="submit" class="btn btn-success btn-sm mH5"> <span class="glyphicon glyphicon-floppy-save"></span> Guardar</button>') ) +
                    '<button type="button" class="btn btn-primary btn-sm mH5" ng-click="cleanForm()"><span class="glyphicon glyphicon-minus"></span> Limpiar</button>' +
                    (scope.initForm ? ('<button type="button" class="btn btn-info btn-sm mH5" ng-click="modalInstance.cancel()"><span class="glyphicon glyphicon-backward"></span> Cancelar</button>') : '' ) +
                    '</div>' +
                    '</form>';
                scope.saveForm = function (formDataModels) {
                    console.log(formDataModels);
                    var formData = new FormData();

                    angular.forEach(formDataModels, function (value, key) {
                        var keySubArray;
                        /**
                         Verify value is type Date
                         **/
                        if (angular.isDate(value)) {
                            //value = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
                            value = value.toJSON();
                        }

                        if (scope.initForm) {
                            /**
                             * Verify value is type File
                             */
                            if (key === 'image' || key === 'file') {
                                if (typeof (value) !== 'string' && value !== null) {
                                    formData.append(key, value);
                                }
                            } else {
                                if (!angular.equals(scope.initForm[key], formDataModels[key])) {
                                    if (angular.isArray(value)) {
                                        for (keySubArray = 0; keySubArray < value.length; keySubArray++) {
                                            formData.append(key, value[keySubArray]);
                                        }
                                    } else {
                                        formData.append(key, value);
                                    }
                                }
                            }
                        } else {
                            if (angular.isArray(value)) {
                                for (keySubArray = 0; keySubArray < value.length; keySubArray++) {
                                    formData.append(key, value[keySubArray]);
                                }
                            } else {
                                formData.append(key, value);
                            }
                        }
                    });
                    var sendData = angular.copy(scope.ngModel.resource);
                    //sendData


                    function successRequest() {
                        if (scope.initForm) {
                            toastr.info('Se han actualizado datos');
                        } else {
                            toastr.success('Creado con exito');
                        }
                        if (scope.modalInstance) {
                            scope.modalInstance.ok();
                        }
                    }

                    function errorRequest(error) {
                        var textError = "";
                        var textLabelError = "";
                        //noinspection LoopStatementThatDoesntLoopJS
                        for (var err in error.data) {
                            for (var i = 0; i < scope.ngModel.fields.length; i++) {
                                if (scope.ngModel.fields[i].name === err) {
                                    textLabelError = scope.ngModel.fields[i].label;
                                    break;
                                }
                            }
                            //noinspection JSUnfilteredForInLoop
                            textError += "<br><b>" + textLabelError + ":</b> <small>" + error.data[err] + "</small>";
                            break;
                        }
                        if (scope.initForm) {
                            toastr.warning('No se pudo actualizar' + textError, '', {allowHtml: true});
                        } else {
                            toastr.error('No se pudo crear' + textError, '', {allowHtml: true});
                        }
                    }

                    if (scope.initForm) {
                        var aa = angular.copy(formDataModels);
                        aa.id = formDataModels[scope.ngModel.id_name];
                        //sendData.patch({id: formDataModels[scope.ngModel.id_name]}, formData, successRequest, errorRequest);
                        sendData.patch(aa, formData, successRequest, errorRequest);
                    } else {
                        sendData.create(formData, successRequest, errorRequest);
                    }
                };

                element.html(templateForm);
                $compile(element.contents())(scope);
            }
        };
    })

    .directive('formItemCrud', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                formItemCrud: '=',
                formModel: '=',
                formItemDisabled: '='
            },
            link: function postLink(scope, element) {

                function compileTemplate(template) {
                    element.html(template);
                    $compile(element.contents())(scope);
                }

                var templateReturn = "";

                if (scope.formItemCrud) {
                    console.log(scope.formItemDisabled);
                    if (scope.formItemCrud.type === 'number') {
                        templateReturn = '<input type="number" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" min="{{formItemCrud.min}}" max="{{formItemCrud.max}}" step="{{formItemCrud.step}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'string') {
                        templateReturn = '<input type="text" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" minlength="{{formItemCrud.minlength}}"  maxlength="{{formItemCrud.maxlength}}" title="{{formItemCrud.label}}" list="{{formItemCrud.name}}" data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'largeString') {
                        templateReturn = '<textarea class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required"  minlength="{{formItemCrud.minlength}}"  maxlength="{{formItemCrud.maxlength}}" title="{{formItemCrud.label}}" cols="{{formItemCrud.cols}}" rows="{{formItemCrud.rows}}"  data-ng-disabled="formItemDisabled"></textarea>';
                    } else if (scope.formItemCrud.type === 'boolean') {
                        templateReturn = '<input type="checkbox" class="input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'date') {
                        templateReturn = '<input type="date" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'time') {
                        templateReturn = '<input type="time" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'datetime') {
                        //templateReturn = '<input type="datetime" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}">';
                        templateReturn = '<input type="datetime-local" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';

                        //templateReturn = '<uib-datetimepicker ng-model="formModel[formItemCrud.name]" show-weeks="true" class="well well-sm"></uib-datetimepicker>' +
                        //    '<uib-timepicker ng-model="formModel[formItemCrud.name]" hour-step="1" minute-step="30" show-meridian="true"></uib-timepicker>';

                    } else if (scope.formItemCrud.type === 'email') {
                        templateReturn = '<input type="email" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'file') {
                        templateReturn = '<label for="{{ formItemCrud.name+\'_id\' }}" class="cursor-pointer"><img ng-src="{{(formItemCrud[formItemCrud.name+\'_id\']) || \'images/empty_file.png\'}}" width="40" height="40"><span class="mH5" ng-bind="formModel[formItemCrud.name].name || \'Seleccione un archivo\'"></span></label>' +
                            '<input id="{{ (formItemCrud.name+\'_id\')}}"  type="file" class="input-sm hidden" image-preview="formItemCrud[formItemCrud.name+\'_id\']" data-ng-model="formModel[formItemCrud.name]" file-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                        /*templateReturn =
                         '<input type="file" class="input-sm" data-ng-model="formModel[formItemCrud.name]" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}">';*/
                    } else if (scope.formItemCrud.type === 'color') {
                        templateReturn = '<input type="color" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}"  data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'image') {
                        templateReturn = '<label for="{{ formItemCrud.name+\'_id\' }}" class="cursor-pointer"> <img ng-src="{{(  ( (formModel[formItemCrud.name].length) > 0 ? formModel[formItemCrud.name]:false) ||  formItemCrud[formItemCrud.name+\'_id\']) || \'images/no-img-available.png\'}}" width="130" height="130"><span class="mH5" ng-bind="formModel[formItemCrud.name].name || \'Seleccione una imagen\'"></span></label>' +
                            '<input id="{{ (formItemCrud.name+\'_id\')}}"  type="file" class="input-sm hidden" image-preview="formItemCrud[formItemCrud.name+\'_id\']" data-ng-model="formModel[formItemCrud.name]" file-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" title="{{formItemCrud.label}}" accept="image/jpg, image/jpeg, image/png" data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'password') {
                        templateReturn = '<input type="password" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" data-ng-disabled="formItemDisabled">';
                    } else if (scope.formItemCrud.type === 'range') {
                        templateReturn = '<input type="range" class="form-control input-sm" data-ng-model="formModel[formItemCrud.name]" placeholder="{{formItemCrud.label}}" data-ng-required="formItemCrud.required" min="{{formItemCrud.min || 0}}" max="{{formItemCrud.max || 100}}" step="{{formItemCrud.step || 0}}" data-ng-disabled="formItemDisabled">';
                    }
                    //var results = [];
                    /*if (scope.formItemCrud.model && scope.formItemCrud.type === 'multiple') {

                     }
                     else*/
                    if (scope.formItemCrud.model) {
                        (new scope.formItemCrud.model.resource()).$get().then(function (data) {
                            scope.formItemCrud.model.dataResponse = data;
                            if (scope.formItemCrud.required && !scope.formModel[scope.formItemCrud.name]) {
                                /** @namespace data.results */
                                scope.formModel[scope.formItemCrud.name] = (data.data[0])[scope.formItemCrud.model.id_name];
                                //console.log(scope);
                                //scope.formModel[scope.formItemCrud.name] = (data.results[0])[scope.Model.id_name];
                            }
                            //console.log(scope.formItemCrud.model);
                            templateReturn = '<select class="form-control" data-ng-model="formModel[formItemCrud.name]"' +
                                'data-ng-options="item[formItemCrud.model.id_name] as item[formItemCrud.model.nameView] for item in formItemCrud.model.dataResponse.data"' +
                                'data-ng-required="formItemCrud.required"' +
                                'data-ng-disabled="formItemDisabled"';
                            if (scope.formItemCrud.multiple) {
                                templateReturn += ' multiple ';
                            }
                            templateReturn += '></select>';
                            compileTemplate(templateReturn);
                        });
                    } else if (scope.formItemCrud.choices) { // not implemented choices
                        if (scope.formItemCrud.required && !scope.formModel[scope.formItemCrud.name]) {
                            scope.formModel[scope.formItemCrud.name] = scope.formItemCrud.choices[0].value;
                        }
                        templateReturn = '<select class="form-control" data-ng-model="formModel[formItemCrud.name]" data-ng-options="item.value as item.label for item in formItemCrud.choices" data-ng-required="formItemCrud.required" data-ng-disabled="formItemDisabled"';
                        if (scope.formItemCrud.multiple) {
                            templateReturn += ' multiple ';
                        }
                        templateReturn += '></select>';
                        compileTemplate(templateReturn);
                    } else {
                        templateReturn += '<datalist id="{{formItemCrud.name}}"><option ng-repeat="name in formItemCrud.list" value="{{name}}"></option></datalist>';
                        compileTemplate(templateReturn);
                    }
                } else {
                    templateReturn = "<label>Error</label>";
                    compileTemplate(templateReturn);
                }
            }
        };
    })

    .controller('ModalCrudController', function ($scope, $uibModalInstance, rowItem, Model, toastr) {
        $scope.rowItem = rowItem;
        $scope.Model = angular.copy(Model);
        $scope.initValues = angular.copy($scope.rowItem);

        $scope.ok = function (data) {
            $uibModalInstance.close(data);
        };

        $scope.cancel = function (data) {
            $uibModalInstance.dismiss(data);
        };

        $scope.delete = function () {
            //noinspection JSUnresolvedFunction
            console.log($scope);
            //(new $scope.Model.resource()).$delete({id: .id})
            (new $scope.Model.resource()).$delete({id: $scope.rowItem[$scope.Model.id_name]})
                .then(function () {
                    toastr.success('Se ha eliminado registro');
                    $scope.ok();
                }, function () {
                    toastr.success('No se pudo eliminar');
                });
        };

        $scope.paramsModalInstance = {
            ok: $scope.ok,
            cancel: $scope.cancel
        };
    })

    .controller('ModalCreateCrudController', function ($scope, $uibModalInstance, Model) {
        $scope.Model = angular.copy(Model);
        $scope.initValues = angular.copy($scope.rowItem);

        $scope.ok = function (data) {
            $uibModalInstance.close(data);
        };

        $scope.cancel = function (data) {
            $uibModalInstance.dismiss(data);
        };

        $scope.paramsModalInstance = {
            ok: $scope.ok,
            cancel: $scope.cancel
        };
    })
    .directive('crudEditable', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                crudEditable: '=',
                crudEditableOptions: '=',
                ngModel: '='
            },
            link: function postLink(scope, element) {
                function compileTemplate(template) {
                    var e = $compile(template)(scope);
                    element.replaceWith(e);
                }

                scope.submitEditableForm = function (a, b) {
                    scope.ngModel = angular.copy(b);
                };
                scope.keyPressEditable = function (event) {
                    if (event.keyCode == 27) {
                        scope.copyModel = angular.copy(scope.ngModel);
                        scope.$apply();
                    }
                };
                jQuery('body').bind('keyup', scope.keyPressEditable);
                scope.copyModel = angular.copy(scope.ngModel);
                scope.$watch('ngModel', function () {
                    scope.copyModel = angular.copy(scope.ngModel);
                    var template = "";
                    if (scope.crudEditable === 'text') {
                        template = '<form ng-submit="submitEditableForm(this, copyModel)"><input type="text" ng-model="copyModel"></form>';
                    }
                    if (scope.crudEditable === 'select') {
                        template = '<form ng-submit="submitEditableForm(this, copyModel)"><select ng-model="copyModel" ng-options="{{crudEditableOptions}}"></select></form>';
                    }
                    compileTemplate(template);
                }, true);
                scope.$watch('copyModel', function () {
                }, true);
            }
        }
    });
