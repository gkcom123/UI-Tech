/**
 * Created by gunjan.kumar on 14/12/15.
 */
'use strict';
var datemodule = angular.module('toilApp');
datemodule.controller('DatepickerCtrl',['$scope','$rootScope','$stateParams',
	function ($scope,$rootScope,$stateParams) {
		$scope.dt;

/*
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

*/
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
		if($stateParams.typeOfChange=='add') {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.opened = true;
		}
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
				m += 6;
			}
			$scope.maxDate.setFullYear(y, m, d);
			$rootScope.$emit('jobDateChanged', $scope.dt);
		}
		var init = function(){
			if($stateParams.typeOfChange=='add') {
				resetDate();
			}
		};
		init();
}]);
