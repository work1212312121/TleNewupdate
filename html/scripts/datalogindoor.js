// Function to fetch JSON data
async function fetchData() {
  try {
    const response = await fetch(
      "https://partially-unique-haddock.ngrok-free.app/api/all_data"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData.indoor_data) {
      displayData(jsonData.indoor_data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display data
function displayData(data) {
  const dataDiv = document.getElementById("data");
  data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
            <p>asset_type: ${item.asset_type}</p>
            <p>asset_uuid: ${item.asset_uuid}</p>
            <p>Timestamp : ${item.datatime}</p>
            <p>device_brand: ${item.device_brand}</p>
            <p>device_controller: ${item.device_controller}</p>
            <p>device_model: ${item.device_model}</p>
            <p>device_name: ${item.device_name}</p>
            <p>device_status: ${item.device_status}</p>
            <p>device_unit: ${item.device_unit}</p>
            <p>device_uuid: ${item.device_uuid}</p>
            <p>id: ${item.id}</p>
            <p>measurement_type: ${item.measurement_type}</p>
            <p>rawdata: ${item.rawdata}</p>
            <hr>
        `;
    dataDiv.appendChild(itemDiv);
  });
}

// Call fetchData function when the page loads
fetchData();
