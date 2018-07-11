"use strict";



define('web/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend({
    host: ENV.APP.host,
    namespace: 'api'
  });
});
define('web/app', ['exports', 'ember', 'web/resolver', 'ember-load-initializers', 'web/config/environment'], function (exports, _ember, _webResolver, _emberLoadInitializers, _webConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _webConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _webConfigEnvironment['default'].podModulePrefix,
    Resolver: _webResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _webConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('web/authenticators/application', ['exports', 'ember-simple-auth-loopback/authenticators/loopback'], function (exports, _emberSimpleAuthLoopbackAuthenticatorsLoopback) {
  exports['default'] = _emberSimpleAuthLoopbackAuthenticatorsLoopback['default'].extend({
    loginEndpoint: 'http://0.0.0.0:3000/api/Users/login'
  });
});
define('web/authorizers/application', ['exports', 'ember-simple-auth-loopback/authorizers/loopback'], function (exports, _emberSimpleAuthLoopbackAuthorizersLoopback) {
  exports['default'] = _emberSimpleAuthLoopbackAuthorizersLoopback['default'].extend();
});
define('web/components/coverdoption-list', ['exports', 'ember', 'web/config/environment'], function (exports, _ember, _webConfigEnvironment) {
		exports['default'] = _ember['default'].Component.extend({
				store: _ember['default'].inject.service(),
				didReceiveAttrs: function didReceiveAttrs() {

						this._super.apply(this, arguments);
						this.errors = [];
						var pal = this;
						var oc = this.get('oc');
						var myReports = this.get('myReports');
						pal.set('myReports', myReports);
						// newUnixTimeStamp = moment('2013-09-05 15:34:00', 'YYYY-MM-DD HH:MM:ss').unix();
						// console.log('*****time stamp : ',newUnixTimeStamp);
						console.log('List didReceiveAttrs reports: ', this.get('myReports'));
				},
				actions: {
						remove: function remove(index) {
								alert(index);

								var myReports = this.get('myReports');
								console.log('Myreport Count ', myReports.length);
								myReports.removeAt(index);
								this.set('myReports', myReports);
						},
						addToReport: function addToReport(myReports) {
								var pal = this;
								console.info('reports to save:', myReports);

								_ember['default'].$.ajax({
										url: _webConfigEnvironment['default'].APP.host + "/api/Coverdoptions",
										type: "POST",
										headers: {
												'Content-Type': 'application/json'
										},
										data: JSON.stringify(myReports)
								}).then(function (resp) {
										console.info("response : ", resp);
										pal.set('myReports', []);
								})['catch'](function (error) {
										console.info("Error : ", error);
								});
						}

				}
		});
});
define('web/components/fii-listing', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		fiis: _ember['default'].computed.filterBy('model', 'Client_Type', 'FII'),
		fiisFutureIndex: _ember['default'].computed.mapBy('fiis', 'Future_Index'),

		dateIndex: _ember['default'].computed.mapBy('fiis', 'date'),

		diis: _ember['default'].computed.filterBy('model', 'Client_Type', 'DII'),
		diisFutureIndex: _ember['default'].computed.mapBy('diis', 'Future_Index'),

		pros: _ember['default'].computed.filterBy('model', 'Client_Type', 'Pro'),
		prosFutureIndex: _ember['default'].computed.mapBy('pros', 'Future_Index'),

		clients: _ember['default'].computed.filterBy('model', 'Client_Type', 'Client'),
		clientsFutureIndex: _ember['default'].computed.mapBy('clients', 'Future_Index'),

		mySeries: _ember['default'].computed('fiisFutureIndex', 'diisFutureIndex', 'prosFutureIndex', 'clientsFutureIndex', function () {
			return [{ name: 'FII', data: this.get('fiisFutureIndex') }, { name: 'DII', data: this.get('diisFutureIndex') }, { name: 'Pro', data: this.get('prosFutureIndex') }, { name: 'Clien', data: this.get('clientsFutureIndex') }];
		})

	});
});
define('web/components/gann-data', ['exports', 'ember', 'web/config/environment'], function (exports, _ember, _webConfigEnvironment) {
  exports['default'] = _ember['default'].Component.extend({

    ajaxCall1: false,
    gannVals: null,

    didRender: function didRender() {
      if (!this.ajaxCall) {
        //this.loadRelationships();
        this.ajaxCall = true;
      }
    },

    didReceiveAttrs: function didReceiveAttrs() {

      // load products
      var pal = this;
      //$.getJSON(ENV.APP.host + "/api/volatility?filter[where][Symbol]="+this.get('code')+"&filter[where][Date]=30-JUN-2017").then(function(json) {
      $.getJSON(_webConfigEnvironment['default'].APP.host + "/api/volatility?filter[where][Symbol]=" + this.get('code')).then(function (json) {
        console.log('Ajax json : ', json[0]);
        var gannVals = getGannRange(json[0].Close);
        var fibiVals = getFibiVoltilityRange(json[0].Close, json[0].AnnualisedVolatility);
        console.log('GANN VALUES : ', gannVals);
        console.log('fibiVals VALUES : ', gannVals);
        pal.set('stockhistory', json[0]);
        pal.set('gannVals', gannVals);
        pal.set('fibiVals', fibiVals);
      });

      function degree(p) {
        return (180 * Math.sqrt(p - 1) - 255) % 360;
      };

      function degreeDiff(p1, p2) {
        return 180 * (Math.sqrt(p1) - Math.sqrt(p2)) % 360;
      };

      function priceAngle(p, angle) {
        return (Math.sqrt(p) + angle) * (Math.sqrt(p) + angle);
      };

      // GANN Emberlem
      /*
      90' = 0.5
      120' = 0.66
      180' = 1.00
      240' = 1.32
      270' = 1.50
      360' = 2.00
        //ATR = if ATR is compleeted then stock will not fall
      // GANN DATES
      Feb = 3;//7
      March=21;//23
      May = 3;//7
      Jun = 20;//25
      Aug=3;//8
      Sep = 21;//24
      Nov = 8;//11
      Dec = 20;//25
        // GANN Emberlem
      90' = 0.5
      120' = 0.66
      180' = 1.00
      240' = 1.32
      270' = 1.50
      360' = 2.00
      */
      function getGannRangeX(p) {
        var p45 = (Math.sqrt(p) + 0.236) * (Math.sqrt(p) + 0.236);
        var p38 = (Math.sqrt(p) + 0.382) * (Math.sqrt(p) + 0.382);
        var p90 = (Math.sqrt(p) + 0.5) * (Math.sqrt(p) + 0.5);
        var p120 = (Math.sqrt(p) + 0.618) * (Math.sqrt(p) + 0.618);
        var p786 = (Math.sqrt(p) + 0.786) * (Math.sqrt(p) + 0.786);
        var p180 = (Math.sqrt(p) + 1) * (Math.sqrt(p) + 1);

        var up = new Array(p45, p38, p90, p120, p786, p180);

        p45 = (Math.sqrt(p) - 0.236) * (Math.sqrt(p) - 0.236);
        p38 = (Math.sqrt(p) - 0.382) * (Math.sqrt(p) - 0.382);
        p90 = (Math.sqrt(p) - 0.5) * (Math.sqrt(p) - 0.5);
        p120 = (Math.sqrt(p) - 0.618) * (Math.sqrt(p) - 0.618);
        p786 = (Math.sqrt(p) - 0.786) * (Math.sqrt(p) - 0.786);
        p180 = (Math.sqrt(p) - 1) * (Math.sqrt(p) - 1);

        var dn = new Array(p45, p38, p90, p120, p786, p180);

        return new Array(up, dn);
      };

      function getFibiVoltilityRange(c, hv) {
        var span = c * hv * Math.sqrt(7 / 365) * 0.98;

        var p1 = c + span * 0.236;
        var p2 = c + span * 0.382;
        var p3 = c + span * 0.5;
        var p4 = c + span * 0.618;
        var p5 = c + span * 0.786;
        var p6 = c + span * 1;

        var up = new Array(p1.toFixed(2), p2.toFixed(2), p3.toFixed(2), p4.toFixed(2), p5.toFixed(2), p6.toFixed(2));

        p1 = c - span * 0.236;
        p2 = c - span * 0.382;
        p3 = c - span * 0.5;
        p4 = c - span * 0.618;
        p5 = c - span * 0.786;
        p6 = c - span * 1;
        var dn = new Array(p1.toFixed(2), p2.toFixed(2), p3.toFixed(2), p4.toFixed(2), p5.toFixed(2), p6.toFixed(2));

        return new Array(up, dn);
      };

      function getGannRange(p) {
        var p45 = (Math.sqrt(p) + 0.125) * (Math.sqrt(p) + 0.125);
        var p90 = (Math.sqrt(p) + 0.25) * (Math.sqrt(p) + 0.25);
        var p120 = (Math.sqrt(p) + 0.375) * (Math.sqrt(p) + 0.375);
        var p180 = (Math.sqrt(p) + 0.5) * (Math.sqrt(p) + 0.5);
        var p240 = (Math.sqrt(p) + 0.625) * (Math.sqrt(p) + 0.625);
        var p270 = (Math.sqrt(p) + 0.8) * (Math.sqrt(p) + 0.8);
        var p360 = (Math.sqrt(p) + 0.925) * (Math.sqrt(p) + 0.925);
        var up = new Array(p45.toFixed(2), p90.toFixed(2), p120.toFixed(2), p180.toFixed(2), p240.toFixed(2), p270.toFixed(2), p360.toFixed(2));

        var p45 = (Math.sqrt(p) - 0.125) * (Math.sqrt(p) - 0.125);
        p90 = (Math.sqrt(p) - 0.25) * (Math.sqrt(p) - 0.25);
        p120 = (Math.sqrt(p) - 0.375) * (Math.sqrt(p) - 0.375);
        p180 = (Math.sqrt(p) - 0.5) * (Math.sqrt(p) - 0.5);
        p240 = (Math.sqrt(p) - 0.625) * (Math.sqrt(p) - 0.625);
        p270 = (Math.sqrt(p) - 0.8) * (Math.sqrt(p) - 0.8);
        p360 = (Math.sqrt(p) - 0.925) * (Math.sqrt(p) - 0.925);

        var dn = new Array(p45.toFixed(2), p90.toFixed(2), p120.toFixed(2), p180.toFixed(2), p240.toFixed(2), p270.toFixed(2), p360.toFixed(2));

        return new Array(up, dn);
      };

      function gannRange(p) {
        var p45 = (Math.sqrt(p) + 0.236) * (Math.sqrt(p) + 0.236);
        var p38 = (Math.sqrt(p) + 0.382) * (Math.sqrt(p) + 0.382);
        var p90 = (Math.sqrt(p) + 0.5) * (Math.sqrt(p) + 0.5);
        var p120 = (Math.sqrt(p) + 0.618) * (Math.sqrt(p) + 0.618);
        var p786 = (Math.sqrt(p) + 0.786) * (Math.sqrt(p) + 0.786);
        var p180 = (Math.sqrt(p) + 1) * (Math.sqrt(p) + 1);

        var up = new Array(p45, p38, p90, p120, p786, p180);

        p45 = (Math.sqrt(p) - 0.236) * (Math.sqrt(p) - 0.236);
        p38 = (Math.sqrt(p) - 0.382) * (Math.sqrt(p) - 0.382);
        p90 = (Math.sqrt(p) - 0.5) * (Math.sqrt(p) - 0.5);
        p120 = (Math.sqrt(p) - 0.618) * (Math.sqrt(p) - 0.618);
        p786 = (Math.sqrt(p) - 0.786) * (Math.sqrt(p) - 0.786);
        p180 = (Math.sqrt(p) - 1) * (Math.sqrt(p) - 1);

        var dn = new Array(p45, p38, p90, p120, p786, p180);

        return new Array(up, dn);
      };

      // a and b are javascript Date objects
      function dateDiffInDays(a, b) {

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
      };

      function gannMagic(pHigh, pLow, dHigh, dLow) {
        var priceRange = pHigh - pLow;
        var timeWindow = Math.round(Math.sqrt(priceRange));
        var dateDiff = dateDiffInDays(new Date(dHigh), new Date(dLow));
        var tradingDays = dateDiff * 1.4;
        var stDate1 = stDate = baseDate = new Date(dHigh) > new Date(dLow) ? new Date(dHigh) : new Date(dLow);
        var priceDirection = new Date(dHigh) > new Date(dLow) ? -1 : 1;
        var dateWindow = new Array();
        var priceWindow = new Array();

        console.log("dateDiff,priceRange ", dateDiff, priceRange);

        baseDate.setDate(baseDate.getDate() + timeWindow);
        dateWindow.push(baseDate.toJSON());
        baseDate.setDate(baseDate.getDate() + timeWindow);
        dateWindow.push(baseDate.toJSON());

        baseDate.setDate(baseDate.getDate() + timeWindow);
        dateWindow.push(baseDate.toJSON());

        baseDate.setDate(baseDate.getDate() + timeWindow);
        dateWindow.push(baseDate.toJSON());

        stDate.setDate(stDate.getDate() + dateDiff - 2 * timeWindow);
        dateWindow.push(stDate.toJSON());

        stDate.setDate(stDate.getDate() + timeWindow);
        dateWindow.push(stDate.toJSON());

        for (var i = 1; i < 7; i++) {
          priceWindow.push((Math.sqrt(pLow) + i) * (Math.sqrt(pLow) + i));
          //priceWindow.push((Math.sqrt(pHigh) + i)*(Math.sqrt(pHigh) + i));
        }

        for (var i = 1; i < 7; i++) {
          //priceWindow.push((Math.sqrt(pLow) - i)*(Math.sqrt(pLow) - i));
          priceWindow.push((Math.sqrt(pHigh) - i) * (Math.sqrt(pHigh) - i));
        }

        console.log('date Window :', dateWindow);
        console.log('price window :', priceWindow.sort());
      };
    },

    actions: {
      clearFilter: function clearFilter() {}

    }

  });
});
define('web/components/greek-chart', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({

		//myReports:[],

		profitStrategy: null,

		didReceiveAttrs: function didReceiveAttrs() {
			this._super.apply(this, arguments);
			this.errors = [];

			var oc = this.get('oc');

			var myReports = this.get('myReports');
			var mycount = this.get('mycount');

			var lotSize = 100;
			var profit = [];
			var strikePrices = oc.strikes;

			console.log('xxxxxx COUNT  : ', mycount);
			if (myReports.length > 0) {
				var strikeLength = oc.strikes.length;
				var start = 0;
				var end = strikeLength;
				for (var i = 0; i < strikePrices.length - 1; i++) {
					if (eval(strikePrices[i]) < myReports[0].underlying && eval(strikePrices[i + 1]) > myReports[0].underlying) {
						start = i;
						break;
					}
					continue;
				}
				if (i > 7) {
					start = i - 6;
					end = i + 7;
				}

				start = 1;
				end = strikeLength - 1;

				for (var j = start; j < end - 1; j++) {
					var p = 0;

					for (var i = 0; i < myReports.length; i++) {
						//console.log('----- myReports : ',myReports[i]);
						if (myReports[i].type == 'CE') {

							if (myReports[i].lot < 0) {

								if (myReports[i].strike >= strikePrices[j]) {
									p += -1 * myReports[i].lastPrice * lotSize * myReports[i].lot;
									console.log('StrikePrice, Strike, underlying , p1 : ', myReports[i].lastPrice, strikePrices[j], myReports[i].underlying, p, myReports[i].lot);
								} else {
									var k = eval(myReports[i].lastPrice) - eval(strikePrices[j]) + eval(myReports[i].strike);
									p += -1 * k * lotSize * myReports[i].lot;
									console.log('StrikePrice, Strike, underlying , p2 : ', myReports[i].lastPrice, strikePrices[j], myReports[i].underlying, p, myReports[i].lot, k);
								}
							} else {
								if (myReports[i].strike >= strikePrices[j]) {
									p += -1 * myReports[i].lastPrice * lotSize * myReports[i].lot;
									console.log('StrikePrice, Strike, underlying , p3 : ', myReports[i].lastPrice, strikePrices[j], myReports[i].underlying, p, myReports[i].lot);
								} else {

									p += (strikePrices[j] - myReports[i].lastPrice - myReports[i].strike) * lotSize * myReports[i].lot;
									console.log('StrikePrice, Strike, underlying , p4 : ', myReports[i].lastPrice, strikePrices[j], myReports[i].underlying, p, myReports[i].lot);
								}
							}
						} else if (myReports[i].type == 'PE') {
							if (myReports[i].lot < 0) {
								if (myReports[i].strike > strikePrices[j]) {

									p += -1 * (eval(strikePrices[j]) - eval(myReports[i].strike) + eval(myReports[i].lastPrice)) * lotSize * myReports[i].lot;
									//console.log('************* PE-1');
								} else {
										p += -1 * myReports[i].lastPrice * lotSize * myReports[i].lot;

										//console.log('*************** PE-2');
									}
							} else {
									if (myReports[i].strike > strikePrices[j]) {
										p += (myReports[i].strike - myReports[i].lastPrice - strikePrices[j]) * lotSize * myReports[i].lot;
										//console.log('*************** Infinite Profit when expire below my PE baught strike price PE-3', myReports[i].lot);			    				
									} else {

											p += -1 * myReports[i].lastPrice * lotSize * myReports[i].lot;
											//console.log('*************** Max losss when expire above my PE baught strike price PE-3 ',myReports[i].lot);
										}
								}
						} else {

								p += (eval(strikePrices[j]) - eval(myReports[0].underlying)) * lotSize * myReports[i].lot;
								//console.log('+++++++++ FUTURE ++++++++ : ',eval(strikePrices[j]) , eval(underLying));
							}
					}
					//console.log(' ####P :',p);

					profit.push([eval(strikePrices[j]), p]);
					//profit.push([strikePrices[j], p]);
				};
				// console.log(' *****Profit : ', profit);	
				// this.set('profitStrategy',profit);
				console.log(' *****Profit : ', profit);
				this.set('profitStrategy', [{ data: profit }]);
			};
		},

		chartOptionsProfit: {

			chart: {
				type: 'scatter'
			},
			title: {
				text: 'Profit Strategy'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				title: {
					text: 'Strike Price'
				},
				gridLineWidth: 1,
				minPadding: 0.2,
				maxPadding: 0.2,
				maxZoom: 60
			},
			yAxis: {
				title: {
					text: 'Profit'
				},
				minPadding: 0.2,
				maxPadding: 0.2,
				maxZoom: 60,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			legend: {
				enabled: false
			},

			plotOptions: {
				area: {
					fillOpacity: 0.5
				}
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				series: {
					lineWidth: 1,
					point: {
						events: {
							'click': function click() {
								if (this.series.data.length > 1) {
									this.remove();
								}
							}
						}
					}
				}
			}
		}

	});
});
define('web/components/high-charts', ['exports', 'ember-highcharts/components/high-charts'], function (exports, _emberHighchartsComponentsHighCharts) {
  exports['default'] = _emberHighchartsComponentsHighCharts['default'];
});
define('web/components/option-chart', ['exports', 'ember'], function (exports, _ember) {
	var profitStrategy1;
	exports['default'] = _ember['default'].Component.extend({
		strike: null,

		type: null,

		lot: 1,

		actionType: null,

		myStrategies: [],

		netGreek: null,

		profitStrategy: null,

		code: null,

		script: null,
		LotSize: null,
		pal: this,

		didReceiveAttrs: function didReceiveAttrs() {

			this._super.apply(this, arguments);
			this.errors = [];

			var underLying = this.get('underLying');
			var strikePrices = this.get('strikePrices');
			var myStrategies = this.get('myStrategies');
			var netGreek = this.get('netGreek');
			var code = this.get('code');
			var script = this.get('script');
			var pal = this;

			console.log('underLying :', underLying);
			console.log('option-chart strikePrices : ', strikePrices);

			console.log('option-chart myStrategies : ', myStrategies);

			console.log('option-chart Code : ', code);

			console.log('option-chart Script : ', script);

			var profit = [];
			var LotSize = this.get('LotSize');;

			var start = 0;
			for (var i = 0; i < strikePrices.length - 1; i++) {
				if (eval(strikePrices[i]) < underLying && eval(strikePrices[i + 1]) > underLying) {
					start = i;
					break;
				}
				continue;
			}

			if (myStrategies.length > 0) {
				var strikeLength = strikePrices.length - 2;
				var end = start + 8; // Math.round(strikeLength/2 + strikeLength/4 + 2)
				start = start - 7; //Math.round(strikeLength/2 - strikeLength/4 - 2 );

				for (var j = start; j < end; j++) {
					var p = 0;

					for (var i = 0; i < myStrategies.length; i++) {

						if (myStrategies[i].type == 'CE') {

							if (myStrategies[i].Lot < 0) {

								if (myStrategies[i].StrikePrice >= strikePrices[j]) {
									p += -1 * myStrategies[i].LTP * LotSize * myStrategies[i].Lot;
								} else {
									var k = eval(myStrategies[i].StrikePrice) - eval(strikePrices[j]) + eval(myStrategies[i].LTP);

									p += -1 * k * LotSize * myStrategies[i].Lot;
									console.log('StrikePrice, Strike, LTP , p : ', myStrategies[i].StrikePrice, strikePrices[j], myStrategies[i].LTP, p, myStrategies[i].Lot, k);
								}
							} else {
								if (myStrategies[i].StrikePrice >= strikePrices[j]) {
									//p +=  myStrategies[i].LTP * LotSize * myStrategies[i].Lot;
									p += (strikePrices[j] - myStrategies[i].StrikePrice - myStrategies[i].LTP) * LotSize * myStrategies[i].Lot;
								} else {

									p += (strikePrices[j] - myStrategies[i].StrikePrice - myStrategies[i].LTP) * LotSize * myStrategies[i].Lot;
								}
							}
						} else if (myStrategies[i].type == 'PE') {
							if (myStrategies[i].Lot < 0) {
								if (myStrategies[i].StrikePrice <= strikePrices[j]) {
									p += -1 * myStrategies[i].LTP * LotSize * myStrategies[i].Lot;
								} else {

									p += -1 * (eval(strikePrices[j]) - eval(myStrategies[i].StrikePrice) + eval(myStrategies[i].LTP)) * LotSize * myStrategies[i].Lot;
								}
							} else {
								if (myStrategies[i].StrikePrice <= strikePrices[j]) {
									p += -1 * myStrategies[i].LTP * LotSize * myStrategies[i].Lot;
								} else {
									p += (myStrategies[i].StrikePrice - strikePrices[j] - myStrategies[i].LTP) * LotSize * myStrategies[i].Lot;
								}
							}
						} else {

							p += (eval(strikePrices[j]) - eval(underLying)) * LotSize * myStrategies[i].Lot;
							//console.log('+++++++++ FUTURE ++++++++ : ',eval(strikePrices[j]) , eval(underLying));
						}
					}
					console.log(' ####P :', p);

					profit.push([eval(strikePrices[j]), p]);
					//profit.push([strikePrices[j], p]);
				};
				console.log(' *****Profit : ', profit);
				this.set('profitStrategy', [{ data: profit }]);
			};
		},

		actions: {
			saveReport: function saveReport() {
				var profit = this.get('profitStrategy');
				var myStrategies = this.get('myStrategies');
				var netGreek = this.get('netGreek');
				//alert('Saving myStrategies');
				console.log("profit,myStrategies", profit, myStrategies);
				console.info('Net greek : ', netGreek);
			}

		},

		chartOptionsProfit: {

			chart: {
				type: 'scatter'
			},
			title: {
				text: 'Profit Strategy'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				title: {
					text: 'Strike Price'
				},
				gridLineWidth: 1,
				minPadding: 0.2,
				maxPadding: 0.2,
				maxZoom: 60
			},
			yAxis: {
				title: {
					text: 'Profit'
				},
				minPadding: 0.2,
				maxPadding: 0.2,
				maxZoom: 60,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			legend: {
				enabled: false
			},

			plotOptions: {
				area: {
					fillOpacity: 0.5
				}
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				series: {
					lineWidth: 1,
					point: {
						events: {
							'click': function click() {
								if (this.series.data.length > 1) {
									this.remove();
								}
							}
						}
					}
				}
			}
		}
	});

	//data: [[190.00,7400],[195.00,7400],[200.00,7400],[205.00,7400],[210.00,7400],[215.00,7400],[220.00,7400],[225.00,7400],[230.00,7400],[235.00,7400],[240.00,7400],[245.00,7400],[250.00,7400],[255.00,7400],[260.00,7400],[265.00,7400],[270.00,7400],[275.00,7400],[280.00,7400],[285.00,7400],[290.00,7400],[295.00,7400],[300.00,7400],[305.00,2400.0000000000005],[310.00,-2599.9999999999995],[315.00,-7600],[320.00,-12600],[325.00,-17600],[330.00,-22600],[335.00,-27600],[340.00,-32600]]
});
define('web/components/option-form', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		strike: null,

		type: null,

		lot: 1,

		actionType: null,

		underLying: null,

		myStrategies: [],

		netGreek: null,

		script: null,

		code: null,

		LotSize: null,

		willRender: function willRender() {
			this.set('actionTypes', ["", "Buy", "Sell"]);

			this.set('types', ["", "FU", "CE", "PE"]);

			this.set('lots', ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

			var option = this.get('data.option');

			this.set('underLying', this.get('data.underLying'));

			this.set('script', this.get('script'));

			this.set('code', this.get('code'));

			this.set('LotSize', this.get('LotSize'));

			var stock1 = _ember['default'].Object.extend({
				strikePrices: _ember['default'].computed.mapBy('option', 'StrikePrice')
			});

			var myStock = stock1.create({ option: [] });
			myStock.option = option;

			this.set('strikePrices', myStock.get('strikePrices').uniq());
		},

		actions: {
			selectLot: function selectLot(lot) {
				console.log("*****lot**** : ", lot);
				this.set('lot', lot);
			},
			selectStrike: function selectStrike(strike) {
				console.log("*****strike**** : ", strike);
				this.set('strike', strike);
			},
			selectType: function selectType(type) {
				console.log("*****type**** : ", type);
				this.set('type', type);
			},
			selectActionType: function selectActionType(actionType) {
				console.log("*****actionType**** : ", actionType);
				this.set('actionType', actionType);
			},
			increment: function increment(index) {

				var myStrategies = this.get('myStrategies');
				console.log("*****increment**** : ", index, myStrategies[index]);
				// let a = myStrategies[index];
				// console.log("*****increment2**** : ",eval(a.Lot+1));
			},

			remove: function remove(index) {
				var myStrategies = this.get('myStrategies');
				myStrategies.removeAt(index);
				this.set('myStrategies', myStrategies);

				var SDelta = 0;
				var SVega = 0;
				var SGamma = 0;
				var STheta = 0;
				var SRho = 0;
				var netGreek = {};
				var LotSize = this.get('LotSize');

				console.log('***LENGTH**** : ', myStrategies.length);
				for (var i = 0; i < myStrategies.length; i++) {
					SDelta = SDelta + myStrategies[i].Lot * eval(eval(myStrategies[i].Delta).toFixed(3));
					SGamma = SGamma + myStrategies[i].Lot * eval(eval(myStrategies[i].Gamma).toFixed(3));
					SVega = SVega + myStrategies[i].Lot * eval(eval(myStrategies[i].Vega).toFixed(3));
					STheta = STheta + myStrategies[i].Lot * eval(eval(myStrategies[i].Theta).toFixed(3));
					SRho = SRho + myStrategies[i].Lot * eval(eval(myStrategies[i].Rho).toFixed(3));
				}
				netGreek = { NetStock: Math.round(eval(SDelta).toFixed(3) * LotSize), Delta: eval(eval(SDelta).toFixed(3)), Vega: eval(eval(SVega).toFixed(3)), Gamma: eval(eval(SGamma).toFixed(3)), Theta: eval(eval(STheta).toFixed(3)), Rho: eval(eval(SRho).toFixed(3)) };
				this.set('netGreek', netGreek);
			},

			loadData: function loadData() {
				var strike = this.get('strike');
				var type = this.get('type');
				var lot = this.get('lot');
				var actionType = this.get('actionType');
				var myStrategies = this.get('myStrategies');
				console.log('strikeRow : ', myStrategies);
				console.log("strike , type , actionType : ", strike, type, actionType);

				var option = this.get('data.option');

				var stock1 = _ember['default'].Object.extend({
					strikePrices: _ember['default'].computed.mapBy('option', 'StrikePrice'),
					strikeP: _ember['default'].computed.filterBy('option', 'StrikePrice', strike),
					strikeC: _ember['default'].computed.filterBy('strikeP', 'type', type)
				});

				var myStock = stock1.create({ option: [] });
				myStock.option = option;
				var rec = myStock.get('strikeC')[0];

				if (actionType == 'Sell') {
					lot = -1 * lot;
				}

				if (type == 'FU') {

					myStrategies.pushObject({ IV: 0, LTP: this.get('data.underLying'), type: 'Future', StrikePrice: this.get('data.underLying'), Lot: lot, Delta: 1, Gamma: 0, Vega: 0, Theta: 0, Rho: 0, CPrice: this.get('data.underLying') });
				} else {
					myStrategies.pushObject({ IV: rec.IV, LTP: rec.LTP, type: rec.type, StrikePrice: rec.StrikePrice, Lot: lot, Delta: rec.Delta, Gamma: rec.Gamma, Vega: rec.Vega, Theta: rec.Theta, Rho: rec.Rho, CPrice: rec.CPrice });
				}

				var SDelta = 0;
				var SVega = 0;
				var SGamma = 0;
				var STheta = 0;
				var SRho = 0;
				var netGreek = {};

				//console.log('***LENGTH**** : ',myStrategies.length);
				for (var i = 0; i < myStrategies.length; i++) {

					SDelta = SDelta + myStrategies[i].Lot * eval(eval(myStrategies[i].Delta).toFixed(3));
					SGamma = SGamma + myStrategies[i].Lot * eval(eval(myStrategies[i].Gamma).toFixed(3));
					SVega = SVega + myStrategies[i].Lot * eval(eval(myStrategies[i].Vega).toFixed(3));
					STheta = STheta + myStrategies[i].Lot * eval(eval(myStrategies[i].Theta).toFixed(3));
					SRho = SRho + myStrategies[i].Lot * eval(eval(myStrategies[i].Rho).toFixed(3));
				}
				var LotSize = this.get('LotSize');

				netGreek = { NetStock: Math.round(eval(SDelta).toFixed(3) * LotSize), Delta: eval(eval(SDelta).toFixed(3)), Vega: eval(eval(SVega).toFixed(3)), Gamma: eval(eval(SGamma).toFixed(3)), Theta: eval(eval(STheta).toFixed(3)), Rho: eval(eval(SRho).toFixed(3)) };
				this.set('netGreek', netGreek);
				this.set('myStrategies', myStrategies);
				//console.log('netGreek : ',netGreek);
			}
		}

	});
});
define('web/components/pikaday-input', ['exports', 'ember', 'ember-pikaday/components/pikaday-input'], function (exports, _ember, _emberPikadayComponentsPikadayInput) {
  exports['default'] = _emberPikadayComponentsPikadayInput['default'];
});
define('web/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _emberPikadayComponentsPikadayInputless) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPikadayComponentsPikadayInputless['default'];
    }
  });
});
define('web/components/stock-list', ['exports', 'ember', 'web/config/environment'], function (exports, _ember, _webConfigEnvironment) {
		//import greek from 'web/public/greek';
		exports['default'] = _ember['default'].Component.extend({
				//stock:this.store.findAll('stock'),

				optionChain: null,
				myReports: [],

				store: _ember['default'].inject.service(),

				willRender: function willRender() {
						this.set('actionTypes', ["", "Buy", "Sell"]);

						this.set('stocks', this.get('stocks'));

						this.set('types', ["", "CE", "PE", "FU"]);

						this.set('lots', ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

						console.log(greek.palam('From Stock List'));
				},

				didReceiveAttrs: function didReceiveAttrs() {
						this._super.apply(this, arguments);
						this.errors = [];
						var pal = this;
				},

				actions: {
						selectLot: function selectLot(lot) {
								console.log("*****lot**** : ", lot);
								this.set('lot', lot);
						},
						selectExpiry: function selectExpiry(expiry) {
								var code = this.get('code');
								console.log("*****Code , expiry : ", code, expiry);

								var pal = this;
								$.getJSON(_webConfigEnvironment['default'].APP.host + ('/api/Usoptions/getUSOption?code=' + code + '&date=' + expiry)).then(function (json) {
										pal.set('optionChain', json.data.optionChain.result[0]);
										console.log("optionChain  : ", json.data.optionChain.result[0]);
								});
								this.set('expiry', expiry);
						},
						selectCode: function selectCode(code) {
								console.log("*****code**** : ", code);
								var pal = this;
								pal.set('code', code);
								$.getJSON(_webConfigEnvironment['default'].APP.host + ('/api/Usoptions/getUSOption?code=' + code)).then(function (json) {
										pal.set('optionChain', json.data.optionChain.result[0]);
										console.log("optionChain  : ", json.data.optionChain.result[0]);
										pal.set('myReports', []);
										pal.set('underlying', json.data.optionChain.result[0].quote.regularMarketPrice);
								});
						},
						selectStrikePrice: function selectStrikePrice(strike) {
								console.log("*****strike**** : ", strike);
								var pal = this;
								pal.set('strike', strike);
						},
						selectType: function selectType(type) {
								console.log("*****type**** : ", type);
								var pal = this;
								pal.set('type', type);
						},
						selectActionType: function selectActionType(actionType) {
								console.log("*****actionType**** : ", actionType);
								var pal = this;
								pal.set('actionType', actionType);
						},
						addRecord: function addRecord() {
								var code = this.get('code');
								var lot = this.get('lot');
								var expiry = this.get('expiry');
								var strike = this.get('strike');
								var type = this.get('type');
								var actionType = this.get('actionType');
								var optionChain = this.get('optionChain');
								var myReports = this.get('myReports');
								var quote = optionChain.quote;
								var myDelta = 0;
								var thPrice = 0;
								var netDelta = 0;
								var IRate = 0.025;
								if (actionType == 'Sell') {
										lot = -1 * lot;
								}

								var pal = this;
								//let myReports = pal.get('myReports');
								console.log("code , expiry, strike ,type, actionType", code, expiry, strike, type, actionType);
								if (type == 'FU') {
										var calls = optionChain.options[0].calls;
										expiry = calls[0].expiration.fmt;
										myDelta = 1 * lot;
										myReports.pushObject({ lot: lot, shortname: quote.shortName, code: code, underlying: quote.regularMarketPrice, type: type, actiontype: actionType, lot: lot, strike: quote.regularMarketPrice, ask: quote.regularMarketPrice, thPrice: quote.regularMarketPrice, expiration: expiry, iv: 0, lastPrice: quote.regularMarketPrice, delta: myDelta });
								} else if (type == 'CE') {

										var calls = optionChain.options[0].calls;
										console.log('Call eleiments : ', calls);
										for (var i = 0; i < calls.length; i++) {
												if (calls[i].strike.raw == strike) {
														myDelta = greek.getDelta(quote.regularMarketPrice, calls[i].strike.raw, greek.numDaysToExpiry(calls[i].expiration.raw), calls[i].impliedVolatility.raw, IRate, 'call');
														myDelta = eval(myDelta.toFixed(2));

														thPrice = parseFloat(bs.blackScholes(quote.regularMarketPrice, calls[i].strike.raw, greek.numDaysToExpiry(calls[i].expiration.raw), calls[i].impliedVolatility.raw, IRate, 'call')).toFixed(2);
														myReports.pushObject({ lot: lot, shortname: quote.shortName, code: code, underlying: quote.regularMarketPrice, type: type, actiontype: actionType, lot: lot, strike: calls[i].strike.raw, ask: calls[i].ask.raw, thPrice: thPrice, expiration: calls[i].expiration.fmt, iv: eval(calls[i].impliedVolatility.raw * 100).toFixed(2), lastPrice: calls[i].lastPrice.raw, delta: myDelta });
														console.log(greek.palam('From Stock List Call'));
												}
										}

										//reports.push({aa:'2',bb:'1'});
								} else if (type == 'PE') {
												var puts = optionChain.options[0].puts;
												for (var i = 0; i < puts.length; i++) {
														if (puts[i].strike.raw == strike) {
																myDelta = greek.getDelta(quote.regularMarketPrice, puts[i].strike.raw, greek.numDaysToExpiry(puts[i].expiration.raw), puts[i].impliedVolatility.raw, IRate, 'put');
																myDelta = eval(myDelta.toFixed(2));

																thPrice = parseFloat(bs.blackScholes(quote.regularMarketPrice, puts[i].strike.raw, greek.numDaysToExpiry(puts[i].expiration.raw), puts[i].impliedVolatility.raw, IRate, 'put')).toFixed(2);

																myReports.pushObject({ lot: lot, shortname: quote.shortName, code: code, underlying: quote.regularMarketPrice, type: type, actiontype: actionType, lot: lot, strike: puts[i].strike.raw, ask: puts[i].ask.raw, thPrice: thPrice, expiration: puts[i].expiration.fmt, iv: eval(puts[i].impliedVolatility.raw * 100).toFixed(2), lastPrice: puts[i].lastPrice.raw, delta: myDelta });
																console.log(greek.palam('From Stock List Put'));
														}
												}

												//console.log('Put eleiments : ',optionChain.options[0].puts);
										}
								//this.set('abc',myReports);
								for (var k = 0; k < myReports.length; k++) {
										netDelta += myReports[k].delta * myReports[k].lot;
								}
								netDelta = netDelta.toFixed(2);
								this.set('netDelta', netDelta);
								this.set('myReports', myReports);
								this.set('reportCount', myReports.length); // Needed to refresh chart on the fly
								console.log('Reports eleiments : ', myReports);
						},
						remove: function remove(index) {
								alert(index);

								var myReports = this.get('myReports');
								var netDelta = 0;
								console.log('Myreport Count ', myReports.length);
								myReports.removeAt(index);
								this.set('myReports', myReports);
								this.set('reportCount', myReports.length); // Needed to refresh chart on the fly
								for (var k = 0; k < myReports.length; k++) {
										netDelta += myReports[k].delta * myReports[k].lot;
								}
								netDelta = netDelta.toFixed(2);
								this.set('netDelta', netDelta);
						},
						addToReport: function addToReport(myReports) {
								var pal = this;
								console.info('reports to save:', myReports);

								_ember['default'].$.ajax({
										url: _webConfigEnvironment['default'].APP.host + "/api/Coverdoptions",
										type: "POST",
										headers: {
												'Content-Type': 'application/json'
										},
										data: JSON.stringify(myReports)
								}).then(function (resp) {
										console.info("response : ", resp);
										pal.set('myReports', []);
								})['catch'](function (error) {
										console.info("Error : ", error);
								});
						}

				}
		});
});
define('web/components/strategy-loader', ['exports', 'ember', 'web/config/environment', 'web/models/nseoption'], function (exports, _ember, _webConfigEnvironment, _webModelsNseoption) {
	exports['default'] = _ember['default'].Component.extend({
		code: null,
		expiries: null,
		optionData: null,
		script: null,
		LotSize: null,

		willRender: function willRender() {
			this.set('expiries', ["selectExpiry", "27JUL2017", "31AUG2017", "28SEP2017"]);
		},

		actions: {
			selectExpiry: function selectExpiry(expiry) {
				console.log("*****expiry**** : ", expiry);
				this.set('expiry', expiry);
			},
			selectCode: function selectCode(code) {
				console.log("*****code**** : ", code);
				this.set('code', code);
				var script = this.get('model');
				var LotSize = 1000;
				for (var i = 0; i < script.length; i++) {
					if (script[i].Code == code) {
						LotSize = script[i].Lot;
						this.set('LotSize', LotSize);
						console.log('++++ LOTSIZE ++++ : ', LotSize);
						break;
					}
				}
			},
			loadData: function loadData() {
				var _this = this;

				var code = this.get('code');
				var expiry = this.get('expiry');
				if (expiry == undefined || expiry == 'selectExpiry') {
					alert("Please select expiry");
					return false;
				} else {
					(function () {
						console.log("code , expiry : ", code, expiry);
						var url = 'Code=' + code + '&Expiry=' + expiry;

						var pal = _this;
						pal.set('script', _this.get('script'));
						$.getJSON(_webConfigEnvironment['default'].APP.host + ('/api/nseoptionchain/getOptionChain?' + url)).then(function (json) {
							pal.set('optionData', json.data);
						});
					})();
				}

				//console.log("optionData1  : ",this.get('optionData'));
				//this.sendAction("action",url);
				//this.get('load')(url);
			}
		}

	});
});
define('web/components/table-list', ['exports', 'ember'], function (exports, _ember) {
				exports['default'] = _ember['default'].Component.extend({
								fiis: _ember['default'].computed.filterBy('model', 'Client_Type', 'FII'),
								fiisFutureIndex: _ember['default'].computed.mapBy('fiis', 'Future_Index'),

								dateIndex: _ember['default'].computed.mapBy('fiis', 'date'),

								diis: _ember['default'].computed.filterBy('model', 'Client_Type', 'DII'),
								diisFutureIndex: _ember['default'].computed.mapBy('diis', 'Future_Index'),

								pros: _ember['default'].computed.filterBy('model', 'Client_Type', 'Pro'),
								prosFutureIndex: _ember['default'].computed.mapBy('pros', 'Future_Index'),

								clients: _ember['default'].computed.filterBy('model', 'Client_Type', 'Client'),
								clientsFutureIndex: _ember['default'].computed.mapBy('clients', 'Future_Index'),

								mySeries: _ember['default'].computed('fiisFutureIndex', 'diisFutureIndex', 'prosFutureIndex', 'clientsFutureIndex', function () {
												return [{ name: 'FII', data: this.get('fiisFutureIndex') }, { name: 'DII', data: this.get('diisFutureIndex') }, { name: 'Pro', data: this.get('prosFutureIndex') }, { name: 'Clien', data: this.get('clientsFutureIndex') }];
								}),
								chartOptions: {
												chart: {
																type: 'spline'
												},
												title: {
																text: 'Monthly Average Temperature'
												},
												subtitle: {
																text: 'Source: WorldClimate.com'
												},
												xAxis: {
																categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
												},
												yAxis: {
																title: {
																				text: 'Temperature'
																},
																labels: {
																				formatter: function formatter() {
																								return this.value + '°';
																				}
																}
												},
												tooltip: {
																crosshairs: true,
																shared: true
												},
												plotOptions: {
																spline: {
																				marker: {
																								radius: 4,
																								lineColor: '#666666',
																								lineWidth: 1
																				}
																}
												}
								},

								chartData: [{
												name: 'Tokyo',
												marker: {
																symbol: 'square'
												},
												data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
																y: 26.5,
																marker: {
																				symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
																}
												}, 23.3, 18.3, 13.9, 9.6]

								}, {
												name: 'London',
												marker: {
																symbol: 'diamond'
												},
												data: [{
																y: 3.9,
																marker: {
																				symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
																}
												}, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
								}]
				});
});
define('web/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('web/controllers/faooi', ['exports', 'ember'], function (exports, _ember) {
	//import defaultTheme from '../themes/default-theme';

	exports['default'] = _ember['default'].Controller.extend({

		// fii : Ember.Computed('model',function(){
		// 	return this.get('model').reduce(function(prev,row){
		// 		if(row.Client_Type == 'FII')
		// 			prev.push(row.Future_Index)
		// 		return prev
		// 	},0);
		// })

		fiis: _ember['default'].computed.filterBy('model', 'Client_Type', 'FII'),
		fiisFutureIndex: _ember['default'].computed.mapBy('fiis', 'Future_Index'),
		fiisFutureStock: _ember['default'].computed.mapBy('fiis', 'Future_Stock'),
		fiisOIC: _ember['default'].computed.mapBy('fiis', 'Option_Index_Call'),
		fiisOIP: _ember['default'].computed.mapBy('fiis', 'Option_Index_Put'),
		fiisOSC: _ember['default'].computed.mapBy('fiis', 'Option_Stock_Call'),
		fiisOSP: _ember['default'].computed.mapBy('fiis', 'Option_Stock_Put'),

		dateIndex: _ember['default'].computed.mapBy('fiis', 'date'),

		diis: _ember['default'].computed.filterBy('model', 'Client_Type', 'DII'),
		diisFutureIndex: _ember['default'].computed.mapBy('diis', 'Future_Index'),
		diisFutureStock: _ember['default'].computed.mapBy('diis', 'Future_Stock'),
		diisOIC: _ember['default'].computed.mapBy('diis', 'Option_Index_Call'),
		diisOIP: _ember['default'].computed.mapBy('diis', 'Option_Index_Put'),
		diisOSC: _ember['default'].computed.mapBy('diis', 'Option_Stock_Call'),
		diisOSP: _ember['default'].computed.mapBy('diis', 'Option_Stock_Put'),

		pros: _ember['default'].computed.filterBy('model', 'Client_Type', 'Pro'),
		prosFutureIndex: _ember['default'].computed.mapBy('pros', 'Future_Index'),
		prosFutureStock: _ember['default'].computed.mapBy('pros', 'Future_Stock'),
		prosOIC: _ember['default'].computed.mapBy('pros', 'Option_Index_Call'),
		prosOIP: _ember['default'].computed.mapBy('pros', 'Option_Index_Put'),
		prosOSC: _ember['default'].computed.mapBy('pros', 'Option_Stock_Call'),
		prosOSP: _ember['default'].computed.mapBy('pros', 'Option_Stock_Put'),

		clients: _ember['default'].computed.filterBy('model', 'Client_Type', 'Client'),
		clientsFutureIndex: _ember['default'].computed.mapBy('clients', 'Future_Index'),
		clientsFutureStock: _ember['default'].computed.mapBy('clients', 'Future_Stock'),
		clientsOIC: _ember['default'].computed.mapBy('clients', 'Option_Index_Call'),
		clientsOIP: _ember['default'].computed.mapBy('clients', 'Option_Index_Put'),
		clientsOSC: _ember['default'].computed.mapBy('clients', 'Option_Stock_Call'),
		clientsOSP: _ember['default'].computed.mapBy('clients', 'Option_Stock_Put'),

		// fiiSeries: Ember.computed('fiisFutureIndex', 'fiisFutureStock','fiisOIC','fiisOIP','fiisOSC','fiisOSP',function() {
		//     return [{name:'FI',data:this.get('fiisFutureIndex')},{name:'FS',data:this.get('fiisFutureStock')},{name:'OIC',data:this.get('fiisOIC')} ,{name:'OIP',data:this.get('fiisOIP')},{name:'OSC',data:this.get('fiisOSC'),{name:'OSP',data:this.get('fiisOSP')}]
		// }),

		//theme: defaultTheme

		chartOptionsFII: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'FII'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'FII'
				},
				labels: {
					formatter: function formatter() {
						return this.value;
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},

		chartDataFII: _ember['default'].computed('fiisFutureIndex', 'fiisFutureStock', 'fiisOIC', 'fiisOIP', 'fiisOSC', 'fiisOSP', function () {
			return [{ name: 'FutureIndex', data: this.get('fiisFutureIndex') }, { name: 'FutureStock', data: this.get('fiisFutureStock') }, { name: 'OptionIndexCall', data: this.get('fiisOIC') }, { name: 'OptionIndexPut', data: this.get('fiisOIP') }, { name: 'OptionStockCall', data: this.get('fiisOSC') }, { name: 'OptionStockPut', data: this.get('fiisOSP') }];
		}),

		chartOptionsPro: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Pro'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Pro'
				},
				labels: {
					formatter: function formatter() {
						return this.value;
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},

		chartDataPro: _ember['default'].computed('prosFutureIndex', 'prosFutureStock', 'prosOIC', 'prosOIP', 'prosOSC', 'prosOSP', function () {
			return [{ name: 'FutureIndex', data: this.get('prosFutureIndex') }, { name: 'FutureStock', data: this.get('prosFutureStock') }, { name: 'OptionIndexCall', data: this.get('prosOIC') }, { name: 'OptionIndexPut', data: this.get('prosOIP') }, { name: 'OptionStockCall', data: this.get('prosOSC') }, { name: 'OptionStockPut', data: this.get('prosOSP') }];
		}),

		chartOptionsFI: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Future Index'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Future Index'
				},
				labels: {
					formatter: function formatter() {
						return this.value + '°';
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},

		chartDataFI: _ember['default'].computed('fiisFutureIndex', 'diisFutureIndex', 'prosFutureIndex', 'clientsFutureIndex', function () {
			return [{ name: 'FII', data: this.get('fiisFutureIndex') }, { name: 'DII', data: this.get('diisFutureIndex') }, { name: 'Pro', data: this.get('prosFutureIndex') }, { name: 'Client', data: this.get('clientsFutureIndex') }];
		}),

		chartOptionsFS: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Future Stock'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Future Stock'
				},
				labels: {
					formatter: function formatter() {
						return this.value + '°';
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},

		chartDataFS: _ember['default'].computed('fiisFutureStock', 'diisFutureStock', 'prosFutureStock', 'clientsFutureStock', function () {
			return [{ name: 'FII', data: this.get('fiisFutureStock') }, { name: 'DII', data: this.get('diisFutureStock') }, { name: 'Pro', data: this.get('prosFutureStock') }, { name: 'Client', data: this.get('clientsFutureStock') }];
		}),

		chartOptionsOIC: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Option Index Call'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Option Index Call'
				},
				labels: {
					formatter: function formatter() {
						return this.value + '°';
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},

		chartDataOIC: _ember['default'].computed('fiisOIC', 'diisOIC', 'prosOIC', 'clientsOIC', function () {
			return [{ name: 'FII', data: this.get('fiisOIC') }, { name: 'DII', data: this.get('diisOIC') }, { name: 'Pro', data: this.get('prosOIC') }, { name: 'Client', data: this.get('clientsOIC') }];
		}),

		chartOptionsOIP: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Option Index Put'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Option Index Put'
				},
				labels: {
					formatter: function formatter() {
						return this.value;
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},
		chartDataOIP: _ember['default'].computed('fiisOIP', 'diisOIP', 'prosOIP', 'clientsOIP', function () {
			return [{ name: 'FII', data: this.get('fiisOIP') }, { name: 'DII', data: this.get('diisOIP') }, { name: 'Pro', data: this.get('prosOIP') }, { name: 'Client', data: this.get('clientsOIP') }];
		}),

		chartOptionsOSP: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Option Stock Put'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Option Stock Put'
				},
				labels: {
					formatter: function formatter() {
						return this.value;
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},
		chartDataOSP: _ember['default'].computed('fiisOSP', 'diisOSP', 'prosOSP', 'clientsOSP', function () {
			return [{ name: 'FII', data: this.get('fiisOSP') }, { name: 'DII', data: this.get('diisOSP') }, { name: 'Pro', data: this.get('prosOSP') }, { name: 'Client', data: this.get('clientsOSP') }];
		}),

		chartOptionsOSC: {
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Option Stock Call'
			},
			subtitle: {
				text: 'Source: Dailymint.co.in'
			},
			xAxis: {
				categories: _ember['default'].computed.mapBy('fiis', 'date')
			},
			yAxis: {
				title: {
					text: 'Option Stock Call'
				},
				labels: {
					formatter: function formatter() {
						return this.value;
					}
				}
			},
			tooltip: {
				crosshairs: true,
				shared: true
			},
			plotOptions: {
				spline: {
					marker: {
						radius: 4,
						lineColor: '#666666',
						lineWidth: 1
					}
				}
			}
		},
		chartDataOSC: _ember['default'].computed('fiisOSC', 'diisOSC', 'prosOSC', 'clientsOSC', function () {
			return [{ name: 'FII', data: this.get('fiisOSC') }, { name: 'DII', data: this.get('diisOSC') }, { name: 'Pro', data: this.get('prosOSC') }, { name: 'Client', data: this.get('clientsOSC') }];
		})

	});
});
define('web/controllers/option-chart', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({

		myName: 'fsdfdsfds'

	});
});
define('web/controllers/startegy-loader', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		myName: 'fsdfdsfds'

	});
});
define('web/controllers/strategy', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		myName: 'fsdfdsfds'
	});
});
define("web/helpers/aeq-select", ["exports", "ember"], function (exports, _ember) {
  exports.aeqSelect = aeqSelect;

  /**
   * Almost equal helpers for html Select tag
   * @param  {Array} params Array of params
   * @return {Boolean} Whether or not the passed params equal value but perhaps not type
   */

  function aeqSelect(params) {
    if (String(params[0]) === String(params[1])) {
      return "selected";
    } else {
      return "false";
    }
  }

  exports["default"] = _ember["default"].Helper.helper(aeqSelect);
});
/*jslint eqeq: true*/
define('web/helpers/aeq', ['exports', 'ember'], function (exports, _ember) {
  exports.aeq = aeq;

  /**
   * Almost equal helpers
   * @param  {Array} params Array of params
   * @return {Boolean} Whether or not the passed params equal value but perhaps not type
   */

  function aeq(params) {
    return String(params[0]) === String(params[1]);
  }

  exports['default'] = _ember['default'].Helper.helper(aeq);
});
/*jslint eqeq: true*/
define('web/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/app-version', ['exports', 'ember', 'web/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _webConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _webConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('web/helpers/chart-data', ['exports', 'ember'], function (exports, _ember) {
  exports.chartData = chartData;

  function chartData(params /*, hash*/) {
    return [{ data: params[0] }];
  }

  exports['default'] = _ember['default'].Helper.helper(chartData);
});
define('web/helpers/date-timestamp', ['exports', 'ember'], function (exports, _ember) {
  exports.dateTimestamp = dateTimestamp;

  function dateTimestamp(params /*, hash*/) {
    var d = new Date(params[0] * 1000);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  }

  exports['default'] = _ember['default'].Helper.helper(dateTimestamp);
});
define('web/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/gann', ['exports'], function (exports) {

  var gann = {
    degree: function degree(p) {
      return (180 * Math.sqrt(p - 1) - 255) % 360;
    },

    degree1: function degree1(p) {
      var k = 180 * Math.sqrt(p - 1) - 255;
      return k % 360;
    },

    degreeDiff: function degreeDiff(p1, p2) {
      return 180 * (Math.sqrt(p1) - Math.sqrt(p2)) % 360;
    },

    priceAngle: function priceAngle(p, angle) {
      return (Math.sqrt(p) + angle) * (Math.sqrt(p) + angle);
    },

    // GANN Emberlem
    /*
    90' = 0.5
    120' = 0.66
    180' = 1.00
    240' = 1.32
    270' = 1.50
    360' = 2.00
      //ATR = if ATR is compleeted then stock will not fall
    // GANN DATES
    Feb = 3;//7
    March=21;//23
    May = 3;//7
    Jun = 20;//25
    Aug=3;//8
    Sep = 21;//24
    Nov = 8;//11
    Dec = 20;//25
      // GANN Emberlem
    90' = 0.5
    120' = 0.66
    180' = 1.00
    240' = 1.32
    270' = 1.50
    360' = 2.00
    */
    getGannRange: function getGannRange(p) {
      var p45 = (Math.sqrt(p) + 0.25) * (Math.sqrt(p) + 0.25);
      var p90 = (Math.sqrt(p) + 0.5) * (Math.sqrt(p) + 0.5);
      var p120 = (Math.sqrt(p) + 0.66) * (Math.sqrt(p) + 0.66);
      var p180 = (Math.sqrt(p) + 1) * (Math.sqrt(p) + 1);
      var p240 = (Math.sqrt(p) + 1.32) * (Math.sqrt(p) + 1.32);
      var p270 = (Math.sqrt(p) + 1.5) * (Math.sqrt(p) + 1.5);
      var p360 = (Math.sqrt(p) + 2) * (Math.sqrt(p) + 2);
      var up = new Array(p45, p90, p120, p180, p240, p270, p360);

      var p45 = (Math.sqrt(p) - 0.25) * (Math.sqrt(p) - 0.25);
      p90 = (Math.sqrt(p) - 0.5) * (Math.sqrt(p) - 0.5);
      p120 = (Math.sqrt(p) - 0.66) * (Math.sqrt(p) - 0.66);
      p180 = (Math.sqrt(p) - 1) * (Math.sqrt(p) - 1);
      p240 = (Math.sqrt(p) - 1.32) * (Math.sqrt(p) - 1.32);
      p270 = (Math.sqrt(p) - 1.5) * (Math.sqrt(p) - 1.5);
      p360 = (Math.sqrt(p) - 2) * (Math.sqrt(p) - 2);

      var dn = new Array(p45, p90, p120, p180, p240, p270, p360);

      return new Array(up, dn);
    },

    // a and b are javascript Date objects
    dateDiffInDays: function dateDiffInDays(a, b) {

      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    },

    gannMagic: function gannMagic(pHigh, pLow, dHigh, dLow) {
      var priceRange = pHigh - pLow;
      var timeWindow = Math.round(Math.sqrt(priceRange));
      var dateDiff = dateDiffInDays(new Date(dHigh), new Date(dLow));
      var tradingDays = dateDiff * 1.4;
      var stDate1 = stDate = baseDate = new Date(dHigh) > new Date(dLow) ? new Date(dHigh) : new Date(dLow);
      var priceDirection = new Date(dHigh) > new Date(dLow) ? -1 : 1;
      var dateWindow = new Array();
      var priceWindow = new Array();

      console.log("dateDiff,priceRange ", dateDiff, priceRange);

      baseDate.setDate(baseDate.getDate() + timeWindow);
      dateWindow.push(baseDate.toJSON());
      baseDate.setDate(baseDate.getDate() + timeWindow);
      dateWindow.push(baseDate.toJSON());

      baseDate.setDate(baseDate.getDate() + timeWindow);
      dateWindow.push(baseDate.toJSON());

      baseDate.setDate(baseDate.getDate() + timeWindow);
      dateWindow.push(baseDate.toJSON());

      stDate.setDate(stDate.getDate() + dateDiff - 2 * timeWindow);
      dateWindow.push(stDate.toJSON());

      stDate.setDate(stDate.getDate() + timeWindow);
      dateWindow.push(stDate.toJSON());

      for (var i = 1; i < 7; i++) {
        priceWindow.push((Math.sqrt(pLow) + i) * (Math.sqrt(pLow) + i));
        //priceWindow.push((Math.sqrt(pHigh) + i)*(Math.sqrt(pHigh) + i));
      }

      for (var i = 1; i < 7; i++) {
        //priceWindow.push((Math.sqrt(pLow) - i)*(Math.sqrt(pLow) - i));
        priceWindow.push((Math.sqrt(pHigh) - i) * (Math.sqrt(pHigh) - i));
      }

      console.log('date Window :', dateWindow);
      console.log('price window :', priceWindow.sort());
    }
    //gannMagic(282.2,241.1,'02/10/2017','01/03/2017')

  };
});
define('web/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('web/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('web/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('web/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _emberRouteActionHelperHelpersRouteAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouteActionHelperHelpersRouteAction['default'];
    }
  });
});
define('web/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('web/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('web/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'web/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _webConfigEnvironment) {
  var _config$APP = _webConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('web/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('web/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('web/initializers/ember-simple-auth', ['exports', 'web/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _webConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _webConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _webConfigEnvironment['default'].rootURL || _webConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('web/initializers/export-application-global', ['exports', 'ember', 'web/config/environment'], function (exports, _ember, _webConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_webConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _webConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_webConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('web/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('web/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("web/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('web/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('web/mixins/adapter-fetch', ['exports', 'ember-fetch/mixins/adapter-fetch'], function (exports, _emberFetchMixinsAdapterFetch) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFetchMixinsAdapterFetch['default'];
    }
  });
});
define('web/models/code', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Object.extend({});
});
define('web/models/faooi', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Object.extend({

		Future_Index: _ember['default'].computed('Future_Index_Long', 'Future_Index_Short', function () {
			return this.get('Future_Index_Long') - this.get('Future_Index_Short');
		}),
		Future_Stock: _ember['default'].computed('Future_Stock_Long', 'Future_Stock_Short', function () {
			return this.get('Future_Stock_Long') - this.get('Future_Stock_Short');
		}),
		Option_Index_Call: _ember['default'].computed('Option_Index_Call_Long', 'Option_Index_Call_Short', function () {
			return this.get('Option_Index_Call_Long') - this.get('Option_Index_Call_Short');
		}),
		Option_Index_Put: _ember['default'].computed('Option_Index_Put_Long', 'Option_Index_Put_Short', function () {
			return this.get('Option_Index_Put_Long') - this.get('Option_Index_Put_Short');
		}),
		Option_Stock_Call: _ember['default'].computed('Option_Stock_Call_Long', 'Option_Stock_Call_Short', function () {
			return this.get('Option_Stock_Call_Long') - this.get('Option_Stock_Call_Short');
		}),
		Option_Stock_Put: _ember['default'].computed('Option_Stock_Put_Long', 'Option_Stock_Put_Short', function () {
			return this.get('Option_Stock_Put_Long') - this.get('Option_Stock_Put_Short');
		})

	});
});
define('web/models/nseoption', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		strikes: Ember.computed('StrikePrice', function () {
			return this.get('StrikePrice');
		})

	});
});
define('web/models/stock', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Object.extend({});
});
define('web/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('web/router', ['exports', 'ember', 'web/config/environment'], function (exports, _ember, _webConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _webConfigEnvironment['default'].locationType,
    rootURL: _webConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('faooi');
    this.route('strategy');
    //this.route('not-found');
    this.route('not-found', { path: '/*path' });
    this.route('usoptions');
  });

  exports['default'] = Router;
});
define('web/routes/application', ['exports', 'ember'], function (exports, _ember) {
  var Route = _ember['default'].Route;

  // Ensure the application route exists for ember-simple-auth's `setup-session-restoration` initializer
  exports['default'] = Route.extend();
});
define('web/routes/faooi', ['exports', 'ember', 'web/models/faooi', 'web/config/environment'], function (exports, _ember, _webModelsFaooi, _webConfigEnvironment) {
	var Promise = _ember['default'].RSVP.Promise;
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			//return this.store.query('#faooi');
			//return Ember.$.getJSON("http://localhost:3000/api/faooi")
			return new Promise(function (resolve) {
				_ember['default'].$.ajax({
					url: _webConfigEnvironment['default'].APP.host + "/api/faooi?filter[order][1]=date",
					contentType: 'application/json;charset=utf-8',
					dataType: 'json'
				}).then(function (response) {
					//console.log('RESPONSE1 : ',response);
					var store = this.store;

					var records = [];
					response.forEach(function (item) {

						records.push(_webModelsFaooi['default'].create(item));
					});

					resolve(records);
				}, function (xhr, status, error) {
					var response = xhr.responseText;

					resolve(response);
				});
			});
		}
	});
});
define('web/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		init: function init() {
			// console.log("router.index.init");
			console.log("SESSION INFO : ", this.get('session.data.isAuthenticated'));
		},

		activate: function activate() {
			// console.log("router.index.activate");
		},

		// IMPORTANT - do not comment out beforeModel - other wise home page won't load - probably Ember bug :-(
		beforeModel: function beforeModel(transition) {
			// console.log("router.index.beforeModel");
			//this.replaceWith('faooi');
			//this.transitionTo('faooi');
		},

		actions: {
			login: function login(email, password) {
				this.get('session').authenticate('authenticator:application', email, password)['catch'](function (reason) {
					console.log(reason);
				});
			},
			invalidateSession: function invalidateSession() {
				this.get('session').invalidate();
			}
		}

	});
});
define('web/routes/not-found', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('web/routes/strategy', ['exports', 'ember'], function (exports, _ember) {
	//import Code from 'web/models/code';
	//const Promise = Ember.RSVP.Promise;

	exports['default'] = _ember['default'].Route.extend({

		model: function model(params) {
			//return this.store.query('#faooi');
			//return Ember.$.getJSON("http://localhost:3000/api/faooi")
			this.set('params', params);

			return this.get('scripts').script(params);
		},

		scripts: _ember['default'].inject.service('scripts'),

		actions: {
			loadData: function loadData(url) {
				this.transitionTo(url);
			}
		}

	});
});
define('web/routes/usoptions', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(params) {
			return this.get('stoocks').stock(params);
		},
		stoocks: _ember['default'].inject.service('stocks'),
		reports: [],
		actions: {}
	});
});
define('web/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('web/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('web/services/scripts', ['exports', 'ember', 'web/models/code', 'web/config/environment'], function (exports, _ember, _webModelsCode, _webConfigEnvironment) {
	exports['default'] = _ember['default'].Service.extend({

		script: function script(params) {

			var data = _ember['default'].$.getJSON(_webConfigEnvironment['default'].APP.host + '/api/code?filter[order][1]=Code');

			return data.then(function (json) {
				var records = [];
				console.log('json :', json);
				json.forEach(function (item) {
					records.push(_webModelsCode['default'].create(item));
				});

				return records;
			});
		}

	});
});
define('web/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('web/services/stocks', ['exports', 'ember', 'web/models/stock', 'web/config/environment'], function (exports, _ember, _webModelsStock, _webConfigEnvironment) {
	exports['default'] = _ember['default'].Service.extend({
		stock: function stock(params) {

			var data = _ember['default'].$.getJSON(_webConfigEnvironment['default'].APP.host + '/api/Stocks?filter[order][1]=name');

			return data.then(function (json) {
				var records = [];
				console.log('json :', json);
				json.forEach(function (item) {
					records.push(_webModelsStock['default'].create(item));
				});

				return records;
			});
		}
	});
});
define('web/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("web/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rxsOcqbt", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,3],[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"links\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"faooi\"],null,2],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"strategy\"],null,1],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"usoptions\"],null,0],[\"text\",\"\\n\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"body\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            US Options\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            Strategy\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            FII Activities\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"NSE\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/application.hbs" } });
});
define("web/templates/components/coverdoption-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "qZ7L2sQt", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Report List\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"myReports\"]]],null,2,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \\t\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"shortname\"]],false],[\"text\",\" (\"],[\"append\",[\"unknown\",[\"t\",\"code\"]],false],[\"text\",\")\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"underlying\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"expiration\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"strike\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"lastPrice\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"lot\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"delta\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"iv\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"remove\",[\"get\",[\"index\"]]]],[\"flush-element\"],[\"text\",\"Remove \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \\n\"]],\"locals\":[\"t\",\"index\"]},{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-striped\"],[\"flush-element\"],[\"text\",\"\\n \\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Company Name\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Stock price\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Expiry\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Strike\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Option premium\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Lot\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Bought Delta\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Volatility\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Action\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n \\n\"],[\"block\",[\"each\"],[[\"get\",[\"myReports\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addToReport\",[\"get\",[\"myReports\"]]]],[\"flush-element\"],[\"text\",\"Add To Reports \"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"greek-chart\"],null,[[\"reports\",\"oc\"],[[\"get\",[\"myReports\"]],[\"get\",[\"oc\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/coverdoption-list.hbs" } });
});
define("web/templates/components/fii-listing", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2FAgmaNO", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbo\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"right tomster\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n   \\n \"],[\"comment\",\"\\nCLIENT : {{model.[0].Client_Type}},\\nFuture_Index : {{model.[0].Future_Index }},\\nFuture_Index_Long : {{model.[0].Future_Index_Long }},\\nFuture_Index_Short : {{model.[0].Future_Index_Short}}<br/>\\n\\nFuture_Stock : {{model.[0].Future_Stock }},\\nFuture_Stock_Long : {{model.[0].Future_Stock_Long}},\\nFuture_Stock_Short : {{model.[0].Future_Stock_Short}},<br/>\\n\\nOption_Index_Call : {{model.[0].Option_Index_Call }},\\nOption_Index_Call_Long : {{model.[0].Option_Index_Call_Long}},\\nOption_Index_Call_Short : {{model.[0].Option_Index_Call_Short}},<br/>\\n\\nOption_Index_Put : {{model.[0].Option_Index_Put }},\\nOption_Index_Put_Long : {{model.[0].Option_Index_Put_Long}},\\nOption_Index_Put_Short : {{model.[0].Option_Index_Put_Short}},<br/>\\n\\nOption_Stock_Cal : {{model.[0].Option_Stock_Cal }},\\nOption_Stock_Call_Long : {{model.[0].Option_Stock_Call_Long}},\\nOption_Stock_Call_Short : {{model.[0].Option_Stock_Call_Short}},<br/>\\n\\nOption_Stock_Put : {{model.[0].Option_Stock_Put }},\\nOption_Stock_Put_Long : {{model.[0].Option_Stock_Put_Long}},\\nOption_Stock_Put_Short : {{model.[0].Option_Stock_Put_Short}}\\n\\n\\n\\n<div id=\\\"container\\\"></div>\\n<p>{{dateIndex}}</p>\\n<p>{{mySeries}}</p>\\n<p>{{diisFutureIndex}}</p>\\n<p>{{prosFutureIndex}}</p>\"],[\"text\",\"\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"static-attr\",\"border\",\"1\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Date \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Type \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Future Index \"],[\"close-element\"],[\"text\",\"\\n\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Future Stock \"],[\"close-element\"],[\"text\",\"\\n\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Option Index Call \"],[\"close-element\"],[\"text\",\"\\n\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Option Index Put \"],[\"close-element\"],[\"text\",\"\\n\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Option Stock Call \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Option Stock Put \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"date\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Client_Type\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Future_Index\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Future_Stock\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Option_Index_Call\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Option_Index_Put\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Option_Stock_Call\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Option_Stock_Put\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"row\"]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/fii-listing.hbs" } });
});
define("web/templates/components/gann-data", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3XwlnZS9", "block": "{\"statements\":[[\"block\",[\"unless\"],[[\"get\",[\"gannVals\"]]],null,5,4],[\"yield\",\"default\"],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"get\",[\"sell\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"sell\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"get\",[\"buy\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"buy\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"get\",[\"sell\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"sell\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"get\",[\"buy\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"buy\"]},{\"statements\":[[\"text\",\"Gann Values For \"],[\"append\",[\"unknown\",[\"code\"]],false],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"static-attr\",\"border\",\"1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" Buy Above :   \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"gannVals\",\"0\"]]],null,3],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" Sell Below :  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"gannVals\",\"1\"]]],null,2],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\nFibonacci Values\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"static-attr\",\"border\",\"1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" Buy Above :   \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"fibiVals\",\"0\"]]],null,1],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" Sell Below :  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"fibiVals\",\"1\"]]],null,0],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/gann-data.hbs" } });
});
define("web/templates/components/greek-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YEhDBgRE", "block": "{\"statements\":[[\"block\",[\"unless\"],[[\"get\",[\"profitStrategy\"]]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Option Chart\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\",\"mycount\"],[[\"get\",[\"chartOptionsProfit\"]],[\"get\",[\"profitStrategy\"]],[\"get\",[\"myReports\",\"length\"]]]]],false],[\"text\",\"\\n\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/greek-chart.hbs" } });
});
define("web/templates/components/option-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Dvm3rtF4", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"profitStrategy\"]]],null,1,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Option Chart\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"saveReport\"],null],null],[\"flush-element\"],[\"text\",\"Save Strategy \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsProfit\"]],[\"get\",[\"profitStrategy\"]]]]],false],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/option-chart.hbs" } });
});
define("web/templates/components/option-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mZcaUuvF", "block": "{\"statements\":[[\"block\",[\"unless\"],[[\"get\",[\"data\"]]],null,10,9]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"colspan\",\"6\"],[\"flush-element\"],[\"text\",\" Net : \"],[\"append\",[\"unknown\",[\"netGreek\",\"NetStock\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"netGreek\",\"Delta\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"netGreek\",\"Gamma\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"netGreek\",\"Vega\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"netGreek\",\"Theta\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"netGreek\",\"Rho\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"   \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"IV\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"LTP\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"CPrice\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"StrikePrice\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"type\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Lot\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Delta\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Gamma\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Vega\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Theta\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"row\",\"Rho\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"remove\",[\"get\",[\"index\"]]]],[\"flush-element\"],[\"text\",\"Remove \"],[\"close-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"increment\",[\"get\",[\"index\"]]]],[\"flush-element\"],[\"text\",\" + \"],[\"close-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"row\",\"index\"]},{\"statements\":[[\"append\",[\"helper\",[\"option-chart\"],null,[[\"underLying\",\"strikePrices\",\"myStrategies\",\"script\",\"code\",\"LotSize\",\"netGreek\"],[[\"get\",[\"underLying\"]],[\"get\",[\"strikePrices\"]],[\"get\",[\"myStrategies\"]],[\"get\",[\"script\"]],[\"get\",[\"code\"]],[\"get\",[\"LotSize\"]],[\"get\",[\"netGreek\"]]]]],false],[\"text\",\"\\n\\t\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"static-attr\",\"border\",\"1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" IV \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" LTP \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Calc Price \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" StrikePrice \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Type \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Lot \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Delta \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Gamma \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Vega \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Theta \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Rho \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\" Action \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\t\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"myStrategies\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"netGreek\"]]],null,1,0],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"at\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"actionType\"]],[\"get\",[\"at\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"at\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"at\"]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"lt\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"type\"]],[\"get\",[\"lt\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"lt\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"lt\"]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"tp\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"type\"]],[\"get\",[\"tp\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"tp\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"tp\"]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"sp\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"strike\"]],[\"get\",[\"sp\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"sp\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"sp\"]},{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\" Under Lying: \"],[\"append\",[\"unknown\",[\"data\",\"underLying\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"  \\n \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"LotSize :: \"],[\"append\",[\"unknown\",[\"LotSize\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"loadData\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectStrike\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"strikePrices\"]]],null,8],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectType\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"types\"]]],null,7],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectLot\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"lots\"]]],null,6],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectActionType\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"actionTypes\"]]],null,5],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"Submit\"],[\"flush-element\"],[\"text\",\"Create Strategy \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"myStrategies\"]]],null,4,3],[\"close-element\"],[\"text\",\"\\n\"],[\"comment\",\"\\n\\n<table class=\\\"table\\\" border=\\\"1\\\">\\n\\t<thead>\\n\\t\\t<tr>\\n\\t\\t\\t<th> OI </th>\\n\\t\\t\\n\\t\\t\\t<th> ChnginOI </th>\\n\\t\\t\\n\\t\\t\\t<th> Volume </th>\\n\\t\\n\\t\\t\\t<th> IV </th>\\n\\t\\n\\t\\t\\t<th> LTP </th>\\n\\t\\n\\t\\t\\t<th> NetChng </th>\\n\\t\\n\\t\\t\\t<th> BidQty </th>\\n\\t\\t\\n\\t\\t\\t<th> BidPrice </th>\\n\\n\\t\\t\\t<th> AskPrice </th>\\n\\t\\n\\t\\t\\t<th> AskQty </th>\\n\\t\\t\\n\\t\\t\\t<th> StrikePrice </th>\\n\\t\\t\\t<th> Type </th>\\n\\t\\n\\t\\t\\t<th> Delta </th>\\n\\t\\t\\n\\t\\t\\t<th> Gamma </th>\\n\\n\\t\\t\\t<th> Vega </th>\\n\\t\\n\\t\\t\\t<th> Theta </th>\\n\\t\\t\\n\\t\\t\\t<th> Rho </th>\\n\\t\\t\\t<th> CPrice </th>\\n\\t\\t</tr>\\n\\t</thead>\\n\\n\\t<tbody>\\n{{#each data.option as | row |}}\\n\\t\\t\\t<tr>\\n\\t\\t\\t\\t<td> {{row.OI}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.ChnginOI}} </td>\\n\\t\\t\\n\\t\\t\\t\\t<td> {{row.Volume}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.IV}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.LTP}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.NetChng}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.BidQty}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.BidPrice}} </td>\\n\\n\\t\\t\\t\\t<td> {{row.AskPrice}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.AskQty}} </td>\\n\\t\\t\\n\\t\\t\\t\\t<td> {{row.StrikePrice}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.type}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.Delta}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.Gamma}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.Vega}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.Theta}} </td>\\n\\n\\t\\t\\t\\t<td> {{row.Rho}} </td>\\n\\t\\t\\t\\n\\t\\t\\t\\t<td> {{row.CPrice}} </td>\\n\\n\\t\\t\\t</tr>\\n\\t\\t{{/each}}\\t</tbody>\\n\\n</table>\\n\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/option-form.hbs" } });
});
define("web/templates/components/stock-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yPaKqq7W", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"header\",[]],[\"static-attr\",\"class\",\"details\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"loadData\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectCode\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,12],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"optionChain\",\"expirationDates\"]]],null,11,10],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Report List\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"myReports\"]]],null,2,1],[\"text\",\"\\n\"],[\"yield\",\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"  \\t\\n    \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"shortname\"]],false],[\"text\",\" (\"],[\"append\",[\"unknown\",[\"t\",\"code\"]],false],[\"text\",\")\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"underlying\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"expiration\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"strike\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"lastPrice\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"thPrice\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"lot\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t   \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"type\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"delta\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"append\",[\"unknown\",[\"t\",\"iv\"]],false],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n \\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"remove\",[\"get\",[\"index\"]]]],[\"flush-element\"],[\"text\",\"Remove \"],[\"close-element\"],[\"text\",\"\\n \\t  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \\n\"]],\"locals\":[\"t\",\"index\"]},{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-striped\"],[\"flush-element\"],[\"text\",\"\\n \\n  \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Company Name\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Stock price\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Expiry\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Strike\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Option Premium\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Theoritical Price\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Lot\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Type\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Bought Delta\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Volatility\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Action\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n \\n\"],[\"block\",[\"each\"],[[\"get\",[\"myReports\"]]],null,0],[\"text\",\"     \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"colspan\",\"7\"],[\"flush-element\"],[\"text\",\"\\n      Net delta\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"netDelta\"]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n       \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n       \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addToReport\",[\"get\",[\"myReports\"]]]],[\"flush-element\"],[\"text\",\"Add To Reports \"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"greek-chart\"],null,[[\"myReports\",\"oc\",\"lot\",\"reportCount\"],[[\"get\",[\"myReports\"]],[\"get\",[\"optionChain\"]],[\"get\",[\"lot\"]],[\"get\",[\"reportCount\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"lt\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"type\"]],[\"get\",[\"lt\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"lt\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"lt\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"actionType\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"actionType\"]],[\"get\",[\"actionType\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"actionType\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"actionType\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"type\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"actionType\"]],[\"get\",[\"type\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"type\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"type\"]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectType\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"types\"]]],null,5],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectActionType\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"actionTypes\"]]],null,4],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectLot\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"lots\"]]],null,3],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"Submit\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"addRecord\"],null],null],[\"flush-element\"],[\"text\",\"Add \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"strike\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"actionType\"]],[\"get\",[\"strike\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"strike\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"strike\"]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"expiry\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"actionType\"]],[\"get\",[\"expiry\"]]],null],null],[\"flush-element\"],[\"append\",[\"helper\",[\"date-timestamp\"],[[\"get\",[\"expiry\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"expiry\"]},{\"statements\":[[\"append\",[\"unknown\",[\"underlying\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"code\"]],false],[\"text\",\" : \"],[\"append\",[\"unknown\",[\"optionChain\",\"quote\",\"regularMarketPrice\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectExpiry\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"optionChain\",\"expirationDates\"]]],null,9],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\t\\n\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectStrikePrice\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"optionChain\",\"strikes\"]]],null,8],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\t\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"strike\"]]],null,7,6],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"unknown\",[\"script\",\"code\"]],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"script\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"script\"]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/stock-list.hbs" } });
});
define("web/templates/components/strategy-loader", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sL9hjC1L", "block": "{\"statements\":[[\"open-element\",\"header\",[]],[\"static-attr\",\"class\",\"details\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"loadData\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectCode\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\\n\\t\\t\\tExpiry :\"],[\"comment\",\" {{input value=expiry format=\\\"DDMMMYYYY\\\"}}  \"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"select\",[]],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectExpiry\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"expiries\"]]],null,0],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"Submit\"],[\"flush-element\"],[\"text\",\"Load Data \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"append\",[\"helper\",[\"option-form\"],null,[[\"data\",\"script\",\"code\",\"LotSize\"],[[\"get\",[\"optionData\"]],[\"get\",[\"model\"]],[\"get\",[\"code\"]],[\"get\",[\"LotSize\"]]]]],false],[\"text\",\"\\n\\n\\n\"],[\"append\",[\"helper\",[\"gann-data\"],null,[[\"code\",\"LotSize\"],[[\"get\",[\"code\"]],[\"get\",[\"LotSize\"]]]]],false],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"get\",[\"exp\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"expiry\"]],[\"get\",[\"exp\"]]],null],null],[\"flush-element\"],[\"append\",[\"get\",[\"exp\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"exp\"]},{\"statements\":[[\"text\",\"\\t\\t\\t    \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"unknown\",[\"script\",\"Code\"]],null],[\"dynamic-attr\",\"selected\",[\"helper\",[\"eq\"],[[\"get\",[\"code\"]],[\"get\",[\"script\",\"Code\"]]],null],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"script\",\"Code\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"script\"]}],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/strategy-loader.hbs" } });
});
define("web/templates/components/table-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Nqyt/5pt", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/components/table-list.hbs" } });
});
define("web/templates/faooi", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "S+wSUGC3", "block": "{\"statements\":[[\"text\",\" \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"FII Activities\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%;float: left; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsFII\"]],[\"get\",[\"chartDataFII\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsPro\"]],[\"get\",[\"chartDataPro\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%;float: left; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsFI\"]],[\"get\",[\"chartDataFI\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsFS\"]],[\"get\",[\"chartDataFS\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%;float: left; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsOIC\"]],[\"get\",[\"chartDataOIC\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\",\"content\"],[[\"get\",[\"chartOptionsOIP\"]],[\"get\",[\"chartDataOIP\"]]]]],false],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:100%\"],[\"flush-element\"],[\"text\",\"\\n\\t\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"width:50%; float: right; padding: 15px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"high-charts\"],null,[[\"chartOptions\"],[[\"get\",[\"chartOptionsOSP\"]]]]],false],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"fii-listing\"],null,[[\"model\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/faooi.hbs" } });
});
define("web/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KvKv68zm", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron text-center\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"comment\",\"\\nsession.isAuthenticated : {{session.isAuthenticated}}\\n{{#if session.isAuthenticated}}\\n    <p><a  {{action 'invalidateSession'}} >Logout</a></p>\\n  {{else}}\\n    <p><a  {{action 'login'}} >Login</a></p>\\n  {{/if}}  <br/>\\n{{#unless session.isAuthenticated}}\\n  <div class=\\\"wrapper\\\">\\n    <form {{action 'login' email password}} class=\\\"form-signin\\\">     \\n      <h2 class=\\\"form-signin-heading\\\">Please login</h2>\\n      {{input value=email class=\\\"form-control\\\" placeholder=\\\"Email Address\\\" required=\\\"\\\" autofocus=\\\"\\\"}}\\n       \\n      {{input value=password type=\\\"password\\\" class=\\\"form-control\\\" name=\\\"password\\\" placeholder=\\\"Password\\\" required=\\\"\\\"}}  \\n      \\n      <label class=\\\"checkbox\\\">\\n        <input type=\\\"checkbox\\\" value=\\\"remember-me\\\" id=\\\"rememberMe\\\" name=\\\"rememberMe\\\"> Remember me\\n      </label> \\n      <button class=\\\"btn btn-lg btn-primary btn-block\\\" type=\\\"submit\\\">Login</button>   \\n    </form>\\n  </div>\\n  {{else}}\\n  <h1>Welcome</h1>\\n  {{/unless}}  \"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/index.hbs" } });
});
define("web/templates/not-found", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6NTsUkZ7", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Oops, the page you're looking for wasn't found\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/not-found.hbs" } });
});
define("web/templates/strategy", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "p/8Wt+IJ", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Strategy\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"strategy-loader\"],null,[[\"model\",\"codes\",\"action\"],[[\"get\",[\"model\"]],[\"get\",[\"codes\"]],\"loadData\"]]],false],[\"text\",\"\\n\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/strategy.hbs" } });
});
define("web/templates/usoptions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "P0SXiC/i", "block": "{\"statements\":[[\"open-element\",\"h\",[]],[\"flush-element\"],[\"text\",\"Covered Call \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"stock-list\"],null,[[\"model\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "web/templates/usoptions.hbs" } });
});


define('web/config/environment', ['ember'], function(Ember) {
  var prefix = 'web';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("web/app")["default"].create({"LOG_RESOLVER":true,"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"host":"http://14.200.108.220:3000","name":"web","version":"0.0.0+d2fbc92a"});
}
//# sourceMappingURL=web.map
