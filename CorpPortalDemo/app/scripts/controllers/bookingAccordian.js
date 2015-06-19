'use strict';
angular.module('corporateApp')
	.controller('parentController',[
			'$scope',
			'$rootScope',
			'customerOnBoard',
			'localStorageService',
			'TrackTaxiService',
			function( $scope, $rootScope, customerOnBoard, localStorageService, TrackTaxiService ){
				$scope.showGMap = false;
				$scope.$on('ShowGmap', function(event, data){				
					$scope.showGMap = data;				
				});

				function fetchCustomersOnBoard(){
					var customerOnBoardResource = customerOnBoard.getResource(localStorageService.get('corp-id'));
					customerOnBoardResource.get(function(response){	
				  		if(response.status == 'error' && response.error_code == 400){		   		
					   		$rootScope.$broadcast('LogoutThisUser',{});
					   		return;
					   }

					   if(Object.getOwnPropertyNames(response.response_data || {}).length === 0){
		  					console.warn("GetCorporateRunningBookings API returned empty Object");
						}else {
						   $scope.onBoardCustomers = response.response_data;	
						   TrackTaxiService.setCusotmersOnBoard($scope.onBoardCustomers);
						   $rootScope.$broadcast('FetchCustomers', $scope.onBoardCustomers);
						}
					});
				}

				fetchCustomersOnBoard();

				$rootScope.$on('RefreshTrackTaxiListMessage', function(event, data){
					fetchCustomersOnBoard();
				});
	}])

.controller('accordianController',[
		'$scope',
		'$rootScope',
		function( $scope, $rootScope ){

		$scope.oneAtATime = true;

		$scope.status = {
	        isFirstOpen: true,
	        isFirstDisabled: false
      	};

      	$scope.showBookingPage = function(){
			$rootScope.$broadcast('ShowGmap', false);
		};
}])

.controller('bookingSummaryController', [
	'$scope',
	'GetBookingCount',
	'localStorageService',
	function( $scope, GetBookingCount, localStorageService ){		

		$scope.bookingSummary = {};
		$('#summaryInfo .spin').show();
		var bookingCountRes = GetBookingCount.getResource( localStorageService.get('corp-id') );

		bookingCountRes.get(function(response){			
			$('#summaryInfo .spin').hide();	
			var res = response.response_data || {};
			if(Object.getOwnPropertyNames( res ).length === 0){
              console.warn("GetBookingCount API in returned empty Object");
            } else {
				var count = response.response_data;
				$scope.bookingSummary.serviced = count.serviced;
				$scope.bookingSummary.issued = count.issue_booking;
				$scope.bookingSummary.cancelled = count.cancelled;
			}		
		});
}]);