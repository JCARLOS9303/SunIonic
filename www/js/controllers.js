var weathers;
var weatherbyhour;
var ciudad="Cancun";
var unidades="metric";
var dias="5";
var diaActual;

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $http) {
	
    $http.get("http://api.openweathermap.org/data/2.5/weather?id=3531673&units&units=metric&lang=es",{cache:true})
  .then(function(response){
    $scope.clima = {};
    $scope.clima = response.data;
  });
	
})

.controller('ChatsCtrl', function($scope, Chats, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.updateData=function(){
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt="+dias+"&q="+ciudad+"&units="+unidades+"&lang=es").then(function(data){
    this.weathers = data.data.list;
    $scope.ciudadinfo=data.data.city;
   $scope.chats = this.weathers;
  });

  $http.get("http://api.openweathermap.org/data/2.5/forecast?&cnt="+(dias*8)+"&q="+ciudad+"&units="+unidades).then(function(data){
   this.weatherbyhour = data.data.list;
  });
  
  }
  
  $scope.updateData();
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log(weatherbyhour.le);
	for (var i = 0; i < weathers.length; i++) {
        if (weathers[i].dt === parseInt($stateParams.chatId)) {
          $scope.chat = weathers[i];
        }
      }

      var dia=new Date($scope.chat.dt*1000);
      dia=dia.getDate()+"."+dia.getMonth();
      var arraytemp=[];

      for (var i = 0; i < weatherbyhour.length; i++) {
        var dia2=new Date(weatherbyhour[i].dt*1000);
        dia2=dia2.getDate()+"."+dia2.getMonth();
        console.log(dia2);
        console.log(dia==dia2);
        if (dia==dia2) {
          arraytemp.push(weatherbyhour[i]);
        }
      }
      $scope.chats=arraytemp;
})

.controller('AccountCtrl', function($scope) {

  $scope.changeValues=function(){
    ciudad=$scope.settings.ciudad;
    unidades=$scope.settings.unidad;
    dias=$scope.settings.dia;
  }

  $scope.settings = {
    enableFriends: true,
    dia:dias,
    unidad:unidades,
    ciudad:ciudad
  };

});
