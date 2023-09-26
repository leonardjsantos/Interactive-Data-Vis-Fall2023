
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = window.innerHeight * .8;

/* LOAD DATA */

d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const xScale = d3.scaleBand()
      .domain([0, d3.max(data.map(d => d.count))])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain(data.map(d => d.nationality))
      .range([height,0])
    
    const svg = d3.select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .style("background-color", "aliceblue")
      .style("overflow", "visible")
      
    const bars = svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("width", d => xScale(d.count))

      // .attr("width", xScale.bandwidth())
      // .attr("height", d => height - yScale(d.count))
      .attr("y", d => yScale(d.nationality))
      .attr("x", d => xScale(d.nationality))
      
    const xAxisGroup = svg.append("g")
    const yAxisGroup = svg.append("g")

    yAxisGroup
      .call(d3.axisLeft(yScale))
    
    xAxisGroup
      .style("transform", `translate(0, ${height}px)`)
      .call(d3.axisBottom(xScale))
    // const xAxisGroup = svg.append("g")
    // const yAxisGroup = svg.append("g")

    // yAxisGroup
    //   .call(d3.axisLeft(yScale))

    // // xAxisGroup
    // // .style("transform", `translate(0, ${height}px)`)
    // // .call(d3.axisBottom(xScale))

  })



// d3.csv('../data/squirrelActivities.csv', d3.autoType)
//   .then(data => {
//     console.log("data", data)

//     /* SCALES */
//     /** This is where you should define your scales from data to pixel space */

//     const xScale = d3.scaleBand()
//       // .domain(["running", "chasing", "climbing", "eating", "foraging"])
//       .domain(data.map(d => d.activity))
//       .range([0, width])
//       .padding(0.3)
      

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data.map(d => d.count))])
//       .range([height, 0])

//     /* HTML ELEMENTS */
//     /** Select your container and append the visual elements to it */

//     // svg
//     const svg = d3.select("#container")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)
//     .style("background-color", "aliceblue")
//     .style("overflow", "visible")
//     .style("margin-left", "15px")

//     // bars
//     const bars = svg.selectAll("rect.bar")
//       .data(data)
//       .join("rect")
//       .attr("class", "bar")

//       .attr("x", d => xScale(d.activity))
//       .attr("width", xScale.bandwidth())
//       .attr("height", d => height - yScale(d.count))
//       .attr("y", d => yScale(d.count))

//     const xAxisGroup = svg.append("g")
//     const yAxisGroup = svg.append("g")

//     yAxisGroup
//       .call(d3.axisLeft(yScale))

//     xAxisGroup
//     .style("transform", `translate(0, ${height}px)`)
//     .call(d3.axisBottom(xScale))


//   })