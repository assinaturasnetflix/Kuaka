const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsing do corpo da requisição
app.use(bodyParser.json());

// Rota para processar os pagamentos
app.post('/process-payment', async (req, res) => {
  const { numero, plano, metodoPagamento } = req.body;

  // Verificar se todos os parâmetros necessários foram passados
  if (!numero || !plano || !metodoPagamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Definir o valor do pagamento de acordo com o plano escolhido
  let valor;
  if (plano === '7dias') {
    valor = 500;  // 500MT para 7 dias
  } else if (plano === '30dias') {
    valor = 1200;  // 1200MT para 30 dias
  } else {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  // Dados para a requisição da API
  const data = {
    carteira: '1746519798335x143095610732969980',  // Carteira do bot
    numero: numero,  // Número de telefone do usuário
    "quem comprou": 'Usuário Bot Mines',  // Nome do comprador
    valor: valor  // Valor a ser pago
  };

  // Enviar pagamento para M-Pesa ou eMola
  try {
    let response;

    if (metodoPagamento === 'mpesa') {
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', data);
      if (response.status === 200) {
        // Sucesso no pagamento, redirecionar para o WhatsApp com a mensagem de sucesso
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.%20Aproveite%20para%20ganhar%20dinheiro%20com%20o%20bot!`);
      }
    } else if (metodoPagamento === 'emola') {
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativemola', data);
      if (response.data.success === 'yes') {
        // Sucesso no pagamento, redirecionar para o WhatsApp com a mensagem de sucesso
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.%20Aproveite%20para%20ganhar%20dinheiro%20com%20o%20bot!`);
      }
    } else {
      return res.status(400).json({ error: 'Método de pagamento inválido' });
    }

    // Caso o pagamento não tenha sido bem-sucedido
    return res.status(400).json({ error: 'Erro ao processar pagamento. Tente novamente!' });

  } catch (error) {
    console.error('Erro na requisição ao processar pagamento:', error);
    return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
