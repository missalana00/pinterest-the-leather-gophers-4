app.controller("SecondCtrl", function($scope) {
  console.log("SecondCtrl")

  $scope.loginButton = function (e) {
    console.log(e.path[2].children[0].children.email.value)
    console.log(e.path[2].children[1].children.password.value)
  }

})
