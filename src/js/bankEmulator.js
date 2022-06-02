const results = [];
const BANK_NOTES = [1, 2, 5, 10, 20, 50, 100, 200].reverse();
const valueReceiving = [];
const formattedText = [];

const formatMoney = (value) => new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value);

const sendWithdrawalMoney = (valueReq) => {
  try {
    BANK_NOTES.forEach(value => {
      if (valueReq >= value && value === 200 && valueReceiving.length === 0) {
        const remaining = valueReq % value;
        const notesAmount = Math.floor(valueReq / value);

        valueReceiving.push(remaining)

        if (remaining === 0)
          return

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

    results.forEach((item) => {
      Object.entries(item).forEach(values => formattedText.push(`${values[1]} ${values[0] > 1 ? 'nota' : 'moeda'}${values[1] > 1 ? 's' : ''} de ${formatMoney(values[0])} `))
    })

    console.log(`Saque de ${formatMoney(valueReq)} recebido por: `, formattedText.join(', '))

    console.log(results)

  } catch (error) {
    console.error(error.message)
  }
}

const valueRequest = prompt('Valor para sacar');

sendWithdrawalMoney(parseInt(valueRequest)); 