var phantom = require('phantom');
var _ph, _page, _outObj;
module.exports={
	baseRequest : function(url,callback){
		phantom.create().then(ph => {
		    _ph = ph;
		    return _ph.createPage();
		}).then(page => {
		    _page = page;
		    return _page.open(url);
		}).then(status => {
		    return _page.property('content')
		}).then(content => {
		    _page.close();
		    _ph.exit();
		    
		    callback(content);
		}).catch(function(e){
			console.log(e);
		});
	}
};
