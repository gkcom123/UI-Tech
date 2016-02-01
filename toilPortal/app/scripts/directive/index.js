'use strict';
angular.module('toilApp')
	.directive('toilTpls', function () {
		return {
			restrict: 'EA',
			templateUrl: Helper.viewPath + 'shared/templates.html?v=' + Helper.version
		}
	})
	.directive('toilHeader', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'toil-header.html'
		}
	})
	.directive('toilLeftBar', function () {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'toil-leftBar.html'
		}
	})
