module.exports={
	method: 'default',
	getProduct: function($,sku_id){
		var product = [];
		var title=$('.TypeG_SubSubTitle.h1').text();
		title=title.replace(/\r?\n|\r/g,'');
		title=title.trim();
		
		
		
		var price=$('.TypeA_Head').find('b').first().text();
		
		
		var original_price=$('.TypeI_FontMedium').find('span').first().text();
		original_price = original_price.replace('RP ','');
        original_price = original_price.replace(/\./g,'');
		original_price = parseInt(original_price);
		
		
		
		var discount=$('#spandisc').find('b').text();
		discount=discount.trim();
		
		
		var penjual='';
		var garansi= '';
		var review = '';
		
		if(price==''||price=='NaN'){
			price=0;
		}
		if(original_price==''||original_price=='NaN'){
			original_price=0;
		}
		
		product['sku_id']=sku_id;
		product['sites']="lazada";
		product['title']=title;
		product['price']=price;
		product['original_price']=original_price;
		product['discount']=discount;
		product['penjual']=penjual;
		product['garansi'] = garansi;
		product['review']=review;
		
		console.log(product);
		return product;
	}
}