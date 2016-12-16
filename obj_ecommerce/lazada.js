module.exports={
	method: 'default',
	getProduct: function($,sku_id,target_id){
		var product = [];
		product['sku_id']=sku_id;
		product['sites']="lazada";
		product['target_url_id']=target_id
		
		var title=$('#prod_title').text();
		if(title!=null){
			title=title.replace(/\r?\n|\r/g,'');
			title=title.trim();
			product['title']=title;
		}
		var price=$('#product_price').text();
		if(price!=''||price!='NaN'||price!=null){
			product['price']=parseInt(price)||0;
		}
		var original_price=$('#price_box').text();
		if(original_price!=''||original_price!='NaN'||original_price!='null'){
			original_price = original_price.replace('RP ','');
			original_price = original_price.replace(',','');
        	original_price = original_price.replace(/\./g,'');
        	product['original_price']=parseInt(original_price)||0;
		}
		var discount=$('#product_saving_percentage').text();
		if(discount!=''||discount!=null||discount!='NaN'){
			discount=discount.trim();
			product['discount']=discount;
		}
		var penjual=$('.product__seller__name').find('a').first().text();
		if(penjual!=''||penjual!=null||penjual!='NaN'){
			penjual=penjual.replace(/\r?\n|\r/g,'');
			penjual=penjual.trim();
			product['penjual']=penjual;
		}
		var review = $('#review').find('a').text();
		if(review!=''||review!='NaN'||review!=null){
			review = review.replace(/\(/,'');
			review = review.replace(/\)/,'');
			review = review.trim();
			product['review']=parseInt(review)||0;
		}
		var garansi_term = $('.prod-warranty__term').first().text();
		var garansi_type = $('.prod-warranty__type').first().text();
		product['garansi'] = garansi_type+' '+garansi_term;
		
		return product;
	}
}