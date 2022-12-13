const mongoose = require('mongoose');

// create schema
const paymentSchema = new mongoose.Schema({
    purchase_id : { type: Number, required: true },
    client_data: { type: Object, required: true },
    status_data : { type: Object, required: true },
    transaction_data : { type: Object, required: true }
})

module.exports = mongoose.model('PaymentData', paymentSchema);
