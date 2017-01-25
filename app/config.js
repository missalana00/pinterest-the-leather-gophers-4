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


  $routeProvider
    .when("/", {
      controller: "FirstCtrl",
      templateUrl: "app/partials/firstpartial.html",
    })
    .when("/login", {
      controller: "SecondCtrl",
      templateUrl: "app/partials/secondpartial.html",
    })
    .when("/profile", {
      controller: "ThirdCtrl",
      templateUrl: "app/partials/thirdpartial.html",
    })
    .otherwise({
      redirectTo: "/"
    });
});
