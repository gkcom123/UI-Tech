'using strict';
angular.module('corporateApp')
	.controller('transactionHistoryController',[
				'$scope',
				'$state',
				'$window',
				'localStorageService',
				'$transactionAPI',
				function($scope,$state,$window,localStorageService,$transactionAPI){

					function onload(){

						$scope.startingBalance = 0;
						$scope.closingBalance  = 0;
						$scope.transactions = [];
						$scope.disableDownloadButton = true;

						$scope.fromDate = moment().subtract(90,'days').format('YYYY-MM-DD');//myDate.format('YYYY-MM-DD');
						$scope.tillDate = moment().format('YYYY-MM-DD');
						$scope.dates1 	= { startDate: moment($scope.fromDate), endDate: moment($scope.tillDate)};
						$scope.maxDate1  = moment().format('YYYY-MM-DD');
						$scope.limit = "90 days";
					}
					onload();

					$scope.$on('DateRangePickerValueChangedMessage', function(event, data){
						//showReports();
					});

					$scope.search =  function(){
						showReports();
					};

					var showReports = function(){

						$scope.startingBalance = 0;
						$scope.closingBalance  = 0;
						$scope.fromDate = $scope.dates1.startDate.format('YYYY-MM-DD');
						$scope.tillDate = $scope.dates1.endDate.format('YYYY-MM-DD');
						$scope.showMsg= false;
						$scope.transactions = [];

						//$scope.transactions = [{"id":671,"transactionValue":333.72,"corporateId":133,"transactionType":"Credit","postTransactionBalance":-333.72,
						// "transactionDateTime":"2014-12-08 06:49:41.0","transactionDescription":"Deducted : TFS-PP-C4863583","tdsValue":0.0,"createdBy":133,
						// "transactionId":" TFS-PP-C4863583"},
						// {"id":672,"transactionValue":926.66,"corporateId":133,"transactionType":"DEBIT","postTransactionBalance":-1260.38,
						// "transactionDateTime":"2014-12-08 06:54:16.0","transactionDescription":"Deducted : TFS-AT-C4863588","tdsValue":0.0,"createdBy":133,
						// "transactionId":" TFS-AT-C4863588"},{"id":674,"transactionValue":876.28,"corporateId":133,"transactionType":"DEBIT",
						// "postTransactionBalance":-2136.66,"transactionDateTime":"2014-12-08 07:24:46.0","transactionDescription":"Deducted : TFS-AT-C4863586",
						// "tdsValue":0.0,"createdBy":133,"transactionId":" TFS-AT-C4863586"},{"id":675,"transactionValue":397.74,"corporateId":133,"transactionType":"DEBIT",
						// "postTransactionBalance":-2534.4,"transactionDateTime":"2014-12-08 07:24:55.0","transactionDescription":"Deducted : TFS-PP-C4863584",
						// "tdsValue":0.0,"createdBy":133,"transactionId":" TFS-PP-C4863584"},{"id":676,"transactionValue":236.12,"corporateId":133,"transactionType":"DEBIT",
						// "postTransactionBalance":-2770.52,"transactionDateTime":"2014-12-08 07:40:49.0","transactionDescription":"Deducted : TFS-PP-C4863613","tdsValue":0.0,
						// "createdBy":133,"transactionId":" TFS-PP-C4863613"}];

						$transactionAPI.GetTransactionReport($scope.fromDate, $scope.tillDate, localStorageService.get('corp-id'),function(response){
							$scope.transactions =  response;

							if($scope.transactions.length > 0){
								$scope.disableDownloadButton = false;
								$scope.startingBalance = $scope.transactions[0].transactionType == "DEBIT" ? $scope.transactions[0].postTransactionBalance + $scope.transactions[0].transactionValue
																										   : $scope.transactions[0].postTransactionBalance - $scope.transactions[0].transactionValue;
								$scope.closingBalance  = $scope.transactions[$scope.transactions.length - 1].postTransactionBalance;
							}
						})




					};

					showReports();

					$scope.downloadPdf = function(){
						$transactionAPI.DownloadPDFReport($scope.fromDate, $scope.tillDate, localStorageService.get('corp-id'), function(response){
							$window.location.href = response.download_link;
						})
					};

					$scope.downloadExcel = function(){
						$transactionAPI.DownloadExcelReport($scope.fromDate, $scope.tillDate, localStorageService.get('corp-id'), function(response){
							$window.location.href = response.download_link;
						})
					};

	}]);
