'use strict';
angular.module('corporateApp')
	.controller('homeController', [
		'$scope',
		'$tfsApi',
		'$modal',
		function( $scope, $tfsApi, $modal ){

			var headerHt = $('.homeHeader.fixedHeader').outerHeight();
			$('a.anchor').css({
				"top": "-" + headerHt +"px"
			})

			$scope.gotoSignUp = $tfsApi.gotoSignUp;
			$scope.openFareChart = function(){
				$modal.open({
	          		template: '<tfs-fares></tfs-fares>'
	        	});
			}
	}])
	.controller('collapseController', ['$scope', function($scope){
		$scope.isCollapsed = false;
	}])
	.controller('featuresController', function ($scope) {
		$scope.activeIndex = 0;
		$scope.tourInterval = 6000;
		$scope.features = [{
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/realtime_features.png",
			header: 'Realtime Tracking',
			imageZIndex: 1,
			subtext: "Track the whereabouts of your cab in real time<br/>With real time, tracking you can easily know the whereabouts of the booked cab anytime anywhere. Ensures the safety of your employees."
		}, {
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/onepartner_features.png",
			header: 'One Nation. One Partner',
			imageZIndex: 1,
			subtext: "Everywhere You Go, We Will Be Available<br/>We are already present in 44 cities of India and we are expanding our presence to more cities in India. Wherever your enterprise has a branch, you can avail our services without any additional paperwork."
		}, {
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/costefficiency_features.png",
			header: 'Drive Cost Efficiency',
			subtext: 'Reduce Cost, Increase Savings<br/>Every booking with us is a step towards achieving greater cost efficiency. With a wide array of products provided at an affordable price, it is possible for you to make your cab bookings cost effective.<br/>',
			imageZIndex: 1,
			showFareBtn: true
		}, {
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/reliability_features.png",
			header: 'Reliabilty and Quality',
			subtext: "Reliable Services, Quality Rides<br/>Be assured of getting a cab every time you make a booking for an employee. We ensure quality by employing the strictest measures  and standards for our cabs as well as the drivers",
			imageZIndex: 1
		}, {
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/cashless_features.png",
			header: 'Cashless Travel',
			subtext: "Say Hello To Cashless Travel<br/>Your employees do not need to pay the driver at the end of the ride. Just use of our prepaid services. Let your employees enjoy the ride without worrying about getting the exact change at the end of the ride.",
			imageZIndex: 1
		}, {
			image_url: "//cdn1.taxiforsure.com/v2/img/corp/simpletaxi_features.png",
			header: 'Simplfy Taxi Booking',
			subtext: "Experience Simple, Hassle Free cab Booking<br/>Say goodbye to exasperating phone calls to cab operators. With us, just log on to our website and book a cab for your employee in just a few clicks.",
			imageZIndex: 1
		}]
		$scope.setActiveIndex = function( index ){
		 	$scope.activeIndex = index;
		}
	})
	.controller('productTourController', function ($scope) {
		  $scope.activeIndex = 0

		  $scope.tours = [{
		  		image_url: '//cdn1.taxiforsure.com/v2/img/corp/easy_taxi.png',
		  		text: 'Easy Taxi Booking Process',
		  		sub_text: 'The days of long, tiresome process of contacting cab operators for a single booking are over. With us, just log on to our website and book a cab for your employee in just a few clicks. With prepaid option, the cab booking process has got even simpler and easier with us.'
		  }, {
		  		image_url: '//cdn1.taxiforsure.com/v2/img/corp/prepaid_usage.png',
		  		text: 'Product – Prepaid Usage',
		  		sub_text: 'Prepaid option gives you freedom from the lengthy process of collecting receipts from your employees for every ride and then reimbursing the amount. With prepaid services, your employees can travel cashless and you don’t have to spend hours collating the receipts and disbursements.'
		  }, {
		  		image_url: '//cdn1.taxiforsure.com/v2/img/corp/view_track_bills.png',
		  		text: 'View – Track Bills - Feedbacks',
		  		sub_text: 'With us, you can easily track all the cab booking you do with us. You just have to log on to our website and you can easily access the cab bookings and the corresponding bills for each booking made till date. We also provide you the opportunity to provide us with feedbacks for all the cab bookings serviced.'
		  }, {
		  		image_url: '//cdn1.taxiforsure.com/v2/img/corp/filter_download.png',
		  		text: 'Filter and Download Reports',
		  		sub_text: 'Not only can you access the details of all cab bookings and corresponding bills, you can easily filter and download the reports for your reference.'
		  }, {
		  		image_url: '//cdn1.taxiforsure.com/v2/img/corp/track_tour.png',
		  		text: 'Tracking of cabs',
		  		sub_text: 'We provide you with real time tracking of every cab booking you do with us. You can just log on to our website and track the whereabouts of any and every cab booked with us. You can ensure the safety of your employees by knowing the whereabouts of the booked cab all the time.'
		  }]

		  $scope.setActiveIndex = function( index ){
		  		$scope.activeIndex = index;
		  }

	});