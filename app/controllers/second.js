

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
      //if error, tells user error via toast
      toastFactory.toastMaker(e.message, "top right")
    })

  }

  $scope.registerButton = function (e, p) {

    var email = e
    var password = p
    console.log(e)
    console.log(p)

    authFactory.register(email, password)
    .then(()=>{
      //if user successfully registers, redirects to homepage
      $location.url("/")
    })
    .catch((e)=>{
      //if error, tells user error
      toastFactory.toastMaker(e.message, "top right")
    })//end of catch

  } //registerButton

  $scope.login = function () {

    var provider = new firebase.auth.GithubAuthProvider();


    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      console.log("token", token);
      // The signed-in user info.
      var user = result.user;
      console.log("user", user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log("errorCode", errorCode);
      var errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log("email", email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("credential", credential);
      // ...
    });
  }

}) //SecondCtrl
