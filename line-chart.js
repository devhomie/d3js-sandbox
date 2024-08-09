// Load the data here
d3.csv("./data/weekly_temperature.csv", d3.autoType).then((data) => {
  console.log("temperature data", data);
  drawLineChart(data);
});

let hi = "What IS UPPP!";

console.log(hi);
console.log(d3.csv("./data/weekly_temperature.csv", d3.autoType));

// Create the line chart here
const drawLineChart = (data) => {
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
};
