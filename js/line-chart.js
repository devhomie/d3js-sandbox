// Load the data here
d3.csv("../data/weekly_temperature.csv", d3.autoType).then((data) => {
  console.log("temperature data", data);
  drawLineChart(data);
});

let hi = "What IS UPPP!";

console.log(hi);
console.log(d3.csv("./data/weekly_temperature.csv", d3.autoType));

// Create the line chart here
const drawLineChart = (data) => {
  // Delcare the values for the size SVG - and margin values for positioning elements in the SVG container
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Instantiate the SVG container for the line chart
  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append a 'g' element into the SVG container - positioned to desired location - using margin values from the margin object created above
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Creating and setting the domain values for xScale and wrapping them to separate values
  // new Date(2021, 00, 01, 0, 0, 0); <-- Below is different from this because of typescript's ts compiler *I Believe - need to do research* For now this works
  const firstDate = new Date(2021, 0, 1, 0, 0, 0);
  const lastDate = d3.max(data, (d) => d.date);

  // generate the x axis using `.scaleTime()` x-axis generator - using the domain values created above
  const xScale = d3
    .scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  // Wrap the D3 axis object passing it xScale - and formatting
  const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
  // Here we are generating the x-axis - and positioning it to desired placement within the innerChart
  innerChart
    .append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Creating and setting the domain value for the yScale
  const maxTemp = d3.max(data, (d) => d.max_temp_F);
  // Generate the y-axis using the `.scaleLinear()` axis generator - using the domain value created above
  const yScale = d3.scaleLinear().domain([0, maxTemp]).range([innerHeight, 0]);

  // Wrap the D3 axis object and passing it yScale
  const leftAxis = d3.axisLeft(yScale);
  innerChart.append("g").attr("class", "axis-y").call(leftAxis);
  // Append text label for the y-axis
  svg.append("text").text("Tempature (°F)").attr("y", 20);

  const aubergine = "#75485E";

  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 4)
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.avg_temp_F))
    .attr("fill", aubergine);

  //****************** */
  // Area Genarator - drawing the colored area BEHIND line generator
  //****************** */

  const areaGenerator = d3
    .area()
    .x((d) => xScale(d.date))
    .y0((d) => yScale(d.min_temp_F))
    .y1((d) => yScale(d.max_temp_F))
    .curve(d3.curveCatmullRom);

  innerChart
    .append("path")
    .attr("d", areaGenerator(data))
    .attr("fill", aubergine)
    .attr("fill-opacity", 0.2);

  //****************** */
  // Area Genarator - drawing the colored area BEHIND line generator
  //****************** */

  //****************** */
  // Line Genarator - drawing the line
  //****************** */
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.avg_temp_F))
    .curve(d3.curveCatmullRom);

  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", aubergine);
  //****************** */
  // Line Genarator - drawing the line
  //****************** */

  // Text label for average temperature line
  innerChart
    .append("text")
    .text("Average Tempature")
    .attr("x", xScale(lastDate) + 10)
    .attr("y", yScale(data[data.length - 1].avg_temp_F))
    .attr("dominant-baseline", "middle")
    .attr("fill", aubergine);

  // Text label for minimum tempature
  innerChart
    .append("text")
    .text("Minimum Tempature")
    .attr("x", xScale(data[data.length - 3].date) + 13)
    .attr("y", yScale(data[data.length - 3].min_temp_F) + 20)
    .attr("aligment-baseline", "hanging")
    .attr("fill", aubergine);
  innerChart
    .append("line")
    .attr("x1", xScale(data[data.length - 3].date))
    .attr("y1", yScale(data[data.length - 3].min_temp_F) + 3)
    .attr("x2", xScale(data[data.length - 3].date) + 10)
    .attr("y2", yScale(data[data.length - 3].min_temp_F) + 20)
    .attr("stroke", aubergine)
    .attr("stroke-width", 2);

  // Text label for maximum tempature
  innerChart
    .append("text")
    .text("Maximum Temperature")
    .attr("x", xScale(data[data.length - 4].date) + 13)
    .attr("y", yScale(data[data.length - 4].max_temp_F) - 20)
    .attr("fill", aubergine);
  innerChart
    .append("line")
    .attr("x1", xScale(data[data.length - 4].date))
    .attr("y1", yScale(data[data.length - 4].max_temp_F) - 3)
    .attr("x2", xScale(data[data.length - 4].date) + 10)
    .attr("y2", yScale(data[data.length - 4].max_temp_F ) - 20)
    .attr("stroke", aubergine)
    .attr("stroke-width", 2);

  // Select the line elements and text elements in the 'g' element of both y and x axis - then manipulate text and ticks to desired format
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
