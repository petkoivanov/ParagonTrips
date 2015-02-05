angular.module('starter.services', [])

.factory('Friends', function() {
   var customers = [];

  return {
    all: function() {
      return customers;
    },
    setNewText: function(textLoaded){
        var allText = textLoaded.replace(/"/g,"");
        customers = [];
        var customersTmp = allText.split('\n');
        for(var i=0;i<customersTmp.length;i++){
            if (customersTmp[i].charAt(0)=='T') continue ;
            if (customersTmp[i].trim().length==0) continue ;
            var split = customersTmp[i].split(',');
            customers.push({
                date: split[0],
                description: split[1],
                mountain: split[2],
                busCapacity:split[4],
                busBooked:split[5],
                name: split[6],
                phone: split[7],
                bookedVia: split[8],
                liftTicket: split[10],
                rental: split[12],
                isPresent: false,
                selectedTicket: undefined,
                prepSki: false,
                prepBoots: false
            });
        }
        customers.sort(function(a,b){ return a.name.toLowerCase()<b.name.toLowerCase()?-1 : a.name.toLowerCase()==b.name.toLowerCase()?0: 1});
    },
    withRentals: function() {
        var customersWithRentals = [];
        for(var i=0;i<customers.length;i++){
            if (customers[i].rental.trim().length>0){
                customersWithRentals.push(customers[i]);
            }
        }
        return customersWithRentals;
    }
  }
});