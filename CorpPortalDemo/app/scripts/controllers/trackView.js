'use strict';
angular.module('corporateApp')
.controller('trackViewController',[
	'$scope',
	'$rootScope',
	'$interval',
	'TrackTaxiService',
	function( $scope, $rootScope, $interval, TrackTaxiService ){
	$scope.customersExist = true;	
	var onBoard=[];
	var driverAssigned = [];	

	function onload(){
		TrackTaxiService.setTaxiType('ONBOARD');
		$scope.trackModel = 'Left';
	}
	onload();

	$scope.$on('FetchCustomers', function(event, data){

		onBoard = data.customer_on_board;
		driverAssigned = data.driver_tracking;

		if(TrackTaxiService.getTaxiType() == 'ONBOARD'){
			$scope.trackModel = 'Left';
			$scope.taxiList = onBoard;	
			$rootScope.$broadcast("ShowOnBoardCustomersMessage",{});
		}
		else  if(TrackTaxiService.getTaxiType() == 'DRIVER_ASSIGNED'){
			$scope.trackModel = 'Right';
			$scope.taxiList = driverAssigned;
			$rootScope.$broadcast("ShowDirverAssignedMessage",{});
		}
		
		console.log("OnBoard Customers ", $scope.taxiList); 
		console.log("selectedTab",TrackTaxiService.getTaxiType());

		if($scope.taxiList.length == undefined){			
			$scope.customersExist = false;
		}		
	});

	$scope.showGmap = function(){		
		$rootScope.$broadcast('ShowGmap', true);
	};

	
    $scope.selectedID = function(cust_data){
    	console.log("The Selected Customer :", cust_data);
    	if(!cust_data.latitude || !cust_data.longitude){    		
    		alert("Sorry!! Taxi Location currently not available.");
    	}
    	else{
    		TrackTaxiService.setSelectedBooking(cust_data);
    		$rootScope.$broadcast('ShowCustomerCar',cust_data);
    	}
    }

    /*$scope.$watch(function () {
		console.log('watch'); // for watching the digest loop
	})*/
 
	var cutomerRefresh = $interval(function (val) {
		if($scope.customersExist){
			$rootScope.$emit('RefreshTrackTaxiListMessage',{});
			console.log('interval fcn', val);
		}

	}, 180000);
 
	$rootScope.$on('StopIntervalsMessage', function(event, data){
		$interval.cancel(cutomerRefresh);
	});

	$scope.customerOnBoard = function(){
		TrackTaxiService.setTaxiType('ONBOARD');
		TrackTaxiService.setSelectedBooking(null);
		$scope.taxiList = onBoard;
		$rootScope.$broadcast("ShowOnBoardCustomersMessage",{});
	}

	$scope.driverTracking = function(){
		TrackTaxiService.setTaxiType('DRIVER_ASSIGNED');
		TrackTaxiService.setSelectedBooking(null);
		$scope.taxiList = driverAssigned;
		$rootScope.$broadcast("ShowDirverAssignedMessage",{});
	}

}]);