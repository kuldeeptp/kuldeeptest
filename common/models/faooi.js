'use strict';

module.exports = function (Faooi) {

    Faooi.net = function(id, callback) {

        Faooi.getDataSource().connector.connect(function(err, db) {
            var collection = db.collection('Faooi');

            collection.aggregate([
                {
                    $project:{Future_Index:{$subtract:["$Future_Index_Long","$Future_Index_Short"]},Future_Stock:{$subtract:["$Future_Stock_Long","$Future_Stock_Short"]},Option_Index_Call:{$subtract:["$Option_Index_Call_Long","$Option_Index_Call_Short"]},Option_Index_Put:{$subtract:["$Option_Index_Put_Long","$Option_Index_Put_Short"]},Option_Stock_Call:{$subtract:["$Option_Stock_Call_Long","$Option_Stock_Call_Short"]},Option_Stock_Put:{$subtract:["$Option_Stock_Put_Long","$Option_Stock_Put_Short"]},Client_Type:1,date:1}
                }
            ], function(err, data) {
                console.log(' Data : ',data,err);
                if (err) return err;
                return  data;
            });
        });

    };

    Faooi.remoteMethod('net', {

        returns: {
            arg: 'content',
            type: 'string'
        },
        http: {
            path: '/net',
            verb: 'get'
        }
    });
};
