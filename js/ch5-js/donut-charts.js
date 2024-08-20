const drawDonutCharts = (data) => {
  // Generate the donut charts here
  const svg = d3
    .select("#donut")
    .append("svg")
    .attr("viewBox", ` 0 0 ${width} ${height}`);

  const donutContainers = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const years = [1975, 1995, 2013];

  // Extract the formats from the columns attribute of the data, and filter out the "year" item
  const formats = data.columns.filter((format) => format !== "year");

  years.forEach((year) => {
    const donutContainer = donutContainers
      .append("g")
      .attr("transform", `translate(${xScale(year)}, ${innerHeight / 2})`);
    console.log(innerHeight);

    // Retrieve the data related to the year of interest.
    const yearData = data.find((d) => d.year === year);

    // Initialize an empty array for the formatted data
    const formattedData = [];

    // for each format, create an object containing both the format ID and its sales for the year of interest.
    // `.push` Pushing these objects to the empty formatted data array initialized above
    formats.forEach((format) => {
      formattedData.push({ format: format, sales: yearData[format] });
    });
    console.log(formattedData);

    const pieGenerator = d3.pie().value((d) => d.sales);

    const annotatedData = pieGenerator(formattedData);

    const arcGenerator = d3
      .arc()
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3);

    const arcs = donutContainer
      .selectAll(`.arc-${year}`)
      .data(annotatedData)
      .join("g")
      .attr("class", `arc-${year}`);

    arcs
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => colorScale(d.data.format));

    arcs
      .append("text")
      .text((d) => {
        d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
        return d3.format(".0%")(d.percentage);
      })
      .attr("x", (d) => {
        d["centroid"] = arcGenerator
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)
          .centroid();
        return d.centroid[0];
      })
      .attr("y", (d) => d.centroid[1])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#f6fafc")
      .attr("fill-opacity", (d) => (d.percentage < 0.05 ? 0 : 1))
      .style("font-size", "16px")
      .style("font-weight", 500);

    donutContainer
      .append("text")
      .text(year)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "24px")
      .style("font-weight", 500);
  });
};
