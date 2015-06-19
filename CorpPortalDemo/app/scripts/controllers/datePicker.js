'use strict';
angular.module('corporateApp')
	.controller('DatepickerCtrl',[
		'$scope',
		'$rootScope', 
		function ( $scope, $rootScope ){	 
		  
		  $scope.dt;

		  $scope.clear = function () {
		    $scope.dt = null;
		  };

		  $scope.toggleMin = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };


		  $scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.opened = true;
		  };

		  $scope.changed = function(){
		  		$rootScope.$emit('picupDateChanged', $scope.dt);
		  };

		  $scope.$on('setmyDate', function(event, data){
			  	if(data.mydate == ''){
			  		resetDate();
			  	}
		  });

		  $scope.$on('modifyBookingData',function(event,data){
		  		if(!data.datetime){
	  				return;
	  			}

			  	var dt = new Date( data.datetime ),
			  		year = dt.getUTCFullYear(),
			  		month = dt.getUTCMonth(),
			  		day = dt.getUTCDate(),
			  		hour = dt.getUTCHours(),
			  		minute = dt.getUTCMinutes();

			  	$scope.dt = new Date(year, month, day, hour, minute);
			  	$scope.$emit('picupDateChanged', $scope.dt);
		  });

		  function resetDate(){
			  	$scope.dt = new Date();
			  	$scope.maxDate = new Date();
			  	
			  	var m = $scope.dt.getMonth(),
			  		y = $scope.dt.getFullYear(),
			  		d = $scope.dt.getDate();

			  	if( m == 10 ) {
			  		m == 0;
			  		y ++;
			  	} else if( m == 11 ) {
			  		m == 1;
			  		y++;
			  	} else if( m <=9 ) {
			  		m += 2;
			  	}

			  	$scope.maxDate.setFullYear(y, m, d);
			  	$rootScope.$emit('picupDateChanged', $scope.dt);
		  }

		  var init = function(){		  	
  	  		  $scope.toggleMin();
			  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };

			  $scope.initDate = new Date('2016-15-20');
			  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd-MMM-yyyy'];
			  $scope.format = $scope.formats[4];
			  resetDate();
		  };

		  init();
	}]);