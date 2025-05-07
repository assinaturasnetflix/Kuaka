const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Configuração de CORS para permitir solicitações cross-origin
app.use(cors({
  origin: ['https://mines-payment.onrender.com', 'http://localhost:3000'], // Permitir solicitações do frontend no Render e localhost
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Carteira ID (constante definida de acordo com as especificações)
const CARTEIRA_ID = "1746519798335x143095610732969980";

// Definições de planos
const PLANOS = {
  "7dias": 500,
  "30dias": 1200
};

// Rota principal para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de verificação de saúde do servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Rota para processar pagamentos M-Pesa
app.post('/api/payment/mpesa', async (req, res) => {
  try {
    const { numero, nome, plano } = req.body;
    
    // Validação dos campos
    if (!numero || !nome || !plano) {
      return res.status(400).json({ success: false, message: 'Número, nome e plano são campos obrigatórios' });
    }
    
    // Validação do plano
    if (!PLANOS[plano]) {
      return res.status(400).json({ success: false, message: 'Plano inválido' });
    }
    
    const valor = PLANOS[plano];
    
    // Dados do pagamento
    const paymentData = {
      carteira: CARTEIRA_ID,
      numero: numero,
      "quem comprou": nome,
      valor: valor.toString()
    };
    
    console.log('Enviando requisição M-Pesa:', paymentData);
    
    // Requisição para a API do M-Pesa
    const response = await axios.post(
      'https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa',
      paymentData
    );
    
    console.log('Resposta M-Pesa:', response.status, response.data);
    
    // Verificação da resposta
    if (response.status === 200) {
      // Construir URL para WhatsApp
      const message = encodeURIComponent("Pagamento do bot Mines realizado com sucesso. Aproveite para ganhar dinheiro com o bot!");
      const whatsappUrl = `https://wa.me/?text=${message}`;
      
      return res.status(200).json({
        success: true,
        message: 'Pagamento realizado com sucesso!',
        whatsappUrl: whatsappUrl
      });
    } else {
      let errorMessage = 'Erro ao processar o pagamento';
      
      // Mapear códigos de erro
      if (response.status === 201) {
        errorMessage = 'Erro na transação. Por favor, tente novamente.';
      } else if (response.status === 422) {
        errorMessage = 'Saldo insuficiente. Por favor, recarregue sua conta.';
      } else if (response.status === 400) {
        errorMessage = 'PIN errado. Por favor, verifique e tente novamente.';
      }
      
      return res.status(response.status).json({
        success: false,
        message: errorMessage
      });
    }
  } catch (error) {
    console.error('Erro ao processar pagamento M-Pesa:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar o pagamento: ' + (error.response?.data?.message || error.message)
    });
  }
});

// Rota para processar pagamentos eMola
app.post('/api/payment/emola', async (req, res) => {
  try {
    const { numero, nome, plano } = req.body;
    
    // Validação dos campos
    if (!numero || !nome || !plano) {
      return res.status(400).json({ success: false, message: 'Número, nome e plano são campos obrigatórios' });
    }
    
    // Validação do plano
    if (!PLANOS[plano]) {
      return res.status(400).json({ success: false, message: 'Plano inválido' });
    }
    
    const valor = PLANOS[plano];
    
    // Dados do pagamento
    const paymentData = {
      carteira: CARTEIRA_ID,
      numero: numero,
      "quem comprou": nome,
      valor: valor.toString()
    };
    
    console.log('Enviando requisição eMola:', paymentData);
    
    // Requisição para a API do eMola
    const response = await axios.post(
      'https://mozpayment.co.mz/api/1.1/wf/pagamentorotativemola',
      paymentData
    );
    
    console.log('Resposta eMola:', response.data);
    
    // Verificação da resposta
    if (response.data && response.data.success === 'yes') {
      // Construir URL para WhatsApp
      const message = encodeURIComponent("Pagamento do bot Mines realizado com sucesso. Aproveite para ganhar dinheiro com o bot!");
      const whatsappUrl = `https://wa.me/?text=${message}`;
      
      return res.status(200).json({
        success: true,
        message: 'Pagamento realizado com sucesso!',
        whatsappUrl: whatsappUrl
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Pagamento reprovado. Por favor, tente novamente.'
      });
    }
  } catch (error) {
    console.error('Erro ao processar pagamento eMola:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar o pagamento: ' + (error.response?.data?.message || error.message)
    });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
