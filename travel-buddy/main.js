console.log("main.js loaded");

const countryList = document.getElementById('countryList');
const searchInput = document.getElementById('searchInput');
const countryDetails = document.getElementById('countryDetails');
const COUNTRIES_ENDPOINTS = [
    'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,languages,currencies',
    'https://restcountries.com/v3.1/all',
];
const EXCHANGE_RATE_ACCESS_KEY = 'cur_live_wvALV4AslceDpzb1Xk0tFVyFS93w2nQ7LMBrroWJ'; // <-- Replace with your actual Exchange Rate API key

// Unsplash API setup (replace with your own access key)
const UNSPLASH_ACCESS_KEY = 'om4lLj7mQC2CUgG0a8hl8D49CUAvhVfWGaNqq5pwY5w'; // <-- Replace with your Unsplash Access Key


// Fetch and display all countries on load
let allCountries = [];
countryList.innerHTML = '<li>Loading countries...</li>';
loadCountries();
loadTravelTips();



async function loadCountries() {
    let lastError;
    for (const endpoint of COUNTRIES_ENDPOINTS) {
        try {
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error(`Countries request failed: ${res.status}`);
            const data = await res.json();
            allCountries = data;
            displayCountries(data);
            return;
        } catch (err) {
            lastError = err;
        }
    }

    console.error(lastError);
    countryList.innerHTML = '<li>Could not load countries. Please check your connection and refresh.</li>';
}



function displayCountries(countries) {
    countryList.innerHTML = '';
    if (!countries.length) {
        countryList.innerHTML = '<li>No countries found.</li>';
        return;
    }
    countries.forEach(country => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="50">
            <strong>${country.name.common}</strong> - ${country.region} - Population: ${country.population}
            <button class="favorite-btn" type="button" aria-label="Favorite ${country.name.common}">★</button>
        `;
        li.onclick = () => showCountryDetails(country);

        const favoriteButton = li.querySelector('.favorite-btn');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(country.name.common);
        });

        countryList.appendChild(li);
    });
}

// Combined search + region filter
const regionSelect = document.getElementById('regionFilter');

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionSelect.value;

    const filtered = allCountries.filter(c => {
        const matchesSearch = c.name.common.toLowerCase().includes(query);
        const matchesRegion = region === 'all' || c.region === region;
        return matchesSearch && matchesRegion;
    });

    displayCountries(filtered);
}

searchInput.addEventListener('input', applyFilters);
regionSelect.addEventListener('change', applyFilters);



// Show details and fetch Unsplash image
function showCountryDetails(country) {
    countryDetails.innerHTML = `<h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" width="100">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
        <div id="currencyExchange">Loading exchange rates...</div>
        <div id="countryImage"></div>
    `;

    // Fetch exchange rates for this country's currencies
    if (country.currencies) {
        const currencyCodes = Object.keys(country.currencies);
        fetchExchangeRates(currencyCodes);
    }
    
    fetchUnsplashImage(country.name.common);
}


// Fetch exchange rates from ExchangeRate API
async function fetchExchangeRates(currencyCodes) {
    const exchangeDiv = document.getElementById('currencyExchange');

    if (!EXCHANGE_RATE_ACCESS_KEY) {
        exchangeDiv.innerHTML = '<p><em>Add your currency API key in main.js to load exchange rates.</em></p>';
        return;
    }

    try {
        const codes = currencyCodes.join(',');
        const response = await fetch(
            `https://api.currencyapi.com/v3/latest?apikey=${EXCHANGE_RATE_ACCESS_KEY}&base_currency=USD&currencies=${codes}`
        );

        if (!response.ok) {
            throw new Error(`Exchange rate request failed: ${response.status}`);
        }

        const data = await response.json();
        const rates = [];
        const ratesByCode = {};

        for (const code of currencyCodes) {
            if (data.data && data.data[code]) {
                const rate = data.data[code].value;
                ratesByCode[code] = rate;
                rates.push(`1 USD = ${rate.toFixed(2)} ${code}`);
            }
        }

        if (rates.length > 0) {
            exchangeDiv.innerHTML = `
                <p><strong>Exchange Rates:</strong> ${rates.join(' | ')}</p>
                <label for="usdAmountInput"><strong>USD Amount:</strong></label>
                <input id="usdAmountInput" type="number" min="0" step="0.01" value="250">
                <p id="convertedAmountOutput"></p>
            `;

            const amountInput = document.getElementById('usdAmountInput');
            const convertedOutput = document.getElementById('convertedAmountOutput');

            const updateConvertedAmounts = () => {
                const amount = Number(amountInput.value);
                if (Number.isNaN(amount) || amount < 0) {
                    convertedOutput.innerHTML = '<em>Enter a valid amount.</em>';
                    return;
                }

                const converted = Object.entries(ratesByCode).map(([code, rate]) => {
                    const convertedAmount = amount * rate;
                    return `${amount.toFixed(2)} USD = ${convertedAmount.toFixed(2)} ${code}`;
            });

                convertedOutput.innerHTML = `<strong>Converted:</strong> ${converted.join(' | ')}`;
        };

            amountInput.addEventListener('input', updateConvertedAmounts);
            updateConvertedAmounts();
        } else {
            exchangeDiv.innerHTML = '<p><em>Exchange rates unavailable.</em></p>';
        }
    } catch (err) {
        console.error('Exchange rate fetch failed:', err);
        exchangeDiv.innerHTML = `<p><em>${err.message}</em></p>`;
    }
}


function fetchUnsplashImage(query) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const imgDiv = document.getElementById('countryImage');
            if (data.results && data.results.length > 0) {
                imgDiv.innerHTML = `<img src="${data.results[0].urls.small}" alt="${query}" style="margin-top:10px;max-width:300px;">`;
            } else {
                imgDiv.innerHTML = '<p>No image found.</p>';
            }
        })
        .catch(() => {
            const imgDiv = document.getElementById('countryImage');
            imgDiv.innerHTML = '<p>Image failed to load.</p>';
        });
}

function toggleFavorite(name) {
    alert('Favorite feature coming soon!');
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('active');
    });
});

// Load and render travel tips from local JSON as flip cards
async function loadTravelTips() {
    const tipsList = document.getElementById('tipsList');
    if (!tipsList) return;

    tipsList.innerHTML = '<li>Loading tips...</li>';

    try {
        const res = await fetch('./travel-tips.json');
        if (!res.ok) throw new Error('Could not load travel-tips.json');
        const tips = await res.json();

        tipsList.innerHTML = tips.map(tip => `
            <li class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <h3>${tip.country}</h3>
                        <p>${tip.city}</p>
                        <p><strong>Best Season:</strong> ${tip.bestSeason}</p>
                        <p><strong>Budget:</strong> ${tip.budgetLevel}</p>
                    </div>
                    <div class="flip-card-back">
                        <p><strong>Avg/day:</strong> $${tip.avgDailyCostUSD}</p>
                        <p><strong>Safety:</strong> ${tip.safetyLevel}</p>
                        <p><strong>Language:</strong> ${tip.language}</p>
                        <p><strong>Currency:</strong> ${tip.currency}</p>
                        <p><strong>Days:</strong> ${tip.recommendedDays}</p>
                        <p><strong>Top Activity:</strong> ${tip.topActivity}</p>
                    </div>
                </div>
            </li>
        `).join('');
    } catch (err) {
        tipsList.innerHTML = '<li>Could not load travel tips.</li>';
        console.error('Travel tips failed:', err);
    }
}