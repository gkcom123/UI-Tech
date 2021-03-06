'use strict';
angular.module('corporateApp')
	.directive('tfsTpls', function(){
        return {
          	restrict: 'EA',
          	templateUrl:  Helper.viewPath + 'shared/templates.html?v=' + Helper.version
        }
     })
	.directive('tfsHeader', function(){
	    return {
			restrict: 'EA',
			replace: true,
			templateUrl:  'tfs-header.html'
	    }
	})
	.directive('tfsLoginHeader', function(){
	    return {
			restrict: 'EA',
			replace: true,
			templateUrl:  'tfs-logged-header.html'
	    }
	 })
	.directive('tfsFooter', function(){
	    return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'tfs-footer.html'
	    }
	})
	.directive('tfsTnc', function(){
		return {
			restrict: 'EA',
			replace: true,
			templateUrl:  Helper.viewPath + 'shared/tnc-partial.html?v=' + Helper.version
		}
	})
	.directive('spinner', function() {
		  return {
		    link: function(scope, elem, attr) {
		    	elem
		    		.addClass('rel')
		    		.append('<div class="spin" style="display:none;"><span class="spinIcon"></span></div>');
		    }
		  };
	})
	.directive('tfsFares', function(){
		return {
			restrict: 'EA',
			replace: true,
			templateUrl:  Helper.viewPath + 'shared/fares.html?v=' + Helper.version
		}
	});