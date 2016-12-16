var fs = require('fs');
var amqp = require('amqplib/callback_api');
var request = require('request');
var baseRequest = request.defaults({
	headers: {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36'
	}
});
var cheerio = require('cheerio');
var mysql = require('mysql');
var S = require('string');
var phantom = require('./lib/phantom.js');
var rabbitMQ = require('./lib/rabbitmq.js');

var connection = mysql.createConnection({
	host: '10.15.13.20',
	user: 'katong',
	password: '@katong',
	database: 'dbpricecompare',
	multipleStatements: true
});
connection.connect();

amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
	if(err){
		console.log(err);
	}
	conn.createChannel(function(err,ch){
		var queue = "queueGeneric";
		ch.assertQueue(queue,{durable:true});
		ch.prefetch(1);
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
		ch.consume(queue, function(msg) {
			var obj = JSON.parse(msg.content.toString());
			
			var fn = require(__dirname+'/obj_ecommerce/'+obj.filename);
			var method = fn.method;
			if(method=='default'){
				baseRequest(obj.url,function(error,response,body){
					$ = cheerio.load(body);
					var product = fn.getProduct($,obj.sku_id,obj.target_id);
					if(product['title']!==''){
						saveProduct(product);
					}
					console.log(" [x] Received %s",  msg.content.toString());
					//bikin if else untuk ack kalo produk sukses dikirim
					ch.ack(msg);
				});
			}else{
				phantom.baseRequest(obj.url,function(body){
					$ = cheerio.load(body);
					var product = fn.getProduct($,obj.sku_id,obj.target_id);
					if(product['title']!==''){
						saveProduct(product);
					}
						console.log(" [x] Received %s",  msg.content.toString());
						ch.ack(msg);
					
				});
			}
	    }, {noAck: false});
	});
});

function saveProduct(product){
	var query = '';
	for (var keys in product){
		if(keys=='title'){
			query=query+keys+'="'+mysql_real_escape_string(product[keys])+'",';
		}else{
			query=query+keys+'="'+product[keys]+'",';
		}
		
	}
	query=query+ 'created=NOW()';
					
	queryStr='insert into scrap_result set '+query+';';
	queryStrHistory='insert into scrap_result_history set '+query+';';
	queryStr=queryStr+queryStrHistory;
					
	connection.query(queryStr, function(err, rows, fields) {
		if (err) {
			if(err.code!='ER_DUP_ENTRY'){
				console.log(err);
				process.exit();
			}
			console.log(err);
		}
	});
}
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}