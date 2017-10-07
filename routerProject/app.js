var rootApp = angular.module("rootApp", ["ui.router"]);
rootApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state("home", {
    url : "/home",
    templateUrl: "./home.html",
    controller: ["$scope", function($scope) {
    }],
  }).state("users", {
    url : "/users",
    templateUrl: "./users.html",
    controller: "usersController"
  }).state("addUser", {
    url: "/addUser",
    templateUrl: "./addUser.html",
    controller: "addUserController"
  }).state("updatePassword", {
    url: "/updatePassword",
    templateUrl: "./updatePassword.html"
  }).state("home.message", {
    url: "/home/message",
    template: "<h1>hello message</h1>"
  }).state("home.noti", {
    url: "/home/noti",
    template: "<h1>hello noti</h1>"
  }).state("home.main", {
    url: "/home/main",
    template: "<h1>hello main</h1>"
  });
  $urlRouterProvider.otherwise("/home");
}]);


//利用Mock截获ajax请求所返回的数据.
var data = Mock.mock("http://daejong.com/getItems", {
'items|50': [{
  'id|+1': 2120142000, //从2120142000开始
  'name': '@cname', //中文名字
  'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
  'city': '@city(true)',   // 中国城市
  'phone|1':/^1[0-9]{10}$/,
  'color': '@color',  // 16进制颜色
  'grade|60-100': 0,   // 18至28以内随机整数, 0只是用来确定类型
}]
});
rootApp.controller("usersController", ["$scope", "$http", function($scope, $http) {
  // 使用mock产生模拟数据.
  $http.get("http://daejong.com/getItems").success(function(res){
      console.log(res);
      $scope.data = res.items;
  });
}]);


rootApp.controller("addUserController", ["$scope", function($scope) {
  $scope.formObj = {};
  $scope.submit = function() {
    console.log($scope.formObj);
  };
  $scope.checkStrength = function (val){
    var aLvTxt = ['','低','中','高'];
    if(!val) return ;
    var lv = 0;
    if(val.match(/[a-z]/g)){lv++;}
    if(val.match(/[0-9]/g)){lv++;}
    if(val.match(/(.[^a-z0-9])/g)){lv++;}
    if(val.length < 6){lv=0;}
    if(lv > 3){lv=3;}
    return aLvTxt[lv];
  };
}]);
