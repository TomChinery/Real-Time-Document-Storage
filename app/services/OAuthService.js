var OAuth = angular.module('OAuth', [ 'ngCookies']);

OAuth.factory('OAuth', function ($http, $routeParams, $cookieStore, $location) {
  var api = {
    authURL: authURL,
    auth: auth,
    validAuth: validAuth,
  };

  function authURL() {
    var clientID = "822166841586-0l34mn5s7u7egt6bfc8b740fca5qmq7k.apps.googleusercontent.com";
    var driveScope = "https://www.googleapis.com/auth/drive";
    var redirectURL = "http://goo.gl/B8AYiZ"; // link shortened to localhost
    var responseType = "token";

    var url =
    "https://accounts.google.com/o/oauth2/auth?scope=" + driveScope +
    "&client_id=" + clientID + "&response_type=" + responseType +
    "&redirect_uri=" + redirectURL;

    window.location.replace(url);
  }

  function auth(callback) {
    if ( $routeParams.access_token ) {

      $cookieStore.put('token', $routeParams.access_token);
      callback && callback();

    } else {

      $location.url('/'); // not logged in

    }
  }

  function validAuth() {
    if ( $cookieStore.get('token') ) {
      return true;
    } else {
      return false;
    }
  }

  return api;

});