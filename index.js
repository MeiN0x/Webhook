const mongoose = require('mongoose');
const { clientData, statusData, transactionData } = require('./utils/helpers');
const PurchaseSchema = require('./database/paymentSchema');
const express = require('express');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/webhook', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/webhook', async (req, res) => {

    // Recebe os dados do webhook e os armazena em uma variável para serem usados posteriormente
    
    const payment_data = {
        purchase_id: req.body.purchase_id,
        client_data: clientData(req.body),
        status_data: statusData(req.body),
        transaction_data: transactionData(req.body),
    }

    // Verifica se o pagamento já existe no banco de dados, se existir, atualiza os dados, se não, cria um novo
    const paymentData = await PurchaseSchema.findOne({ purchase_id: payment_data['purchase_id'] });
    
    if (paymentData) {
        await PurchaseSchema.updateOne({ purchase_id: payment_data['purchase_id'] }, payment_data).catch(err =>
             {
                console.log('Error updating payment data in database for purchase_id: ' + payment_data['purchase_id'] + "\n\n" + err)
                return res.status(500).send('Error updating payment data in database, please try again later')
             }
        );

    } else {
        await PurchaseSchema.create(payment_data).catch(err =>
            {
                console.log('Error creating payment data in database for purchase_id: ' + payment_data['purchase_id'] + "\n\n" + err)
                return res.status(500).send('Error creating payment data in database, please try again later')
            }
        );
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
