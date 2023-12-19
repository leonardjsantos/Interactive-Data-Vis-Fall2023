/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.7,
  margin = { top: 40, bottom: 60, left: 80, right: 40 };

/* LOAD DATA */
d3.csv('artistsSummary.csv', d3.autoType)
  .then(data => {
    data.forEach(d => {
      d.year = d3.timeParse('%Y')(d.year); 
    });

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data,function(d){return d.total;}) + 20])
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

  // LEGEND
  svg.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  svg.append("rect")
    .attr("x", 100)
    .attr("y", 120)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
  
  svg.append("rect")
    .attr("x", 100)
    .attr("y", 140)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "yellow")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  // TEXT
  svg.append("text")
    .attr("x", 115)
    .attr("y", 109)
    .attr("font-size", 12)
    .attr("fill", "black")
    .text("Male");

  svg.append("text")
    .attr("x", 115)
    .attr("y", 130)
    .attr("font-size", 12)
    .attr("fill", "black")
    .text("Female");

  svg.append("text")
    .attr("x", 115)
    .attr("y", 150)
    .attr("font-size", 12)
    .attr("fill", "black")
    .text("Non-Binary");

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

  svg.append("text")
    .attr("x",100)
    .attr("y", 70)
    .attr("font-size", 15)
    .text("Hover over each area to find the highest number of artwork made by an artist in a single year.");

  // AREA GENERATOR FUNCTION
  const areaGen1 = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.Male + d.Female + d.NonBinary));

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen1)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .on("mouseover", function(d) {
      d3.select(this).style("fill", d3.select(this).attr('stroke'))
          .attr('fill-opacity', 0.5);
          svg.append("text")
            .attr("x",150)
            .attr("y", 200)
            .attr("font-size", 15)
            .text("Male artists made 141 pieces in 1943.");
    })                  
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "blue")
          .attr('fill-opacity', 1);
    });

  // AREA GENERATOR FUNCTION
  const areaGen = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.Female + d.NonBinary));
  

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .on("mouseover", function(d) {
      d3.select(this).style("fill", d3.select(this).attr('stroke'))
          .attr('fill-opacity', 0.5);
          svg.append("text")
            .attr("x",150)
            .attr("y", 230)
            .attr("font-size", 15)
            .text("Female artists made 43 pieces in 1946.");
    })                  
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "red")
          .attr('fill-opacity', 1);
    });

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
    .on("mouseover", function(d) {
      d3.select(this).style("fill", d3.select(this).attr('stroke'))
          .attr('fill-opacity', 0.5);
          svg.append("text")
            .attr("x",150)
            .attr("y", 260)
            .attr("font-size", 15)
            .text("Non-Binary artists made 1 piece in 1973, 1983, and 1987.");
    })                  
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "yellow")
          .attr('fill-opacity', 1);
    });

  

  });