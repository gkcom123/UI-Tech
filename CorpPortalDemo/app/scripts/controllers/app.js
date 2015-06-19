'use strict';
angular.module('corporateApp')
	.controller('appController', ['$scope', '$location', '$state', 'localStorageService', "$tfsApi", function($scope, $location, $state, localStorageService, $tfsApi){
    var scrollTo = function(){
      var queryString = $location.search();
      if(queryString.scroll_to){
        setTimeout(function(){
          var el = $("#"+queryString.scroll_to);
          if( el.length ){
              $('html, body').animate({ scrollTop: el.offset().top }, 400);
          }
        }, 100);  
      }else {
          $('html, body').animate({ scrollTop: 0 }, 400);
      }
    };

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        var cropDetail = localStorageService.get('corp-id');
        if( (toState.loginRequired == true) && !cropDetail){
            event.preventDefault();
            $tfsApi.gotoHome();
        }
        if( (toState.loginRequired == false) && cropDetail){
            event.preventDefault();
            $tfsApi.gotoBooking();
        }
    });

  $scope.$on('$stateChangeSuccess', function(scope, newState, eOpt, oldState) {
      // this is called after each state change
      scrollTo();

      document.title = newState.title || "Corporate | Taxiforsure" // change title on page chnage
      
      if(oldState.url == "^"){
          // first time ga track
          Helper.trackGAPage( $location.absUrl() );
      }else if(newState.url != oldState.url){
          // after each page change
          Helper.trackGAPage( $location.url() );
      }
  });
  $(window).scroll(function() {
    if( ["", "home"].include( $state.current.name) ){
        Helper.homeHeaderScroll();
    }        
  });
  $("body").delegate(".pgLink", "click", function( e ){
      window.location.hash = "";
      var queryString = $.QueryString(this.href);
      var el = $("#"+queryString.scroll_to);
      if( el.length ){
          $('html, body').animate({ scrollTop: el.offset().top }, 400);  
      }
      e.preventDefault();
  });

  setTimeout(function(){
    scrollTo();
  }, 1000);

}]);
