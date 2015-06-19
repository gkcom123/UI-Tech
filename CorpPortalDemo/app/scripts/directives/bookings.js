'use strict';
angular.module('corporateApp')
	.directive('newBooking', function(){
		return {
			restrict   : 'E',
			templateUrl:  Helper.viewPath + 'newBooking.html?v=' + Helper.version,
		}
	})
	.directive('newBookingForm', function(){
		return {
			restrict   : 'EA',
			templateUrl: Helper.viewPath + 'new-booking-form.html?v=' + Helper.version,
			controller : 'newBookingController'
		}
	})
	.directive('viewBooking',function(){
		return {
			restrict: 'EA',
			templateUrl: Helper.viewPath + 'view-booking.html?v=' + Helper.version,
			controller: 'viewBookingController'
		}
	})
	.directive('prepaidBalance',function(){
		return {
			restrict   : 'EA',
			templateUrl: 'prepaid-balance.html',
			controller : 'PrepaidBalanceCtrl'
		}
	})
	.directive('bookingSummary',function(){
		return{
			restrict: 'E',
			templateUrl: 'booking-summary.html'
		}
	})
	.directive('trackTaxiList',function(){
		return {
			restrict   : 'EA',
			templateUrl: 'track-taxi-list.html',
			controller : 'trackViewController',
		    link: function (scope, element) {
			    $('#customerList').slimScroll({
				    color: '#00f',
				    height: '200px',					    
				    railVisible: true,
				    alwaysVisible: false
				});
		    }
		}
	});