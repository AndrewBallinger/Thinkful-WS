angular.module('WaitstaffApp', [])
  .controller('WaitstaffCtrl', function($scope){
     var ws = this;
      
     ws.price = 0;
     ws.tip = 0;
     ws.tax = 0;
     ws.meals = [];

     ws.submit = function() {
       var subtotal = ws.price + (ws.price*(ws.tax/100));
       var tip = (ws.tip/100)*subtotal;
       var total = subtotal + tip;

       ws.meals.push({
         subtotal: subtotal,
         tip: tip,
         total: total
       });

       ws.clear();
     } 

     ws.clear = function() {
       ws.price = 0;
       ws.tax = 0;
       ws.tip = 0;
     } 

     ws.reset = function() {
      ws.clear();
      meals = [];
     } 

     ws.subtotal = function() {
       if (ws.meals.length == 0) return 0;
       return ws.meals[ws.meals.length-1].subtotal;
     }

     ws.last_tip = function() {
       if (ws.meals.length == 0) return 0;
       return ws.meals[ws.meals.length-1].tip;
     }

    ws.total = function() {
      if (ws.meals.length == 0) return 0;
      return ws.meals[ws.meals.length-1].total;
    }

    ws.tip_total = function() {
      if (ws.meals.length == 0) return 0;
      return ws.meals.reduce( (acc, meal) => acc + meal.tip , 0 )
    }

    ws.meal_count = function() {
      return ws.meals.length;
    }

    ws.tpm = function() {
      if (ws.meals.length == 0) return 0;
      return ws.tip_total() / ws.meal_count();
    }
  });
