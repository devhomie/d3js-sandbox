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
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // new Date(2021, 00, 01, 0, 0, 0); <-- Below is different from this because of typescript's ts compiler *I Believe - need to do research* For now this works
  const firstDate = new Date(2021, 0, 1, 0, 0, 0);
  const lastDate = d3.max(data, (d) => d.date);
  const xScale = d3
    .scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  const maxTemp = d3.max(data, (d) => d.max_temp_F);
  const yScale = d3.scaleLinear().domain([0, maxTemp]).range([innerHeight, 0]);

  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
  svg.append("text").text("Tempature (°F)").attr("y", 20);

  innerChart
    .append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale);
  innerChart.append("g").attr("class", "axis-y").call(leftAxis);

  d3.selectAll(".axis-x text, .axis-y text")
    .attr("x", (d) => {
      const currentMonth = d;
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
      return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr("y", "10px")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px");
};
