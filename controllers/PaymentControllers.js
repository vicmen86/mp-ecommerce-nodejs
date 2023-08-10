const mercadopago = require("mercadopago");
require('dotenv').config()
// Agrega credenciales
mercadopago.configure({
  access_token:process.env.ACCESS_TOKEN_TEST,
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
});

const paymentController=(req,res) => {
  let preference = {
    items: [
      {
        id: Number(2023),
        title: req.query.title,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url: ("https://https://mercado-pago-certificate.onrender.com" + req.query.img),
        quantity: Number(req.query.unit),
        unit_price: Number(req.query.price),
        currency_id: "ARS",
      }
    ],
    payer: {
    name: "Lalo",
    surname: "Landa",
// email: "test_user_94708656@testuser.com",
         phone: {
      area_code: "54",
      number: Number(5550545687),
    },
     identification: {
        type: "DNI",
        number: "22334445"
      },
    address: {
      street_name: "calle falsa",
      street_number: Number(123),
      zip_code: "05700",
    },
  },
    back_urls: {
      "success": "https://https://mercado-pago-certificate.onrender.com/success",
      "failure": "https://https://mercado-pago-certificate.onrender.com/failure",
      "pending": "https://https://mercado-pago-certificate.onrender.com/pending"
    },
    auto_return: "approved",
    payment_methods: {
    excluded_payment_methods: [
      {
        id: "visa",
      },
    ],
    excluded_payment_types: [   
      {
        id: "atm",    
      },
    ],
    
    installments: 6,
  },
  notification_url: `https://https://mercado-pago-certificate.onrender.com/webhook`, 
  external_reference: "comerciovancouver@gmail.com",
  expires: false,
  

  };

mercadopago.preferences.create(preference)
    .then(function (response) {
  let id = response.body.id;
 res.redirect(response.body.init_point) 
  })
  .catch(function (error) {
      console.log(error);
    })
}
module.exports = paymentController;