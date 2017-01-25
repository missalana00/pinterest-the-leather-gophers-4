app.controller("SecondCtrl", function($scope, authFactory) {
  console.log("SecondCtrl")

  $scope.loginButton = function (e) {
    var email = e.path[2].children[0].children.email.value
    var password = e.path[2].children[1].children.password.value

    authFactory.login(email, password)

    // console.log(e.path[2].children[0].children.email.value)
    // console.log(e.path[2].children[1].children.password.value)
  }

  $scope.registerButton = function (e, p) {

    var email = e
    var password = p
    console.log(e)
    console.log(p)


    authFactory.register(email, password)


  }

})
