import razorpayfrontEnd from './../index'
import React from 'react'
import Axios from 'axios'
const shortid = require('shortid')
const Razorpay = require('razorpay')

 const razorpayInstance =  new Razorpay({
            key_id:'rzp_test_L6Du3aG8Txsg06',
            key_secret:'yRPDCYsfHFnDn9IRBV1TCF39'
        })

app.get('/logo.svg', (req, res) => {
    res.sendFile(path.join(__dirname, 'logo.svg'))
})


// app.post('/verification', (req, res) => {
// // do a validation
//     const secret = '12345678'

//     console.log(req.body)

//     const crypto = require('crypto')

//     const shasum = crypto.createHmac('sha256', secret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest('hex')

//     console.log(digest, req.headers['x-razorpay-signature'])

//     if (digest === req.headers['x-razorpay-signature']) {
//         console.log('request is legit')
//         // process it
//         require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
//     } else {
// // pass it
//     }
//     res.json({ status: 'ok' })
// })

app.post('https://api.razorpay.com/v1/orders', async (req, res) => {
    const payment_capture = 1
    const amount = 499
    const currency = 'INR'
    
    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    
    try {
        const response = await razorpayInstance.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})
