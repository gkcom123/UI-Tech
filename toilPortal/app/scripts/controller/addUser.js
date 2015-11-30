/**
 * Created by gunjan.kumar on 10/1/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addUserController', [
        '$scope',
        '$rootScope',
        '$location',
        'GetUserList',
        function( $scope, $rootScope, $location, GetUserList){

            var userList 	= {};
            var userId = $rootScope.userId;
            var pageNo 				= 1;
            var paginationCount		= 4 ;

            $scope.Users 		= {};
            function loadUsers(){

               // $('.viewBookingWap .spin').show();
                //$scope.radioModel = 'Left';
                //$scope.showFilters = false;;
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
            loadUsers();
        }]);
