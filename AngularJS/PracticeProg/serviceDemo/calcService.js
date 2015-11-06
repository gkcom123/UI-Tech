/**
 * Created by gunjan.kumar on 11/6/15.
 */
var CalculatorService = angular.module('CalculatorService', [])
  .service('Calculator', function () {
    this.square = function (a) { return a*a};

  });
