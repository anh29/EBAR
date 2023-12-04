import React from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ array1 }) => {
  // Generate x-axis categories for the range 1100 - 2498 with a step of 2
  const xAxisCategories = Array.from(
    { length: 700 },
    (_, index) => 1100 + index * 2
  );

  const options = {
    chart: {
      height: 280,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Series 1",
        data: array1,
      },
    ],
    xaxis: {
      categories: xAxisCategories,
      labels: {
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        rotateAlways: true,
      },
      scrollbar: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        name: "Wavelength (nm)",
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
  };

  return (
    <div id="gradient">
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={280}
      />
    </div>
  );
};

export default AreaChart;
