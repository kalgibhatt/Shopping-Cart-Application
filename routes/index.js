var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fetchCart', function(req, res, next) {
	res.send({
		"cart"	:	req.session.cart,
		"total"	:	req.session.total
	});
});

router.post('/addtocart',function(req,res,next) {
	var cartItems = req.body.cart;
	var cart = [];
	var total = 0;
	
	if(req.session !== undefined && req.session.cart !== undefined && req.session.total !== undefined){
		cart = req.session.cart;
		total = req.session.total;
	}
	
	for(var i=0;i<cartItems.length;i++){
		var alreadyAdded = false;
		for(var j=0;j<cart.length;j++){
			if(cart[j].product_name === cartItems[i].product_name){
				cart[j].product_quantity = Number(cart[j].product_quantity) + Number(cartItems[i].product_quantity);
				alreadyAdded = true;
				break;
			}
		}
		if(!alreadyAdded){
			cart.push(cartItems[i]);
		}
		total = total + Number(cartItems[i].product_price) * Number(cartItems[i].product_quantity);
	}
	
	req.session.cart = cart;
	req.session.total = total;
	
	res.send({
			"cart"	:	req.session.cart,
			"total"	:	req.session.total
	});
});

module.exports = router;
