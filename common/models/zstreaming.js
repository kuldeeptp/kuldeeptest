'use strict';

module.exports = function (Zstreaming) {
    Zstreaming.add = function (tick) {

        return Zstreaming.create({
            Time: Date(),
            InstrumentToken: tick.Token,
            LastTradedPrice: tick.LastTradedPrice,
            LastTradedQty:  tick.LastTradeQuantity,
            AverageTradePrice:  tick.AverageTradePrice,
            Volume : tick.VolumeTradedToday,
            BuyQty : tick.TotalBuyQuantity,
            SellQty: tick.TotalSellQuantity,
            OpenPrice: tick.OpenPrice,
            HighPrice: tick.HighPrice,
            LowPrice: tick.LowPrice,
            ClosePrice: tick.ClosePrice
        });
    };
};
