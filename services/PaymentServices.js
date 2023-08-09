const  axios  = require('axios');

require('dotenv').config()

class PaymentServices{
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token: process.env.ACCESS_TOKEN_TEST
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async paymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        id: "1234",
        title: name,
        description: "Dispositivo movil de Tienda e-commerce",
        //picture_url: "http://www.myapp.com/myimage.jpg",
        picture_url:`https://mercado-pago-certificate.onrender.com${img}`,
        category_id: "1234",
        quantity: Number(unit),
        currency_id: "ARS",
        unit_price: Number(price)
      }
    ];

    const preferences = {
      items,
      external_reference: process.env.EMAIL,
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_1086442003@testuser.com",
        phone: {
          area_code: "266",
          number: process.env.PHONE
        },
        address: {
          zip_code: "5700",
          street_name: "False",
          street_number: "123"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "visa"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 6
      },
      back_urls: {
        success: "https://mercado-pago-certificate.onrender.com/success",
        pending: "https://mercado-pago-certificate.onrender.com/pending",
        failure: "https://mercado-pago-certificate.onrender.com/error"
      },
      notification_url: "https://mercado-pago-certificate.onrender.com/webhook",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = PaymentServices;