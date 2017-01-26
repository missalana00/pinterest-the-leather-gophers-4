app.controller("AppCtrl", function($scope, $location) {
  console.log("AppCtrl")



    $scope.currentNavItem = 'page1';
    $scope.open = false;

    var currentUserCheck = firebase.auth().currentUser

    // $scope.showLogout = ()=>{
    //   if (currentUserCheck === null) {
    //     $('.logoutButton').addClass('ng-hide')
    //   } else if (currentUserCheck !== null) {
    //     $('.logoutButton').removeClass("ng-hide")
    //   }
    // }

    $scope.logoutofFirebase = function (e) {
        firebase.auth().signOut()
        $location.url("/#")

    }


});
