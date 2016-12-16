module.exports={
	method: 'phantom',
	getProduct: function($,sku_id,target_id){
		var product = [];
		product['sku_id']=sku_id;
		product['sites']="blibli";
		product['target_url_id']=target_id
		
		var title=$('.product-detail-info').find('h1').first().text();
		if(title!=null){
			title=title.replace(/\r?\n|\r/g,'');
			title=title.trim();
			product['title']=title;
		}
		var price=$('.main-price').find('h2').first().text();
		if(price!=''||price!='NaN'||price!=null){
			price = price.replace('Rp ','');
			price = price.replace(/\,/g,'');
			product['price']=parseInt(price)||0;
		}
		var original_price=$('#strikeThroughPrice').text();
		if(original_price!=''||original_price!='NaN'||original_price!='null'){
			original_price = original_price.replace('Rp ','');
        	original_price = original_price.replace(/\,/g,'');
        	product['original_price']=parseInt(original_price)||0;
		}

		var discount=$('.price-discount').find('b').text();
		if(discount!=''||discount!=null||discount!='NaN'){
			discount=discount.trim();
			product['discount']=discount;
		}
		var penjual=$('.merchant-info').find('strong').first().text();
		if(penjual!=''||penjual!=null||penjual!='NaN'){
			penjual=penjual.replace(/\r?\n|\r/g,'');
			penjual=penjual.trim();
			product['penjual']=penjual;
		}
		var garansi = $('.garansi').find('span.ng-scope').first().text();
		if(garansi!=''||garansi!=null||garansi!='NaN'){
			product['garansi'] = garansi;
		}
		var review = $('.review-top-link').text();
		if(review!=''||review!='NaN'||review!=null||review!='Tulis ulasan'){
			review = review.replace(' Ulasan\n                                                Produk','');
			review = review.trim();
			product['review']=parseInt(review)||0;
		}

		return product;
	}
}