'use strict';
angular.module('corporateApp')
 	.factory('GetPricingData', function($resource){		    
		return {
	        getPricingResource: function(data){
	            return $resource('api/generic_request/', data)
	        }
	    }
	})
	.factory('GetBookType', function($resource){
    	return {
        	getResource: function(id, corp_id) {
                return $resource('api/generic_request/',{'url':'/TFS-API-0.0.1-SNAPSHOT/v1/entities/geo/cities/'+id+'/products','remote_host':'CITY_MODEL', 'corporate_id': corp_id});
            }
        }
    })
	.factory('GetAirPortLocation', function($resource){
    	return {
            getResource: function(id, corp_id) {
                return $resource('api/generic_request/',{'url':'/TFS-API-0.0.1-SNAPSHOT/v1/entities/geo/cities/'+id+'/airports','remote_host':'CITY_MODEL', 'corporate_id': corp_id});
            }
        }
    })
    .factory('GetUpcomingBookings',function($resource){
		return {
		    getResource: function(id,pageNo,paginationCount){     
		        return $resource('api/generic_request/', {
	    			'url':'/answer-call/v2/get_corporate_upcoming_bookings_json/', 
					 'corporate_id': id, 
					 'page_number' : pageNo,
					 'pagination_count' : paginationCount,
					 'remote_host' :'RTFS_URL'
				});
	    	}
		}
	})
	.factory('GetPastBookings', function($resource){        
        return {
            getResource: function(id,pageNo,paginationCount){
            	var data = {
            			'url':'/answer-call/v2/get_corporate_past_bookings_json/', 
						 'corporate_id': id, 
						 'page_number' : pageNo,
						 'pagination_count' : paginationCount,
						 'remote_host':'RTFS_URL'
					}		        
		        return $resource('api/generic_request/', data);
	    	}
		}
	})
	.factory('GetBookingCount',function($resource){		
		return {
		    getResource: function(id){		        
		        return $resource('api/generic_request/',{'url':'/answer-call/get_corporate_booking_counts_json/', 'corporate_id':id, 'remote_host':'RTFS_URL'});
	    	}
		}
	})
	.factory('GetPrepaidBalance',function($resource){
		return {
		    getResource: function(id){		        
		        return $resource('api/get-prepaid-amount/',{'corporate_id': id});
	    	}
		}
	})
	.factory('GetTotalCurrentTripFare',function($resource){
		return {
			getResource: function(id){
				return $resource('api/generic_request/',{'url':'answer-call/get_upcoming_bookings_estimated_fare/','corporate_id': id, 'remote_host':'RTFS_URL'});
			}
		}
	})
	.factory('GetEstimatedFare', function($resource){		
		return {
		    getResource: function(data){
		        return $resource('api/generic_request/', {
		    		'url':'/answer-call/get_estimated_fare/',
				    'remote_host':'RTFS_URL',
				    'city':data.city,
					'pickup_area':data.pickup_area,
					'drop_area':data.drop_area,
                	'booking_type':data.booking_type,
					'car_type':data.car_type,
					'corporate_id':data.corporate_id
				});
	    	}
	    }
	})
	.factory('customerOnBoard', function($resource){
		return {
			getResource: function(id){
				return $resource('api/generic_request/',{	
					'url':'/answer-call/get_corporate_running_bookings_json/',
				 	'corporate_id': id, 
				 	'remote_host':'RTFS_URL'
				});				
			}
		}
	})
	.factory('CancelThisBooking', function($resource){
	    return {
		    getResource: function(){		        
				return $resource('api/generic_request/',{})
	    	}
		}
	})
	.factory('ViewBillFactory', function($resource){
	    return {
		    getResource: function(id){
				return $resource('api/generic_request/',{})
	    	}
		}
	})
	.factory('ValidateLocation', function($resource){
	    return {
		    getResource: function(){		        
				return $resource('api/generic_request/',{});
	    	}
		}
	})
	.factory('GetCorporateReceipts', function($resource){
		return {
			getResource: function(fromDate, tillDate, id){		
				return $resource('api/generic_request/',{	
					'url':'/settlements/api/settlement/getCorporateRecipts/',
				 	'corporateId': id,
				 	'corporate_id': id, 
				 	'fromDate': fromDate,
				 	'tillDate': tillDate,
				 	'remote_host':'SETTLEMENT_URL'
				});		
			}
		}
	})
	.factory('GetCorporateInvoices', function($resource){
		return {
			getResource: function(fromDate, tillDate, id){				
				return $resource('api/generic_request/', {	
					'url':'/settlements/api/settlement/getCorporateInvoice',
				 	'corporateId': id, 
				 	'corporate_id': id,
				 	'fromDate' 	 : fromDate,
				 	'tillDate'	 : tillDate,
				 	'remote_host':'SETTLEMENT_URL'
				});
			}
		}
	})
	.factory('DownloadInvoice', function($resource){
		return {
			getResource: function(invoiceNumber,id){
				return $resource('api/download_file/', {	
					'url':'/settlements/api/settlement/getDownloadInvoice',
					'corporate_id': id, 
				 	'invoiceNumber': invoiceNumber,														 	
				 	'remote_host':'SETTLEMENT_URL'
				});				
			}
		}
	})
	.factory('DownloadReceipt', function($resource){
		return {
			getResource: function(receiptNumber,id){
				return $resource('api/download_file/',{	
					'url':'/settlements/api/settlement/getDownloadRecipts',
					'corporate_id': id, 
				 	'receiptNumber': receiptNumber,														 															 	
				 	'remote_host':'SETTLEMENT_URL'
				});				

			}
		}
	})	
;