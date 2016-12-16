var rabbitMQ = require('./lib/rabbitmq.js');
//------lazada---------------------------------------------------------------
/*
var msg = JSON.stringify({
			"url": "http://www.lazada.co.id/swiss-army-jam-tangan-pria-hitam-strap-kulit-1128-fb-562150.html",
			"filename": "lazada.js",
			"sku_id": 12345,
	});

//------blibli---------------------------------------------------------------

var msg = JSON.stringify({
			"url": "https://www.blibli.com/asus-x450jb-wx001h-notebook-14-i7-nvidia-gt940m-4gb-win-8-1-MTA.0015677.htm",
			"filename": "blibli.js",
			"sku_id": 12345,
	});	

//------blanja---------------------------------------------------------------

var msg = JSON.stringify({
			"url": "http://item.blanja.com/item/jual-beli-apple-macbook-pro-retina-2015-mf839-13-i5-13502967",
			"filename": "blanja.js",
			"sku_id": 12345,
	});
	
//------matahari---------------------------------------------------------------

var msg = JSON.stringify({
			"url": "https://www.mataharimall.com/xiaomi-redmi-note-3g-8gb-xiaomi-powerbank-10-000mah-putih-sillver-khusus-o2o-instant-pickup-1403076.html",
			"filename": "matahari.js",
			"sku_id": 12345,
	});
//------bhinneka---------------------------------------------------------------

var msg = JSON.stringify({
			"url": "http://www.bhinneka.com/products/sku08716488/asus_zenfone_3__32gb_3gb_ram___ze520kl__-_black.aspx",
			"filename": "bhinneka.js",
			"sku_id": 12345,
	});
//------bukalapak---------------------------------------------------------------

var msg = JSON.stringify({
			"url": "https://www.bukalapak.com/p/kamera/action-camera/19z8v6-jual-free-ongkir-bcare-bcam-x-3-action-camera-wif-16-mp-sonysensor-4k-layar-2-black?from=popular-section-1",
			"filename": "bukalapak.js",
			"sku_id": 12345,
	});
//------dinomarket---------------------------------------------------------------
var msg = JSON.stringify({
			"url": "http://www.dinomarket.com/TD/9280114/Lenovo-Tab-3-7-Essential-710i-Black/",
			"filename": "dinomarket.js",
			"sku_id": 12345,
	});	*/
//------orami---------------------------------------------------------------
var msg = JSON.stringify({
			"url": "https://www.orami.co.id/shrinkx-hips-ultra-m-l-nude.html",
			"filename": "orami.js",
			"sku_id": 12345,
			'target_id':22,
	});	

rabbitMQ.singleQueueClose(msg);