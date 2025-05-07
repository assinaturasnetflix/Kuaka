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

  console.log("Dados recebidos:", req.body);  // Verifique os dados recebidos

  if (!numero || !plano || !metodoPagamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  let valor;
  if (plano === '7dias') {
    valor = 500;  // 500MT para 7 dias
  } else if (plano === '30dias') {
    valor = 1200;  // 1200MT para 30 dias
  } else {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  const data = {
    carteira: '1746519798335x143095610732969980',  // Unique ID da carteira
    numero: numero,  // Número de telefone do usuário
    "quem comprou": 'Usuário Bot Mines',  // Nome do comprador
    valor: valor  // Valor a ser pago
  };

  try {
    console.log("Enviando requisição para M-Pesa ou eMola...");
    let response;

    if (metodoPagamento === 'mpesa') {
      // Chamada para M-Pesa
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', data);
      console.log("Resposta M-Pesa:", response.data);  // Verifique a resposta da API
      if (response.status === 200) {
        // Se pagamento for bem-sucedido, redireciona para o WhatsApp
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.`);
      } else if (response.status === 201) {
        // Erro na transação
        return res.status(400).json({ error: 'Erro na transação' });
      } else if (response.status === 422) {
        // Saldo insuficiente
        return res.status(400).json({ error: 'Saldo insuficiente' });
      } else if (response.status === 400) {
        // PIN errado
        return res.status(400).json({ error: 'PIN errado' });
      }
    } else if (metodoPagamento === 'emola') {
      // Chamada para eMola
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativemola', data);
      console.log("Resposta eMola:", response.data);  // Verifique a resposta da API
      if (response.data.success === 'yes') {
        // Se pagamento for aprovado, redireciona para o WhatsApp
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.`);
      } else if (response.data.success === 'no') {
        // Pagamento reprovado
        return res.status(400).json({ error: 'Pagamento reprovado' });
      }
    } else {
      return res.status(400).json({ error: 'Método de pagamento inválido' });
    }

    // Caso o pagamento não tenha sido bem-sucedido
    return res.status(400).json({ error: 'Erro ao processar pagamento. Tente novamente!' });

  } catch (error) {
    console.error('Erro no backend:', error);  // Verifique erros no backend
    return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
