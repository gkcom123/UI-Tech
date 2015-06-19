'use strict';
angular.module('corporateApp', [
	'ui.router', 
    'ngAnimate',
    'ngSanitize',
    'ngAutocomplete',
    'angularFileUpload',
    'ngDropdowns',
	'ngResource',
    'ngBootstrap',
    'ui.bootstrap',
    'tfs.ui.bootstrap',
	'LocalStorageModule'
]);

angular.module('corporateApp')
 .run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])
.config(['$httpProvider','localStorageServiceProvider',function ($httpProvider,localStorageServiceProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    localStorageServiceProvider.prefix = 'corporateApp';
}])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function( $stateProvider, $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.otherwise('/');

    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
    }
    for(var state in Helper.routes){
        $stateProvider.state( state, Helper.routes[state] );  
    }
}]);