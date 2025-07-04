const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');


//Array to populate the select tags with these c onutries
const countries = [ 
    {code: "USD", name: "United States Dollar"},
    {code: "INR", name: "Indian Rupee"},
    {code: "ILS", name: "Israeli New Shekel"},
    {code: "ISK", name: "Icelandic Krona"},
    {code: "JPY", name: "Japanese Yen"},
    {code: "KRW", name: "South Korean Won"},
    {code: "MXN", name: "Mexican Peso"},
    {code: "MYR", name: "Malaysian Ringgit"},
    {code: "NOK", name: "Norwegian Krone"},
    {code: "NZD", name: "New Zealand Dollar"},
    {code: "PEN", name: "Peruvian Sol"},
    {code: "PHP", name: "Philippine Peso"},
    {code: "PLN", name: "Polish Zoty"},
    {code: "RON", name: "Romanian Leu"},
    {code: "RUB", name: "Russian Ruble"},
    {code: "SEK", name: "Swedish Krona"},
    {code: "SGO", name: "Singapore Dollar"},
    {code: "THB", name: "Thai Baht"},
    {code: "TRY", name: "Turkish Lira"},
    {code: "TWD", name: "Taiwan New Dollar"},
    {code: "UAH", name: "Ukrainian Hryvnia"},
    {code: "UYU", name: "Uruguayan Peso"},
    {code: "VND", name: "Vietnamese Dong"},
    {code: "ZAR", name: "South African Road"},
    {code: "IDR", name: "Indonesian Rupiah"},
    {code: "HUF", name: "Hungarian Forint"},
    {code: "HRK", name: "Croatian Kuna"},
    {code: "HKD", name: "Hong Kong Dollar"},
    {code: "GBP", name: "British Pound Sterling"},
    {code: "EUR", name: "Euro"},
    {code: "EGP", name: "Egyptian Pound"},
    {code: "DKK", name: "Danish Krone"},
    {code: "CZK", name: "Czech Koruna"},
    {code: "COP", name: "Colombian Peso"},
    {code: "CNY", name: "Chinese Yuan"},
    {code: "CLP", name: "Chilean Peso"},
    {code: "CHF", name: "Swiss Franc"},
    {code: "CAD", name: "Canadian Dollar"},
    {code: "BRL", name: "Brazilian Real"},
    {code: "AUD", name: "Australian Dollar"},
    {code: "ARS", name: "Argentine Peso"},
    {code: "AED", name: "United Arab Emirates Dirham"},
];

//Showing conutries from array to select tag
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value =  option2.value = country.code;
    option1.textContent =  option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);
    
    // setting default value of select tag
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});


const getExchangeRate = async() =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates.....";

    try {
        
    //fetch data fromm api 
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    if(typeof conversionRate === 'undefined'){
        resultElement.textContent = `Exchange rate data is not available for selected countries !!!`;
        convertedAmountElement = "";
    }
    else{
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }


    } 
    catch (error) {
        converterContainer.innerHTML = `<h2>Error Whilw Fetching exchange rates !!!</h2>`;
    }
    //console.log(data);
}

// fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);

// fetching exchange rate when user change currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);

window.addEventListener('load', getExchangeRate);