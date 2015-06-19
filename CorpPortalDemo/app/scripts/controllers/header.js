'use strict';
angular.module('corporateApp')
	.controller('headerController', ['$rootScope','$scope','$location','localStorageService','$state','$resource',function ($rootScope,$scope,$location,localStorageService,$state,$resource) {
		$scope.page = $state.current;
		$scope.corpID = localStorageService.get('corp-id');

		$("#resetPwd").validate({
			rules: {
				oldPwd: {
					required: true
			    },
			    newPwd: {
			    	required: true
			    },
			    cfmPwd: {
			    	required: true
			    }
			}
		});

		$scope.report = function(){
			$state.go('report');
		};

		$scope.logOut = function(){	
			$state.go('home');		
        	$rootScope.$broadcast('LogoutThisUser',{});
        };       

        $scope.$on('LogoutThisUser', function(event, data){
        	
	       	$rootScope.$emit('StopIntervalsMessage',{});        	
        	var logoutRes = $resource("/api/logout/",{'corporate_id':localStorageService.get('corp-id')}); 
        		logoutRes.get(function(response){
            	//console.log('Logout response :',response);
        	});

       		localStorageService.remove('corp-id');
        	localStorageService.clearAll();
        	$state.go('home');
        });	

        $scope.goToInvoicePage = function(){
        	$state.go('invoice');
        }
	}])
	.controller('DropdownCtrl', ['$rootScope','$scope','localStorageService',function($rootScope,$scope,localStorageService){
		$scope.corpData = localStorageService.get('corp-details');
		$rootScope.$on('corpDetails',function(event, data){			
			$scope.corpData = data;
		});
    }]); 