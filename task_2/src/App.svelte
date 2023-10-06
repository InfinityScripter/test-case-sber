<script lang="ts">
  import { onMount } from "svelte";

  let baseCurrency = "USD";
  let targetCurrency = "RUB";
  let amount = '';
  let convertedAmount='';
  let rates = {};
  let error = null;

  async function fetchRates(baseCurrency: string) {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      const data = await response.json();
      rates = data.rates;
    } catch (err) {
      error = "Произошла ошибка при получении данных о валюте.";
    }
  }

  function convertAmount() {
    if (rates[targetCurrency]) {
      convertedAmount = (amount * rates[targetCurrency]).toFixed(2);
    }
    else if (rates[baseCurrency] === rates[targetCurrency]){
      convertedAmount = amount;
    }
    else {
      convertedAmount = 0;
    }
  }

  function convertBack() {
    if (rates[baseCurrency]) {
      amount = (convertedAmount / rates[targetCurrency] * rates[baseCurrency]).toFixed(2);
    }
    else if (rates[baseCurrency] === rates[targetCurrency]){
      amount = convertedAmount;
    }
    else {
      amount = 0;
    }
  }

  onMount(() => {
    fetchRates(baseCurrency);
  });

  $: {
    if (baseCurrency) {
      fetchRates(baseCurrency);
    }
    convertAmount();
  }

  $: convertAmount();

</script>

<svelte:head>
  <title>Конвертер валют</title>
</svelte:head>

<header class="header">
  <h1 class="title">Конвертер валют</h1>
</header>

<main class="main">
  <section class="section">
    <p class="label">Введите сумму и выберите валюту, которую вы хотите конвертировать:</p>
    {#if error}
      <p class="error">{error}</p>
    {:else}
      <div class="input-group">
        <input type="number" class="input" bind:value={amount} on:input={convertAmount} />
        <select class="select" bind:value={baseCurrency} on:change={convertAmount}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div class="input-group">
        <input type="number" class="input" bind:value={convertedAmount} on:input={convertBack} />
        <select class="select" bind:value={targetCurrency} on:change={convertAmount}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <p class="result">Вы конвертируете <b>{amount}</b> {baseCurrency} в <b>{convertedAmount}</b> {targetCurrency}.</p>
    {/if}
  </section>
</main>
