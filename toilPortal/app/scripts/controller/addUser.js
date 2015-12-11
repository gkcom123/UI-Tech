/**
 * Created by gunjan.kumar on 10/1/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addUserController', [
        '$scope',
        '$state',
        '$rootScope',
        '$location',
        'GetUserList',
        'AddUser',
        function( $scope, $state,$rootScope, $location, GetUserList,AddUser){

            var userList 	= {};
            var userId = $rootScope.userId;
            var pageNo 				= 1;
            var paginationCount		= 4 ;

            $scope.Users 		= {};
            function loadUsers(){

               // $('.viewBookingWap .spin').show();
                //$scope.radioModel = 'Left';
                //$scope.showFilters = false;;
                if(!userId)
                {
                    return;
                }
                var userListResource = GetUserList.getResource(userId, pageNo, paginationCount);

                userListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }

                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("Get User API returned empty Object");
                    }
                    else{
                        userList = response.response_data.results;
                        $scope.Users.data = response.response_data.results;
                    }
                });
            }
            $scope.addUserClick = function()
            {
                $scope.addUserFlag = true;
            }
            $scope.createNewUser = function()
            {
                var validation = $("#addUserForm").valid();
                if(validation==false)
                {
                    alert('Please provide all information.');
                    return false;
                }
                var data ={
                    'firstName': $scope.firstName,
                    'lastName': $scope.lastName,
                    'emailid':$scope.emailid,
                    'company':$scope.company,
                    'phoneNumber':$scope.phoneNumber,
                    'user_id':userId
                }
               // console.log("Data is here -->"+data["firstName"]);
                var addUserRes = AddUser.getResource();
                addUserRes.save(data, function success(response){
                        var resData = response.response_data || {};
                       // $('#newForm .spin').hide();

                        if(response.status == 'success') {
                            alert("User Added Successfully");
                            $scope.addUserFlag = false;
                            loadUsers();
/*
                            $rootScope.$emit('RefreshViewBookings',{});
                            $rootScope.$emit('RefreshCurrentTripsCount',{});

                            if(stat=='' && rtfsData.booking_confirmed == true){
                                stat = 'Confirmed';
                            }
*/

                           /* $rootScope.$broadcast('BookingSuccessful', {
                                'bookingdata': {
                                    'booking_id': bookid,
                                    'pickupLocation':$scope.pickupLocation,
                                    'dropLocation':$scope.dropLocation,
                                    'pickuptime':$scope.pickupDate+', '+$scope.pickupTime,
                                    'status': stat,
                                    'action':$scope.action,
                                    'showDrop':$scope.showDrop
                                }
                            });*/
                            //clearBookingData();
                        } else {
                            var reason = 'User Creation Failed. Please Try After Some Time.';
                            if(resData.error_code == 201) {
                                reason = resData.error_desc;
                            }
                           // $rootScope.$broadcast('BookingFailed', {'bookingdata': {'reason': reason }});
                        }
                    },
                    function error(){}
                );


            }
            loadUsers();
        }]);
