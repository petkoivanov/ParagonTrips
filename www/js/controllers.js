angular.module('starter.controllers',  ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.search = {name: ''};
  $scope.friends = Friends.all();
  $scope.countAll = function(){
      $scope.bus=0;$scope.beginner=0;$scope.all=0;$scope.total=0;
      for(var i=0;i<$scope.friends.length;i++){
        if ($scope.friends[i].isPresent){
          $scope.total++;
          if ($scope.friends[i].selectedTicket === undefined){
            //
          }else {
              var $t = $scope.friends[i].selectedTicket;
              if ($t) {
                if ($t.code == 1) $scope.bus++;
                if ($t.code == 2) $scope.all++;
                if ($t.code == 3) $scope.beginner++;
              }
          }
        }
      }
  };
  $scope.countAll();
  $scope.tickets = [{code:1,name:'BusOnly'},
                    {code:2,name:'All'},
                    {code:3,name:'Beginner'}];
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {

})

.controller('AccountCtrl', function($scope, Friends) {
    $scope.friends = Friends.withRentals();
    $scope.updateCounters = function(){
        $scope.prepBoots=0;
        $scope.prepSki=0;
        for(var i=0;i<$scope.friends.length;i++){
            if ($scope.friends[i].prepBoots){
                $scope.prepBoots++;
            }
            if ($scope.friends[i].prepSki){
                $scope.prepSki++;
            }
        }
    }
    $scope.updateCounters();
})

.controller('ChatsCtrl', function($scope, Friends, $http, $cordovaFile) {
    $scope.friend = Friends.all()[0];
    $scope.friendsCounter = Friends.all().length;
    $scope.loadedDateTime = 'Not Loaded..';
    $scope.lastModifiedDate = '';
        $scope.setFiles = function(files)
        {
            $scope.$apply(function() {
                $scope.loadedDateTime =  new Date().toString();
                $scope.lastModifiedDate = files[0].lastModifiedDate;
                var reader = new FileReader();
                reader.onload = function(e) {
                    Friends.setNewText(e.target.result);
                    $scope.$apply(function(){
                        $scope.friendsCounter = Friends.all().length;
                        $scope.friend = Friends.all()[0];
                    })
                };
                reader.readAsText(files[0]);
            });
        }
})

;
