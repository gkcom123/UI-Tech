/**
 * Created by gunjan on 08-Nov-14.
 */
var studentList = [{name:'Gunjan Kumar',id:'1'},
    {name:'Gunjan Kumar2',id:'2'},
    {name:'Gunjan Kumar3',id:'3'}];


function StudentListCntrl($scope)
{
    $scope.students = studentList;
    $scope.insertTOm= function()
    {
        $scope.students.splice(1,0,{name:'Shilpa',id:'5'});
    }
}

function ShowHideCntrl($scope)
{
    $scope.menuState = {show:false};

    $scope.toggleMenu = function()
    {
        $scope.menuState.show = !$scope.menuState.show;
    };
}