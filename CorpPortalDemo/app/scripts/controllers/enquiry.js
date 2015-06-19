'use strict';
angular.module('corporateApp')
	.controller('callBackController', ['$scope', '$modal', function($scope, $modal){
		$scope.open = function(){
			$modal.open({
          		templateUrl: 'enquiryForm.html',
          		size: 'lg',
          		controller: "enquiryController"
        	});
		}
	}])
	.controller('enquiryController',['$scope','$resource', '$modalInstance',  '$tfsApi', function($scope, $resource, $modalInstance,  $tfsApi){
		// get city 

		$tfsApi.getCities(function( cities ) {
			$scope.cities = cities;
		});
		 
		$scope.city   = {name: "City" };
		$scope.applyCityPlaceHolder = true;
		var ajaxLock = false;
		var rules = {
			email: {
				email: true
			},
			contact_number: {
				minlength: 10
			}
		};

		Helper.requireRule(rules, ['name', 'organization', 'email', 'contact_number'])

		var jForm = $("#enquiryForm")
			,formValid = function( data ){
				var isValid = true;
				if( !data.city ){
					$("#equirtCityInput").parent().append('<label id="enqiry-city-error" class="error" for="city">This field is required.</label>')
					isValid = false;
				}
				return isValid;
			}
			;

		$scope.cityChanged = function( selected ){
			$("#equirtCityInput").val( selected.name );
			$("#enqiry-city-error").remove();
			$scope.applyCityPlaceHolder = false;
		};

		$scope.submitEnquiry = function(){
			jForm = $("#enquiryForm");
			jForm.validate({
				rules: rules
			});
			var data = jForm.serializeObject();
			if( jForm.valid() && formValid( data )){
				if( !ajaxLock ){
					Helper.showMask('.enquiryBdrBox');
					ajaxLock = true;
					var request = $resource("/api/corporate-enquiry");
	      			request.save(data, function success(response){
	      				if( response.status == "error" ){
		  					alert("Something went wrong.");
		  				}else {
		  					$("#enquiryFormContainerID").remove();
			  				$("#enquiryResWrapID").show();
		  				}
	      				ajaxLock = false;
	      				Helper.hideMask('.enquiryBdrBox');
	      			});
	      		}
			}
		}

		$scope.ok = function(){
			$modalInstance.dismiss('cancel');
		}

	}]);