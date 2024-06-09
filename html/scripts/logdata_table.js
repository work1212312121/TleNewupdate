document.addEventListener('DOMContentLoaded', function () {
    startPolling(); // Start polling when the document is loaded
});

// Function to start polling the API
function startPolling() {
    fetchData(); // Fetch initial data immediately
    setInterval(fetchData, 5000); // Poll the API every 5 seconds (5000 ms)
}

// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('https://partially-unique-haddock.ngrok-free.app/api/all_data');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.indoor_data) {
            displayData(jsonData.indoor_data, 'data-container-indoor');
        }
        if (jsonData.outdoor_data) {
            displayData(jsonData.outdoor_data, 'data-container-outdoor');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display data
function displayData(data, containerId) {
    const dataContainer = document.getElementById(containerId);
    if (!dataContainer) {
        console.log('Im fine babe T^T ');
        return;
    }

    // Clear existing data
    dataContainer.innerHTML = '';

    // Loop through each item in the data array
    data.forEach(item => {
        const row = document.createElement('tr');

        const assetTypeCell = document.createElement('td');
        assetTypeCell.textContent = item.asset_type;
        row.appendChild(assetTypeCell);

        const assetUUIDCell = document.createElement('td');
        assetUUIDCell.textContent = item.asset_uuid;
        row.appendChild(assetUUIDCell);

        const timestampCell = document.createElement('td');
        timestampCell.textContent = item.datatime;
        row.appendChild(timestampCell);

        const deviceBrandCell = document.createElement('td');
        deviceBrandCell.textContent = item.device_brand;
        row.appendChild(deviceBrandCell);

        const deviceControllerCell = document.createElement('td');
        deviceControllerCell.textContent = item.device_controller;
        row.appendChild(deviceControllerCell);

        const deviceModelCell = document.createElement('td');
        deviceModelCell.textContent = item.device_model;
        row.appendChild(deviceModelCell);

        const deviceNameCell = document.createElement('td');
        deviceNameCell.textContent = item.device_name;
        row.appendChild(deviceNameCell);

        const deviceStatusCell = document.createElement('td');
        deviceStatusCell.textContent = item.device_status;
        row.appendChild(deviceStatusCell);

        const deviceUnitCell = document.createElement('td');
        deviceUnitCell.textContent = item.device_unit;
        row.appendChild(deviceUnitCell);

        const deviceUUIDCell = document.createElement('td');
        deviceUUIDCell.textContent = item.device_uuid;
        row.appendChild(deviceUUIDCell);

        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const measurementTypeCell = document.createElement('td');
        measurementTypeCell.textContent = item.measurement_type;
        row.appendChild(measurementTypeCell);

        const rawdataCell = document.createElement('td');
        rawdataCell.textContent = item.rawdata;
        row.appendChild(rawdataCell);

        dataContainer.appendChild(row);
    });
}
