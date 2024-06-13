document.addEventListener('DOMContentLoaded', function () {
    startPolling(); // Start polling when the document is loaded
});

// Function to start polling the APIs for indoor and outdoor data
function startPolling() {
    fetchIndoorData(); // Fetch initial indoor data immediately
    fetchOutdoorData(); // Fetch initial outdoor data immediately
    setInterval(fetchIndoorData, 5000); // Poll the indoor API every 5 seconds (5000 ms)
    setInterval(fetchOutdoorData, 5000); // Poll the outdoor API every 5 seconds (5000 ms)
}

// Function to fetch indoor JSON data
async function fetchIndoorData() {
    try {
        const response = await fetch('https://partially-unique-haddock.ngrok-free.app/api/indoor_data');
        if (!response.ok) {
            throw new Error('Failed to fetch indoor data');
        }
        const jsonData = await response.json();
        console.log('Indoor Data:', jsonData);
        displayData(jsonData, 'data-container-indoor');
    } catch (error) {
        console.error('Error fetching indoor data:', error);
    }
}

// Function to fetch outdoor JSON data
async function fetchOutdoorData() {
    try {
        const response = await fetch('https://partially-unique-haddock.ngrok-free.app/api/outdoor_data');
        if (!response.ok) {
            throw new Error('Failed to fetch outdoor data');
        }
        const jsonData = await response.json();
        console.log('Outdoor Data:', jsonData);
        displayData(jsonData, 'data-container-outdoor');
    } catch (error) {
        console.error('Error fetching outdoor data:', error);
    }
}

// Function to display data
function displayData(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    if (!dataContainer) {
        console.log('Container not found:', containerId);
        return;
    }

    // Clear existing data
    dataContainer.innerHTML = '';

    // Loop through each item in the data array
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.keys(item).forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        });
        dataContainer.appendChild(row);
    });
}
