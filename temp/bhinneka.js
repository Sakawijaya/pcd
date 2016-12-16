module.exports={
	method: 'default',
	getProduct: function($,sku_id){
		var product = [];
		var title=$('#ctl00_content_productTitle').find('h1').text();
		title=title.replace(/\r?\n|\r/g,'');
		title=title.trim();
		var price=$('#ctl00_content_divPrice').find('span').text();
		
		//price = parseInt(price);
		
		var original_price=$('#ctl00_content_pnlNormalSave').find('span').text();
		
		//original_price = parseInt(original_price);
		var discount=$('.prod-itm-disc-grid').text();
		
		var penjual=$('#ctl00_content_divProvidedBy').find('a').first().text();
		
		var garansi = $('#ctl00_content_lblWarranty').text();
		var review = $('#ctl00_content_productTitle').find('.MainFloatRight').text();
		
		
		if(price==''||price=='NaN'){
			price=0;
		}else{
			price = price.replace('Rp ','');
			price = price.replace(/\,/g,'');
		}
		if(discount!=''){
			discount = discount.replace('-','');
			discount=discount.trim();
		}
		if(penjual!=''){
			penjual=penjual.replace(/\r?\n|\r/g,'');
			penjual=penjual.trim();
		}
		if(original_price==''||original_price=='NaN'){
			original_price=0;
		}else{
			original_price = original_price.replace('Rp ','');
        	original_price = original_price.replace(/\,/g,'');
		}
		if(review==''||review=='NaN'){
			review=0;
		}else{
			review = review.replace('Total Review','');
		review = review.replace(/\r?\n|\r/g,'');
		review = review.trim();
		review = review.replace(/\(/,'');
		review = review.replace(/\)/,'');
		review = review.trim();
		}
		
		product['sku_id']=sku_id;
		product['sites']="bhinneka";
		product['title']=title;
		product['price']=price;
		product['original_price']=original_price;
		product['discount']=discount;
		product['penjual']=penjual;
		product['garansi'] = garansi;
		product['review']=review;
		return product;
	}
}