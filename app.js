//QUESTA VERSIONE E' NA MERDA, DOVRO' SICURAMENTE RISCRIVERE IL CODICE

const container = document.getElementById('whoisInfo');
const search_input = document.getElementById('whois_search');  
const whois_input = document.getElementById('whois_input');  

function displayWhoisData(data) {
    container.innerHTML = ''; // Clear the container before displaying new data
    const list = document.createElement('ul');

    if (typeof data === 'object' && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([key, value]) => {
            const item = document.createElement('li');
            item.textContent = `${key}: ${value}`;
            list.appendChild(item);
        });
        container.appendChild(list);
    } else {
        container.textContent = 'No data available.';
    }
}

function get_whois(domain) {
    container.textContent = 'Loading... Attention: For less popular domains, processing time may be longer.'; // Show a loading message
    fetch('https://api.nahida.one/whois/?query=' + encodeURIComponent(domain))
        .then(response => response.json())
        .then(data => {
            displayWhoisData(data);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            container.textContent = 'Failed to load data. or Invalid domain!';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    get_whois("google.com");
});

function check_domain_valid() {
    const domain = whois_input.value;
    if (domain && domain.includes(".")) {
        console.log("Valid domain:", domain);
        return true;
    } else {
        console.log("Invalid domain:", domain);
        return false;
    }
}

function handleDomainSearch() {
    if (check_domain_valid()) {
        get_whois(whois_input.value);
    }
}

search_input.addEventListener('click', handleDomainSearch);
whois_input.addEventListener('change', handleDomainSearch);
