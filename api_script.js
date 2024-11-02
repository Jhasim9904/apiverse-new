// DOM Elements
const apiList = document.getElementById('api-list');
const categoryList = document.getElementById('category-list');
let categories = [];

// Initialize API List Display
displayAPIs();
fetchCategories();  // Fetch categories from backend initially

// Function to Fetch APIs from Backend and Display
async function displayAPIs() {
    try {
        const res = await fetch('http://localhost/frontend/src/get_apis.php');
        const apis = await res.json();
        console.log("Fetched APIs:", apis); // Debugging output
        displayFilteredAPIs(apis); // Display all APIs
    } catch (error) {
        console.error("Error loading APIs:", error);
    }
}

// Function to Add New API
async function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('apiCategory').value || 'General';

    if (apiName && apiURL && description) {
        const newAPI = { name: apiName, url: apiURL, category, description };

        try {
            const res = await fetch('http://localhost/frontend/src/add_api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAPI),
            });

            if (res.ok) {
                console.log("API added successfully"); // Debugging output
                displayAPIs();
                fetchCategories(); // Refresh categories in case a new one was added
                document.getElementById('contribute-form').reset();
            } else {
                console.error("Failed to add API:", await res.text());
            }
        } catch (error) {
            console.error("Error adding API:", error);
        }
    } else {
        alert("Please fill in all required fields.");
    }
}

// Function to Fetch and Populate Category List from Backend
async function fetchCategories() {
    try {
        const res = await fetch('http://localhost/frontend/src/get_categories.php');
        categories = await res.json();
        console.log("Fetched categories:", categories); // Debugging output
        populateCategories();
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Function to Populate Category List in the Sidebar
function populateCategories() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        categoryItem.onclick = () => filterByCategory(category);
        categoryList.appendChild(categoryItem);
    });
}

// Search & Filter Functions
function filterAPIs() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase();
    fetch('http://localhost/frontend/src/get_apis.php')
        .then(response => response.json())
        .then(apis => {
            const filteredAPIs = apis.filter(api =>
                api.name.toLowerCase().includes(searchTerm) ||
                api.category.toLowerCase().includes(searchTerm)
            );
            displayFilteredAPIs(filteredAPIs);
        })
        .catch(error => console.error("Error filtering APIs:", error));
}

function filterCategories() {
    const searchTerm = document.getElementById('category-search').value.toLowerCase();
    const categoryItems = Array.from(categoryList.getElementsByTagName('li'));

    categoryItems.forEach(category => {
        const text = category.textContent.toLowerCase();
        category.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

// Filter APIs by Category
function filterByCategory(category) {
    fetch('http://localhost/frontend/src/get_apis.php')
        .then(response => response.json())
        .then(apis => {
            const filteredAPIs = apis.filter(api => api.category.toLowerCase() === category.toLowerCase());
            displayFilteredAPIs(filteredAPIs);
        })
        .catch(error => console.error("Error filtering by category:", error));
}

// Helper Function to Display APIs
function displayFilteredAPIs(apis) {
    apiList.innerHTML = '';
    apis.forEach(api => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>URL:</strong> <a href="${api.url}" target="_blank">${api.url}</a></p>
            <p><strong>Description:</strong> ${api.description}</p>
            <p><strong>Category:</strong> ${api.category}</p>
        `;
        apiList.appendChild(apiCard);
    });
}
