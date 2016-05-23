'use strict';

/**
 * @ngdoc filter
 * @name simuladorTiroApp.filter:CrudFilter
 * @function
 * @description
 * # CrudFilter
 * Filter in the simuladorTiroApp.
 */
angular.module('planillasApp')
    .filter('CrudFilter', function () {
        return function (input, type) {
            var filtered = input;
            var dateFilter;
            if (type === 'date') {
                dateFilter = moment(input);
                if (dateFilter !== 'Invalid Date') {
                    filtered = dateFilter.format('LL');
                }
            } else if (type === 'datetime') {
                dateFilter = moment(input);
                if (dateFilter !== 'Invalid Date') {
                    filtered = dateFilter.format('LLLL');
                }
            }
            return filtered;
        };
    });
