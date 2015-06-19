'use strict';
angular.module('corporateApp')
	.controller('trackTaxiGmapController',[
        '$scope',
        '$rootScope',
        'TrackTaxiService',
        function( $scope, $rootScope, TrackTaxiService ){
            
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(21.0000, 78.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP//TERRAIN
    }   

    $scope.map          = new google.maps.Map(document.getElementById('trackTaxiMap'), mapOptions);
    var trafficLayer    = new google.maps.TrafficLayer();
    trafficLayer.setMap($scope.map);
    var infoWindow      = new google.maps.InfoWindow();
    $scope.markers      = []; 
    var onBoard         = [];
    var diriverAssigned = [];
    
    //$scope.onBoardCustomers = TrackTaxiService.getCustomersOnBoard();
    function onBoardDataFunc(){        
    
        var data = TrackTaxiService.getCustomersOnBoard();
        if(data){
            
                onBoard = data.customer_on_board;
                diriverAssigned = data.driver_tracking;        
                $scope.onBoardCustomers = onBoard;        
        }
    }
    onBoardDataFunc();

    $scope.$on('FetchCustomers', function(event, data){
        console.log('fetch costomers in gmap view controller', data);
        if(data){

                redrawGmap();

                onBoard             = data.customer_on_board;
                diriverAssigned     = data.driver_tracking;
                var selectedBooking = TrackTaxiService.getSelectedBooking();
                
                if(TrackTaxiService.getTaxiType() == 'ONBOARD'){
                    $scope.onBoardCustomers = onBoard; 
                    for(var i=0; i<$scope.onBoardCustomers.length; i++){
                        //console.log('the onboard Cust:', $scope.onBoardCustomers[i].booking_id)
                        if(selectedBooking && ($scope.onBoardCustomers[i].booking_id == selectedBooking.booking_id)){
                            $rootScope.$broadcast('ShowCustomerCar', selectedBooking);
                        }
                        else
                            generateMarkers()
                    }

                }
                else if(TrackTaxiService.getTaxiType() == 'DRIVER_ASSIGNED'){
                    $scope.onBoardCustomers = diriverAssigned;
                    //console.log('the Dirver assigned Cust:', $scope.onBoardCustomers[i].booking_id)
                    for(var i=0; i<$scope.onBoardCustomers.length; i++){
                        if(selectedBooking && ($scope.onBoardCustomers[i].booking_id == selectedBooking.booking_id)){
                            $rootScope.$broadcast('ShowCustomerCar', selectedBooking);
                        }
                        else
                            generateMarkers()
                    }
                }        

        }
    });

    $scope.openInfoWindow = function(e, selectedMarker){    
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }    

    var createMarker = function (info){        
        //console.log("creaing markers");
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            bookingID: info.booking_id,
            icon : new google.maps.MarkerImage(
                'http://cdn1.taxiforsure.com/v2/img/corp/car.png',
                new google.maps.Size( 36, 60 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 18, 0 ))
        });

        marker.content = '<div class="infoWindowContent"> Driver :' + info.driver_name +  '<br/> Car No :'+ info.vehicle_number + '<br/> Ph No :'+  info.driver_number +

                        '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h6>' + info.customer_name + '</h6>' + marker.content);
            infoWindow.open($scope.map, marker);
        });        

        $scope.markers.push(marker);   
        console.log($scope.markers);     
    }

    function generateMarkers(){

        $scope.markers = [];
        console.log($scope.onBoardCustomers);

        if(!$scope.onBoardCustomers || !$scope.onBoardCustomers.length || $scope.onBoardCustomers.length <= 0){
            redrawGmap();
        }
        else{
            
            for (var i = 0; i < $scope.onBoardCustomers.length; i++){            
                if($scope.onBoardCustomers[i].latitude != null && $scope.onBoardCustomers[i].longitude != null)
                    createMarker($scope.onBoardCustomers[i]);
                else
                    console.log("null lat long");
            }
        }        
    }
    generateMarkers();


    $scope.$on('ShowCustomerCar',function(event, data){
        console.log("data in show cutomer car :",data, $scope.onBoardCustomers.length);

        if(!$scope.onBoardCustomers.length || $scope.onBoardCustomers.length <= 0 )
            return;

        mapOptions.zoom = 16;
        mapOptions.center =  new google.maps.LatLng(data.latitude, data.longitude);
        $scope.map = new google.maps.Map(document.getElementById('trackTaxiMap'), mapOptions);
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap($scope.map);
        
        generateMarkers();

        for(var i=0; i<$scope.onBoardCustomers.length;i++){
            if($scope.markers[i].bookingID == data.booking_id){
                $scope.openInfoWindow(event, $scope.markers[i]);
                break;
            }
        }

    });

    $scope.$on('ShowOnBoardCustomersMessage', function(event, data){
        console.log(" got ShowOnBoardCustomersMessage ");
        redrawGmap();

        $scope.onBoardCustomers = onBoard;        
        generateMarkers();                
            
    });

    $scope.$on('ShowDirverAssignedMessage', function(event, data){        
        redrawGmap();        
        $scope.onBoardCustomers = diriverAssigned;
        generateMarkers();            
    });

    function redrawGmap(){
        var mapOptions1 = {
                zoom: 4,
                center: new google.maps.LatLng(21.0000, 78.0000),
                mapTypeId: google.maps.MapTypeId.ROADMAP//TERRAIN
            }
        
        $scope.map = new google.maps.Map(document.getElementById('trackTaxiMap'), mapOptions1);
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap($scope.map);        
    }

}]);