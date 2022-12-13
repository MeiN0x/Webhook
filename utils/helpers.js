function clientData(data) {
    return {
        id: data.payer.id ?? null,
        email: data.payer.email ?? null,
        identification: {
            number: data.payer.identification.number ?? null,
            type: data.payer.identification.type ?? null,
        }
    }
}
1
function statusData(data) {
    return {
        simple: data.status,
        detail: data.status_detail ?? data.status ?? null,
    }
}

function transactionData(data) {
    return {
        type: data.payment_type_id,
        method: data.payment_method_id ,
        curreny: data.currency_id,
        amount: data.transaction_amount,
        refunded: data.refunded_amount,
        paid: data.transaction_details.total_paid_amount,
        over_paid: data.transaction_details.overpaid_amount
    }
}

module.exports = {
    clientData,
    statusData,
    transactionData
}