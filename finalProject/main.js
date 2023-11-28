/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 40, bottom: 60, left: 80, right: 40 };

/* LOAD DATA */
d3.csv('final_artists1.csv', d3.autoType)
  .then(data => {
    data.forEach(d => {
      d.year = d3.timeParse('%Y')(d.year); 
    });

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(data,function(d){return d.total;}), d3.max(data,function(d){return d.total;}) + 50])
    .range([height - margin.bottom, margin.top]);

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "aliceblue")

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat('%Y')); 

  const xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

  // TEXT
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", margin.left / 4)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .text("Total # of Art Pieces Made");

  // AREA GENERATOR FUNCTION
  const areaGen1 = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.Male));

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen1)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", "1")

  // AREA GENERATOR FUNCTION
  const areaGen = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.Female));

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", "1")

  // AREA GENERATOR FUNCTION
  const areaGen2 = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.NonBinary));

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen2)
    .attr("fill", "yellow")
    .attr("stroke", "black")
    .attr("stroke-width", "1")

  

  });