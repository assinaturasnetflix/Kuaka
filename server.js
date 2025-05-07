app.post('/process-payment', async (req, res) => {
  const { numero, plano, metodoPagamento } = req.body;

  console.log("Dados recebidos:", req.body);  // Verifique os dados recebidos

  if (!numero || !plano || !metodoPagamento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  let valor;
  if (plano === '7dias') {
    valor = 500;
  } else if (plano === '30dias') {
    valor = 1200;
  } else {
    return res.status(400).json({ error: 'Plano inválido' });
  }

  const data = {
    carteira: '1746519798335x143095610732969980',
    numero: numero,
    "quem comprou": 'Usuário Bot Mines',
    valor: valor
  };

  try {
    console.log("Enviando requisição para M-Pesa ou eMola...");
    let response;

    if (metodoPagamento === 'mpesa') {
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', data);
      console.log("Resposta M-Pesa:", response.data);  // Verifique a resposta da API
      if (response.status === 200) {
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.`);
      }
    } else if (metodoPagamento === 'emola') {
      response = await axios.post('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativemola', data);
      console.log("Resposta eMola:", response.data);  // Verifique a resposta da API
      if (response.data.success === 'yes') {
        return res.redirect(`https://wa.me/258879038047?text=Pagamento%20do%20bot%20Mines%20realizado%20com%20sucesso.`);
      }
    } else {
      return res.status(400).json({ error: 'Método de pagamento inválido' });
    }

    return res.status(400).json({ error: 'Erro ao processar pagamento. Tente novamente!' });

  } catch (error) {
    console.error('Erro no backend:', error);  // Verifique erros no backend
    return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
  }
});
