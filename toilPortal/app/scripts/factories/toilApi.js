'use strict';
angular.module('toilApp')
	.factory('$toilApi', function( $state, $rootScope){
    var navFns = {}
      for(var state in Helper.routes){
          navFns[ "goto" + state.capitalize() ] = (function( st ){
            return function( ){
              $state.go( st );
            }
          })(state)
      }
      return navFns;
});
