

app.controller("SecondCtrl", function($scope, authFactory, $location, toastFactory) {

  $scope.loginButton = function (e, p) {
    var email = e
    var password = p

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
      // The signed-in user info.
      var user = result.user;

      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

}) //SecondCtrl
