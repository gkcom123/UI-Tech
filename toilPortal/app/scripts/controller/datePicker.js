/**
 * Created by gunjan.kumar on 14/12/15.
 */
'use strict';
var datemodule = angular.module('toilApp');
datemodule.controller('DatepickerCtrl',['$scope','$rootScope',
	function ($scope,$rootScope) {
		$scope.dt;

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();
	$scope.maxDate = new Date(2020, 5, 22);

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.opened = true;
	};
		$scope.changed = function(){
			$rootScope.$emit('jobDateChanged', $scope.dt);
		};

	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	$scope.status = {
		opened: false
	};
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
			$rootScope.$emit('jobDateChanged', $scope.dt);
		}
		var init = function(){
			resetDate();
		};
		init();
	/*$scope.getDayClass = function(date, mode) {
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i=0;i<$scope.events.length;i++){
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
		return '';
	};*/
}]);
