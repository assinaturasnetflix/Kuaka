// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sensitive payment information - kept only on server side
const PAYMENT_CONFIG = {
    carteira: '1746519798335x143095610732969980',
    emolaEndpoint: 'https://mozpayment.co.mz/api/1.1/wf/pagamentorotativoemola',
    mpesaEndpoint: 'https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa'
};

// Payment processing endpoint
app.post('/api/process-payment', async (req, res) => {
    try {
        const { phoneNumber, buyerName, paymentMethod, plan, price } = req.body;
        
        // Validate input data
        if (!phoneNumber || !buyerName || !paymentMethod || !plan || !price) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios'
            });
        }
        
        // Select the appropriate API endpoint based on payment method
        const apiEndpoint = paymentMethod === 'emola' 
            ? PAYMENT_CONFIG.emolaEndpoint 
            : PAYMENT_CONFIG.mpesaEndpoint;
        
        // Construct payment data
        const paymentData = {
            carteira: PAYMENT_CONFIG.carteira,
            numero: phoneNumber,
            'quem comprou': buyerName,
            valor: price.toString()
        };
        
        console.log(`Processing ${paymentMethod} payment of ${price}MT for ${plan} plan`);
        
        // Make payment request to payment gateway
        const response = await axios.post(apiEndpoint, paymentData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Process response based on payment method
        if (paymentMethod === 'emola') {
            // eMola response
            if (response.data && response.data.success === 'yes') {
                return res.json({
                    success: true,
                    message: 'Pagamento aprovado com sucesso!'
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Pagamento reprovado. Por favor, tente novamente ou use outro método de pagamento.'
                });
            }
        } else {
            // mPesa response
            const status = response.data?.status || response.status;
            
            if (status === 200) {
                return res.json({
                    success: true,
                    message: 'Pagamento realizado com sucesso!'
                });
            } else if (status === 422) {
                return res.json({
                    success: false,
                    message: 'Saldo insuficiente. Por favor, recarregue sua conta ou use outro método de pagamento.'
                });
            } else if (status === 400) {
                return res.json({
                    success: false,
                    message: 'PIN incorreto. Por favor, tente novamente.'
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Erro na transação. Por favor, tente novamente ou use outro método de pagamento.'
                });
            }
        }
    } catch (error) {
        console.error('Payment error:', error.message);
        
        // Return appropriate error message to client
        return res.status(500).json({
            success: false,
            message: 'Erro ao processar o pagamento. Por favor, tente novamente mais tarde.'
        });
    }
});

// Serve index.html for all routes to support SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
