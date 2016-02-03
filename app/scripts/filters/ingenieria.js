'use strict';

/**
 * @ngdoc filter
 * @name planillasEmiApp.filter:momentDate
 * @function
 * @description
 * # momentDate
 * Filter in the planillasEmiApp.
 */
angular.module('planillasApp')
  .filter('ingenieria', function () {
    return function(mom,opt1,opt2){
      var m = mom.replace("INGENIERIA","ING.");
      m = mom.replace("ingenieria","ING.");
      m = mom.replace("Ingenieria","ING.");
      return m;
    }
  });
