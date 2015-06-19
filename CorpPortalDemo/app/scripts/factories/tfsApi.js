'use strict';
angular.module('corporateApp')
	.factory('$tfsApi', function( $state, $rootScope, $resource, localStorageService ){
    var oThis = this
        ,request
        ,data = {}
        ;
    oThis.cities = [];
    oThis.cityListById = {};
    oThis.states = [];
    oThis.stateCities = {};
    oThis.fares = {};
    oThis.polygonBounds = {};
    oThis.cityProductList = {};

    var navFns = {
          getCountryId: function(){
              return 99// for india
          }
          // return all states
          ,getStatesByConutryId: function( conutryId, callback ){
              callback = callback || $.noop;
              if( oThis.states.length ){
                  callback( oThis.states );
              }else {
                  request = $resource("/api/common_request/");
                  data = {
                      'url': Helper.remoteUrl + conutryId +'/states/',
                      'remote_host': 'CITY_MODEL'
                  };
                  request.get(data, function success( res ){
                    if( res['status'] == 'success' ){
                        oThis.states = res['response_data'];
                        callback( oThis.states );
                    }
                  }, function error(){
                      console.log('error calling states list api');
                  });
              }
          }
          // return all ity by state id
          ,getAllCityByStateId: function( stateId, callback ){
              callback = callback || $.noop;
              if( oThis.stateCities[ stateId ] ){
                  callback( oThis.stateCities[ stateId ] );
              }else {
                  data = {
                      'url': Helper.remoteUrl + stateId +'/cities/',
                      'remote_host': 'CITY_MODEL'
                  };
                  request = $resource("/api/common_request/");
                  request.get(data, function success( res ){
                    if(res['status'] == 'success'){
                        var cities = res.response_data || [];
                        oThis.stateCities[ stateId ] = cities;
                        callback( oThis.stateCities[ stateId ] );
                    }
                  }, function error(){
                      console.log('error calling citylist by state id api');
                  });
              }
          }
          // return taxiforsure cities
          ,getCities: function( callback ){
              callback = callback || $.noop;
              if( oThis.cities.length ){
                  callback( oThis.cities );
              }else {
                  request = $resource("/api/get-citylist/");
                  request.get(function success( res ){
                    if( res['status'] == 'success' ){
                        var  cities = res['response_data'] || [];
                        oThis.cityListById = {};
                        for(var i =0; i<  cities.length; i++ ){
                             oThis.cityListById[ cities[i].id ] =  cities[i];
                        }
                        oThis.cities = cities;
                        callback( oThis.cities );
                    }
                  }, function error(){
                      console.log('error calling citylist api');
                  });
              }
          }
          // return fare by city id
          ,getFareInfoById: function( id, callback ){
              callback = callback || $.noop;
              if( oThis.fares[id] ){
                  callback( oThis.fares[id] );
              }else {
                  request = $resource("/api/fare-chart/");
                  request.get({'cityid': id}, function success( res ){
                    if(res['status'] == 'success'){
                        oThis.fares[ id ] = res.response_data.response_data;
                        callback( oThis.fares[ id ] );
                    }
                  }, function error(){
                      console.log('error calling citylist api');
                  });
              }
          }
          ,getCityProductByCityId: function( city_id, callback ){
                callback = callback || $.noop;
                if( oThis.cityProductList[ city_id ] ){
                    callback( oThis.cityProductList[ city_id ] );
                }else {
                    request = $resource("/api/common_request/");
                      data = {
                          'url': Helper.remoteUrl +'cities/'+city_id + "/products",
                          'remote_host': 'CITY_MODEL'
                      };
                      request.get(data, function success( res ){ 
                          if( res['status'] == 'success' ){
                                var products = res.response_data || {};
                                if( products[city_id] ){
                                    oThis.cityProductList[ city_id ] = products[city_id];
                                    callback( oThis.cityProductList[ city_id ] );
                                }
                          }
                      }, function error(){
                          console.log('error calling city product list api');
                      });
                }
          }
          ,updateCorporateDetails: function( session_id, callback ){
                callback = callback || $.noop;
                request = $resource('/api/get-corporate-details/',{ 'corporate_id': session_id });
                request.get(function(res){
                    var corpDetails = res.response_data || {};
                    if(corpDetails.id){                      
                      localStorageService.set('corp-details', corpDetails);
                      $rootScope.$emit('corpDetails', corpDetails);
                      callback(corpDetails);
                    }else{
                        console.log('error calling corporate details api');
                    }
                 });
          }
          ,getBoundsByCityId: function( city_id ){
                var cityObj = oThis.cityListById[ city_id ],
                    bounds = oThis.polygonBounds[ city_id ];
                    if( !bounds ){
                         bounds = new google.maps.Circle({
                            center: new google.maps.LatLng( cityObj.latitude, cityObj.longitude )
                            ,radius: 40000
                        }).getBounds();
                    }
                return bounds;
          }
          ,updatePolygonBoundsByCityId: function( city_id, callback ){
                var polygon,
                    i,
                    bounds = [];
                if( !oThis.polygonBounds[city_id] ){ 
                  request = $resource("/api/common_request/");
                  data = {
                      'url': Helper.remoteUrl +'polygon/'+city_id,
                      'remote_host': 'CITY_MODEL'
                  };
                  request.get(data, function success( res ){
                    if( res['status'] == 'success' ){
                        var polygon = res.response_data || [];
                        if( polygon.length ){
                            for( i=0; i < polygon.length; i++){
                                bounds.push( new google.maps.LatLng( polygon[i].latitude, polygon[i].longitude ) );
                            }
                            bounds = new google.maps.Polygon({
                                paths: bounds,
                            }).getBounds();
                        }else {
                            var cityObj = oThis.cityListById[ city_id ];
                            bounds = new google.maps.Circle({
                                center: new google.maps.LatLng( cityObj.latitude, cityObj.longitude )
                                ,radius: 40000
                            }).getBounds();
                        }
                        oThis.polygonBounds[ city_id ] = bounds;
                        callback && callback( city_id, bounds );              
                    }
                  }, function error(){
                      console.log('error calling polygons list api');
                  });
              }
          }
          ,isWithinCity: function(city_id, loc){
              var bounds = navFns.getBoundsByCityId(city_id);
              return bounds.contains(new google.maps.LatLng(loc.lat, loc.lng));
          }
        }

      // all state goto function automatically added. 
      //  for goto home function dynamically added 
      // gotoHome =  function(){
      //    $state.go("home");
      // }
      //

      for(var state in Helper.routes){
          navFns[ "goto" + state.capitalize() ] = (function( st ){
            return function( ){
              $state.go( st );
            }
          })(state)
      }

      return navFns;
});