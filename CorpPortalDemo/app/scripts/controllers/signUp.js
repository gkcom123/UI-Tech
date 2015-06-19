'use strict';
angular.module('corporateApp')
	.controller('signUpController',[
		'$scope',
		'$resource',
		'$tfsApi',
		function( $scope, $resource, $tfsApi ){

		$scope.gotoHome = $tfsApi.gotoHome;
		$scope.paymentType = "1" // for cash payment type is 1
		$scope.createdBy = "241"//TODO Replace createdBy

		var ajaxLock = false;

		$scope.state = {name: "State"};
		var countryId = $tfsApi.getCountryId();
		$tfsApi.getStatesByConutryId(countryId, function( res ){
			$scope.states = res;
		});
		$scope.applyStatePlaceHolder = true;

		// get city 
		$scope.cities = [];
		$scope.city   = {name: "City" };
		$scope.applyCityPlaceHolder = true;
		
		var rules = {
			emailId: {
				email: true
			},
			mobileNumber: {
				minlength: 10
			},
			pincode: {
				minlength: 6	
			}
		};

		Helper.requireRule(rules, ['corporateName', 'addressLine1', 'emailId', 'mobileNumber', 'pincode', 'name'])

		var jForm = $("#registerForm")
			,formValid = function( data ){
				var isValid = true;
				if( !data.cityName ){
					$("#cityInput").parent().append('<label id="city-error" class="error" for="city">This field is required.</label>')
					isValid = false;
				}
				if( !data.stateId ){
					$("#stateInput").parent().append('<label id="state-error" class="error" for="state">This field is required.</label>')
					isValid = false;
				}
				return isValid;
			}
			;

		jForm.validate({
			rules: rules
		});

		$scope.createAccount = function(){
			var data = jForm.serializeObject();
			if( jForm.valid() && formValid( data )){
				if(data.agree && data.agree == "true"){
					if( !ajaxLock ){
						Helper.showMask('#registerContainerID');
						ajaxLock = true;
						var request = $resource("/api/common_request/");
	                  
	                  	data.url = '/registration/api/corporate/corporateRegistration/';
	                  	data.remote_host = 'REGISTRATION_URL';
	                  
	                  	delete data.agree;

		      			request.save(data, function success( res ){
		      				if( res.status == 'success' ){
		      					var resData = res.response_data || {},
		      						desc,
		      						status = resData.status || "";

		      					if( status.toLowerCase() == "failure" ){
		      						desc = resData.error_desc || "";
		      						if( desc && desc.toLowerCase() != "exception" ){
		      							alert( desc );
		      						}else{
		      							alert('Something went wrong, please try later');
		      						}
		      					}else {
			  						$("#registerWrapID").remove();
			  						$("#registerMsgWrapID").show();
			  					}
				            }else{
								alert('Something went wrong, please try later');
		          			}
		      				ajaxLock = false;
		      				Helper.hideMask('#registerContainerID');
		      			});
		      		}
				}else {
					alert("In order to use our services, you must agree to Terms of Service.");
				}
			}
		}	

		$scope.stateChanged = function( selected ){
			$("#stateInput").val( selected.stateId );
			$("#countryInput").val( selected.countryId );
			$("#state-error").remove();
			if(selected.stateId != $scope.city.stateId){
				$scope.cities = [];
				$tfsApi.getAllCityByStateId( selected.stateId, function( res ){
					$scope.cities = angular.copy(res);
				});
				$scope.city = angular.copy({name: "City" });
				$scope.applyCityPlaceHolder = true;
				$scope.applyStatePlaceHolder = false;
				$("#cityInput").val( "" );
			}
		}

		$scope.cityChanged = function( selected ){
			$("#cityInput").val( selected.name );
			$scope.city = $.extend(true, {}, selected);
			$scope.applyCityPlaceHolder = false;
			$("#city-error").remove();
		}
	}]);