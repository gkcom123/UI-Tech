'use strict';
angular.module('corporateApp')
	.controller('TimepickerCtrl', [
		'$scope',
		'$rootScope',
		function( $scope, $rootScope ){

			var d = new Date(),
		  	  currentDay = d.getDay(),
		  	  currentMonth = d.getMonth(),
		  	  currMin = d.getMinutes(),
		  	  currHr  = d.getHours();


		  $scope.mytime = d;
		  $scope.bookingDate = d;
		  	  
		  $scope.hstep = 1;
		  $scope.mstep = 15;

		  $scope.options = {
			    hstep: [1, 2, 3],
			    mstep: [1, 5, 10, 15, 25, 30]
		  };

		$scope.ismeridian = true;

		  $scope.toggleMode = function() {
		    $scope.ismeridian = !$scope.ismeridian;
		  };

		  $scope.update = function() {
		    var d = new Date();
		    d.setHours( 14 );
		    d.setMinutes( 0 );
		    $scope.mytime = d;
		  };

		  $scope.changed = function () {	    
		    //console.log(( $filter('date')($scope.mytime, 'HH:mm:ss')));
		    var cHr = currHr + 1;
		    if(currMin >= 45){
		    	cHr += 1;
		    }

		    var bookingDay = $scope.bookingDate.getDay(),
		    	bookingMonth = $scope.bookingDate.getMonth(),
		    	bookingHr = $scope.mytime.getHours(),
		    	bookingMin = $scope.mytime.getMinutes(),
				timeflag = false;

		    if(bookingHr < cHr){
				timeflag=true;
			}
		    if(bookingHr == cHr && bookingMin<currMin){
				timeflag=true;
			}
		    
		    if((bookingMonth == currentMonth) && (bookingDay == currentDay) && timeflag ){
		    	resetTime();
		    } else {
		    	$scope.$emit('picupTimeChanged', $scope.mytime);
		    }

		  };

		  $scope.clear = function() {
		    $scope.mytime = null;
		  };

		  $scope.$on('setmyTime', function(event, data){
		  	if(data.mytime==''){
		  		resetTime();
		  	}
		  });

		  $scope.$on('modifyBookingData',function(event,data){
		  		if(!data.datetime){
		  			return;
		  		}

		  		data.datetime+='Z';

			  	var dt 			= new Date(data.datetime),
			  		year 		= dt.getUTCFullYear(),
			  		month 		= dt.getUTCMonth(),
			  		day			= dt.getUTCDate(),
			  		hour 		= dt.getUTCHours(),
			  		minute 		= dt.getUTCMinutes();

			  	$scope.mytime 	= new Date(year, month, day, hour, minute);

			  	$scope.$emit('pickupTimeChanged', $scope.mytime);
		  });

		  $rootScope.$on('picupDateChanged', function(event,data){
		  		$scope.bookingDate = data;	  		
		  });
		  
		  $scope.$on('setTimeForBookType', function(event,data){
		 		var booktype = data[0]['booktype'];
		 		var hours = $scope.mytime.getHours();

		 		resetTime();

		 		if(booktype!='at-km' && booktype!='p2p'){
		 			$scope.mytime.setHours( hours + 2);
		 		}
		 		$scope.$emit('picupTimeChanged', $scope.mytime);
		  });
		  

		  function resetTime(){	  	
		  	$scope.mytime = new Date();
		  	var hrs = $scope.mytime.getHours(),
		  		mins = $scope.mytime.getMinutes();
		  	
		  	if(mins > 0 && mins <= 15)
		  		mins = 15;
		  	if(mins > 15 && mins <= 30)
		  		mins = 30;
		  	if(mins > 30 && mins <= 45)
		  		mins = 45;
		  	if(mins > 45){
		  		mins = 0;
		  		hrs = hrs +1;
		  	}

		  	$scope.mytime.setHours( hrs + 1);
		  	$scope.mytime.setMinutes(mins);
		  }

		  resetTime();
	}]);