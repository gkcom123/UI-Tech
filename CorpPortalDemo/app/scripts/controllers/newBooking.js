'use strict';
angular.module('corporateApp')
	.controller('newBookingController', [
		'$scope',
		'$rootScope',
		'$filter',
		'$resource',
		'GetEstimatedFare',
		'GetPricingData',
		'ValidateLocation',
		'localStorageService',
		'$tfsApi',
        function($scope,$rootScope, $filter, $resource, GetEstimatedFare, GetPricingData, ValidateLocation,localStorageService, $tfsApi){

		$scope.CorpID = localStorageService.get('corp-id');
		var cData = localStorageService.get('corp-details');
		
		/*Check this */
		$rootScope.$on('corpDetails',function(event, data){
			$scope.corpData = data;
			//console.log("the Corp Details On message :", data);
		});

		$rootScope.$emit('showGMap',false);

		
		// Validation the form - Config
		$("#newForm").validate({
			rules: {
				guestName: {
			      required: true
			    },
			    guestMobile: {
			    	required: true,
			    	digits: true
			    },
			    guestEmail: {
			    	required: true
			    	//email: true
			    },
			    pickLocation: {
			    	required: true
			    },
			    dropLocation: {
			    	required: true
			    },
			    myCity: {
			    	required: true
			    },
			    myBookType: {
			    	required: true
			    },
			    myCar: {
			    	required: true
			    }
			}
		});
		
        $scope.showList = function(){
            $('.dropdown-list').toggle();
        }

		function hideAirport(){
			$('#tfsLoc').hide();
			$('#pic1').css({display: 'inline-block'});
			$('#swapLocation').removeClass('isToggle');
			$('#forAirport').hide();
			$('#forPoint').show();
			$('#gglLoc').show();
		}

		function showFromAirport(){				
			$('#pic1').hide();
		    $('#tfsLoc').css({display: 'inline-block'});
		    $('#gglLoc').show();
		    $('#forAirport').show();
		    $('#forPoint').hide();
		}
		
		function showToAirport(){
			$('#swapLocation').addClass('isToggle');
			$('#pic1').css({display: 'inline-block'});
			$('#tfsLoc').css({display: 'inline-block'});
			$('#gglLoc').hide();
			$('#forAirport').show();
			$('#forPoint').hide();
		}
		

		var isPickupLocationValid 	= true;
		var isDropLocationValid 	= true;
		$scope.RTFS_pickupLocality 	= '';
		$scope.RTFS_dropLocality 	= '';

		$scope.estimatedFareTitle 	= "Estimated Fare";
		$scope.estimatedFare 		= "...";
		$scope.paymentMode;

		$scope.action 	  = 'new';
        $scope.booking_id ='';
		$scope.cities     = [];
		$scope.bookType   = [];
		$scope.direction  ='';
		$scope.fare_type  ='';
		$scope.guestName;
		$scope.guestNumber;
		$scope.guestEmail;
		$scope.pickupLocation;
		//$scope.pickupArea;
		//$scope.dropArea;
		$scope.pickupLatLong  = {};
		$scope.dropLocation;		
		$scope.dropLatLong    = {};
		$scope.airportLocation;
		$scope.airportLatLong = {};
		$scope.userInstructions;
		$scope.disableLocationFields = true;
		
        $scope.showDrop   = true;
        $scope.myCity 	  = {name:"Select City"};        
        $scope.myCar 	  = {car_type:"Select Car"};
        $scope.myBookType = {description:"Select Booking type"};
        $scope.surcharge  = 0;

        var upcomingBookingsAmount;
        $rootScope.$on('UpcomingBookingsAmountEvent', function(event,data){
        	upcomingBookingsAmount = data;
        });
        var prepaidBalance;
        $rootScope.$on('PrepaidBalanceAmountEvent', function(event,data){
        	prepaidBalance = data;
        });

		/**JAVA paymentType 
			1: cash
			2: prepaid
			3: prepaid+cash
			4: credit
			5: credit+cash
			RTFS Payment mode
			3:prepaid
			4:cash
			5:credit
		*/
        $scope.paymentType = cData.paymentType;        
        setPaymentMode();


        function setPaymentMode(){	        
        	var pTypes = Helper.paymentTypes,
 	       		pModes = Helper.paymentModes;

        	if( [ pTypes.PREPAID, pTypes.CASHPREPAID ].include( $scope.paymentType ) )
				$scope.paymentMode = pModes.PREPAID;
			else if( [ pTypes.CREDIT, pTypes.CASHCREDIT ].include( $scope.paymentType ) )
				$scope.paymentMode = pModes.CREDIT
			else if( pTypes.CASH == $scope.paymentType )
				$scope.paymentMode = pModes.CASH;
        }

		
        $tfsApi.getCities(function( cities ){
     		debugger;
     		$scope.cities = cities;

     		//Re-enabling Dehli
     		/*for (var n = 0 ; n < $scope.cities.length ; n++) {
			    if ($scope.cities[n].id == 4) {
			      $scope.cities.splice(n,1);			      
			      break;
			   	}
			}*/

     	});

		function disableLocFields(){
			//console.log('city, btype :',$scope.myBookType,$scope.myCity);
			if($scope.myCity.name != "Select City" && $scope.selectedBookType != undefined)
				$scope.disableLocationFields = false;		
			else
				$scope.disableLocationFields = true;
		}


		$scope.citySelected = function(city){
            $scope.myCity = city;
            $('.dropdown-list').hide();

		    $scope.selectedCity   = city.name;		    
		    $scope.selectedCityID = city.id;		    
		   //$scope.disableLocationFields = false;
		    //disableLocFields();
			
			hideAirport();
			
			$rootScope.$broadcast('modifyBookingData', {'pick': '', 'drop': '', 'direction': ''});
			$scope.pickupLocation = '';
			$scope.dropLocation   = '';
			$scope.direction      = '';

			$scope.pickupLatLong  = '';
        	$scope.dropLatLong    = '';
        	$scope.RTFS_dropLocality   = '';
        	$scope.RTFS_pickupLocality = '';
			
			$scope.myBookType = {description:"Select Booking type"};
			$scope.estimatedFare = '...';
			$scope.$broadcast('ServiceCitySelected',$scope.selectedCityID);						
			$scope.showDrop = true;

			$tfsApi.getCityProductByCityId(city.id, function( products ){
					var newbookType = removeBookType(products);
				  	$scope.bookType = newbookType;
				  	checkPricing();
			});
		};

		/********** to remove outstation, railway transfer, airport transfer(flat) ***********/
		function removeBookType(bookTypeVar)
		{
			var newbookType=[];
			var delElement;
			
		  	angular.forEach(bookTypeVar, function(btype)
		  	{
		  		delElement = false;
		  		var packagePattern = /\d\d?h\d\d\d?km/;
		  		if(btype.bookingType == 'os' || btype.bookingType == 'rt' || btype.bookingType == 'at' || packagePattern.test(btype.bookingType))
		  		{
		  			delElement = true;
		  		}

		  		// Enabling airport transfer flat
		  		/*if($scope.selectedCity == 'Bangalore')
		  		{
		  			if(btype.bookingType == 'at')
		  			{
		  				delElement = true;
		  			}
		  		}*/

		  		if(delElement == false)
		  		{
		  			newbookType.push(btype);
		  		}

		  	});

		  	return newbookType;
		}		


		$scope.bookTypeSelected = function(type){

		    $scope.selectedBookType = type.bookingType; 		    
		    
		    disableLocFields();
		    hideAirport();

		    $scope.direction 			= '';
		    $scope.pickupLocation 		= '';
		    $scope.dropLocation   		= '';		 
		    $scope.pickupLatLong 		= '';
        	$scope.dropLatLong 			= '';
        	$scope.RTFS_dropLocality	= '';
        	$scope.RTFS_pickupLocality 	= '';        	
			$scope.estimatedFare 		= '...';
			$scope.myCar 				= {car_type:"Select Car"};
            
		    $rootScope.$broadcast('modifyBookingData', {'pick': '', 'drop': '', 'direction': ''});		    
		    $scope.$broadcast('setTimeForBookType', [{'booktype': $scope.selectedBookType}]);
		    $scope.removeDropLocation();

		    if(($scope.selectedBookType == 'at')||($scope.selectedBookType == 'at-km')){  	
		    	showFromAirport();
		    	$rootScope.$broadcast('modifyBookingData', {'direction': 2});
		    	$scope.fare_type = ($scope.selectedBookType == 'at' ? 1 : 2);
		    	$scope.$broadcast('LoadAirportLocations',{'cityID':$scope.selectedCityID});
		    }
		    else{
		    	hideAirport();
		    }
		    checkPricing();
		};


		$scope.removeDropLocation = function()
		{

			$scope.showDrop = true;

		    if($scope.selectedCity == 'Ahmedabad')
		    {
		    	if($scope.selectedBookType == '3h30km' || $scope.selectedBookType == '4h40km' || $scope.selectedBookType == '6h60km' || $scope.selectedBookType == '8h80km' || $scope.selectedBookType == '3h120km')
		    	{
		    		$scope.showDrop = false;
		    	}
		    }
		    if($scope.selectedCity == 'Baroda')
		    {
		    	if($scope.selectedBookType == '2h20km' || $scope.selectedBookType == '4h40km' || $scope.selectedBookType == '8h80km' || $scope.selectedBookType == '3h120km' || $scope.selectedBookType == '12h120km')
		    	{
		    		$scope.showDrop = false;
		    	}
		    }

		    if($scope.selectedCity == 'Bangalore')
		    {
		    	if($scope.selectedBookType == '4h40km' || $scope.selectedBookType == '8h80km')
		    	{
		    		$scope.showDrop = false;
		    	}
		    }
		}


		$scope.$on('LocationChanged', function(event, data){
			$scope.pickupLocation = data[0].pic;
			$scope.pickupLatLong  = data[0].picLatLong;
			$scope.dropLocation   = data[0].drop;
			$scope.dropLatLong    = data[0].dropLatLong;
			
			$rootScope.$broadcast('PickupLocationChanged', [{"location" : $scope.pickupLocation, 'locationLatLong':$scope.pickupLatLong,'modify':false}]);			
			$rootScope.$broadcast('DropLocationChanged', [{"location" : $scope.dropLocation, 'locationLatLong':$scope.dropLatLong,'modify':false}]);
			//checkPricing();
		});


		$scope.$on('PickupLocationChanged', function(event, data){

			console.log("Got PickupLocationChanged Message",data);
			if(data[0].location == ''){
				return;
			}

			$scope.pickupLocation = data[0].location  ? data[0].location : $scope.pickupLocation;
			$scope.pickupLatLong = data[0].locationLatLong  ? data[0].locationLatLong : $scope.pickupLatLong;

			if(data[0].direction)
				$scope.direction = data[0].direction;

			if(!$scope.selectedCity)
				return;

			//console.log('The direction at pick :', $scope.direction);
			//console.log('Pick up lat long :', $scope.pickupLatLong);
			//console.log('Pick up data :', data);

			var pickData = {
						'url':'/api/consumer-app/is_in_city_mobile/',
			            'remote_host':'RTFS_URL',
						'latitude' :$scope.pickupLatLong.lat,
			            'longitude':$scope.pickupLatLong.lng,
			            'corporate_id': localStorageService.get('corp-id')
		            };

			var picLocValidResource = ValidateLocation.getResource();
			picLocValidResource.save(pickData,function success(response){

			if(response.status == 'error' && response.error_code == 400){
		   		//console.log('Pickup validation api error response :', response.error_desc);
		   		$rootScope.$broadcast('LogoutThisUser',{});
		   		return;
		   	}

		   	if(Object.getOwnPropertyNames(response.response_data).length === 0){
	  			console.warn("/api/consumer-app/is_in_city_mobile/ locality validation API returned empty Object");
	  			return;
			}
			
			var resObj = response.response_data.response_data;
			
			if(resObj.city == null || resObj.locality == null){
				alert("Our service is not available in this locality");
				$rootScope.$broadcast('modifyBookingData', {'pick': '', 'direction': ''});
				scope.pickupLocation = '';
				return;
			}
			else if(resObj.locality){			
				$scope.RTFS_pickupLocality = resObj.locality;				
				isPickupLocationValid = true;
			}
		},
			function error(){});
			
			if(!data[0].modify)
				checkPricing();

		});
		


		$scope.$on('DropLocationChanged', function(event,data){

			console.log("Got DropupLocationChanged Message",data);
			if(data[0].location == ''){
				return;
			}

			$scope.dropLocation = data[0].location ?  data[0].location : $scope.dropLocation;
			$scope.dropLatLong = data[0].locationLatLong ?  data[0].locationLatLong : $scope.dropLatLong;

			if(data[0].direction)
				$scope.direction = data[0].direction;

			if(!$scope.selectedCity)
				return;

			//console.log('The direction at drop :', $scope.direction);
			//console.log('Drop  lat long :', $scope.dropLatLong);
			//console.log('Drop Data :', data);

			var dropDdata = {
						'url':'/api/consumer-app/is_in_city_mobile/',
		                'remote_host':'RTFS_URL',
						'latitude' :$scope.dropLatLong.lat,
			            'longitude':$scope.dropLatLong.lng,
			            'corporate_id': localStorageService.get('corp-id')//$scope.CorpID
		            };

			var dropLocValidResource = ValidateLocation.getResource();
			dropLocValidResource.save(dropDdata,function(response){

				if(response.status == 'error' && response.error_code == 400){
			   		//console.log('getcites got error response :', response.error_desc);
			   		$rootScope.$broadcast('LogoutThisUser',{});
			   		return;
		   		}
	   			
	   			if(isEmpty(response.response_data) && response.status == 'success'){
	   				console.log('We are sorry, please try after some time');
	   			}

	   			if(Object.getOwnPropertyNames(response.response_data).length === 0){
		  			console.warn("/api/consumer-app/is_in_city_mobile/ locality validation API returned empty Object");
		  			return;
				}

				var resObj = response.response_data.response_data;									

				if(resObj.city == null || resObj.locality == null){
					alert("Our service is not available in this locality.");
					$rootScope.$broadcast('modifyBookingData', {'drop': '', 'direction': ''});
					scope.dropLocation = '';
					return;
				}
				else if(resObj.locality){
					$scope.RTFS_dropLocality = resObj.locality;					
 					isDropLocationValid = true;
 				}
			},
			function error(){});	
				
			if(!data[0].modify)
				checkPricing();
		});


		var isEmpty = function(obj) {
		  for (var key in obj)
		    if(obj.hasOwnProperty(key))
		      return false;
		  return true;
		}


		$scope.$on('AirportLocationChanged',function(event,data){			
			//direction 2= from airport			
			$scope.direction = data.direction;			
			$scope.airportLocation = data.airportDetails.name;
			$scope.airportLatLong.lat = data.airportDetails.latitude;
			$scope.airportLatLong.lng = data.airportDetails.longitude;
		});


		$scope.pickupDate;
		$rootScope.$on('picupDateChanged', function(event,data){
			var pDate = ( $filter('date')(data, 'dd/MM/yyyy'));
			//console.log(pDate);
			$scope.pickupDate = pDate;
			checkPricing();
		});

		$scope.pickupTime;
		$scope.$on('picupTimeChanged', function(event,data){
            var pTime = ( $filter('date')(data, 'HH:mm:ss'));
            //console.log(pTime);
			$scope.pickupTime = pTime;
            checkPricing();
		});

		$scope.carTypeChanged = function(car){
		    
		    $scope.selectedCarType = car.car_type;			
		    $scope.extra_km_fare= car.extra_km_fare;
		    $scope.base_km= car.base_km;
		    $scope.base_fare= car.base_fare;
		    $scope.extra_hour_fare = car.extra_hour_fare ? car.extra_hour_fare : '';
		    $scope.extra_hr_fare = car.extra_hour_fare ? (car.extra_hr_fare ? car.extra_hr_fare : '') : '';   
		    $scope.surcharge = car.surcharge;

		    $scope.traffic_time_pulse_rate = car.traffic_time_pulse_rate;
		    $scope.trip_time_pulse_rate = car.trip_time_pulse_rate;

		    if($scope.selectedCarType && ($scope.selectedBookType == 'p2p' || $scope.selectedBookType == 'at' || $scope.selectedBookType == 'at-km')){
		    	getApproximateTripFare();
		    }
		    else{
		    	$scope.estimatedFare = $scope.base_fare;
		    }

		};

		$scope.guestNameChanged = function(){
				//console.log("guestName :" + $scope.guestName);
		};
		$scope.guestNumberChanged = function(){
				//console.log("guestNumber :" + $scope.guestNumber);
				$('#valNmb').hide();
				if($scope.guestNumber == '' || $scope.guestNumber == null)
				{
					$('#valNmb')
						.show()
						.text('This field is required.');

					return false;
				}

				var phone = $scope.guestNumber;
				var noArr  = phone.split("");	

				if(noArr[0] == '0'){
					$('#valNmb')
						.show()
						.text("Number can't begin with '0'");
					return false;
				}
				
				if($scope.guestNumber.length!=10)
				{
					$('#valNmb')
						.show()
						.text('Please Enter 10 Digits.');

					return false;
				}		

				return true;
		};
		$scope.guestEmailChanged = function(){
				//console.log("guestEmail :" + $scope.guestEmail);
				$('#validateEmail').hide();

				var gEmail  = $scope.guestEmail;				
				var atIdx  = gEmail.indexOf("@");
				var dotIdx = gEmail.lastIndexOf(".");

				if((atIdx < 0 || dotIdx < 0 ||(dotIdx < atIdx)) && gEmail.length != 0){
					$('#validateEmail').show().text("Enter a valid Email addres.");
					return false;
				}
				return true;
		};
		$scope.userInstructionChanged = function(){
				//console.log("user userInstructions :" + $scope.userInstructions);
		};
		$scope.paymodeChanged = function(paymode){
			//console.log("paymentemode changed ");
			//console.log($scope.paymentMode);
		};



		/************************** Booking Modification ************************************/


		$scope.$on('ModifyThisBooking',function(event,data){

			//console.log('Modification Data :', data);
			$scope.disableLocationFields = false;
			//$scope.paymentMode 	= ($scope.paymentType == 3) ? 2 : ($scope.paymentType == 5) ? 4 : $scope.paymentType;
			$scope.paymentMode = data.payment_mode;

			$scope.action = 'modify';
        	$scope.booking_id = data.booking_id;

        	if(data.booking_type == 'at'){
        		if(data.is_airport_km){
     				data.booking_type+='-km';
     			}
        	}       	

        	//console.log('The Booking type in modigy:', data.booking_type);
			setCity(data.city, data.booking_type, data); 

			if(data.direction == 2)
				showFromAirport();
			else if(data.direction == 1)
				showToAirport();
			else
				hideAirport();

			$scope.guestName   = data.customer_name;
			$scope.guestNumber = data.customer_number;
			$scope.guestEmail  = data.customer_email;
			$scope.pickupTime  = ($filter('date')(data.pickup_datetime, 'HH:mm:ss'));
			/*console.log("inside ModifyThisBooking fun for MD");*/
			$rootScope.$broadcast('modifyBookingData', {'datetime':data.pickup_datetime, 'dtime':data.pickup_time, 'ddate':data.pickup_date});			

		});


		function setCity(city, bookType, data){
			/*console.log("in Setcity ------------------");*/
		    for(var i=0; i < $scope.cities.length; i++){
		         if($scope.cities[i].name == city){
                    $scope.myCity = $scope.cities[i];                    
                    $scope.selectedCity = $scope.myCity.name;
                    $scope.selectedCityID = $scope.myCity.id;
                    $scope.$broadcast('ServiceCitySelected',$scope.selectedCityID);
                    //$scope.citySelected($scope.myCity);
                    fetchBookType(bookType, data);
                    break;
		         }
		    }
		}

		function fetchBookType(bookType, data){
        	$tfsApi.getCityProductByCityId($scope.selectedCityID, function( products ){
					var newbookType = removeBookType(products);
				  	$scope.bookType = newbookType;
				  	setBookType(bookType, data);
			});
		}


		function setBookType(bookType,data){
			
		    for(var i=0; i< $scope.bookType.length; i++){
                if($scope.bookType[i].bookingType == bookType){
                    $scope.myBookType = $scope.bookType[i];                       
                    $scope.selectedBookType = $scope.bookType[i].bookingType;
                    break;
                }
            }

            $scope.removeDropLocation();

            if($scope.selectedBookType == 'at' || $scope.selectedBookType == 'at-km'){        

		    	$scope.fare_type = ($scope.selectedBookType == 'at' ? 1 : 2);
            	var aName = (data.direction == 2 ? data.pickup_area : data.drop_area);          			
				$scope.$broadcast('LoadAirportLocations',{'cityID':$scope.selectedCityID,'direction':data.direction, 'name':aName});

				/*console.log("inside setBookType fun for MD");*/

				if(data.direction == 2)
					$rootScope.$broadcast('modifyBookingData', {'drop':data.drop_address});
				else if(data.direction == 1)
					$rootScope.$broadcast('modifyBookingData', {'pick': data.pickup_address});
            }
            else{
            	/*console.log("inside setBookType  fun else part for MD");*/
            	$rootScope.$broadcast('modifyBookingData', {'pick': data.pickup_address, 'drop':data.drop_address});
            }

            fetchCarType(data);            
		}


		function fetchCarType(data){
		    //console.log('Came to fetch Car Type');
		    //console.log($scope.fareData);
		    var carType;

            if(data.car == 'Tata Indica'){
                if(data.car_with_ac == true){
                    carType = data.car+' AC';
                }
                else{
                    carType = data.car+' Non-AC';
                }
            }
            else{
                carType = data.car;
            }
            //console.log(carType);

		    if($scope.fareData && $scope.fareData.length >0 && false){

                setCarType(carType);
		    }
		    else{
		    	var bType = data.booking_type;
		    	var fType = '';
		    	
		    	if(data.city == "Bangalore" && (data.booking_type == 'at-km' || data.booking_type == 'at')){		    		
		    		if(data.booking_type == 'at-km')
		    			fType = 'km';

        			bType = 'at';
		    	}


		        var pricingData = {
		        	'url':'/ajax_views/tariff-v2-json/',
                    'remote_host':'RTFS_URL',
                    'city': $scope.selectedCity,
                    'drop_area':data.drop_area,
                    'pickup_time':$scope.pickupTime,
                    'pickup_area':data.pickup_area,
                    'pickup_date':$scope.pickupDate,
                    'booking_type':data.booking_type,  
                    'normalTrip':0,
                    'corporate_id':$scope.CorpID
                };

                 if(fType == 'km')
                 	pricingData.fare_type = fType;
                
                //console.log('Pricing Data @ Edit :', pricingData);
                
                var pricingResource1 = GetPricingData.getPricingResource(pricingData);
                pricingResource1.get(function(response){

                  	if(Object.getOwnPropertyNames(response.response_data).length === 0){
			  			console.warn("Pricing API in modify returned empty Object");
					}
					else{
	                     $scope.fareData =  response.response_data.response_data.fare_obj;
	                     setCarType(carType);
                 	}
                });
		    }

		}

		function setCarType(carType){
		    //console.log('Came Here Setting CarType from modification>>', carType);
			for(var i=0; i<$scope.fareData.length; i++){			
				if($scope.fareData[i].car_type == carType){					
					$scope.myCar = $scope.fareData[i];			
					$scope.carTypeChanged($scope.myCar);	
					//console.log($scope.myCar);				
					break;
				}
		    }
		}



		/************* EstimateFare API CALL ***************/

		function getApproximateTripFare(){

			var estFareData;
			//console.log('Fetching Fare data');

			if($scope.selectedBookType && $scope.selectedCity && $scope.selectedCarType && ($scope.dropLocation||!$scope.showDrop) && ($scope.pickupLocation || $scope.airportLocation)){

                estFareData = {
                    		'city': $scope.selectedCity,
                    		'drop_area': $scope.RTFS_dropLocality,
                    		'pickup_area':($scope.RTFS_pickupLocality != '' ? $scope.RTFS_pickupLocality : $scope.airportLocation),
                    		'booking_type':$scope.selectedBookType,
                    		'car_type':$scope.selectedCarType,
                    		'corporate_id':localStorageService.get('corp-id')
		                 };

		        console.log('The estimated Fare Data :', estFareData);		        

                var fareResource = GetEstimatedFare.getResource(estFareData);
                fareResource.get(function(response){

                	//console.log('Estimated fare API Response :', response);
                	if(response.status == 'error' && response.error_code == 400){				   		
				   		$rootScope.$broadcast('LogoutThisUser',{});
				   		return;
		   			}
		   			if(Object.getOwnPropertyNames(response.response_data).length === 0){
			  			console.warn("GetEstimatedFare API in returned empty Object");
					}
					else{
	                    var fare = response.response_data.estimated_fare;
	                    $scope.estimatedFare = (fare != "" || fare != undefined || fare != null) ? fare :$scope.base_fare;
	                }
                });

            }
            else{
                   //console.log("All Required Vars for estimated fare not present");
                   //console.log(estFareData);
                }

		}



		/* --------------- Pricing API call -------------------- */
        function checkPricing(){

        	var pricingData;
        	var fType = '';
        	var bType = $scope.selectedBookType;

            if($scope.pickupTime && $scope.pickupDate && $scope.selectedBookType && $scope.selectedCity && ($scope.dropLocation||!$scope.showDrop) && ($scope.pickupLocation || $scope.airportLocation)){
				$('#carType .loader').show();
				
		    	if($scope.selectedCity == "Bangalore" && ($scope.selectedBookType == 'at-km' || $scope.selectedBookType == 'at')){		    		
		    		if($scope.selectedBookType == 'at-km')
		    			fType = 'km';
        			bType = 'at';
		    	}

            	//var fType = (($scope.selectedBookType == 'at' || $scope.selectedBookType == 'at-km') ? 'km' : '');
            	//console.log("The Fare Type :", fType);

                pricingData = {
                	'url'			:'/ajax_views/tariff-v2-json/',
                    'remote_host'	:'RTFS_URL',
                    'city'			:$scope.selectedCity,
                    'drop_area'		:$scope.dropLocation,
                    'pickup_time'	:$scope.pickupTime,
                    'pickup_area'	:($scope.pickupLocation ? $scope.pickupLocation : $scope.airportLocation),
                    'pickup_date'	:$scope.pickupDate,
                    'booking_type'	:bType,
                    'normalTrip'	:0,
                    'corporate_id'	:$scope.CorpID
                 };

                 if(fType == 'km')
                 	pricingData.fare_type = fType;

                //console.log('The Pricing Data :',pricingData);                 

                var pricingResource = GetPricingData.getPricingResource(pricingData);
                pricingResource.get(function(response){
					$scope.myCar = {car_type:"Select Car"};
					$scope.estimatedFare = '...';

                	$('#carType .loader').hide();
                	
                	if(Object.getOwnPropertyNames(response.response_data).length === 0){
			  			console.warn("Pricing API in returned empty Object");
			  			return;
					}
					
                    if($scope.direction == 2 && $scope.selectedCityID == 1)
                    	$scope.fareData = response.response_data.response_data.fare_obj_from;
                    else
                    	$scope.fareData =  response.response_data.response_data.fare_obj;
                  
                   //console.log("The fareDataVar :", $scope.fareData);
	                   /*This is to remove duplicate car types*/
	                   /*var fareDataVar = $scope.fareData;
	                   console.log("The fareDataVar :", fareDataVar);
	                    angular.forEach(fareDataVar, function(fdata, key){
					  		for(i = key+1; i < fareDataVar.length; i++){
					  			if(fareDataVar[i].car_type == fdata.car_type){
					  				fareDataVar.splice(i, 1);
					  			}
					  		}
					  	});
					  	$scope.fareData = fareDataVar;
					  	console.log("scope.fareData after modification :", $scope.fareData);*/

					  	if($scope.selectedCarType != ''){
					  		for(var a=0; a<=$scope.fareData.length; a++){				  			
					  			if($scope.fareData[a].car_type == $scope.selectedCarType){
					  				$scope.carTypeChanged($scope.fareData[a]);
					  				console.log("inside checkPricing selectedCarType not null check");
					  			}
					  			break;	
					  		}
					  	} 


                });

            }
            else{
                   //console.log("All Required Vars not present for Pricing API :", pricingData);   
                }

        }


        
        function clearBookingData(){

        	$scope.booking_id 			= '';        	
        	$scope.guestName 			= '';
        	$scope.guestNumber 			= '';
        	$scope.guestEmail 			= '';    		
			$scope.userInstructions 	= '';        	
        	$scope.pickupLocation 		= '';
        	$scope.dropLocation 		= '';
        	$scope.direction 			= '';
        	$scope.pickupLatLong 		= '';
        	$scope.dropLatLong 			= '';
        	$scope.RTFS_dropLocality	= '';
        	$scope.RTFS_pickupLocality 	= '';
        	$scope.selectedCarType 		= '';
        	$scope.selectedBookType 	= '';        	
        	$scope.selectedCity 		= '';
        	$scope.selectedCityID 		= '';
		    $scope.extra_km_fare 		= '';
		    $scope.base_km 				= '';
		    $scope.base_fare 			= '';
		    $scope.extra_hour_fare 		= '';
		    $scope.extra_hr_fare 		= '';
		    $scope.surcharge			= 0;
		    $scope.userInstructions 	= '';
		    $scope.fare_type 			= '';
		    $scope.action 				= 'new';
		    $scope.paymentMode 			= ($scope.paymentType == 3 || $scope.paymentType == 2) ? 3 : ($scope.paymentType == 1) ? 4 : ($scope.paymentType == 4 || $scope.paymentType == 5) ? 5 : $scope.paymentType;
        	$scope.estimatedFare 		= '...';
        	$scope.myCity 				= {name:"Select City"};
        	$scope.myBookType 			= {description:"Select Booking type"};
        	$scope.myCar 				= {car_type:"Select Car"};

        	$scope.trip_time_pulse_rate = '';
        	$scope.traffic_time_pulse_rate = '';


        	disableLocFields();
        	
		    $rootScope.$broadcast('modifyBookingData', {'pick': '', 'drop':''});
        	$scope.$broadcast('setmyTime', {'mytime':''});
        	$scope.$broadcast('setmyDate', {'mydate':''});

        	//console.log("Payment mode",$scope.paymentMode);       	

		    hideAirport();
        }
        

        function performSanityCheck(){

        	var missingData;
        	var sanityChekClear = false;
        	var guestNoValidataion = $scope.guestNumberChanged();
        	var guestEmailValidataion = $scope.guestEmailChanged();
        	       	
        	if(!$scope.selectedCity)
        		missingData = 'Please Select City';
        	else if(!$scope.selectedBookType)
        		missingData = 'Please Select bookType';
        	else if(!$scope.guestName || $scope.guestName == '')
        		missingData = 'Please Provide Guest Name';
        	else if(!$scope.guestEmail || $scope.guestEmail == '')
        		missingData = 'Please provide Guest Email';
        	else if(!$scope.guestNumber || $scope.guestNumber == '')
        		missingData = 'Please Provide Guest Contact Number';
        	else if(!$scope.selectedCarType)          	      		
        		missingData = 'Please Select Car Type';
        	else if(!isPickupLocationValid )
        		missingData = 'Pick Location should be withing the selected City.';
        	else if($scope.showDrop && !isDropLocationValid)
        		missingData = 'Drop Location should be withing the selected City.';
        	else if($scope.pickupLocation == '')
        		missingData = "Please Enter Pick Up Location.";
        	else if($scope.showDrop && $scope.dropLocation == '')
        		missingData = "Please Enter Drop Location.";
        	else if($scope.pickupLocation == $scope.dropLocation)
        		missingData = "Pickup and Drop Location can not be same.";
        	else
        		sanityChekClear = true;

        	if($scope.selectedCarType == undefined || $scope.myCar.car_type == "Select Car"){
        		sanityChekClear = false;
        		missingData = 'Please Select Car Type';
        	}
        	if($scope.selectedBookType == undefined){
        		sanityChekClear = false;
        		missingData = 'Please Select Book Type';
        	}
        	if($scope.selectedCity == undefined){
        		sanityChekClear = false;
        		missingData = 'Please Select City';
        	}
        	if($scope.paymentType == undefined || $scope.paymentMode == undefined){
        		sanityChekClear = false;
        		missingData = 'Please Choose Payment Type';
        	}
        	if(guestNoValidataion == false){
				alert('Please Enter valid Phone Number');
				return false;
			}
			if(guestEmailValidataion == false){
				alert('Please Enter valid Email Address');
				return false;
			}

        	if(!sanityChekClear)
        		alert(missingData);

        	return sanityChekClear;
        }

        function performBalanceCheck (argument) {

        	/*RTFS Payment mode
			3:prepaid
			4:cash
			5:credit*/
			
			if($scope.paymentMode == 5)
				availableBalance = availableBalance * -1; 

			console.log("Inside balanceCheck:", prepaidBalance, cData.overDraftLimit, upcomingBookingsAmount, $scope.estimatedFare);
			var availableBalance = (prepaidBalance + cData.overDraftLimit) - upcomingBookingsAmount;
			
			if($scope.estimatedFare == "..." || !$scope.estimatedFare)
			{
				$scope.estimatedFare = 0;
			}
			if(availableBalance > $scope.estimatedFare || $scope.paymentMode == 4)
				return true;
			else{
				var bookingdata = {'reason': "Insufficient Balance!! Please make sure you have sufficent Balance to make Bookings." };
            	$rootScope.$broadcast('BookingFailed', {'bookingdata': bookingdata});
				return false;
			}				

        }

       
/*-------------------------- Confirm Booking ------------------------*/

		$scope.confirmBooking = function(){	
			
			var validation = $("#newForm").valid();
			
			if(validation == false){
				alert('Please Provide All Information.');
				return false;
			}
		
			var sanityCheck = performSanityCheck();
			if(!sanityCheck){
				return;
			}

			var balanceCheck = performBalanceCheck();
			if(!balanceCheck){
				return;
			}

			var bType = $scope.selectedBookType;
			if($scope.selectedCity == "Bangalore" && ($scope.selectedBookType == 'at-km' || $scope.selectedBookType == 'at')){			
        		bType = 'at';
		    }

			
			var data = {
			           'url':'/answer-call/medusa_book_for_later/',
                       'remote_host': 'RTFS_URL',
                       'channel': 'online',
                       'source':'corporate',
                       'booking_id': $scope.booking_id,
                       'action': $scope.action,
                       'city':$scope.selectedCity,
                       'booking_type':bType,
                       'customer_name':$scope.guestName,
                       'customer_number':$scope.guestNumber,
                       'customer_email':$scope.guestEmail,
                       
                       'pickup_area':$scope.RTFS_pickupLocality,
                       'pickup_address':$scope.pickupLocation,
                       'pickup_latitude':$scope.pickupLatLong.lat,
                       'pickup_longitude':$scope.pickupLatLong.lng,
                       'pickup_time':$scope.pickupTime,
                       'pickup_date':$scope.pickupDate,                       
                       'drop_area':$scope.RTFS_dropLocality,
                       'drop_address':$scope.dropLocation,
                       'drop_latitude':$scope.dropLatLong.lat,
                       'drop_longitude':$scope.dropLatLong.lng,

                       'car_type':$scope.selectedCarType,
                       'direction':($scope.direction == 1 ? 'to' :'from'),
                       'fare_type':$scope.fare_type,
                       'extra_km_fare':$scope.extra_km_fare,
                       'base_km':$scope.base_km,
                       'base_fare':$scope.base_fare,
                       'extra_hour_fare':$scope.extra_hour_fare,
                       'extra_hr_fare':$scope.extra_hour_fare,
                       'surcharge':$scope.surcharge,
                       
                       'traffic_time_pulse_rate':$scope.traffic_time_pulse_rate,
                       'trip_time_pulse_rate':$scope.trip_time_pulse_rate,

                       'userInstructions': $scope.userInstructions,
                       'payment_mode':$scope.paymentMode,
                       'corporate_id':$scope.CorpID
                       };

             if($scope.selectedCityID == 1 && $scope.selectedBookType == 'at')
             	data.fare = $scope.base_fare;

            data.pickup_address = encodeURIComponent(data.pickup_address);	
			data.drop_address = encodeURIComponent(data.drop_address);
			data.pickup_area  = encodeURIComponent(data.pickup_area);
			data.drop_area    = encodeURIComponent(data.drop_area);

            //console.log(data);
            /*if( data.city == 'Delhi'){
            	alert("Sorry! Dear customer, we are currently undergoing a system upgrade due to which your booking could not be confirmed. Please try after some time. We apologize for the inconvenience.");
            	return false;
            }*/

			$('#newForm .spin').show();

            var myRes = $resource("/api/generic_request/",{});
            
            myRes.save(data, function success(response){
		  		var resData = response.response_data || {};
		  			$('#newForm .spin').hide();
		  			var rtfsData = resData.response_data || {},
		  				bookid = rtfsData.booking_id,
						stat = rtfsData.status_message;
                    if(resData.status == 'success' && bookid) {
                    	$rootScope.$emit('RefreshViewBookings',{});
                    	$rootScope.$emit('RefreshCurrentTripsCount',{});

						if(stat=='' && rtfsData.booking_confirmed == true){
							stat = 'Confirmed';
						}
						
						$rootScope.$broadcast('BookingSuccessful', {
							'bookingdata': {
								'booking_id': bookid,
			                    'pickupLocation':$scope.pickupLocation,
			                    'dropLocation':$scope.dropLocation,
			                    'pickuptime':$scope.pickupDate+', '+$scope.pickupTime,
			                    'status': stat,
			                    'action':$scope.action,
			                    'showDrop':$scope.showDrop
							}
						});
                        clearBookingData();
                    } else {
                        var reason = 'Booking Failed. Please Try After Some Time.';
                        if(resData.error_code == 201) {
                        	reason = resData.error_desc;
                        }
                        $rootScope.$broadcast('BookingFailed', {'bookingdata': {'reason': reason }});                        
                    }
               },
               function error(){}
            );
		};

		$scope.createNewBooking = function(){
			clearBookingData();
		};


	}]);