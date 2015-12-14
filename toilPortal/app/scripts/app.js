'use strict';
angular.module('toilApp', ['ui.router','ngAnimate', 'ui.bootstrap',
    'ngResource','ncy-angular-breadcrumb','LocalStorageModule']);

//This factory is used to protect the API call. If toid-id localstorage is not available, we will mark it as
//unauthorized
angular.module('toilApp').factory('authInterceptor', function ($rootScope, $q,localStorageService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (localStorageService.get('toil-id')) {
                config.headers.Authorization = 'Bearer ' + localStorageService.get('toil-id');
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
});

angular.module('toilApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

angular.module('toilApp')
.config(['$stateProvider', '$urlRouterProvider','$breadcrumbProvider','localStorageServiceProvider',
    function( $stateProvider, $urlRouterProvider ,$breadcrumbProvider,localStorageServiceProvider) {
        localStorageServiceProvider.prefix = 'toilWebApp';
        $urlRouterProvider.otherwise('/');

    for(var state in Helper.routes){
        $stateProvider.state( state, Helper.routes[state] );
    }
}]);
