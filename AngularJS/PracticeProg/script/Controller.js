/**
 * Created by gunjan on 06-Nov-14.
 */
function HelloController($scope)
{
    $scope.greeting = {text:'Hello'};
}

function WatchController($scope)
{
    $scope.youCheckedIt = true;
}
function StartupController($scope)
{
    $scope.funding = {startingEstimate:0};
    $scope.computeNeeded = function()
    {
        $scope.funding.needed= $scope.funding.startingEstimate*10;
    };
   // $scope.$watch('funding.startingEstimate',computeNeeded);
}

function SecStartupController($scope) {
    $scope.computeNeeded = function () {
        $scope.needed = $scope.startingEstimate * 10;
    };
    $scope.requestFunding = function () {
        window.alert("Sorry, please get more customer first");
    };
    $scope.reset = function () {
        $scope.startingEstimate = 0;
    };
    $scope.$watch("startingEstimate",function(newValue, oldValue) {
            $scope.needed = $scope.startingEstimate * 10;
    });
}x
function MyCtrl($scope) {
    $scope.name = "";
    $scope.$watch("name", function(newValue, oldValue) {
        if ($scope.name.length > 0) {
            $scope.greeting = "Greetings " + $scope.name;
        }
    });
}