'use strict';
angular.module('corporateApp')
	.controller('invoiceAndReceiptController',[
		'$scope',
		'$state',
		'$rootScope',
		'GetCorporateReceipts',
		'GetCorporateInvoices',
		'DownloadInvoice',
		'DownloadReceipt',
		'localStorageService',
		'$window',
		function($scope,$state,$rootScope,GetCorporateReceipts,GetCorporateInvoices,DownloadInvoice,DownloadReceipt,localStorageService,$window){

		var corpID = localStorageService.get('corp-id');
		var corpDetails = localStorageService.get('corp-details');

		$scope.invoices = [];
		$scope.receipts = [];
		$scope.fromDate = '';
		$scope.tillDate = '';
		//$scope.disableDownloadButton = true;

		if(corpDetails.paymentType == 4 || corpDetails.paymentType == 5)
			$scope.showInvoiceNo = true;
		else
			$scope.showInvoiceNo = false;
      $scope.showInvoiceNo = true;
			/*$scope.dates2 = { startDate: moment('2013-09-20'), endDate: moment('2013-09-25') };
			$scope.dates3 = { startDate: moment(), endDate: moment().add(1, 'day') };
			$scope.dates4 = { startDate: moment().subtract(1, 'day'), endDate: moment().subtract(1, 'day') };
			$scope.ranges = {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
				'Last 7 days': [moment().subtract('days', 7), moment()],
				'Last 30 days': [moment().subtract('days', 30), moment()],
				'This month': [moment().startOf('month'), moment().endOf('month')]
			};*/

		function onload(){
			$scope.invoiceModel = 'Left';
			$scope.showReceipts = false;
			$scope.fromDate = moment().subtract(90,'days').format('YYYY-MM-DD');//myDate.format('YYYY-MM-DD');
			$scope.tillDate = moment().format('YYYY-MM-DD');
			$scope.dates1 	= { startDate: moment($scope.fromDate), endDate: moment($scope.tillDate)};
			$scope.maxDate1  = moment().format('YYYY-MM-DD');
		}
		onload();

		$scope.$on('DateRangePickerValueChangedMessage', function(event, data){

			console.log('Inside Invoice and receipts');
			 $scope.invoices = [];
			 $scope.receipts = [];

			 if($scope.invoiceModel == 'Left')
			 	$scope.showAllInvoices();
			 else
			 	$scope.showAllReceipts();
		});

		$scope.showAllInvoices = function(){
			$scope.invoiceModel = 'Left';
			$scope.showReceipts = false;

			$scope.fromDate = $scope.dates1.startDate.format('YYYY-MM-DD');
			$scope.tillDate = $scope.dates1.endDate.format('YYYY-MM-DD');

			var getInvoicesResource = GetCorporateInvoices.getResource($scope.fromDate, $scope.tillDate, localStorageService.get('corp-id'));
			getInvoicesResource.get(function(response){
				console.log("the invoce response :", response);
				if(response.status == 'error' && response.error_code == 400){
					   		$rootScope.$broadcast('LogoutThisUser',{});
					   		return;
					}

					if(Object.getOwnPropertyNames(response.response_data).length === 0){
	  					console.warn("GetCorporateInvoices API returned empty Object");
					}
					else{
						$scope.invoices= response.response_data;
					}
			})
		};
		$scope.showAllInvoices();

		$scope.showAllReceipts = function(){
			$scope.invoiceModel = 'Right';
			$scope.showReceipts = true;

			$scope.fromDate = $scope.dates1.startDate.format('YYYY-MM-DD');
			$scope.tillDate = $scope.dates1.endDate.format('YYYY-MM-DD');

			//$scope.receipts = [{"id":20,"corporateId":55,"paymentForDb":1,"paymentTypeDb":6,"amount":15707.29,"paymentDate":"2014-11-12 00:00:00.0","valueDate":"2014-11-12 00:00:00.0","referenceNumber":"REF90","createdAt":"2014-11-07 00:00:00.0","createdBy":198,"receiptNumber":"TFSDEL-2014-10-31.pdf","fileName":"vijaygl-2014-11-13.pdf","purposePiad":"Prepaid Deposite"},{"id":21,"corporateId":55,"paymentForDb":1,"paymentTypeDb":1,"amount":1556.11,"paymentDate":"2014-11-13 00:00:00.0","valueDate":"2014-11-13 00:00:00.0","referenceNumber":"1234567890","createdAt":"2014-11-13 00:00:00.0","createdBy":1371,"receiptNumber":"TFSDEL-2014-10-30.pdf","purposePiad":"Prepaid Deposite"}];

			var getReceiptsResource = GetCorporateReceipts.getResource($scope.fromDate, $scope.tillDate, localStorageService.get('corp-id'));
			getReceiptsResource.get(function(response){
				console.warn("the Receipts response :", response);
				if(response.status == 'error' && response.error_code == 400){
					   		$rootScope.$broadcast('LogoutThisUser',{});
					   		return;
					}
					if(Object.getOwnPropertyNames(response.response_data).length === 0){
	  					console.warn("GetCorporateReceipts API returned empty Object");
					}
					else{
						$scope.receipts = response.response_data;
					}
			})
		};

		$scope.downloadPdf = function(){

			var items = ($scope.invoiceModel == 'Right' ? $scope.selectedReceipts.Ids : $scope.selectedInvoices.Ids);
			//var items = {'TFSDEL-2014-10-31.pdf':true}
			var selectedItems ='';

			for (var key in items){
				if(items[key])
					selectedItems += key + ',';
			}

			if(selectedItems.lastIndexOf(',') == selectedItems.length -1)
					selectedItems = selectedItems.substring(0, selectedItems.length - 1);

			var downloadResource = ($scope.invoiceModel == 'Left' ? DownloadInvoice.getResource(selectedItems,localStorageService.get('corp-id'))
																    :DownloadReceipt.getResource(selectedItems,localStorageService.get('corp-id')));

			downloadResource.get(function(response){
				console.log("invoice pdf response :", response);
				if(Object.getOwnPropertyNames(response.response_data).length === 0){
	  				console.warn("GetCorporateReceipts API returned empty Object");
				}
				else{
					$window.location.href = response.response_data.download_link;
				}
			})
		}


		/************ Check Box Related *************/
		$scope.selectedInvoices = {
			Ids:{ }
		};

	    $scope.checkAllInvoices;
	    $scope.checkAllInvoicesFun = function(){
	    	for (var i=0; i<$scope.invoices.length; i++){
	    		$scope.selectedInvoices.Ids[$scope.invoices[i].invoiceNumber] = $scope.checkAllInvoices;
	    	}
	    	$scope.invoiceSelectionChanged();
	    }

	    $scope.invoiceSelectionChanged = function(){
	    	console.log("invoiceSelectionChanged ---");
	    	for (var i=0; i<$scope.invoices.length; i++){
	    		if($scope.selectedInvoices.Ids[$scope.invoices[i].invoiceNumber]){
	    			$scope.disableDownloadButton = false;
	    			break;
	    		}
	    		else{
	    			//$scope.disableDownloadButton = true;
	    		}
	    	}
	    }


	    $scope.selectedReceipts = {
			Ids:{ }
		};

	    $scope.checkAllReceipts;
	    $scope.checkAllReceiptsFun = function(){
	    	for (var i=0; i<$scope.receipts.length; i++){
	    		$scope.selectedReceipts.Ids[$scope.receipts[i].receiptNumber] = $scope.checkAllReceipts;
	    	}
	    	$scope.receiptSelectionChanged();
	    }

	    $scope.receiptSelectionChanged = function(){
	    	console.log("receiptSelectionChanged --");
			for (var i=0; i<$scope.receipts.length; i++){
	    			if($scope.selectedReceipts.Ids[$scope.receipts[i].receiptNumber]){
	    				$scope.disableDownloadButton = false;
	    				break;
	    			}
	    			else{
	    				//$scope.disableDownloadButton = true;
	    			}
	    	}

	    }
}]);
