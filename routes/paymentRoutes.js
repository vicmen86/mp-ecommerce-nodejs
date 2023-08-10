const { Router } = require("express");
const paymentController = require('../controllers/paymentControllers');

const router = Router();

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/detail", function (req, res) {
  res.render("detail", req.query);
});
//
router.get("/success", (req, res) => {
  res.render("success", req.query);
});

router.get("/failure", (req, res) => {
  res.render("failure");
});

router.get("/pending", (req, res) => {
  res.render("pending");
});
router.get("/checkout", function (request, res) {
  res.render("checkout", request.query);
});

router.post("/payment", paymentController);

router.post("/webhook", (req, res) => {
  //payment.webhook(req, res)
  console.log(req.body, "body enviado");
  console.log(req.query, "query enviado");
  return res.status(200).send("OK");
});
router.get('/feedback', function (req, res) {
  console.log(req.query)
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  }).status(200).send("Ok");
  
});
module.exports = router;
