'user strict';
angular.module('corporateApp')
	.controller('prepaidController', [
		'$scope',
		'$resource',
		'localStorageService',
		'$tfsApi',
		function( $scope, $resource, localStorageService, $tfsApi ){
			$scope.corpData = localStorageService.get('corp-details') || {};
			var pTypes = Helper.paymentTypes;

			$scope.prepaidState = ( [ pTypes.PREPAID, pTypes.CASHPREPAID ].include( $scope.corpData.paymentType ) ) ? 'enabled' : 'enable';

			if( $scope.prepaidState != 'enabled' ){
				var rules = {
					panNumber: {
						panNumber: true
					}
				},
				ajaxLock = false;

				Helper.requireRule(rules, ['panNumber']);
				var getFiles = function( jInputEl ){
					var files = [];
					if( jInputEl.length ){
						var obj = jInputEl[0].files || {},
							len = obj.length || 0;
						while( len-- ){
							files.push( obj[len] );
						}
					}
					return files;
				},
				uploadFile = function( file, callBack, errorCallack ){
					if(!file){
						return false;
					}
					var fileName = file.name;
					if( (file.type && file.type != 'application/pdf') || !(/.+(.pdf)$/.test( fileName )) ){
						errorCallack && errorCallack("Please upload *.pdf format files only.");
						return false;
					}
					Helper.showMask('#prepaidSubmitFormID');
			        var data = new FormData();
			        data.append('url', '/registration/api/operator/FileUpload/'+fileName+'/');
                    data.append('remote_host', 'REGISTRATION_URL');
			        data.append('file', file);
			        $.ajax({
	                    url : '/api/upload_files',
	                    data : data,
	                    type : 'POST',
	                    contentType: false,
	                    processData : false,
	                    success : function( res ) {
	                    	var res = JSON.parse(res) || {};
	                        if( res.status == "success"){
		                        var fileName = res.response_data.file_name;
		                        fileName = fileName.replace(/"/g, "");
		                        callBack && callBack( fileName );
	                    	}
	                    	Helper.hideMask('#prepaidSubmitFormID');
	                    },
	                	error:function( res ){
	                    	errorCallack && errorCallack("Something went wrong. please try again.");
	                    	Helper.hideMask('#prepaidSubmitFormID');
	                	}
	                });
	                return true;
				},
				formValid = function( data ) {
					var isValid = true;
					if( !data.panCardImageName ){
						$("#panCardImageName-error").html("Please upload *.pdf format files only").show();
						isValid = false;
					}
					if( !data.tanCardImageName ){
						$("#tanCardImageName-error").html("Please upload *.pdf format files only").show();
						isValid = false;
					}
					return isValid;
				},
				getHardCodedData = function( data ){
					var t = {};
					// this method added to handle mandetory field form backend;
					if( !data.countryId ){
						t.countryId = 99 // for india
					}
					if( !data.countryId && !data.stateId ){
						t.stateId = 12 // for karnataka	
					}
					if( !data.pincode ){
						t.pincode = "222222" // dummy
					}
					if( !data.cityName){
						t.cityName = "Bangalore" 
					}
					if( !data.designation ){
						t.designation = 'NA'
					}
					if( !data.orgWebsite ){
						t.orgWebsite = 'NA'
					}
					return t;
				},
				secondaryDocPlaceHolder = 'Select Document name';

				$scope.secondaryDocuments = [{ 
					name: 'Shops and Establishment certificate'
				}, { 
					name: 'Trade licence'
				}, { 
					name: 'Certificate of incorporation'
				}, { 
					name: 'VAT registration certificate'
				}, { 
					name: 'Service tax registration certificate'
				}];

				$scope.secondaryDocument = {
					name: secondaryDocPlaceHolder
				}

				$scope.secondaryDocumentSelected  = $.noop;

				$scope.onPaymentEnableClick = function(){
					var jForm = $("#prepaidSubmitFormID"),
						formData = jForm.serializeObject();

					jForm.find("label.error").hide();
					jForm.validate({
						rules: rules
					});
					if( !ajaxLock && jForm.valid() &&  formValid( formData ) ){
						var data = angular.copy( $scope.corpData );
							data.paymentType = pTypes.CASHPREPAID;

						formData.panNumber = formData.panNumber.toUpperCase();	
						$.extend( data, formData );
						$.extend( data, getHardCodedData(data) ); // remove this once backend handled mandatory params

						Helper.showMask('#prepaidSubmitFormID');
						ajaxLock = true;
						var request = $resource("/api/common_request/");
	                  
	                  	data.url = '/registration/api/corporate/corporateRegistration/';
	                  	data.remote_host = 'REGISTRATION_URL';
	                  
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
					                $tfsApi.updateCorporateDetails( localStorageService.get('corp-id') );
			  						$scope.prepaidState = 'verification';
			  					}
				            }else{
								alert('Something went wrong, please try later');
		          			}
		      				ajaxLock = false;
		      				Helper.hideMask('#prepaidSubmitFormID');
		      			});
					}
				}

				$scope.uploadPrimary = function( files ) {
					if( files instanceof Array && files.length == 0){
						files = getFiles($("#primaryInputId input[type='file']"));
					}
					if( files && files.length ){
						$("#prepaidSubmitFormID label.error").hide();
						uploadFile( files[0], function( fileName ){
							$("#panCardButtonText").html("UPLOADED");
							$("#panCardButtonSuccess").show();
							$("#panCardImageNameId").val( fileName );
						}, function( error ){
							$("#panCardButtonSuccess").hide();
							$("#panCardImageNameId").val();
							$("#panCardImageName-error").html( error ).show();
						});						
					}
				}

				$scope.gotoPrepaidTab = function(){
					$scope.prepaidState = 'enabled';
				}

				$scope.uploadSecondary = function( files ) {
					if( files instanceof Array && files.length == 0){
						files = getFiles($("#secondaryInputId input[type='file']"));
					}
					if(  files && files.length ){
						$("#prepaidSubmitFormID label.error").hide();
						if( secondaryDocPlaceHolder == $scope.secondaryDocument.name){
							 $("#tanCardImageName-error").html("Please select document 2.").show();
						}else {
							uploadFile( files[0], function( fileName ){
								$("#tanCardButtonText").html("UPLOADED");
								$("#tanCardImageNameId").val( fileName );
								$("#tanCardButtonSuccess").show();
							}, function( error ){
								$("#tanCardButtonSuccess").hide();
								$("#tanCardImageNameId").val("");
								$("#tanCardImageName-error").html( error ).show();
							});			
						}
					}
				}
			}
		}
	]);