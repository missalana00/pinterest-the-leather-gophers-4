app.config(($routeProvider, $locationProvider) => {
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
    .otherwise({
      redirectTo: "/"
    });
});