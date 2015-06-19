'use strict';
angular.module('corporateApp')
	.controller("PickAndDropController",[
		'$scope',
		'$rootScope',
		'$timeout',
		'GetAirPortLocation',
		'localStorageService',
		'$tfsApi', 
		function ( $scope, $rootScope, $timeout, GetAirPortLocation, localStorageService, $tfsApi ){
		$scope.cityAirports;
		$scope.corpID 		= localStorageService.get('corp-id');		
		$scope.direction 	= 2; //Direction for airport 1:->TO 2:-> FROM
		$scope.picLatLng 	= {};
		$scope.dropLatLng 	= {};
		$scope.disableLocationFMields =  true;
        $scope.myAirport = {name:"Select Airport"};

        $scope.picDetails = '';
        $scope.dropDetails = '';

        var currentCityID,
			updatedOptions = function( city_id ){
			$scope.options = {					
				bounds: $tfsApi.getBoundsByCityId( city_id ),
            	types: 'geocode',
           		country: 'in'
			};
		}
		$scope.$on('ServiceCitySelected', function(event, city_id){
			updatedOptions( city_id );
			currentCityID = city_id;
			$tfsApi.updatePolygonBoundsByCityId(city_id, function( cityId, bounds ){
				updatedOptions( cityId );
			});
			//$scope.disableLocationFields = false;
		});

		/* Toggle Airport Location*/

		var toggleFlag = false;
		$scope.swapAirportLocation = function(){
			$('#swapLocation').removeClass('isToggle');
			
			 if (!toggleFlag){
				 $('#swapLocation').addClass('isToggle');
				 $('#pic1').show();
				 $('#gglLoc').hide();
				 $scope.direction = 1;
				 toggleFlag = true;

			 }
			 else {			 	
			 	 $('#pic1').hide();
				 $('#gglLoc').show();

				 $scope.direction = 2;
				 toggleFlag = false;
			 }

			//console.log('Toggle Flag  :', toggleFlag);
			//console.log('THe Direction :', $scope.direction);
			airportPicDropSwapped($scope.myAirport);
			//$scope.airportTypeChanged($scope.myAirport);
		};
		
		function isLocationInCity(loc){
			return currentCityID ? $tfsApi.isWithinCity(currentCityID, loc) : true;
		}

		$scope.pickLocationFunc = function(modify){
			if(!$scope.pickLocation){
				return;
			}
			$timeout(function(){
				
				var forModify = (modify ? true : false);

				if(!forModify){
					if(!$scope.picDetails){
						alert("Please choose the address from the drop down.");
		               		$scope.pickLocation = '';
		               		$("#picLoc").focus();
		               		return;
					}

					$scope.pickLocation  = $scope.picDetails.formatted_address;
					$scope.picLatLng.lat = $scope.picDetails.geometry.location.lat();
		            $scope.picLatLng.lng = $scope.picDetails.geometry.location.lng();

		            if(isLocationInCity($scope.picLatLng)){	                    	
		                   $rootScope.$broadcast('PickupLocationChanged', [{"location" : $scope.pickLocation, 'locationLatLong':$scope.picLatLng,'modify':forModify}]);
	                }
	                else{
	            		$scope.pickLocation = '';
	            		alert('Pick up location should be within selected city');	                    		
	                }
            	}
            	else{
            			var Ploc = $('#picLoc').val();	
						$scope.pickLocation = Ploc;	
						var geo = new google.maps.Geocoder;

		            	geo.geocode({'address':$scope.pickLocation},function(results, status){
			                if (status == google.maps.GeocoderStatus.OK) {
			                    $scope.picLatLng.lat = results[0].geometry.location.lat();
			                    $scope.picLatLng.lng = results[0].geometry.location.lng();
			                    if(isLocationInCity($scope.picLatLng)){	                    	
			                    	$rootScope.$broadcast('PickupLocationChanged', [{"location" : $scope.pickLocation, 'locationLatLong':$scope.picLatLng,'modify':forModify}]);
			                    }else{
		                    		$scope.pickLocation = '';
		                    		alert('Pick up location should be within selected city');	                    		
			                    }
			                }else{
			                     //console.log("Pick up Geocoder Error: " + status);
			                }
	            		});
	            	}

	        },500);
		};


        $scope.dropLocationFunc = function(modify){
        	if(!$scope.dropLocation){
        		return;
        	}

			$timeout(function(){
				
				var forModify = (modify ? true : false);

				if(!forModify){
					if(!$scope.dropDetails){
						alert("Please choose the address from the drop down.");
		               		$scope.dropLocation = '';
		               		$("#dropLoc").focus();
		               		return;
					}

					$scope.dropLocation  = $scope.dropDetails.formatted_address;
					$scope.dropLatLng.lat = $scope.dropDetails.geometry.location.lat();
		            $scope.dropLatLng.lng = $scope.dropDetails.geometry.location.lng();

		            if(isLocationInCity($scope.dropLatLng)){	                    	
		                   $rootScope.$broadcast('DropLocationChanged', [{"location" : $scope.dropLocation, 'locationLatLong':$scope.dropLatLng,'modify':forModify}]);
	                }
	                else{
	            		$scope.dropLocation = '';
	            		alert('Drop location should be within selected city');	                    		
	                }
            	}
            	else{
            	 		var Dloc = $('#dropLoc').val();				
						$scope.dropLocation = Dloc;
						var geo = new google.maps.Geocoder;

						geo.geocode({'address':$scope.dropLocation},function(results, status){
			                    if (status == google.maps.GeocoderStatus.OK) {
			                        $scope.dropLatLng.lat = results[0].geometry.location.lat();
			                        $scope.dropLatLng.lng = results[0].geometry.location.lng();
			                        if( isLocationInCity($scope.dropLatLng) ){
				                    	$rootScope.$broadcast('DropLocationChanged', [{"location" : $scope.dropLocation, "locationLatLong":$scope.dropLatLng, 'modify':forModify}]);
			                    	}else{
			                    		alert('Drop location should be within selected city');
			                    		$scope.dropLocation = '';
			                    	}
			                    }else{
			                         //console.log("Drop Geocoder Error: " + status);
			                    }
		            	});
		          }

            },500);
		};


		$scope.swapLocations = function(){
			var pic = $scope.dropLocation;
			var picLattLong = $scope.dropLatLng;

			$scope.dropLocation = $scope.pickLocation;
			$scope.dropLatLng   = $scope.picLatLng;

			$scope.pickLocation = pic;
			$scope.picLatLng    = picLattLong;

			$scope.$emit('LocationChanged', [{"pic" : $scope.pickLocation, 'picLatLong':$scope.picLatLng, "drop" : $scope.dropLocation, "dropLatLong":$scope.dropLatLng}]);
			//console.log($scope.$parent.selectedCity);
		};

		$scope.airportTypeChanged = function(airport, modify){

			//console.log('Air port location changed :', $scope.direction);
			var locValue;
			var airLatLng = {};

			var forModify = (modify ? true : false);

			if($scope.direction == 2)
				locValue = 'PickupLocationChanged';
			else
				locValue = 'DropLocationChanged';

			if(airport){
				var airLoc = airport.name;					
					airLatLng.lat = airport.latitude;
					airLatLng.lng = airport.longitude;

					$scope.$emit(locValue, [{"location" : airLoc, 'locationLatLong': airLatLng, 'direction': $scope.direction, 'modify':forModify}]);
			}

				//$scope.$emit('AirportLocationChanged',{'direction':$scope.direction,'airportDetails':airport});
		};

		function airportPicDropSwapped(airportDetails){
			//console.log('Swap called');
			var airLatLng = {};

			if($scope.direction == 2){

				//2 = from			
				if(airportDetails){

					var airLoc = airportDetails.name;					
					airLatLng.lat = airportDetails.latitude;
					airLatLng.lng = airportDetails.longitude;
					console.log("Broadcasing from airportPicDropSwapped in PickAndDropController");
					$rootScope.$broadcast('PickupLocationChanged', [{"location" : airLoc, 'locationLatLong': airLatLng, 'direction': $scope.direction, 'modify':false}]);
				}

				$scope.dropLocation = $scope.pickLocation;
				$scope.dropLatLng = $scope.picLatLng;
				console.log("Broadcasing from airportPicDropSwapped in PickAndDropController");
				$rootScope.$broadcast('DropLocationChanged', [{"location" : $scope.dropLocation, 'locationLatLong': $scope.dropLatLng,'direction': $scope.direction,'modify':false}]);
			}
			else{
					if(airportDetails){

						var airLoc = airportDetails.name;			
						airLatLng.lat = airportDetails.latitude;
						airLatLng.lng = airportDetails.longitude;
						console.log("Broadcasing from airportPicDropSwapped in PickAndDropController");
						$rootScope.$broadcast('DropLocationChanged', [{"location" : airLoc, 'locationLatLong': airLatLng,'direction': $scope.direction,'modify':false}]);
					}

				$scope.pickLocation = $scope.dropLocation;
				$scope.picLatLng = $scope.dropLatLng;
				console.log("Broadcasing from airportPicDropSwapped (else) in PickAndDropController");
				$rootScope.$broadcast('PickupLocationChanged', [{"location" : $scope.pickLocation, 'locationLatLong': $scope.picLatLng,'direction': $scope.direction,'modify':false}]);
			}

		};


		$scope.$on('LoadAirportLocations', function(event, data){
			var airpotResource = GetAirPortLocation.getResource(data.cityID, localStorageService.get('corp-id'));
			
			airpotResource.get(function(response){
				if(response.status == 'error' && response.error_code == 400){			   		
			   		$rootScope.$emit('LogoutThisUser',{});
			   		return;
		   		}

		   		if(Object.getOwnPropertyNames(response.response_data).length === 0){
              		console.warn("GetAirPortLocation API in returned empty Object");
              		return;              		
            	}
				
				//console.log('airport locations :', response.response_data);
				
				$scope.cityAirports = response.response_data;
                $scope.myAirport = {name:"Select Airport"};
				//console.log('Airport Mod Data :', data);

				if(data.hasOwnProperty('name')){
					$scope.direction = data.direction;
					toggleFlag = (data.direction == 1 ? true : false);
					//console.log('THe toggleFlag insde modification :' ,toggleFlag)
					for(var i=0;i<$scope.cityAirports.length; i++){
						if($scope.cityAirports[i].name == data.name){
							$scope.myAirport = $scope.cityAirports[i];
							break;
						}
					}
					$scope.airportTypeChanged($scope.myAirport, true);
				}
				else{
					if($scope.cityAirports.length <= 1){
						$scope.myAirport = $scope.cityAirports[0];
						$scope.airportTypeChanged($scope.myAirport, false);
					}
				}

			});
		});


		$scope.$on('modifyBookingData',function(event,data){

			console.log("In modifyBookingData Listener :", data);

			if(data.hasOwnProperty('pick')){
				$scope.pickLocation = data.pick;
				$scope.pickLocationFunc(true);
			}
			if(data.hasOwnProperty('drop')){
				$scope.dropLocation = data.drop;
				$scope.dropLocationFunc(true);
			}
			if(data.hasOwnProperty('direction'))
				$scope.direction = data.direction;

			/*if(data.pick)
				$scope.pickLocationFunc(true);
			if(data.drop != '')
				$scope.dropLocationFunc(true);*/

		});

  	}]);