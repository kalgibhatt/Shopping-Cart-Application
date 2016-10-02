var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addtocart',function(req,res,next) {
	var name = req.body.name;
	var image = req.body.image;
	var quantity = Number(req.body.quantity);
	var price = Number(req.body.price);
	var total = quantity * price;
	res.send({
			"total": total
	});
});

module.exports = router;
