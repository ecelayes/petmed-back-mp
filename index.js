import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PORT, HOST, MP_TOKEN } from './config.js';
/* import history from 'connect-history-api-fallback'; */

const app = express();
const client = new MercadoPagoConfig({ accessToken: MP_TOKEN });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
/* app.use(history()); */

app.get('/', (req, res) => {
  res.send('El servidor de MercadoPago funciona! :)');
});

app.post('/create_preference', async (req, res) => {
  try {
    let body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: 'ARS',
        }
      ],
      back_urls: {
        'success': `${HOST}/new/afiliacion`,
        'failure': `${HOST}/new/pre-afiliacion`,
        'pending': `${HOST}/new/afiliacion`
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

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating preference' });
  }
});

app.listen(PORT, () => {
  console.log('The server is now running on Port', PORT);
});
