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
        id: 1234,
        title: name,
        description: "Dispositivo movil de Tienda e-commerce",
        //picture_url: "http://www.myapp.com/myimage.jpg",
        picture_url:("https://mercado-pago-certificate.onrender.com" + img),
        category_id: "1234",
        quantity: Number(unit),
        currency_id: "ARS",
        unit_price: Number(price)
      }
    ];

    const preferences = {
      items,
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_1832719035@gmail.com",
        phone: {
          area_code: 54,
          number: process.env.PHONE
        },
        identification: {
          type: "DNI",
          number: 22334445
        },
        address: {
          zip_code: "D5700",
          street_name: "False",
          street_number: 123
        }
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "visa"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
       
      },
      statement_descriptor: "CERTIFICACION MP",
      back_urls: {
        success: "https://mercado-pago-certificate.onrender.com/success",
        pending: "https://mercado-pago-certificate.onrender.com/pending",
        failure: "https://mercado-pago-certificate.onrender.com/error"
      },
      notification_url: "https://mercado-pago-certificate.onrender.com/webhook",
      external_reference: "comerciovancouver@gmail.com",
      
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