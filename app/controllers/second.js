app.controller("SecondCtrl", function($scope, authFactory, $location, toastFactory) {
  console.log("SecondCtrl")

  $scope.loginButton = function (e) {
    var email = e.path[2].children[0].children.email.value
    var password = e.path[2].children[1].children.password.value

    authFactory.login(email, password)
    .then(()=>{
      $location.url("/")
    })
    .catch((e)=>{
      //if error, tells user error
      toastFactory.toastMaker(e.message, "top right")
    })

    // console.log(e.path[2].children[0].children.email.value)
    // console.log(e.path[2].children[1].children.password.value)
  }

  $scope.registerButton = function (e, p) {

    var email = e
    var password = p
    console.log(e)
    console.log(p)

    authFactory.register(email, password)
    .then((val)=>{
      console.log(val)
      //if user successfully registers, redirects to homepage
      $location.url("/")
    })
    .catch((e)=>{
      //if error, tells user error
      toastFactory.toastMaker(e.message, "top right")
    })//end of catch


  } //registerButton

}) //SecondCtrl
