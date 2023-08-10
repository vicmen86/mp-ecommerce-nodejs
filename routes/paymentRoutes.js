const { Router } = require("express");
const PaymentControllers = require('../controllers/PaymentControllers');
const PaymentServices = require('../services/PaymentServices');
const router = Router();
const payment = new PaymentControllers(new PaymentServices());

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

router.get("/error", (req, res) => {
  res.render("error");
});

router.get("/pending", (req, res) => {
  res.render("pending");
});
router.post("/payment", (req, res) =>
  payment.mercadoPagoLink(req, res)
);
router.post("/webhook", (req, res) => {
  //payment.webhook(req, res)
  console.log(req.data);
  return res.status(200).send("OK");
});
module.exports = router;
