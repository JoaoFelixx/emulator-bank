const BANK_NOTES = [1, 2, 5, 10, 20, 50, 100, 200].reverse();

const formatMoney = (value) => new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value);

const sendWithdrawalMoney = (valueReq) => {
  const results = [];
  const formattedText = [];
  const valueReceiving = [];

  try {
    BANK_NOTES.forEach(value => {
      if (valueReq >= value && value === 200 && valueReceiving.length === 0) {
        const remaining = valueReq % value;
        const notesAmount = Math.floor(valueReq / value);

        valueReceiving.push(remaining)
        results.push({ [value]: notesAmount });
      }

      if (value > valueReq || value === 200)
        return

      if (valueReceiving.length === 0 && Math.min(...valueReceiving) > 0) {
        const remaining = valueReq % value;
        const notesAmount = Math.floor(valueReq / value);

        results.push({ [value]: notesAmount });
        valueReceiving.push(remaining)
      }

      if (valueReceiving.length > 0 && Math.min(...valueReceiving) > 0) {
        const remainingValue = Math.min(...valueReceiving);

        if (remainingValue < value)
          return

        const remaining = remainingValue % value;
        const notesAmount = Math.floor(remainingValue / value);

        results.push({ [value]: notesAmount });
        valueReceiving.push(remaining);
      }
    })

    results.forEach((item) => Object.entries(item)
      .forEach(values =>
        formattedText.push(`${values[1]} ${values[0] > 1 ? 'nota' : 'moeda'}${values[1] > 1 ? 's' : ''} de ${formatMoney(values[0])} `)))

    const text = String(`Saque de ${formatMoney(valueReq)} recebido por: ${formattedText.join(', ')}`);

    document.getElementById('result').innerHTML = '';
    document.getElementById('result').innerHTML = text;

  } catch (error) {
    return
  }
}

window.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = document.forms.withdrawalForm;

  const { cash } = form;

  sendWithdrawalMoney(Math.round(Number(cash.value)));
})