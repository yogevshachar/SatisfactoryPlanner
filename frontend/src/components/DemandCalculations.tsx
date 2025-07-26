import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DemandCalculations = () => {
  // Sample data for pie chart
  const pieData = [
    { name: "Iron Ore", y: 30, color: "#3B82F6" },
    { name: "Coal", y: 25, color: "#6B7280" },
    { name: "Limestone", y: 20, color: "#10B981" },
    { name: "Copper Ore", y: 15, color: "#F59E0B" },
    { name: "Sulfur", y: 10, color: "#EF4444" },
  ];

  // Sample data for bar chart
  const barData = [
    { name: "Iron Ingot", y: 45, color: "#3B82F6" },
    { name: "Steel Ingot", y: 30, color: "#6B7280" },
    { name: "Copper Ingot", y: 25, color: "#F59E0B" },
    { name: "Aluminum Ingot", y: 20, color: "#10B981" },
    { name: "Plastic", y: 15, color: "#8B5CF6" },
  ];

  // Pie chart configuration
  const pieChartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 200,
    },
    title: {
      text: "Resource Distribution",
      style: {
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%",
          style: {
            color: "#ffffff",
            fontSize: "12px",
          },
        },
        showInLegend: true,
      },
    },
    legend: {
      itemStyle: {
        color: "#d1d5db",
        fontSize: "12px",
      },
      itemHoverStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "Resources",
        data: pieData,
        type: "pie",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  // Bar chart configuration
  const barChartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      height: 200,
    },
    title: {
      text: "Production Rates",
      style: {
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    xAxis: {
      categories: barData.map((item) => item.name),
      labels: {
        style: {
          color: "#d1d5db",
          fontSize: "12px",
        },
      },
      lineColor: "#374151",
      tickColor: "#374151",
    },
    yAxis: {
      title: {
        text: "Rate (/min)",
        style: {
          color: "#d1d5db",
          fontSize: "12px",
        },
      },
      labels: {
        style: {
          color: "#d1d5db",
          fontSize: "12px",
        },
      },
      gridLineColor: "#374151",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "{point.y}/min",
          style: {
            color: "#ffffff",
            fontSize: "11px",
          },
        },
      },
    },
    series: [
      {
        name: "Production Rate",
        data: barData.map((item) => ({
          y: item.y,
          color: item.color,
        })),
        type: "bar",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="bg-gray-800 rounded-lg p-4">
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 rounded-lg p-4">
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      </div>
    </div>
  );
};

export default DemandCalculations;
