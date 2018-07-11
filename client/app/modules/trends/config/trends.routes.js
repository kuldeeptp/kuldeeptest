(function () {
  'use strict';
  angular
    .module('com.module.trends')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.trends', {
          abstract: true,
          url: '/trends',
          templateUrl: 'modules/trends/views/main.html'
        })
        .state('app.trends.list', {
          url: '',
          templateUrl: 'modules/trends/views/list.html',
          controllerAs: 'ctrl',

          controller: function ($q, $http, $filter,$scope,trends,symbols) {
            this.trends = trends;
            $scope.symbols = symbols;
            console.log('Symbols are : ',symbols);

            $scope.data='';
            $scope.loadDetails=function(symbol,expiry='25MAY2017'){

              var apiUrl="http://192.168.1.6:3000/api/nseoptionchain/getOptionChain?Code="+symbol.Code+"&Expiry="+expiry;

              return $q(function (resolve, reject) {
                $http.get(apiUrl)
                    .success(function(resolve){
                      $scope.details=resolve.data.details;
                      $scope.options=resolve.data.option;
                    })
                    .error(reject);
              });

              //$scope
            };

            $scope.selected=[];

            $scope.filterData=function(){

              var query= {
                "strike": $scope.selectedStrike.strike,
                "expiry": $scope.selectedExpiry.expiry,
                "instrument_type": $scope.selectedInstruements.instrument_type
              };
              var found = $filter('search')($scope.options, query);
              console.log(found);
              if(found.length>0) {
                var exists = $filter('exists')($scope.selected, found[0].id);
                if (exists.length > 0) {
                  console.log("already exist");
                } else {
                  $scope.selected.push(found[0]);
                }
              }
            };
            $scope.removeOption=function(index){
              $scope.selected.splice(index,1);
            };
          },
          resolve: {
            trends: function (TrendsService) {
              return TrendsService.getTrends();
            },
            symbols: function (TrendsService) {
              return TrendsService.getSymbols();
            }
          },
          data : {
              'search':function ($filter) {
                return function (options, query) {
                  var results = [];
                  //var q = query.toLowerCase();
                  angular.forEach(options, function (option) {
                    if (query.strike===option.strike &&
                        moment(query.expiry).format('YYYY-MM-DD')=== moment(option.expiry).format('YYYY-MM-DD') &&
                        query.instrument_type.toLowerCase()=== option.instrument_type.toLowerCase()) {
                      results.push(option);
                    }
                  });
                  return results;
                }},
                    'exists':function($filter) {
                      return function (options, id) {
                        var results = [];
                        //var q = query.toLowerCase();
                        angular.forEach(options, function (option) {
                          if (id===option.id){
                            results.push(option);
                          }
                        });
                        return results;
                      }
                    }


          }
        })


        .state('app.trends.view', {
          url: '/:code',
          templateUrl: 'modules/trends/views/view.html',
          controllerAs: 'ctrl',
          controller: function (trend) {
            this.trend = trend;
          },
          resolve: {
            trend: function ($stateParams, TrendsService) {
              return TrendsService.getTrend($stateParams.code);
            }
          }
        })
    });

})();
