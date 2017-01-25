app.config(($routeProvider, $locationProvider, $mdIconProvider) => {

  $mdIconProvider.fontSet('md', 'material-icons');

  $locationProvider.hashPrefix("");

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
    .when("/boards/:boardName", {
      controller: "FourthCtrl",
      templateUrl: "app/partials/fourthpartial.html"
    })
    .otherwise({
      redirectTo: "/"
    });
});
