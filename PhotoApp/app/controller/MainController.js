/**
 * Created by gunjan.kumar on 10/26/15.
 */
'use strict';
angular.module('photoApp')
    .controller('MainController', ['$scope','photoSearchService',
    function($scope,photoSearchService){
    $scope.photos = [];

    $scope.thumbSize = 'small';

    $scope.setThumbSize = function(size) {
        $scope.thumbSize = size;
    };

    $scope.submitSearch = function() {

        $scope.photos = null;

        var keyword = $scope.searchKeyword;
        photoSearchService.findPhotos(keyword, function(photos) {
            $scope.photos = photos;
        });
    }
}]);
