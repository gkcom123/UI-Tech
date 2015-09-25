'use strict';
angular.module('toilApp', ['ui.router','ncy-angular-breadcrumb']);

angular.module('toilApp')
.config(['$stateProvider', '$urlRouterProvider','$breadcrumbProvider',
    function( $stateProvider, $urlRouterProvider ,$breadcrumbProvider) {
    $urlRouterProvider.otherwise('/');

    for(var state in Helper.routes){
        $stateProvider.state( state, Helper.routes[state] );
    }
}]);
