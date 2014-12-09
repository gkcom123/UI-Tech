/**
 * Created by gunjan on 08-Nov-14.
 */
function NavController($scope)
{
    $scope.doSomething = function()
    {
        window.alert("i am in NavController");
    };
}
function ContentAreaController($scope)
{
    $scope.doSomething = function()
    {
        window.alert("i am in ContentAreaController");
    };
}