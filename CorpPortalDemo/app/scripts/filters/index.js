'use strict';
angular.module('corporateApp')
	.filter('daterangeFilter', function(){
		return function(conversations, start_date, end_date ){
			var result = [];
	 		start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) : 0;
			end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : new Date().getTime();
	 
			if (conversations && conversations.length > 0){
				$.each(conversations, function (index, conversation){
					var conversationDate = new Date(conversation.date_posted);
					if (conversationDate >= start_date && conversationDate <= end_date){
						result.push(conversation);
					}
				});
				return result;
			}
		};
	});