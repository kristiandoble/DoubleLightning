var express = require('express');
var router = express.Router();
const BTCPAY_PRIV_KEY = "b55bdccf579ef72469eb82d0efb305b273ef354842e0e97aa0453c548498587";
const BTCPAY_MERCHANT_KEY = "3nbgXwAYraBwkezFhKaveCrrQJYdaVsyHvYYVbDwb1yD";

// Initialize the client
const btcpay = require('btcpay')
const keypair = btcpay.crypto.load_keypair(new Buffer.from(BTCPAY_PRIV_KEY, 'hex'));
const client = new btcpay.BTCPayClient('https://lightning.filipmartinsson.com', keypair, {merchant: BTCPAY_MERCHANT_KEY})


/* get & verify invoice. */
//Get invoice/{invoiceid}
router.get('/:id', async function(req, res, next) {
  var invoiceId = req.params.id;
  client.get_invoice(invoiceId)
  .then(invoice => {
    if(invoice.status == "complete" || invoice.status == "paid"){
      //Deliver product to customer
      res.render("thankyou");
    }
    else{
      res.render("failure");
    }
  }).catch(err => {
    console.log(err);
  })
});

/* Create invoice. */
// POST -> /invoice
router.post('/', function(req, res, next) {
  var product = JSON.parse(req.body.product);
  var dollarAmount = product.price;
  var buyer = {
    email: req.body.email,
    name: req.body.name,
    address1: req.body.address,
    locality: req.body.city,
    postalCode: req.body.zipcode,
    country: req.body.country
  };
  client.create_invoice(
    {
      price: dollarAmount,
      currency: "USD",
      buyer: buyer
    }
  )
  .then(function(invoice){
    console.log(invoice);
    console.log(invoice.id);
    res.render("invoice", {invoiceId: invoice.id});
  })
  .catch(err => console.log(err));
});


module.exports = router;
