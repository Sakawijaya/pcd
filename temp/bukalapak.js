module.exports={
	method: 'default',
	getProduct: function($,sku_id){
		var product = [];
		var title=$('.product-detailed__name').text();
		title=title.replace(/\r?\n|\r/g,'');
		title=title.trim();
		var instalment_price = $('.product-detailed-price__installment').find('.amount').text();
		instalment_price = instalment_price.replace(/\./g,'');
		var price=$('.product-detailed-price__original').find('.amount').text();
		price = price.replace(/\./g,'');
		//price = parseInt(price);
		var original_price=$('product-detailed-price__reduced').find('.amount').text();
        original_price = original_price.replace(/\./g,'');
		//original_price = parseInt(original_price);
		var discount=$('.product-detailed-discount-badge').text();
		discount=discount.trim();
		var penjual=$('.user__name').find('a').first().text();
		penjual=penjual.replace(/\r?\n|\r/g,'');
		penjual=penjual.trim();
		var review = $('.review__aggregate').find('span').text();
		
		if(price==''||price=='NaN'){
			if(instalment_price==''||instalment_price=='NaN'){
				price = 0;
			}else{
				price = instalment_price;
			}
		}
		if(original_price==''||original_price=='NaN'){
			original_price = 0;
		}
		
		product['sku_id']=sku_id;
		product['sites']="bukalapak";
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