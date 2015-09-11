'use strict';
angular.module('toilApp', ['ui.router']);

angular.module('toilApp')
.config(['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/');

    for(var state in Helper.routes){
        $stateProvider.state( state, Helper.routes[state] );
    }
}]);
