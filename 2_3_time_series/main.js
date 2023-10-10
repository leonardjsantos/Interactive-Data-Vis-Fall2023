/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 40, bottom: 60, left: 80, right: 40 };

/* LOAD DATA */
d3.csv('../data/njSuicide.csv', d3.autoType)
  .then(data => {
    data.forEach(d => {
      d.year = d3.timeParse('%Y')(d.year); 
    });

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(data,function(d){return d.deaths;}) - 50, d3.max(data,function(d){return d.deaths;}) + 50])
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
    .text("Total Deaths");

  // AREA GENERATOR FUNCTION
  const areaGen = d3.area()
    .x(d => xScale(d.year))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.deaths));

  // DRAW AREA
  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGen)
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", "1.5")

  });

//  /* CONSTANTS AND GLOBALS */
//   const width = window.innerWidth * 0.7,
//   height = window.innerHeight * 0.7,
//   margin = { top: 20, bottom: 50, left: 100, right: 60 }

// /* LOAD DATA */
// d3.csv('../data/njSuicide.csv', d => {
//   return {
//     year: new Date(+d.Year, 0, 1),
//     rawYear: +d.Year,
//     state: d.State,
//     deaths: +d.Deaths
//   }

// }).then(data => {
//   console.log('data :>> ', data);

//   // SCALES
//   const xScale = d3.scaleTime()
//     // .domain(d3.extent(data, d => d.year))
//     .domain(d3.extent(data, d => d.rawYear))
//     .range([margin.left, width-margin.right])

//   const yScale = d3.scaleLinear()
//     .domain(d3.extent(data, d => d.deaths))
//     .range([height - margin.bottom, margin.top])

//   // CREATE SVG ELEMENT

//   const svg = d3.select("#container")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .style("background-color", "aliceblue")

//   // BUILD AND CALL AXES

//   const xAxis = d3.axisBottom(xScale)
//     .ticks(7) // limit the number of tick marks showing -- note: this is approximate
//     // .tickFormat(d3.timeFormat("%Y"))

//   const xAxisGroup = svg.append("g")
//     .attr("class", "xAxis")
//     .attr("transform", `translate(${0}, ${height - margin.bottom})`)
//     .call(xAxis)

//   const yAxis = d3.axisLeft(yScale)

//   const yAxisGroup = svg.append("g")
//     .attr("class", "yAxis")
//     .attr("transform", `translate(${margin.left}, ${0})`)
//     .call(yAxis)

//   // LINE GENERATOR FUNCTION

//   const lineGen = d3.line()
//     .x(d => xScale(d.year))
//     .y(d => yScale(d.deaths))

//   svg.selectAll("path")
//     .data(data)
//     .join("path")
//     .attr("id", d => d[0])
//     .style("fill", "none")
//     .style("stroke", "black")
//     .attr("d", lineGen)
  

//   // GROUP THE DATA BY STATE
  
//   // const groupedData = d3.groups(data, d => d.state)
//   // console.log('groupedData', groupedData)

//   // DRAW LINE
//   // svg.selectAll("path")
//   //   .data(groupedData)
//   //   .join("path")
//   //   // .attr("d", d => lineGen(d[1]))
//   //   .attr("d", ([state, data]) => lineGen(data))
//   //   .attr("id", d => d[0])
//   //   .style("fill", "none")
//   //   .style("stroke", "black")
// });