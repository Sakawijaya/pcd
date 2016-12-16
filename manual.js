var crontab = require('cron').CronJob;
var mysql = require('mysql');
var rabbitMQ = require('./lib/rabbitmq.js');

var connection = mysql.createConnection({
	host: '10.15.13.20',
	user: 'katong',
	password: '@katong',
	database: 'dbpricecompare',
	multipleStatements: true
});

var queryString = 'SELECT COUNT(*) as row_number FROM target_url_temp';
	connection.query(queryString,function(err,row,field){
		if(err){
			console.log(err);
		}
		if(!row.length){
			console.log('Error: No data in table target_url');
		}else{
			rows = row[0].row_number;
			batch = Math.ceil(rows/500);
			var counters = 0;
			for(var x=0;x<batch;x++){
				var start = x*500;
				var queryString2 = 'SELECT * FROM target_url_temp LIMIT '+start+',500';
				connection.query(queryString2,function(err,row2,field2){
					if(!row2.length){
						console.log('Error: No data in table target_url');
					}else{
						var msg = [];
						for(var i=0;i<row2.length;i++){
							var sku_id = row2[i].sku_id;
							var url = row2[i].target_url;
							var filename = row2[i].target_site+'.js';
							var target_id = row2[i].id;
							
							msg.push(JSON.stringify({
								"url": url,
								"filename": filename,
								"sku_id": sku_id,
								"target_id": target_id,
								"process":0,
							}));
							if(i==(row2.length-1)){
								rabbitMQ.multipleQueue(msg);
							}
						}
					}
				});
			}
		}
	});