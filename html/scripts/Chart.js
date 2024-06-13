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
    chart: {
      height: 450,
      width: 750,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#41FEC2', '#FF512C'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
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
      title: {
        text: 'Temperature'
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };




  var temp2 = {
    chart: {
      type: "bar",
      height: 450,
      width: 750,
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
