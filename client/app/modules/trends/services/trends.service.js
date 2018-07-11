(function () {
  'use strict';
  angular
    .module('com.module.trends')
    .service('TrendsService', function ($state, CoreService, Trend, Optionchain,Symbols,gettextCatalog) {

      this.getTrends = function () {
        return Trend.find().$promise;
      };

        this.getSymbols = function () {
            return Symbols.find().$promise;
        };

      this.getTrend = function (code) {
        return Trend.find({
            filter: {
                where: {code: code}
            }
        }).$promise;
      };

        this.getOptionChain = function (code) {
            return Optionchain.find({
                filter: {
                    where: {Code: code}
                }
            }).$promise;
        };

    });

})();
