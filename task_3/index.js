const rates = {};
let baseCurrency = "RUB";
const elementUSD = document.querySelector("[data-value=USD]");
const elementEUR = document.querySelector("[data-value=EUR]");
const elementRUB = document.querySelector("[data-value=RUB]");
const elementGBP = document.querySelector("[data-value=GBP]");

async function getCurrencies() {
  const response = await fetch(
    `https://open.er-api.com/v6/latest/${baseCurrency}`
  );
  const data = await response.json();

  rates.USD = data.rates.USD;
  rates.EUR = data.rates.EUR;
  rates.RUB = data.rates.RUB;
  rates.GBP = data.rates.GBP;

  elementUSD.textContent = (rates.RUB / rates.USD).toFixed(2);
  elementEUR.textContent = (rates.RUB / rates.EUR).toFixed(2);
  elementGBP.textContent = (rates.RUB / rates.GBP).toFixed(2);

  const input = document.querySelector("#input");
  const resultInput = document.querySelector("#result");
  const select = document.querySelector("#select");

  input.oninput = convertValue;
  select.oninput = convertValue;

  function convertValue() {
    resultInput.value = (parseFloat(input.value) * rates[select.value]).toFixed(
      2
    );
  }
}

document.querySelector("#baseSelect").addEventListener("change", function () {
  baseCurrency = this.value;
  getCurrencies();
});

getCurrencies();

const dateElement = document.getElementById("date");
const currentDate = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
dateElement.textContent = currentDate.toLocaleDateString("ru-Ru", options);
