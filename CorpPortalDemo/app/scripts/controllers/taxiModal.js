'use strict';

angular.module('corporateApp')
	.controller('ConfirmModalDemoCtrl', [
		'$scope',
		'$modal',
		function ($scope, $modal) {
			$scope.bookingdata = null;
			$scope.$on('BookingSuccessful', function(event, data){
				$scope.bookingdata = data.bookingdata;
				$scope.open('lg');
			});

			$scope.open = function( size ) {
				$modal.open({
				  	templateUrl: 'confirmContent.html',
				  	controller: function ($scope, $resource, $modalInstance, items) {
				    	$scope.bookingdata = null;      
      					$scope.bookingdata = items;      
      					$scope.ok = function () {
    	  					$modalInstance.dismiss('cancel');  
    	  					$scope.bookingdata = null;
      					};
    				},
				  	size: size,
				  	resolve: {
				      	items: function () {
				      		return $scope.bookingdata;
				    	}
				  	}
				});
			};
    }])
	.controller('FailedModalDemoCtrl', [
		'$scope',
		'$modal',
		function ( $scope, $modal ) {
			$scope.$on('BookingFailed', function(event, data){
				$scope.bookingfaileddata = data.bookingdata;
				$scope.open('sm');
			})

	      	$scope.open = function( size ) {
	        	$modal.open({
	          		templateUrl: 'failedContent.html',
	          		controller: function ($scope, $resource, $modalInstance, items) {
						$scope.bookingdata = items;
						$scope.ok = function () {
							$modalInstance.dismiss('cancel');    	  
						};
		      		},
	          		size: size,
	          		resolve: {
	              		items: function () {
	              			return $scope.bookingfaileddata;
            			}
	      			}
	        });
      };
    }])
    .controller('ModalDemoCtrl', function ($scope, $modal) {
		$scope.open = function (size) {
			var modalInstance = $modal.open({
	          	templateUrl: 'myModalContent.html',
	          	controller:  function ($scope, $resource, $modalInstance, items, localStorageService) {
					  $scope.ok = function () {
						  $('#resetErrorMsg').html('');
						  var isFormValid = $("#resetPwd").valid();
						  		$('#resetErrorMsg').hide();

								$scope.oldPwd = $('#oldPwd').val();
								$scope.newPwd = $('#newPwd').val();
								$scope.cfmPwd = $('#cfmPwd').val();
								$scope.username = $('#corpName').val();

					  			var data = {
					                  'username': localStorageService.get('username'),
					                  'old_password': $scope.oldPwd,
					                  'new_password': $scope.newPwd,
					                  'corporate_id': localStorageService.get('corp-id')
					          	};

						  if( isFormValid ) {
							  if($scope.newPwd != $scope.cfmPwd){
					    		  $('#resetErrorMsg')
					    		  	.html('New and confirm password should be same')
					    		  	.show();

					    		  return false;
					    	  }
								$('#resetPwd .spin').show();
							var myRes = $resource("/api/change-pwd/",{});
					          myRes.save(data, function success(response){
					              	var resData = response.response_data || {},
					                  	queryStatus = resData.status;
					                 	 
					                  if(queryStatus == 'success'){
					                	  alert("Password Changed Successfully !");
					                	  $modalInstance.close();
					                  }else{
					                      alert("Old password is wrong !");
					                  }
					             	  $('#resetPwd .spin').hide();
					             },
					             function error(){
					             		$('#resetPwd .spin').hide();
					             });
						  } else {
							  return false;
						  }
					  };

					  $scope.cancel = function () {
					    	$modalInstance.dismiss('cancel');
					  };
				},
	          	size: size,
	          	resolve: {
			    	items: function () {
		              	return $scope.items;
		            }
	          	}
	        });
      };
    });