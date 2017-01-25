app.factory('authFactory', function () {
  return {
    login (email, password) {
      firebase.auth().signInWIthEmailandPassword(email, password)
    }
  }
    // getUserId() {
    //   return firebase.auth().currentUser.uid
    // }
  return {
    register (email, password) {
      firebase.auth().createUserWithEmailAndPassword(password, email)
    }
  }
})
