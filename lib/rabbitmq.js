var amqp = require('amqplib/callback_api');
module.exports={
	singleQueue:function(queueVal){
		amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
			if(err){
				console.log(err);
			}
			conn.createChannel(function(err,ch){
				var queue = "queueGeneric";				
				ch.assertQueue(queue, {durable: true});
				ch.sendToQueue(queue, new Buffer(queueVal),{persistent: true});
				console.log(" [x] Sent %s", queueVal);
			});
		});
	},
	singleQueueWait:function(queueVal){
		amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
			if(err){
				console.log(err);
			}
			conn.createChannel(function(err,ch){
				var queue = "queueGeneric";				
				ch.assertQueue(queue, {durable: true});
				ch.sendToQueue(queue, new Buffer(queueVal),{persistent: true});
				console.log(" [x] Sent %s", queueVal);
				setTimeout(function() {
				    console.log(" [x] Done");
				}, 100);
			});
		});
	},
	multipleQueue:function(queueVal){
		amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
			if(err){
				console.log(err);
			}
			conn.createChannel(function(err,ch){
				var queue = "queueGeneric";				
				ch.assertQueue(queue, {durable: true});
				
				for(var i=0;i<queueVal.length;i++){
					ch.sendToQueue(queue, new Buffer(queueVal[i]),{persistent: true});
		    		console.log(" [x] Sent %s", queueVal[i]);
				}		
			});
		});
	},
	multipleQueueClose:function(queueVal){
		amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
			if(err){
				console.log(err);
			}
			conn.createChannel(function(err,ch){
				var queue = "queueGeneric";				
				ch.assertQueue(queue, {durable: true});
				
				for(var i=0;i<queueVal.length;i++){
					ch.sendToQueue(queue, new Buffer(queueVal[i]),{persistent: true});
		    		console.log(" [x] Sent %s", queueVal[i]);
				}		
			});
			setTimeout(function() { conn.close(); process.exit(0) }, 500);
		});
	},
	singleQueueClose:function(queueVal){
		amqp.connect('amqp://administrator:admin@10.15.13.35',function(err,conn){
			if(err){
				console.log(err);
			}
			conn.createChannel(function(err,ch){
				var queue = "queueGeneric";				
				ch.assertQueue(queue, {durable: true});
				ch.sendToQueue(queue, new Buffer(queueVal),{persistent: true});
				console.log(" [x] Sent %s", queueVal);
			});
			setTimeout(function() { conn.close(); process.exit(0) }, 500);
		});
	},
}
