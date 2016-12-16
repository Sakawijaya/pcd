module.exports={
	method: 'default',
	getProduct: function($,sku_id){
		var product = [];
		var title=$('.product-title').text();
		title=title.replace(/\r?\n|\r/g,'');
		title=title.trim();
		var price=$('.fshn-price').text();
		price = price.replace('Rp ','');
		price = price.replace(/\./g,'');
		price = parseInt(price);
		var original_price=$('.disc-price').text();
		original_price = original_price.replace('Rp ','');
        original_price = original_price.replace(/\./g,'');
		original_price = parseInt(original_price);
		var discount=$('.disc-box').text();
		discount=discount.trim();
		var penjual=$('.store-info').find('a').first().text();
		penjual=penjual.replace(/\r?\n|\r/g,'');
		penjual=penjual.trim();
	//	var garansi_term = $('.prod-warranty__term').first().text();
	//	var garansi_type = $('.prod-warranty__type').first().text();
		var review = $('.product-tabs li:nth-child(3)').find('a').text();
		review = review.replace('Ulasan ','');
		review = review.replace(/\(/,'');
		review = review.replace(/\)/,'');
		review = review.trim();
		
		if(price==''||price=='NaN'){
			price=0;
		}
		if(original_price==''||original_price=='NaN'){
			original_price=0;
		}
		
		product['sku_id']=sku_id;
		product['sites']="matahari";
		product['title']=title;
		product['price']=price;
		product['original_price']=original_price;
		product['discount']=discount;
		product['penjual']=penjual;
		product['garansi'] = '';
		product['review']=review;
		return product;
	}
}