// Sample API Data
const apiData = [
    { name: "Weather API", url: "https://openweathermap.org/api", category: "data", description: "Provides weather data.", usage: "Example usage: https://example.com/weather?city=London" },
    { name: "COVID-19 Stats API", url: "https://documenter.getpostman.com/view/10724784/SzYXKX6mA", category: "data", description: "Gives COVID-19 case statistics.", usage: "Example usage: https://example.com/covid?country=USA" }
];

const apiList = document.getElementById('apiList');

// Function to display APIs
function displayAPIs(apis) {
    apiList.innerHTML = '';
    apis.forEach(api => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>URL:</strong> <a href="${api.url}" target="_blank">${api.url}</a></p>
            <p><strong>Description:</strong> ${api.description}</p>
            <p><strong>Usage Guide:</strong> ${api.usage}</p>
        `;
        apiList.appendChild(apiCard);
    });
}

// Initial Display of All APIs
displayAPIs(apiData);

// Function to Filter APIs by Category
function filterCategory(category) {
    const filteredAPIs = category === 'all' ? apiData : apiData.filter(api => api.category === category);
    displayAPIs(filteredAPIs);
}

// Function to Add a New API
function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const usageGuide = document.getElementById('usageGuide').value;

    if (apiName && apiURL && description) {
        apiData.push({
            name: apiName,
            url: apiURL,
            category: 'general',
            description: description,
            usage: usageGuide
        });
        displayAPIs(apiData);
        document.getElementById('apiForm').reset();
    } else {
        alert("Please fill in all required fields.");
    }
}

