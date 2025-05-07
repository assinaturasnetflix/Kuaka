// backend-mines-bot/index.js const express = require('express'); const cors = require('cors'); const axios = require('axios');

const app = express(); const PORT = process.env.PORT || 3000;

app.use(cors()); app.use(express.json());

// Dados sensíveis como carteira devem estar em variáveis de ambiente const carteira = process.env.CARTEIRA_ID || '1746519798335x143095610732969980';

// Endpoint eMola app.post('/emola', async (req, res) => { const { numero, valor, "quem comprou": nome } = req.body; try { const response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativoemola', { carteira: carteira, numero: numero, "quem comprou": nome, valor: valor });

return res.json(response.data);

} catch (error) { console.error('Erro no pagamento eMola:', error.message); return res.status(500).json({ success: 'no', error: 'Erro interno eMola' }); } });

// Endpoint M-Pesa app.post('/mpesa', async (req, res) => { const { numero, valor, "quem comprou": nome } = req.body; try { const response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', { carteira: carteira, numero: numero, "quem comprou": nome, valor: valor });

return res.json({
  status: response.status,
  mensagem: response.status === 200 ? 'Pagamento Realizado com Sucesso' : 'Falha no Pagamento'
});

} catch (error) { console.error('Erro no pagamento M-Pesa:', error.message); return res.status(500).json({ status: 500, error: 'Erro interno M-Pesa' }); } });

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`); });

