'use strict';
angular.module('corporateApp')
.factory('$transactionAPI', function($resource,localStorageService){

	var oThis = this, request, data = {};

	var transactinAPIs = {

		GetTransactionReport : function(fromDate, tillDate, id, callbackFn){
			callbackFn = callbackFn || $.noop;
			request = $resource("api/getCorporateTransaction");
            data = {
                    'url':'/api/settlement/getCorporateTransaction',
				 	'corporateId': id,
				 	'corporate_id': id,
				 	'fromDate': fromDate,
				 	'tillDate': tillDate,
				 	'remote_host':'_URL'
            	};

            request.get(data, function success( res ){
                    if( res['status'] == 'success' ){
                    	console.log('get transactioon report response :',res);
                    	callbackFn(res.response_data);
                    }
                    }, function error(){
                      console.warn('getCorporateTransaction api error');
            		});

		}
		,DownloadPDFReport : function(fromDate, tillDate, id, callbackFn){

			callbackFn = callbackFn || $.noop;
			request = $resource("api/download_report/");
            data = {
                    'url':'/settlements/api/settlement/downloadCorporateTxnHistoryPDF',
				 	'corporate_id': id,
				 	'fromDate': fromDate,
				 	'tillDate': tillDate,
				 	'remote_host':'SETTLEMENT_URL'
            	};

            request.get(data, function success( res ){
                    if( res['status'] == 'success' ){
                    	callbackFn(res.response_data);
                    }
                    }, function error(){
                      console.warn('getCorporateTransaction api error');
            		});
		}
		,DownloadExcelReport : function(fromDate, tillDate, id, callbackFn){

			callbackFn = callbackFn || $.noop;
			request = $resource("api/download_report/");
            data = {
                    'url':'/settlements/api/settlement/downloadCorporateTxnHistoryXL',
				 	'corporate_id': id,
				 	'fromDate': fromDate,
				 	'tillDate': tillDate,
				 	'remote_host':'SETTLEMENT_URL'
            	};

            request.get(data, function success( res ){
                    if( res['status'] == 'success' ){
                    	callbackFn(res.response_data);
                    }
                    }, function error(){
                      console.warn('getCorporateTransaction api error');
            		});
		}
	}

	return transactinAPIs;
});
