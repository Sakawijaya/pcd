module.exports={
	method: 'default',
	getProduct: function($,sku_id,target_id){
		var product = [];
		product['sku_id']=sku_id;
		product['sites']="orami";
		product['target_url_id']=target_id;
		
		var title=$('.product-name').first().text();
		if(title!=null){
			title=title.replace(/\r?\n|\r/g,'');
			title=title.trim();
			product['title']=title;
		}
		var price=$('.final-price').text();
		if(price!=''||price!='NaN'||price!=null){
			price = price.replace('Rp ','');
			price = price.replace(/\r?\n|\r/g,'');
			price = price.replace(/\./g,'');
			price = price.trim();
			product['price']=parseInt(price)||0;
		}
		var original_price=$('.original-price').text();
		if(original_price!=''||original_price!='NaN'||original_price!='null'){
			original_price = original_price.replace('Sebelumnya Rp ','');
        	original_price = original_price.replace(/\./g,'');
        	original_price = original_price.replace(/\r?\n|\r/g,'');
        	original_price = original_price.trim();
        	product['original_price']=parseInt(original_price)||0;
		}
		var discount=$('.harga-coret').find('.discount').text();
		if(discount!==''||discount!=null||discount!=='NaN'){
			discount = discount.replace('-','');
			discount=discount.trim();
			product['discount']=discount;
		}
		var penjual=$('#product-storename').find('span').first().text();
		if(penjual!=''||penjual!=null||penjual!='NaN'){
			penjual=penjual.replace(/\r?\n|\r/g,'');
			penjual = penjual.replace('Sold By:','');
			penjual=penjual.trim();
			product['penjual']=penjual;
		}
		var review = $('.total-review').text();
		if(review!=''||review!='NaN'||review!=null){
			review = review.replace('ulasan','');
			review = review.trim();
			product['review']=parseInt(review)||0;
		}
		return product;
	}
}