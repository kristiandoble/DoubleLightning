var express = require('express');
var router = express.Router();
//const BTCPAY_PRIV_KEY = process.env.BTCPAY_PRIV_KEY;
//const BTCPAY_MERCHANT_KEY = process.env.BTCPAY_MERCHANT_KEY;
const BTCPAY_PRIV_KEY = "4d93583fc65a474db04bb46d4f12c3a91da15bd1ea8c3c0a2652174eef52928e";
const BTCPAY_MERCHANT_KEY = "3nL77CtwAACA2ARux5DVAqcfAKq5LmV3TPKeVFZKxmmQ";

// Initialize the client
const btcpay = require('btcpay')
const keypair = btcpay.crypto.load_keypair(new Buffer.from(BTCPAY_PRIV_KEY, 'hex'));
const client = new btcpay.BTCPayClient('https://btcpay100432.lndyn.com', keypair, {merchant: BTCPAY_MERCHANT_KEY})


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
  //var product = JSON.parse(req.body.product);
  //var dollarAmount = product.price;
  var dollarAmount = req.body.amount;
  
  var buyer = {
    //email: req.body.email,
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
