document.addEventListener("DOMContentLoaded", function() {
    const MAX_VALUE = 100; // Maximum value for the bar chart (assuming same max value for all metrics)
    const MAX_VALUE_PRESSURE = 1000
    // URLs for each metric API endpoint
    const apiEndpoints = {
        'temperature-indoor': 'https://partially-unique-haddock.ngrok-free.app/api/indoor_temperature',
        'humidity-indoor': 'https://partially-unique-haddock.ngrok-free.app/api/indoor_humidity',
        'humidity-outdoor': 'https://partially-unique-haddock.ngrok-free.app/api/outdoor_humidity',
        'temperature-outdoor': 'https://partially-unique-haddock.ngrok-free.app/api/outdoor_temperature',
        'gas-indoor': 'https://partially-unique-haddock.ngrok-free.app/api/indoor_gas',
        'gas-outdoor': 'https://partially-unique-haddock.ngrok-free.app/api/outdoor_gas',
        'pressure-indoor': 'https://partially-unique-haddock.ngrok-free.app/api/indoor_pressure',
        'pressure-outdoor': 'https://partially-unique-haddock.ngrok-free.app/api/outdoor_pressure'
    };

    // Function to fetch data from the API and update the chart
    async function fetchData(endpoint, metricId) {
        try {
            const response = await fetch(endpoint);
            const rawDataArray = await response.json();

            // Assuming rawDataArray contains objects with rawdata values
            const latestRawData = parseFloat(rawDataArray[0].rawdata);
            const percent = (latestRawData / MAX_VALUE) * 100;

            // Find the element and update the data-percent attribute
            const pieChartElement = document.querySelector(`#${metricId} .easyPieChart`);
            pieChartElement.setAttribute('data-percent', percent.toFixed(2));

            // Update the inner text to display the value
            const valueElement = pieChartElement.querySelector('h5');
            valueElement.innerText = `${latestRawData}${metricId.includes('temperature') ? '°C' : metricId.includes('humidity') ? '%' : metricId.includes('pressure') ? 'pha' : 'ppm'}`;

            // Manually trigger the redraw of the pie chart
            if (typeof jQuery !== 'undefined' && typeof jQuery.fn.easyPieChart !== 'undefined') {
                jQuery(pieChartElement).data('easyPieChart').update(percent);
            }

        } catch (error) {
            console.error(`Error fetching data for ${metricId}:`, error);
        }
    }

    // Function to update all metrics
    function updateAllMetrics() {
        Object.keys(apiEndpoints).forEach(metricId => {
            fetchData(apiEndpoints[metricId], metricId);
        });
    }

    // Fetch the data immediately and then every 5 seconds
    updateAllMetrics();
    setInterval(updateAllMetrics, 30000); // 5000 milliseconds = 5 seconds
});
