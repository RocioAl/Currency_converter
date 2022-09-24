const url = "https://mindicador.cl/api"
const result = document.querySelector("#result")
const search = document.querySelector("#search")
const message = document.querySelector("#bug")
const graphic = document.querySelector("#graphic")
let chart = null;

let getCurrencyData = async () => {
  try {
    const input_amount = document.querySelector('#input_amount').value
    const select_currency = document.querySelector('#select_currency').value
    const url_api = `${url}/${select_currency}`
    const res = await fetch(url_api)
    const data_json = await res.json()
    const element = data_json.serie[0]["valor"];
    const counting = (Number(input_amount) / element).toFixed(2)

    let symbol = "$";
    if (select_currency === "euro") {
      symbol = "€";
    }
    result.innerHTML = `<span>${symbol}${counting}</span>`


    currency_data = data_json.serie.slice(0, 10);
    const data = currency_data.map((currency) => currency.valor);
    const labels = currency_data.map((currency) => `${currency.fecha.substring(0, 4)}-${currency.fecha.substring(5, 7)}-${currency.fecha.substring(8, 10)}`)
    if (chart != null) {
      chart.destroy();
    }
    chart = new Chart(graphic, {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [
          {
            label: "Historial últimos 10 dias",
            data: data.reverse(),
            borderColor: "rgb(255,99,132)",
            borderWidth: 1,
          },
        ],
      },
    })
    graphic.style.backgroundColor = "white";

    message.innerHTML = "Conectado"

  } catch (message) {
    message.innerHTML = " Error en la Conexión"

  }
}

search.addEventListener("click", getCurrencyData)