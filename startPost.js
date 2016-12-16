var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var dispatcher     = new HttpDispatcher();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '10.15.13.20',
	user: 'katong',
	password: '@katong',
	database: 'dbpricecompare',
	multipleStatements: true
});
connection.connect();

dispatcher.onPost("/category", function(req, res) {
	var category = req.params.category;
	var querystr = 'DELETE FROM scrap_result WHERE sku_id = ANY(SELECT sku_id FROM product WHERE category = "'+category+'")';
	connection.query(querystr,function(err){
		if(err){
			console.log(err);
		}
	});
	var querystr = 'SELECT * FROM target_url LEFT JOIN product ON target_url.sku_id = product.sku_id WHERE product.category = "'+category+'")';
	connection.query(querystr,function(err,row,field){
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
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('OK');
});
dispatcher.onPost("/penjual", function(req, res) {
	var category = req.params.penjual;
	var querystr = 'DELETE FROM scrap_result WHERE sku_id = ANY(SELECT sku_id FROM product WHERE seller_name = "'+penjual+'")';
	connection.query(querystr,function(err){
		if(err){
			console.log(err);
		}
	});
	var querystr = 'SELECT * FROM target_url LEFT JOIN product ON target_url.sku_id = product.sku_id WHERE product.seller_name = "'+penjual+'")';
	connection.query(querystr,function(err,row,field){
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
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('OK');
});
  
http.createServer(function (req, res) {
	dispatcher.dispatch(req, res);
}).listen(1337, function(){
	console.log("It works on "+1337);
});