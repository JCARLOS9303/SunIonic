angular.module('starter.services', [])

.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  chats=[];

  return {

     hoy: function() {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=21.17429&lon=-86.846558&&units=metric');
    },

    all: function() {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/?&id=3531673&units=metric&lang=es');
      //http://api.openweathermap.org/data/2.5/forecast/?&id=3531673&lang=es
      //http://api.openweathermap.org/data/2.5/forecast/daily?lat=21.17429&lon=-86.846558&units=metric
    },
    
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
