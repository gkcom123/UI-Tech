'use strict';
angular.module('toilApp')
	.controller('toilAppController', ['$scope', '$state','localStorageService',"$toilApi",
        function($scope, $state,localStorageService ,$toilApi){


    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //console.log('toState.name: '+toState.name+ toState.loginRequired);
        var toilDetail = localStorageService.get('toil-id');
       // console.log('fromState.name: '+fromState.name);
        //console.log(toState.loginRequired);

      if( (toState.loginRequired == true) && !toilDetail){
            event.preventDefault();
            $toilApi.gotoHome();
        }
        if( (toState.loginRequired == false) && toilDetail){
            event.preventDefault();
            $toilApi.gotoAnalytics();
        }
    });

  $scope.$on('$stateChangeSuccess', function(scope, newState, eOpt, oldState) {
      // this is called after each state change
      document.title = newState.title || "Toil | Portal" // change title on page chnage


  });

}]);
