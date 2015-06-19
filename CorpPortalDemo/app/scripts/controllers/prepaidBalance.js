'use strict';
angular.module('corporateApp')
	.controller('PrepaidBalanceCtrl',[
		'$scope',
		'$rootScope',
		'GetPrepaidBalance',
		'GetTotalCurrentTripFare',
		'localStorageService',
		function( $scope, $rootScope, GetPrepaidBalance, GetTotalCurrentTripFare, localStorageService ){
      	
      		var cData = localStorageService.get('corp-details');
			$scope.balance;
			$scope.head1;
			$scope.head2;
			$scope.pbartype;
			$scope.maxLimit;
			$scope.pPercent;      
			$scope.corpID = localStorageService.get('corp-id');  

			$scope.payType = cData.paymentType;
			$scope.showPrepaidLink = true;
		  	$scope.showPrepaidText = "Enable Prepaid Payment";

			if($scope.payType == 2 || $scope.payType == 3){
					$scope.head1 = "PREPAID";
					$scope.head2 = "PREPAID BALANCE";
					$scope.showPrepaidText = "Recharge Prepaid Account";
			}else if($scope.payType == 4 || $scope.payType == 5){
					$scope.head1 = "CREDIT";
					$scope.head2 = "CREDIT USAGE";
					$scope.maxLimit = cData.overDraftLimit;
			}else if($scope.payType == 1){
					$scope.head1 = "CASH"
			}

			loadPrepaidBalance();
			loadCurrentTrips();

	  function loadPrepaidBalance() {
	  	
		  	var prepaidBalanceResource = GetPrepaidBalance.getResource(localStorageService.get('corp-id'))      
		  	prepaidBalanceResource.get(function(response){

			  	if(response.status == 'error' && response.error_code == 400){		
				   		$rootScope.$broadcast('LogoutThisUser',{});
				   		return;
				}
				
				$scope.balance = response.response_data;
				$rootScope.$emit('PrepaidBalanceAmountEvent', $scope.balance);
				console.log("Prepaid balance API Response :", response);		
				if($scope.payType == 4 || $scope.payType ==5){
					setCreditProgress();
					$scope.showProgress = true;
				}
				else{
					$scope.showProgress = false;
				}
		  	});	  
	  }     
	  

	  function loadCurrentTrips(){

		  var totalCurrentTripsResource = GetTotalCurrentTripFare.getResource(localStorageService.get('corp-id'));
		  totalCurrentTripsResource.get(function(response){

			  	if(response.status == 'error' && response.error_code == 400){		   		
				   		$rootScope.$broadcast('LogoutThisUser',{});
				   		return;
				   }

				console.log("GetTotalCurrentTripFare API Response:", response);
				
				$scope.totalFare = response.response_data.total_estimated_fare;
				$scope.tripsCount = response.response_data.count;
				$rootScope.$emit('UpcomingBookingsAmountEvent',$scope.totalFare);
		  });
	  }


	  function setPrepaidProgress(){
		  if($scope.balance >= $scope.maxLimit*.5)
		  		$scope.pbartype = "success";
		  else if($scope.balance < $scope.maxLimit*.5 && $scope.balance > $scope.maxLimit*.25)
		  		$scope.pbartype = "info";
		  else if($scope.balance < $scope.maxLimit*.25)
		  		$scope.pbartype = "danger";
	  }

	  function setCreditProgress(){
	  	 if($scope.balance < 0)
	  	 	$scope.balance = $scope.balance * -1;	  	 

		  if($scope.balance <= $scope.maxLimit*.5)
		  		$scope.pbartype = "success";
		  else if($scope.balance > $scope.maxLimit*.5 && $scope.balance < $scope.maxLimit*.75)
		  		$scope.pbartype = "info";
		  else if($scope.balance > $scope.maxLimit*.75)
		  		$scope.pbartype = "danger";

		  $scope.pPercent = (($scope.balance * 100) / $scope.maxLimit).toFixed(1);		  
	  }

	  $rootScope.$on('RefreshCurrentTripsCount', function(event, data){
	  		console.log('Gor Refresh Current Trips Count Message');
	  		loadCurrentTrips();
	  });

    }]);