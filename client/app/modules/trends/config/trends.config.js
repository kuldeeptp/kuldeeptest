(function () {
  'use strict';
  angular
    .module('com.module.trends')
    .run(function ($rootScope, Trend, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Trends'), 'app.trends.list', 'fa-file-o');

      Trend.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Trends'), 'bg-green', 'ion-clipboard', data.length, 'app.trends.list');
      });

    });

})();
