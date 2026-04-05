
console.log("main.js loaded");

const countryList = document.getElementById('countryList');
const searchInput = document.getElementById('searchInput');
const countryDetails = document.getElementById('countryDetails');

// Unsplash API setup (replace with your own access key)
const UNSPLASH_ACCESS_KEY = 'om4lLj7mQC2CUgG0a8hl8D49CUAvhVfWGaNqq5pwY5w'; // <-- Replace with your Unsplash Access Key

// Fetch and display all countries on load
let allCountries = [];
countryList.innerHTML = '<li>Loading countries...</li>';
fetch('https://restcountries.com/v3.1/all')
    .then(res => {
        if (!res.ok) throw new Error(`Countries request failed: ${res.status}`);
        return res.json();
    })
    .then(data => {
        allCountries = data;
        displayCountries(data);
    })
    .catch(err => {
        console.error(err);
        countryList.innerHTML = '<li>Could not load countries. Please check your connection and refresh.</li>';
    });

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
            <button onclick="event.stopPropagation(); toggleFavorite('${country.name.common}')">★</button>
        `;
        li.onclick = () => showCountryDetails(country);
        countryList.appendChild(li);
    });
}

// Search/filter logic
searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const filtered = allCountries.filter(c => c.name.common.toLowerCase().includes(query));
    displayCountries(filtered);
});

// Show details and fetch Unsplash image
function showCountryDetails(country) {
    countryDetails.innerHTML = `<h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" width="100">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
        <div id="countryImage"></div>
    `;
    fetchUnsplashImage(country.name.common);
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