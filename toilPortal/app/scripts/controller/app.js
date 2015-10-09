'use strict';
angular.module('toilApp')
	.controller('toilAppController', ['$scope', '$state', "$toilApi", function($scope, $state, $toilApi){


    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //console.log('toState.name: '+toState.name+ toState.loginRequired);
      //console.log('fromState.name: '+fromState.name);

      /*if( (toState.loginRequired == false)){
            event.preventDefault();
        console.log('fromState.name: '+fromState.name);
            $toilApi.gotoHome();
        }
        if( (toState.loginRequired == true)){
            event.preventDefault();
            $toilApi.gotoAnalytics();
        }*/
    });

  $scope.$on('$stateChangeSuccess', function(scope, newState, eOpt, oldState) {
      // this is called after each state change
      document.title = newState.title || "Toil | Portal" // change title on page chnage


  });

}]);
