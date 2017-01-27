app.factory('createPinsFactory', function($http) {
  return {
    postPin: function (data) {
      console.log('hey')
      return $http
        .post('https://pinterestleathergophers.firebaseio.com/pins.json', data)

      }
  }
})
