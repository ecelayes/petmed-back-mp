
import express from 'express';
import cors from 'cors';
import mercadopago from 'mercadopago';
import { PORT, HOST, MP_TOKEN } from './config.js';

const app = express();

mercadopago.configure({
  access_token: MP_TOKEN,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', function (req, res) {
  res.send('El servidor de MercadoPago funciona! :)');
});

app.post('/create_preference', (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      }
    ],
    back_urls: {
      'success': `${HOST}/afiliacion`,
      'failure': `${HOST}/pre-afiliacion`,
      'pending': `${HOST}/afiliacion`
    },
    payment_methods: {
      'excluded_payment_types': [
        {
          'id': 'ticket'
        }
      ],
      'installments': 1
    },
    statement_descriptor: 'PetMed',
    auto_return: 'approved'
  };
  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id
      });
    }).catch(function (error) {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log('The server is now running on Port', PORT);
});
