angular.module('WaitstaffApp', ['ngRoute', 'ngAnimate'])
       .value('meals', [])
       .config(['$routeProvider', ($routeProvider) => {
         $routeProvider
           .when('/', {
             templateUrl : 'home.html' })
           .when('/new-meal', {
             templateUrl : 'new-meal.html',
             controller : 'WaitstaffCtrl as waitstaff'})
           .when('/my-earnings', {
             templateUrl : 'my-earnings.html',
             controller : 'WaitstaffCtrl as waitstaff' })
           .otherwise('/');
       }])
       .controller('WaitstaffCtrl', function($scope, meals){
         var waitstaff = this;
         
         waitstaff.price = 0;
         waitstaff.tip = 0;
         waitstaff.tax = 0;
         waitstaff.last_tip = 0;
         waitstaff.last_subtotal = 0;
         waitstaff.last_total = 0;
         
         waitstaff.submit = function() {
           var subtotal = waitstaff.roundCurrency( waitstaff.price + (waitstaff.price*(waitstaff.tax/100)) );
           var tip = waitstaff.roundCurrency( (waitstaff.tip/100)*subtotal );
           var total = subtotal + tip;

           meals.push({
             subtotal: subtotal,
             tip: tip,
             total: total
           });

           waitstaff.clear();
           waitstaff.last_tip = tip;
           waitstaff.last_total = total;
           waitstaff.last_subtotal = subtotal;
         } 

         waitstaff.clear = function() {
           waitstaff.price = 0;
           waitstaff.tax = 0;
           waitstaff.tip = 0;
           waitstaff.last_tip = 0;
           waitstaff.last_subtotal = 0;
           waitstaff.last_total = 0;
         } 

         waitstaff.reset = function() {
           waitstaff.clear();
           meals = [];
         } 

         waitstaff.tip_total = function() {
           if (meals.length == 0) return 0;
           return meals.reduce( (acc, meal) => acc + meal.tip , 0 )
         }

         waitstaff.meal_count = function() {
           return meals.length;
         }

         waitstaff.tpm = function() {
           if (meals.length == 0) return 0;
           return waitstaff.tip_total() / waitstaff.meal_count();
         }

         waitstaff.roundCurrency = function(amount) {
	       return Math.round(amount * 100) / 100;
         }
       })
  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
    $location.path('/');});})
                                               
