async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.map(entry => ({
    x: new Date(entry.datatime).getTime(),
    y: parseFloat(entry.rawdata)
  }));
}

async function initializeCharts() {
  const indoorData = await fetchData('https://partially-unique-haddock.ngrok-free.app/api/indoor_temperature');
  const outdoorData = await fetchData('https://partially-unique-haddock.ngrok-free.app/api/outdoor_temperature');

  var temp1 = {
    chart: {
      type: "area",
      height: 350,
      width: 550,
      foreColor: "#999",
      stacked: true,
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06,
      },
    },
    colors: ["#00E396", "#0090FF"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Indoor Temperature",
        data: indoorData,
      },
      {
        name: "Outdoor Temperature",
        data: outdoorData,
      },
    ],
    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: 14,
        offsetY: -5,
      },
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        left: -5,
        right: 5,
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    fill: {
      type: "solid",
      fillOpacity: 0.7,
    },
  };



  
  var temp2 = {
    chart: {
      type: "bar",
      height: 350,
      width: 550,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + "°C";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    series: [
      {
        name: "Indoor Temperature",
        data: indoorData,
      },
      {
        name: "Outdoor Temperature",
        data: outdoorData,
      },
    ],
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "°C";
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    title: {
      text: "",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  var chart1 = new ApexCharts(document.querySelector("#temp-line"), temp1);
  var chart2 = new ApexCharts(document.querySelector("#temp-bar"), temp2);

  chart1.render();
  chart2.render();

  document.querySelector("#toggle-chart-btn").addEventListener("click", function () {
    var chart1Container = document.querySelector("#temp-line");
    var chart2Container = document.querySelector("#temp-bar");

    if (chart1Container.style.display !== "none") {
      chart1Container.style.display = "none";
      chart2Container.style.display = "block";
    } else {
      chart1Container.style.display = "block";
      chart2Container.style.display = "none";
    }
  });

  // Fetch data every 1 hour and update the charts
  setInterval(async function () {
    const newIndoorData = await fetchData('https://partially-unique-haddock.ngrok-free.app/api/indoor_temperature');
    const newOutdoorData = await fetchData('https://partially-unique-haddock.ngrok-free.app/api/outdoor_temperature');

    chart1.updateSeries([
      {
        name: "Indoor Temperature",
        data: newIndoorData,
      },
      {
        name: "Outdoor Temperature",
        data: newOutdoorData,
      },
    ]);

    chart2.updateSeries([
      {
        name: "Indoor Temperature",
        data: newIndoorData,
      },
      {
        name: "Outdoor Temperature",
        data: newOutdoorData,
      },
    ]);
  }, 3600000); // 3600000 milliseconds = 1 hour
}

// Initialize charts when the page loads
window.onload = initializeCharts;
