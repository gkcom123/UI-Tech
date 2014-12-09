/**
 * Created by gunjan on 08-Nov-14.
 */
function DeathrayMenuController($scope)
{
    $scope.isDisabled = false;
    $scope.stun = function()
    {
        $scope.isDisabled = true;
    };
}
function HeaderController($scope) {
    $scope.isError = false;
    $scope.isWarning = false;
    $scope.showError = function () {
        $scope.messageText = 'This is an Error';
        $scope.isError = true;
        $scope.isWarning = false;
    };
    $scope.showWarning = function () {
        $scope.messageText = 'Just a warning, Please carry on .';
        $scope.isError = false;
        $scope.isWarning = true;
    };
}
function RestTableController($scope) {
    $scope.directory = [{name:'The handsome Heifer',cuisine:'BBQ'},
        {name:'Green S Green',cuisine:'Salads'},
        {name:'House of Fine Fish',cuisine:'Seafood'}];
    $scope.selectRestaurant = function(row)
    {
        $scope.selectedRow = row;
    };
}
