app.config(($routeProvider, $locationProvider, $mdIconProvider) => {

  $mdIconProvider.fontSet('md', 'material-icons');

  $locationProvider.hashPrefix("");

  // configuring firebase authorization
  firebase.initializeApp({
      apiKey: "AIzaSyAayV7lNC2ShpCmg7Ac4XUvoNMKaB5QlB0",
      authDomain: "pinterestleathergophers.firebaseapp.com",
      databaseURL: "https://pinterestleathergophers.firebaseio.com",
      storageBucket: "pinterestleathergophers.appspot.com",
      messagingSenderId: "652624294234"
    });


  const showHideLogout = {
    showHideLogout: function() {
       const authReady = firebase.auth().onAuthStateChanged(user => {
         authReady()
           if (!user) {
             $('.logoutButton').addClass('ng-hide')
           } else if (user) {
             $('.logoutButton').removeClass("ng-hide")
           }

      }) //authReady

    }
  } //checkForAuth


  $routeProvider
    .when("/", {
      controller: "FirstCtrl",
      templateUrl: "app/partials/firstpartial.html",
      resolve: showHideLogout
    })
    .when("/login", {
      controller: "SecondCtrl",
      templateUrl: "app/partials/secondpartial.html",
      resolve: showHideLogout
    })
    .when("/profile", {
      controller: "ThirdCtrl",
      templateUrl: "app/partials/thirdpartial.html",
      resolve: showHideLogout
    })
    .when("/boards/:boardName", {
      controller: "FourthCtrl",
      templateUrl: "app/partials/fourthpartial.html",
      resolve: showHideLogout
    })
    .otherwise({
      redirectTo: "/"
    });
});
