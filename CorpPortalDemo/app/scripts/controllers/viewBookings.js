'use strict';
angular.module("corporateApp")
	.controller('viewBookingController', [
		'$scope',
		'$rootScope',
		'$location',
		'$anchorScroll',
		'GetUpcomingBookings',
		'GetPastBookings',
		'CancelThisBooking',
		'localStorageService',
		'ViewBillFactory',
		function( $scope, $rootScope, $location, $anchorScroll, GetUpcomingBookings, GetPastBookings, CancelThisBooking, localStorageService, ViewBillFactory ){

	//console.log("Called View Booking controller");

	$scope.corpID 			= localStorageService.get('corp-id');
	$scope.radioModel 		= 'Left';
	$scope.showFilters 		= false;

	var currentBookings 	= {};
	var pastBookings 		= {};
	$scope.Bookings 		= {};
	$scope.Bookings.current = true;
	$scope.Bookings.past 	= false;

	var pageNo 				= 1;
	var paginationCount		= 4 ;
	var paginationObj 		= {};
	$scope.disablePrevious 	= true;
	$scope.disableNext 		= true;

	/*This is for Search paymeynt type */
	$scope.paymentTypes 	= [{pType:'Prepaid', pCode:3},{pType:'Cash',pCode:4},{pType:'Credit',pCode:5},{pType:'All', pCode:''}];
	$scope.myPaymentType 	= {pType:'Payment'};
	$scope.paymentTypeNo 	= '';

	$scope.PymentTypeSelected = function(type){
		$scope.paymentTypeNo = type.pCode;
	}

	/* Following code is to checkbox selection of the booking list */

	$scope.selectedBookings = {
		Ids:{ }
	};

	$scope.getSelectedIds =  function(){
		console.log("Selected IDs :", $scope.selectedBookings.Ids);
	}

    $scope.checkAll;
    $scope.checkAllFun = function(){
    	for (var i=0; i<$scope.Bookings.data.length; i++){
    		$scope.selectedBookings.Ids[$scope.Bookings.data[i].booking_id] = $scope.checkAll;
    	}
    }

    //loadPastBookings();

    /***  Refresh Bookings Section ***/
    $rootScope.$on('RefreshViewBookings',function(event,data){
    	console.log('Got Refresh Bookings Call');
        loadUpComingBookings();
    });


	function loadUpComingBookings(){

	    $('.viewBookingWap .spin').show();
		$scope.radioModel = 'Left';
		$scope.showFilters = false;
		var upComingBookingsResource = GetUpcomingBookings.getResource(localStorageService.get('corp-id'), pageNo, paginationCount);

		upComingBookingsResource.get(function(response){
			if(response.status == 'error' && response.error_code == 400){
	   			$rootScope.$broadcast('LogoutThisUser',{});
	    	}

	    	if(Object.getOwnPropertyNames(response.response_data).length === 0){
  					console.warn("GetUpcomingBookings API returned empty Object");
			}
			else{

			    currentBookings = response.response_data.results;

				paginationObj = response.response_data.pagination;
				$scope.disablePrevious = !(paginationObj.has_previous);
				$scope.disableNext = !(paginationObj.has_next);
				$scope.Bookings.current = true;
				$scope.Bookings.data = response.response_data.results;
			}

			//console.log("Previous :", $scope.disablePrevious + "Next :" + $scope.disableNext);
			//console.log('Upcoming Bookings :', currentBookings)

			$('.viewBookingWap .spin').hide();

		});
	}

	loadUpComingBookings();


	function loadPastBookings(){
		$('.viewBookingWap .spin').show();
		clearFilters();
		$scope.radioModel = 'Right';
		var pastBookingsResource = GetPastBookings.getResource(localStorageService.get('corp-id'), pageNo, paginationCount);
		pastBookingsResource.get(function(response){
			if(response.status == 'error' && response.error_code == 400){
		   		$rootScope.$broadcast('LogoutThisUser',{});
		   		return;
		    }

		    if(Object.getOwnPropertyNames(response.response_data).length === 0){
  					console.warn("GetPastBookings API returned empty Object");
			}
			else{

			    $scope.Bookings.past = true;
				pastBookings = response.response_data.results;
				$scope.Bookings.data = response.response_data.results;
				paginationObj = response.response_data.pagination;
				$scope.disablePrevious = !(paginationObj.has_previous);
				$scope.disableNext = !(paginationObj.has_next);

				//console.log('Past Bookings :',pastBookings);
				//console.log("paginationObj on load pastBookings", pastBookings);
				//console.log("Previous :", $scope.disablePrevious + "Next :" + $scope.disableNext);
			}

			$('.viewBookingWap .spin').hide();
		});
	}


	$scope.showCurrentBookingData = function(){
		pageNo = 1;
		clearFilters();
		loadUpComingBookings();

		$scope.Bookings.current = true;
		$scope.Bookings.past = false;
		$scope.showFilters = false;
	};

	$scope.showPastBookingData = function(){
		pageNo = 1;
		loadPastBookings();

		$scope.Bookings.current = false;
		$scope.Bookings.past = true;
		/*if(!$.isEmptyObject(pastBookings)){
			$('.viewBookingWap .spin').hide();
		}*/
	};

	$scope.ModifyBooking = function(booking){
		console.log("Sending Modify booking Message");
		$rootScope.$broadcast('ModifyThisBooking',booking);
        $location.hash('newBooking');
        // call $anchorScroll()
        $anchorScroll();
	};

	$scope.CancelBooking = function(booking){

	    var cancelIt = confirm('Do you want cancel this booking with Booking ID: ' + booking.booking_id);

	    if(cancelIt){
		    var cancelData = {
			    	'url':'/api/customer/cancel-taxi/',
                    'remote_host':'RTFS_URL',
                    'booking_id':booking.booking_id,
                    'cancellation_reason':'Cancelling from Corporate',
                    'corporate_id':localStorageService.get('corp-id')
		        };

		    var cancelResource = CancelThisBooking.getResource();
		    cancelResource.save(cancelData, function success(response){
		        if(response.status == 'error' && response.error_code == 400){
	   				$rootScope.$broadcast('LogoutThisUser',{});
	   				return;
	   			}

		        if(response.response_data.status == 'success'){
		        	$('.viewBookingWap .spin').show();
		        	loadPastBookings();
		        	$rootScope.$emit('RefreshCurrentTripsCount',{});
		        	alert(response.response_data.response_data.status);
		        }
		        else{
		        	//console.log("calcellation failed :",response);
		        	//alert(response.response_data.status);
		        }

		    }, function error(){});
	    }
	    else{
	    	//console.log('user Said No !!');
	    }

	};

    $scope.ViewBill = function(booking){
        //console.log('booking data', booking);
        var viewBillData = {
                'url':'/api/view-bill/',
                'remote_host':'RTFS_URL',
                'booking_id':booking.booking_id,
                'view_bill_md5': booking.view_bill_md5,
                'corporate_id': localStorageService.get('corp-id')//$scope.CorpID
            };

        var viewBillResource = ViewBillFactory.getResource();

        viewBillResource.get(viewBillData, function success(response){
            //console.log('Vie Bill success', response);
        }, function error(){});

	};

	/*Filter*/
	$scope.addFilter = function(){
		$scope.showFilters = true;
	};

	function clearFilters(){
		$scope.searchID 		 ='';
		$scope.searchCar 		 ='';
		$scope.searchPicLoc 	 ='';
		$scope.searchDropLoc 	 ='';
		$scope.searchDateTime 	 ='';
		$scope.searchStatus		 ='';
		$scope.searchPaymentType ='';
	}

	$scope.showPreviousBookings = function(){

		if(paginationObj.has_previous){
			pageNo = paginationObj.previous_page;

			if($scope.radioModel == 'Left')
				loadUpComingBookings();
			else
				loadPastBookings();
		}
	};

	$scope.showNextBookings =  function(){

		if(paginationObj.has_next){
			pageNo = paginationObj.next_page;

			if($scope.radioModel == 'Left')
				loadUpComingBookings();
			else
				loadPastBookings();
		}
		else{

		}
	};

}]);
