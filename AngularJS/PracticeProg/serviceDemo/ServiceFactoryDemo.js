/**
 * Created by gunjan.kumar on 11/6/15.
 */
var shoppingModule = angular.module('CalculatorService',[]);
shoppingModule.factory('StringManipulation', function () {

  var r=  function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
      o += s[i];
    return o;
  }

  return{
    reverseString: function reverseString(name)
    {
      return r(name);
    }
  }

});
