'use strict';
angular.module('corporateApp')
	.controller('faresController', function ($scope, $resource, $tfsApi) {
    	$scope.tabIndex = 0;
    	$scope.setTabIndex = function( index ){
    		$scope.tabIndex = index;
    	}
        $scope.fareCity = {name:"Bangalore", id:"1"};
		$scope.daynight = 'day';
		$scope.airportPresent = true;

		$tfsApi.getCities(function( cities ){
			$scope.fareCities = cities;	
		});

		var checkForAirpot = function( fares ){
			var at = fares["at"] || [],
				atKm = fares["at-km"] || [],
				airportPresent = at.length + atKm.length;

			if(airportPresent){
				$scope.airportPresent = true;
			}else {
				$scope.airportPresent = false;
				if( $scope.tabIndex == 1){
					$scope.setTabIndex( 0 );
				}
			}
		},
		getFares = function(){
			$tfsApi.getFareInfoById( $scope.fareCity.id, function( fares ){
        		var fares_to,
                	at_to,
                	at_from,
                	fares_from,
                	arr = ['day', 'night'],
                	len = arr.length,
                	time
                	;

                	while( len-- ){
                		time = arr[ len ];
                		fares_to = fares[ time ]['at'];
						fares_from = fares[ time ]['from_at_flat_fares'];
						// modifing at response
						for(at_to in fares_to){
							for(at_from in fares_from){
								if( fares_to[at_to]['car_name'] == fares_from[at_from]['car_name'] ){
									fares_to[at_to]['from_fare'] = fares_from[at_from]['fare'];
									break;
								}
							}
						}

						// modifing at-km response
						fares_to = fares[ time ]['at-km'];
						fares_from = fares[ time ]['from_at_km_fares'];

		                if( fares_from.length ){
		                    for( at_to in fares_to ) {
		                        for( at_from in fares_from ) {
		                            if( fares_to[at_to]['car_name'] == fares_from[at_from]['car_name'] ) {
		                                fares_to[at_to]['from_base_fare'] = fares_from[at_from]['base_fare'];
		                                fares_to[at_to]['from_base_km'] = fares_from[at_from]['base_km'];
		                                fares_to[at_to]['from_extra_km'] = fares_from[at_from]['extra_km_fare'];
		                                break;
		                            }
		                        }
		                    }
		                }else {
		                    for(at_to in fares_to){
	                            fares_to[at_to]['from_base_fare'] = fares_to[at_to]['base_fare'];
	                            fares_to[at_to]['from_base_km'] = fares_to[at_to]['base_km'];
	                            fares_to[at_to]['from_extra_km'] = fares_to[at_to]['extra_km_fare'];
		                    }
		                }
                	}


                $scope.allfares = fares;
				$scope.fares = fares[$scope.daynight];	

				checkForAirpot( $scope.fares );
                for(var i=0; i < $scope.allfares.packages.length; i++){
                	var key = $scope.allfares.packages[i];
                	$scope.fares[key].isOpen = (i==0)
                }
        	});
		}
		getFares(); // initial load

        $scope.citySelected = function(city){
            $scope.fareCity = $.extend(true, {}, city); // do not remove $.extened. its deep copy of city object. used to avoid object pass by ref
            getFares();
        }

        $scope.daynightChange = function(daynight){
        	$scope.daynight = daynight;
        	$scope.fares = $scope.allfares[$scope.daynight];
        	checkForAirpot( $scope.fares );
        	for(var i=0; i < $scope.allfares.packages.length; i++){
            	var key = $scope.allfares.packages[i];
            	$scope.fares[key].isOpen = (i==0)
            }
            $scope.nightBg={'background-color':'#fff'};
            $scope.dayBg={'background-color':'#fff'};

            if (daynight == 'day')
                $scope.dayBg={'background-color':'#f8da15'};
            else
                $scope.nightBg={'background-color':'#f8da15'};
        }
    });