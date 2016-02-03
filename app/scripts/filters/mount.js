'use strict';

/**
 * @ngdoc filter
 * @name planillasEmiApp.filter:mountCurrency
 * @function
 * @description
 * # mountCurrency
 * Filter in the planillasEmiApp.
 */
angular.module('planillasApp')
  .filter('mountC', function () {
    return function(mount,opt1,opt2){
      if(mount){
        mount = parseFloat(mount);
        mount =  mount.toFixed(2);
        if(mount == NaN){
          mount = "-"
        }
      }else{
        mount = "-";
      }
      return mount;
    }
  });
