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
connection.connect();
var jobId = new crontab("* * * * * *",function(){		
	
	var querystr = 'TRUNCATE TABLE scrap_result';
	connection.query(querystr,function(err){
		if(err){
			console.log(err);
		}
	});
	
	var queryString = 'SELECT * FROM target_url';
	connection.query(queryString,function(err,row,field){
		if(err){
			console.log(err);
		}
		if(!row.length){
			console.log('Error: No data in table target_url');
		}else{
			for(var i=0;i<row.length;i++){
				var sku_id = row[i].sku_id;
				var url = row[i].target_url;
				var filename = row[i].target_site+'.js';
				
				var msg = JSON.stringify({
					"url": url,
					"filename": filename,
					"sku_id": sku_id,
				});
				rabbitMQ.singleQueueClose(msg);
			}
		}
	});
	
},null,true,'Asia/Jakarta');
