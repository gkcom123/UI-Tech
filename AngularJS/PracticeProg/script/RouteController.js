/**
 * Created by gunjan on 11-Nov-14.
 */
'use strict';
var aMailServices = angular.module('Amail',['ngRoute']);
function emailRouteConfig($routeProvider) {
    $routeProvider.
        when('/', {
            controller: ListController,
            templateUrl: 'list.html'
        }).
        when('/view/:id', {
            controller: DetailController,
            templateUrl: 'detail.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}
aMailServices.config(emailRouteConfig);


var messages=[{
    id:0,sender:'gunjan@tfs.com',subject:'kufadgkfgksdgfsdkgfkj',date:'Dec 7 ,2013',
    recipients:['abc@a.com'],message:'Hi'},
    {
        id:1,sender:'gunjan@tfs.com',subject:'kufadgkfgksdgfsdkgfkj',date:'Dec 8,2013',
        recipients:['abc@a.com'],message:'Hi 2'},
    {
        id:2,sender:'gunjan@tfs.com',subject:'kufadgkfgksdgfsdkgfkj',date:'Dec 9 ,2013',
        recipients:['abc@a.com'],message:'Hi 3'}
];

function ListController($scope)
{
    $scope.messages = messages;

}
function DetailController($scope,$routeParams)
{
    $scope.message = messages[$routeParams.id]

}



