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

    const pieGenerator = d3.pie().value(d => d.sales);

    const annotatedData = pieGenerator(formattedData);

    const arcGenerator = d3.arc().startAngle(d => d.startAngle).endAngle(d => d.endAngle).innerRadius(60).outerRadius(100).padAngle(0.02).cornerRadius(3);

    const arcs = donutContainer.selectAll(`.arc-${year}`).data(annotatedData).join("path").attr("class", `arc-${year}`).attr("d", arcGenerator);
    

  });
};
