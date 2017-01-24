app.factory('createPins', function($http) {
  console.log('createPins')
  return {

  }
})


//
// app.factory('myFactory', function($http) {
//   console.log('myFactory')
//
//   return {
//     getList : () => {
//       return $http.get('list.json')
//         .then((val) => {
//           console.log(val.data)
//           return val.data.list
//         })
//     }
//   }
// })



// app.controller('NewCtrl', function ($scope, $http) {
//   console.log('NewCtrl')
//   $http.post(`https://mf-user-notes-daf3d.firebaseio.com/.json`)
//   $scope.test = (e) => {
//     var data = {note: e}
//     console.log(data)
//     $http.post(`https://mf-user-notes-daf3d.firebaseio.com/.json`, data)
//     console.log('hey', e)
//   }
// })


// .factory('weatherFactory', ($http) => {
//       return {
//         getWeather(zipcode) {
//           return $http
//             .get(`http://api.wunderground.com/api/33539797879b6485/conditions/q/${zipcode}.json`)
//             .then((response)=> {
//               console.log(response)
//               return {
//                   temp: response.data.current_observation.temp_f,
//                   city: response.data.current_observation.display_location.full,
//                   icon: response.data.current_observation.icon_url
//               }
//             })
//         }
//       }
//   })
